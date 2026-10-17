import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/lib/admin-auth";
import { selectHackathonRegistration, toListItem } from "@/app/lib/hackathon-records";
import { sendHackathonConfirmation } from "@/app/lib/send-hackathon-confirmation";

// Sends (or resends) the Round 1 confirmation email for a hackathon registration.
export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const auth = await requireAdmin(request);
  if ("response" in auth) return auth.response;

  const { id } = await context.params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) {
    return NextResponse.json({ message: "Registration not found." }, { status: 404 });
  }

  try {
    const row = await selectHackathonRegistration(id);
    if (!row) {
      return NextResponse.json({ message: "Registration not found." }, { status: 404 });
    }

    const outcome = await sendHackathonConfirmation(id, { force: true });
    const latest = (await selectHackathonRegistration(id).catch(() => null)) ?? row;
    if (outcome.result === "skipped" && outcome.code !== "disabled") {
      return NextResponse.json({ registration: toListItem(latest), message: outcome.reason }, { status: 409 });
    }
    return NextResponse.json({ registration: toListItem(latest), ...outcome });
  } catch {
    return NextResponse.json({ message: "Unable to send the confirmation email." }, { status: 500 });
  }
}
