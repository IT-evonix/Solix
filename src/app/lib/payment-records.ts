import { pool } from "@/lib/db";
import {
  formatRegistrationId,
  type PassEmailStatus,
  type Payment,
  type PaymentStatus,
} from "@/app/lib/payments";
import { STALE_CLAIM_SQL } from "@/app/lib/send-delegate-pass";

// registration.status: 1 draft (added by applicant), 2 pending, 3 approved, 0 rejected
export const statusByAction = { Pending: 2, Approved: 3, Rejected: 0 } as const;
const labelByStatus: Record<number, PaymentStatus> = {
  0: "Rejected",
  1: "Pending",
  2: "Pending",
  3: "Approved",
};

export type PaymentRow = {
  id: string;
  registration_id: string;
  registration_code: string;
  full_name: string;
  email_address: string;
  mobile_number: string;
  organisation_institution: string;
  designation: string;
  registration_fee: string;
  upload_path: string;
  transaction_id: string;
  payer_name: string | null;
  registration_date: string;
  submitted_at: string;
  status: number;
  pass_email_status: PassEmailStatus | null;
  pass_email_sent_at: string | null;
  pass_email_error: string | null;
};

// A send that never finished (crashed request) is shown as failed so the admin can retry it.
const staleSending = `r.pass_email_status = 'sending' AND r.pass_email_claimed_at < LOCALTIMESTAMP - ${STALE_CLAIM_SQL}`;

export const selectList = `
  p.id,
  r.id AS registration_id,
  r.registration_code,
  r.full_name,
  r.email_address,
  r.mobile_number,
  r.organisation_institution,
  r.designation,
  r.registration_fee,
  p.upload_path,
  p.transaction_id,
  p.payer_name,
  to_char(p.registration_date, 'DD Mon YYYY') AS registration_date,
  to_char(p.registration_date, 'YYYY-MM-DD HH24:MI:SS') AS submitted_at,
  r.status,
  CASE WHEN ${staleSending} THEN 'failed' ELSE r.pass_email_status END AS pass_email_status,
  to_char(r.pass_email_sent_at, 'DD Mon YYYY HH24:MI') AS pass_email_sent_at,
  CASE WHEN ${staleSending}
    THEN 'The previous send did not finish and may not have been delivered. Use Send pass to retry.'
    ELSE r.pass_email_error
  END AS pass_email_error
`;

export const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function toPayment(row: PaymentRow): Payment {
  const fee = Number(row.registration_fee);
  return {
    id: row.id,
    registrationId: row.registration_id,
    registrationCode: formatRegistrationId(row.registration_code),
    fullName: row.full_name,
    email: row.email_address,
    mobile: row.mobile_number,
    detail: `${row.organisation_institution} · ${row.designation}`,
    transactionId: row.transaction_id,
    payerName: row.payer_name ?? "",
    amount: `₹ ${fee.toLocaleString("en-IN")}`,
    amountValue: fee,
    date: row.registration_date,
    submittedAt: row.submitted_at,
    status: labelByStatus[row.status] ?? "Pending",
    statusCode: row.status,
    uploadPath: row.upload_path,
    emailStatus: row.pass_email_status,
    emailSentAt: row.pass_email_sent_at ?? "",
    emailError: row.pass_email_error ?? "",
  };
}

export async function selectPayment(paymentId: string) {
  const result = await pool.query<PaymentRow>(
    `SELECT ${selectList}
     FROM registration_payment p
     JOIN registration r ON r.id = p.registration_id
     WHERE p.id = $1`,
    [paymentId],
  );
  return result.rows[0] ?? null;
}
