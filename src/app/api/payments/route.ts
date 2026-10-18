import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { requireAdmin } from "@/app/lib/admin-auth";
import {
  UUID_PATTERN,
  selectList,
  selectPayment,
  statusByAction,
  toPayment,
  type PaymentRow,
} from "@/app/lib/payment-records";
import { sendDelegatePass } from "@/app/lib/send-delegate-pass";

export async function GET(request: Request) {
  const auth = await requireAdmin(request);
  if ("response" in auth) return auth.response;

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
  const auth = await requireAdmin(request);
  if ("response" in auth) return auth.response;

  const body = (await request.json().catch(() => ({}))) as { id?: unknown; status?: unknown };
  const id = String(body.id ?? "");
  const action = String(body.status ?? "") as keyof typeof statusByAction;
  const statusCode = statusByAction[action];

  if (!UUID_PATTERN.test(id) || statusCode === undefined) {
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
    const row = result.rows[0];
    if (!row) {
      return NextResponse.json({ message: "Payment not found." }, { status: 404 });
    }
    if (action !== "Approved") return NextResponse.json(toPayment(row));

    // The approval is already saved; an email problem is shown on the row, never returned as an error.
    await sendDelegatePass(row.registration_id).catch((error) =>
      console.error(`Delegate pass email could not start for ${row.registration_id}:`, error),
    );
    const latest = await selectPayment(id).catch(() => null);
    return NextResponse.json(toPayment(latest ?? row));
  } catch {
    return NextResponse.json(
      { message: "Unable to update payment." },
      { status: 500 },
    );
  }
}
