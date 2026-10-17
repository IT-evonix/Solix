import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/lib/admin-auth";
import { UUID_PATTERN, selectPayment, statusByAction, toPayment } from "@/app/lib/payment-records";
import { sendDelegatePass } from "@/app/lib/send-delegate-pass";

// Resends the Delegate Pass for an approved payment.
export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const auth = await requireAdmin(request);
  if ("response" in auth) return auth.response;

  const { id } = await context.params;
  if (!UUID_PATTERN.test(id)) {
    return NextResponse.json({ message: "Payment not found." }, { status: 404 });
  }

  try {
    const row = await selectPayment(id);
    if (!row) {
      return NextResponse.json({ message: "Payment not found." }, { status: 404 });
    }
    if (row.status !== statusByAction.Approved) {
      return NextResponse.json(
        { message: "The Delegate Pass can only be emailed for approved payments." },
        { status: 409 },
      );
    }

    const outcome = await sendDelegatePass(row.registration_id, { force: true });
    const latest = (await selectPayment(id).catch(() => null)) ?? row;
    if (outcome.result === "skipped" && outcome.code !== "disabled") {
      return NextResponse.json({ payment: toPayment(latest), message: outcome.reason }, { status: 409 });
    }
    return NextResponse.json({ payment: toPayment(latest), ...outcome });
  } catch {
    return NextResponse.json({ message: "Unable to send the Delegate Pass." }, { status: 500 });
  }
}
