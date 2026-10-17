import { pool } from "@/lib/db";
import { sendConfirmation, type ConfirmationResult } from "@/app/lib/hackathon-confirmation-core";

export type { ConfirmationResult } from "@/app/lib/hackathon-confirmation-core";

// Sends the Round 1 confirmation email for a hackathon registration, at most once unless `force` is set.
export function sendHackathonConfirmation(
  registrationId: string,
  { force = false } = {},
): Promise<ConfirmationResult> {
  return sendConfirmation(
    registrationId,
    { query: async (sql, params) => (await pool.query(sql, params)).rows },
    { force },
  );
}
