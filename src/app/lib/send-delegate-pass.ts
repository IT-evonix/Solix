import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { pool } from "@/lib/db";
import { formatRegistrationId } from "@/app/lib/payments";
import { uploadDirectory } from "@/app/lib/registration-input";
import { renderDelegatePass, type PassImage } from "@/app/lib/delegate-pass-email";
import { CALENDAR_PNG, PIN_PNG, USER_PNG } from "@/app/lib/delegate-pass-icons";
import { buildMime, isSingleAddress, toBase64Url } from "@/app/lib/mime";
import { emailDisabled, gmailConfig, sendRawMail } from "@/app/lib/gmail";

export type SkipCode = "disabled" | "not-found" | "not-approved" | "in-progress" | "already-sent";

export type PassEmailResult =
  | { result: "sent"; messageId: string }
  | { result: "skipped"; code: SkipCode; reason: string }
  | { result: "failed"; error: string };

const MAX_PHOTO_BYTES = 2 * 1024 * 1024;

// A 'sending' claim older than this is assumed to belong to a crashed request and may be reclaimed.
// Must stay well above the worst-case send time (token + two send attempts at 15 s each).
export const STALE_CLAIM_SQL = "interval '10 minutes'";

const skipReasons: Record<SkipCode, string> = {
  disabled: "Email sending is disabled (EMAIL_DISABLED).",
  "not-found": "Registration not found.",
  "not-approved": "The Delegate Pass is only emailed for approved payments.",
  "in-progress": "The Delegate Pass is already being sent.",
  "already-sent": "The Delegate Pass has already been emailed.",
};

const skipped = (code: SkipCode): PassEmailResult => ({ result: "skipped", code, reason: skipReasons[code] });

type ClaimRow = {
  registration_code: string;
  full_name: string;
  email_address: string;
  organisation_institution: string;
  registration_fee: string;
  attendee_photo_path: string | null;
};

const png = (base64: string, filename: string): PassImage => ({
  data: Buffer.from(base64, "base64"),
  contentType: "image/png",
  filename,
});

const icons = {
  calendar: png(CALENDAR_PNG, "calendar.png"),
  pin: png(PIN_PNG, "pin.png"),
  user: png(USER_PNG, "user.png"),
};

// Square, EXIF-rotated, small JPEG of the attendee photo; null falls back to the placeholder icon.
async function loadPhoto(storedPath: string | null): Promise<PassImage | null> {
  if (!storedPath) return null;
  try {
    const file = path.join(uploadDirectory(), path.basename(storedPath));
    const source = await readFile(file);
    if (!source.length || source.length > MAX_PHOTO_BYTES) return null;
    const data = await sharp(source).rotate().resize(160, 160, { fit: "cover" }).jpeg({ quality: 85 }).toBuffer();
    return { data, contentType: "image/jpeg", filename: "photo.jpg" };
  } catch {
    return null;
  }
}

function errorText(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  return message.slice(0, 500) || "Unknown error.";
}

// Explains why the claim matched no row.
async function skipCode(registrationId: string): Promise<SkipCode> {
  const result = await pool.query<{ status: number; pass_email_status: string | null }>(
    `SELECT status, pass_email_status FROM registration WHERE id = $1`,
    [registrationId],
  );
  const row = result.rows[0];
  if (!row) return "not-found";
  if (row.status !== 3) return "not-approved";
  if (row.pass_email_status === "sending") return "in-progress";
  return "already-sent";
}

// Sends the Delegate Pass for an approved registration, at most once unless `force` is set.
export async function sendDelegatePass(registrationId: string, { force = false } = {}): Promise<PassEmailResult> {
  if (emailDisabled()) return skipped("disabled");

  // Atomic claim: only one request can move the row into 'sending', so concurrent
  // approvals / resends can never send twice.
  const claimed = await pool.query<ClaimRow>(
    `UPDATE registration
     SET pass_email_status = 'sending', pass_email_claimed_at = LOCALTIMESTAMP, pass_email_error = NULL
     WHERE id = $1
       AND status = 3
       AND (
         pass_email_status IS NULL
         OR pass_email_status = 'failed'
         OR ($2::boolean AND pass_email_status = 'sent')
         OR (pass_email_status = 'sending' AND pass_email_claimed_at < LOCALTIMESTAMP - ${STALE_CLAIM_SQL})
       )
     RETURNING registration_code, full_name, email_address, organisation_institution,
               registration_fee, attendee_photo_path`,
    [registrationId, force],
  );

  const row = claimed.rows[0];
  if (!row) return skipped(await skipCode(registrationId));

  let messageId: string;
  try {
    const recipient = row.email_address.trim();
    if (!isSingleAddress(recipient)) {
      throw new Error(`The delegate's email address is not valid for sending: "${recipient}".`);
    }
    const config = gmailConfig();
    const email = renderDelegatePass({
      registrationCode: formatRegistrationId(row.registration_code),
      fullName: row.full_name,
      organisation: row.organisation_institution,
      fee: row.registration_fee,
      icons,
      photo: await loadPhoto(row.attendee_photo_path),
    });
    const raw = buildMime({
      from: { email: config.sender, name: config.senderName },
      to: recipient,
      replyTo: config.replyTo || undefined,
      subject: email.subject,
      html: email.html,
      text: email.text,
      inline: email.inline,
    });
    messageId = await sendRawMail(toBase64Url(raw), config);
  } catch (error) {
    const message = errorText(error);
    console.error(`Delegate pass email failed for registration ${registrationId}: ${message}`);
    await pool
      .query(`UPDATE registration SET pass_email_status = 'failed', pass_email_error = $2 WHERE id = $1`, [
        registrationId,
        message,
      ])
      .catch(() => undefined);
    return { result: "failed", error: message };
  }

  // The email is out; a failure here must not mark it failed (that would allow a duplicate retry).
  // If this update is lost the row stays 'sending' and is shown as unconfirmed after STALE_CLAIM_SQL.
  await pool
    .query(
      `UPDATE registration
       SET pass_email_status = 'sent', pass_email_sent_at = LOCALTIMESTAMP,
           pass_email_message_id = $2, pass_email_error = NULL
       WHERE id = $1`,
      [registrationId, messageId.slice(0, 64)],
    )
    .catch((error) => console.error(`Delegate pass sent but not recorded for ${registrationId}: ${errorText(error)}`));
  return { result: "sent", messageId };
}
