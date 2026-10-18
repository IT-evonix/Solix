import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { requireAdmin } from "@/app/lib/admin-auth";
import { formatHackathonId, type HackathonStatus, type PassEmailStatus } from "@/app/lib/payments";
import { STALE_CLAIM_SQL } from "@/app/lib/hackathon-confirmation-core";

const statusLabel: Record<number, HackathonStatus> = {
  0: "Rejected",
  1: "Submitted",
  2: "Under review",
  3: "Shortlisted",
};

type HackathonRow = {
  registration_code: string;
  full_name: string;
  date_of_birth: string;
  gender: string;
  email_address: string;
  mobile_number: string;
  city_district: string;
  state_ut: string;
  institution_name: string;
  course_programme: string;
  specialisation: string;
  year_of_study: string;
  discipline: string;
  discipline_other: string | null;
  institution_id_path: string;
  solution_path: string;
  commitments: string[];
  consents: string[];
  status: number;
  created_at: string;
  confirmation_email_status: PassEmailStatus | null;
  confirmation_email_sent_at: string | null;
  confirmation_email_error: string | null;
};

// A send that never finished (crashed request) is shown as failed so the admin can retry it.
const staleSending = `h.confirmation_email_status = 'sending' AND h.confirmation_email_claimed_at < LOCALTIMESTAMP - ${STALE_CLAIM_SQL}`;

export async function GET(
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
    const result = await pool.query<HackathonRow>(
      `SELECT
         h.registration_code,
         h.full_name,
         to_char(h.date_of_birth, 'DD Mon YYYY') AS date_of_birth,
         h.gender,
         h.email_address,
         h.mobile_number,
         h.city_district,
         h.state_ut,
         h.institution_name,
         h.course_programme,
         h.specialisation,
         h.year_of_study,
         d.name AS discipline,
         h.discipline_other,
         h.institution_id_path,
         h.solution_path,
         COALESCE((
           SELECT json_agg(x.name ORDER BY x.id)
           FROM hackathon_declaration x
           WHERE x.kind = 'commitment' AND x.id = ANY (string_to_array(h.declaration, ',')::int[])
         ), '[]'::json) AS commitments,
         COALESCE((
           SELECT json_agg(x.name ORDER BY x.id)
           FROM hackathon_declaration x
           WHERE x.kind = 'consent' AND x.id = ANY (string_to_array(h.declaration, ',')::int[])
         ), '[]'::json) AS consents,
         h.status,
         to_char(h.created_at, 'DD Mon YYYY HH24:MI:SS') AS created_at,
         CASE WHEN ${staleSending} THEN 'failed' ELSE h.confirmation_email_status END AS confirmation_email_status,
         to_char(h.confirmation_email_sent_at, 'DD Mon YYYY HH24:MI') AS confirmation_email_sent_at,
         CASE WHEN ${staleSending}
           THEN 'The previous send did not finish and may not have been delivered.'
           ELSE h.confirmation_email_error
         END AS confirmation_email_error
       FROM hackathon_registration h
       JOIN hackathon_discipline d ON d.id = h.discipline
       WHERE h.id = $1`,
      [id],
    );

    const row = result.rows[0];
    if (!row) {
      return NextResponse.json({ message: "Registration not found." }, { status: 404 });
    }

    return NextResponse.json({
      registrationCode: formatHackathonId(row.registration_code),
      fullName: row.full_name,
      dateOfBirth: row.date_of_birth,
      gender: row.gender,
      emailAddress: row.email_address,
      mobileNumber: row.mobile_number,
      cityDistrict: row.city_district,
      stateUt: row.state_ut,
      institutionName: row.institution_name,
      courseProgramme: row.course_programme,
      specialisation: row.specialisation,
      yearOfStudy: row.year_of_study,
      discipline: row.discipline_other ? `${row.discipline} — ${row.discipline_other}` : row.discipline,
      institutionIdPath: row.institution_id_path,
      solutionPath: row.solution_path,
      commitments: row.commitments,
      consents: row.consents,
      status: statusLabel[row.status] ?? "Submitted",
      createdAt: row.created_at,
      emailStatus: row.confirmation_email_status,
      emailSentAt: row.confirmation_email_sent_at ?? "",
      emailError: row.confirmation_email_error ?? "",
    });
  } catch {
    return NextResponse.json(
      { message: "Unable to load registration." },
      { status: 500 },
    );
  }
}
