// Sends the Hackathon Round 1 confirmation email at most once per registration.
// The database and SMTP sender are injected so every path can be unit-tested with `node --test`;
// send-hackathon-confirmation.ts wires in the real pool.

import { emailDisabled, gmailConfig, sendRawMail, type GmailConfig } from "./gmail.ts";
import { buildMime, isSingleAddress, toBase64Url } from "./mime.ts";
import { formatHackathonId } from "./payments.ts";
import { renderHackathonConfirmation } from "./hackathon-confirmation-email.ts";

export type ConfirmationSkipCode = "disabled" | "not-found" | "in-progress" | "already-sent";

export type ConfirmationResult =
  | { result: "sent"; messageId: string }
  | { result: "skipped"; code: ConfirmationSkipCode; reason: string }
  | { result: "failed"; error: string };

export type Query = (sql: string, params: unknown[]) => Promise<Record<string, unknown>[]>;

export type ConfirmationDeps = {
  query: Query;
  send?: (raw: string, config: GmailConfig) => Promise<string>;
  env?: Record<string, string | undefined>;
  log?: (message: string) => void;
};

// A 'sending' claim older than this is assumed to belong to a crashed request and may be reclaimed.
// Must stay well above the worst-case send time (token + two send attempts at 15 s each).
export const STALE_CLAIM_SQL = "interval '10 minutes'";

const skipReasons: Record<ConfirmationSkipCode, string> = {
  disabled: "Email sending is disabled (EMAIL_DISABLED).",
  "not-found": "Registration not found.",
  "in-progress": "The confirmation email is already being sent.",
  "already-sent": "The confirmation email has already been sent.",
};

const skipped = (code: ConfirmationSkipCode): ConfirmationResult => ({
  result: "skipped",
  code,
  reason: skipReasons[code],
});

export function errorText(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  return message.slice(0, 500) || "Unknown error.";
}

export const CLAIM_SQL = `UPDATE hackathon_registration
     SET confirmation_email_status = 'sending', confirmation_email_claimed_at = LOCALTIMESTAMP,
         confirmation_email_error = NULL
     WHERE id = $1
       AND (
         confirmation_email_status IS NULL
         OR confirmation_email_status = 'failed'
         OR ($2::boolean AND confirmation_email_status = 'sent')
         OR (confirmation_email_status = 'sending'
             AND confirmation_email_claimed_at < LOCALTIMESTAMP - ${STALE_CLAIM_SQL})
       )
     RETURNING registration_code, full_name, email_address`;

export const STATUS_SQL = `SELECT confirmation_email_status FROM hackathon_registration WHERE id = $1`;

export const FAILED_SQL = `UPDATE hackathon_registration
     SET confirmation_email_status = 'failed', confirmation_email_error = $2
     WHERE id = $1`;

export const SENT_SQL = `UPDATE hackathon_registration
     SET confirmation_email_status = 'sent', confirmation_email_sent_at = LOCALTIMESTAMP,
         confirmation_email_message_id = $2, confirmation_email_error = NULL
     WHERE id = $1`;

// Explains why the claim matched no row.
async function skipCode(query: Query, registrationId: string): Promise<ConfirmationSkipCode> {
  const row = (await query(STATUS_SQL, [registrationId]))[0];
  if (!row) return "not-found";
  if (row.confirmation_email_status === "sending") return "in-progress";
  return "already-sent";
}

export async function sendConfirmation(
  registrationId: string,
  deps: ConfirmationDeps,
  { force = false } = {},
): Promise<ConfirmationResult> {
  const env = deps.env ?? process.env;
  const send = deps.send ?? sendRawMail;
  const log = deps.log ?? console.error;
  if (emailDisabled(env)) return skipped("disabled");

  // Atomic claim: only one request can move the row into 'sending', so a registration,
  // an admin resend and a backfill running together can never send twice.
  const row = (await deps.query(CLAIM_SQL, [registrationId, force]))[0];
  if (!row) return skipped(await skipCode(deps.query, registrationId));

  let messageId: string;
  try {
    const recipient = String(row.email_address ?? "").trim();
    if (!isSingleAddress(recipient)) {
      throw new Error(`The participant's email address is not valid for sending: "${recipient}".`);
    }
    const config = gmailConfig(env);
    const email = renderHackathonConfirmation({
      registrationCode: formatHackathonId(String(row.registration_code ?? "")),
      fullName: String(row.full_name ?? ""),
    });
    const raw = buildMime({
      from: { email: config.sender, name: config.senderName },
      to: recipient,
      replyTo: config.replyTo || undefined,
      subject: email.subject,
      html: email.html,
      text: email.text,
    });
    messageId = await send(toBase64Url(raw), config);
  } catch (error) {
    const message = errorText(error);
    log(`Hackathon confirmation email failed for registration ${registrationId}: ${message}`);
    await deps.query(FAILED_SQL, [registrationId, message]).catch(() => undefined);
    return { result: "failed", error: message };
  }

  // The email is out; a failure here must not mark it failed (that would allow a duplicate retry).
  // If this update is lost the row stays 'sending' and becomes reclaimable after STALE_CLAIM_SQL.
  await deps
    .query(SENT_SQL, [registrationId, messageId.slice(0, 64)])
    .catch((error) =>
      log(`Hackathon confirmation sent but not recorded for ${registrationId}: ${errorText(error)}`),
    );
  return { result: "sent", messageId };
}
