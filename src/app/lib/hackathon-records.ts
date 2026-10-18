import { pool } from "@/lib/db";
import {
  formatHackathonId,
  type HackathonRegistration,
  type HackathonStatus,
  type PassEmailStatus,
} from "@/app/lib/payments";
import { STALE_CLAIM_SQL } from "@/app/lib/hackathon-confirmation-core";

export const labelByStatus: Record<number, HackathonStatus> = {
  0: "Rejected",
  1: "Submitted",
  2: "Under review",
  3: "Shortlisted",
};

export type ListRow = {
  id: string;
  registration_code: string;
  full_name: string;
  email_address: string;
  mobile_number: string;
  institution_name: string;
  course_programme: string;
  year_of_study: string;
  discipline: string;
  discipline_other: string | null;
  state_ut: string;
  solution_path: string;
  submitted_date: string;
  submitted_at: string;
  status: number;
  confirmation_email_status: PassEmailStatus | null;
  confirmation_email_sent_at: string | null;
  confirmation_email_error: string | null;
};

// A send that never finished (crashed request) is shown as failed so the admin can retry it.
const staleSending = `h.confirmation_email_status = 'sending' AND h.confirmation_email_claimed_at < LOCALTIMESTAMP - ${STALE_CLAIM_SQL}`;

export const listSelect = `
  h.id,
  h.registration_code,
  h.full_name,
  h.email_address,
  h.mobile_number,
  h.institution_name,
  h.course_programme,
  h.year_of_study,
  d.name AS discipline,
  h.discipline_other,
  h.state_ut,
  h.solution_path,
  to_char(h.created_at, 'DD Mon YYYY') AS submitted_date,
  to_char(h.created_at, 'YYYY-MM-DD HH24:MI:SS') AS submitted_at,
  h.status,
  CASE WHEN ${staleSending} THEN 'failed' ELSE h.confirmation_email_status END AS confirmation_email_status,
  to_char(h.confirmation_email_sent_at, 'DD Mon YYYY HH24:MI') AS confirmation_email_sent_at,
  CASE WHEN ${staleSending}
    THEN 'The previous send did not finish and may not have been delivered. Use Send email to retry.'
    ELSE h.confirmation_email_error
  END AS confirmation_email_error
`;

export function toListItem(row: ListRow): HackathonRegistration {
  return {
    id: row.id,
    registrationCode: formatHackathonId(row.registration_code),
    fullName: row.full_name,
    email: row.email_address,
    mobile: row.mobile_number,
    institution: row.institution_name,
    course: row.course_programme,
    yearOfStudy: row.year_of_study,
    discipline: row.discipline_other ? `${row.discipline} — ${row.discipline_other}` : row.discipline,
    state: row.state_ut,
    solutionPath: row.solution_path,
    date: row.submitted_date,
    submittedAt: row.submitted_at,
    status: labelByStatus[row.status] ?? "Submitted",
    emailStatus: row.confirmation_email_status,
    emailSentAt: row.confirmation_email_sent_at ?? "",
    emailError: row.confirmation_email_error ?? "",
  };
}

export async function selectHackathonRegistration(id: string) {
  const result = await pool.query<ListRow>(
    `SELECT ${listSelect}
     FROM hackathon_registration h
     JOIN hackathon_discipline d ON d.id = h.discipline
     WHERE h.id = $1`,
    [id],
  );
  return result.rows[0] ?? null;
}
