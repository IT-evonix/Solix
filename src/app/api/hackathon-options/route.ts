import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { lookupRows } from "@/app/lib/registration-input";

export async function GET() {
  try {
    const [disciplines, declarations] = await Promise.all([
      lookupRows("hackathon_discipline"),
      pool.query<{ id: number; name: string; kind: string }>(
        `SELECT id, name, kind FROM hackathon_declaration WHERE status = 1 ORDER BY id`,
      ),
    ]);
    return NextResponse.json({
      disciplines,
      commitments: declarations.rows.filter((row) => row.kind === "commitment").map(({ id, name }) => ({ id, name })),
      consents: declarations.rows.filter((row) => row.kind === "consent").map(({ id, name }) => ({ id, name })),
    });
  } catch {
    return NextResponse.json(
      { message: "Unable to load registration options." },
      { status: 500 },
    );
  }
}
