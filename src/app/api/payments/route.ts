import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { formatRegistrationId, type Payment, type PaymentStatus } from "@/app/lib/payments";

// registration.status: 1 draft (added by applicant), 2 pending, 3 approved, 0 rejected
const statusByAction = { Pending: 2, Approved: 3, Rejected: 0 } as const;
const labelByStatus: Record<number, PaymentStatus> = {
  0: "Rejected",
  1: "Draft",
  2: "Pending",
  3: "Approved",
};

type PaymentRow = {
  id: string;
  registration_id: string;
  registration_code: string;
  full_name: string;
  organisation_institution: string;
  designation: string;
  registration_fee: string;
  upload_path: string;
  transaction_id: string;
  registration_date: string;
  status: number;
};

const selectList = `
  p.id,
  r.id AS registration_id,
  r.registration_code,
  r.full_name,
  r.organisation_institution,
  r.designation,
  r.registration_fee,
  p.upload_path,
  p.transaction_id,
  to_char(p.registration_date, 'DD Mon YYYY') AS registration_date,
  r.status
`;

function toPayment(row: PaymentRow): Payment {
  const fee = Number(row.registration_fee);
  return {
    id: row.id,
    registrationId: row.registration_id,
    registrationCode: formatRegistrationId(row.registration_code),
    fullName: row.full_name,
    detail: `${row.organisation_institution} · ${row.designation}`,
    transactionId: row.transaction_id,
    amount: `₹ ${fee.toLocaleString("en-IN")}`,
    date: row.registration_date,
    status: labelByStatus[row.status] ?? "Draft",
    statusCode: row.status,
    uploadPath: row.upload_path,
  };
}

export async function GET() {
  try {
    const result = await pool.query<PaymentRow>(
      `SELECT ${selectList}
       FROM registration_payment p
       JOIN registration r ON r.id = p.registration_id
       WHERE p.status = 1
       ORDER BY p.registration_date DESC`,
    );
    return NextResponse.json(result.rows.map(toPayment));
  } catch {
    return NextResponse.json(
      { message: "Unable to load payments." },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const id = String(body.id ?? "");
  const action = String(body.status ?? "") as keyof typeof statusByAction;
  const statusCode = statusByAction[action];

  if (!id || statusCode === undefined) {
    return NextResponse.json({ message: "Invalid payment update." }, { status: 400 });
  }

  try {
    const result = await pool.query<PaymentRow>(
      `UPDATE registration r
       SET status = $1
       FROM registration_payment p
       WHERE r.id = p.registration_id AND p.id = $2
       RETURNING ${selectList}`,
      [statusCode, id],
    );
    if (!result.rows[0]) {
      return NextResponse.json({ message: "Payment not found." }, { status: 404 });
    }
    return NextResponse.json(toPayment(result.rows[0]));
  } catch {
    return NextResponse.json(
      { message: "Unable to update payment." },
      { status: 500 },
    );
  }
}
