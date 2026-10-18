// Sends the Round 1 confirmation email to hackathon registrations that have never had one
// (registered before the email existed). Safe to rerun: each row is claimed atomically, so
// nobody gets a duplicate even if this runs alongside live registrations.
//
//   node --env-file=.env.local scripts/backfill-hackathon-confirmations.ts --dry-run
//   node --env-file=.env.local scripts/backfill-hackathon-confirmations.ts [--limit=400] [--retry-failed]
//
// Needs DATABASE_URL and the GMAIL_* variables. Gmail allows roughly 500 messages/day on a
// personal account (2,000 on Workspace), so use --limit to split a large backlog across days.

import pg from "pg";
import { sendConfirmation } from "../src/app/lib/hackathon-confirmation-core.ts";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const retryFailed = args.includes("--retry-failed");
const limit = Number(args.find((arg) => arg.startsWith("--limit="))?.split("=")[1] ?? 400);
const DELAY_MS = 1000;

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

try {
  const pending = await pool.query<{ id: string; registration_code: string; email_address: string }>(
    `SELECT id, registration_code, email_address FROM hackathon_registration
     WHERE confirmation_email_status IS NULL ${retryFailed ? "OR confirmation_email_status = 'failed'" : ""}
     ORDER BY created_at
     LIMIT $1`,
    [limit],
  );
  console.log(`${pending.rows.length} registration(s) to email${dryRun ? " (dry run)" : ""}.`);

  const tally = { sent: 0, skipped: 0, failed: 0 };
  for (const [index, row] of pending.rows.entries()) {
    const label = `[${index + 1}/${pending.rows.length}] SSETH-${row.registration_code} ${row.email_address}`;
    if (dryRun) {
      console.log(`${label}: would send`);
      continue;
    }
    const outcome = await sendConfirmation(row.id, {
      query: async (sql, params) => (await pool.query(sql, params)).rows,
    });
    tally[outcome.result] += 1;
    const detail = outcome.result === "failed" ? outcome.error : outcome.result === "skipped" ? outcome.reason : "";
    console.log(`${label}: ${outcome.result}${detail ? ` — ${detail}` : ""}`);
    if (outcome.result === "skipped" && outcome.code === "disabled") break;
    if (index < pending.rows.length - 1) await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
  }
  if (!dryRun) console.log(`Done: ${tally.sent} sent, ${tally.skipped} skipped, ${tally.failed} failed.`);
} finally {
  await pool.end();
}
