import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { requireAdmin } from "@/app/lib/admin-auth";

const statusLabel: Record<number, string> = {
  0: "Rejected",
  1: "Draft",
  2: "Pending",
  3: "Approved",
};

type RegistrationRow = {
  full_name: string;
  email_address: string;
  mobile_number: string;
  country: string;
  city: string;
  participant_category: string;
  organisation_institution: string;
  designation: string;
  profession_specialisation: string;
  department_functional_area: string;
  areas_of_interest: string[];
  explore_conclave: string[];
  on_campus_accommodation: boolean;
  registration_fee: string;
  declarations: string[];
  preferred_communication_channel: string;
  hear_about: string[];
  status: number;
  created_at: string;
  upload_path: string | null;
  transaction_id: string | null;
  registration_date: string | null;
};

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const auth = await requireAdmin(request);
  if ("response" in auth) return auth.response;

  const { id } = await context.params;

  try {
    const result = await pool.query<RegistrationRow>(
      `SELECT
         r.full_name,
         r.email_address,
         r.mobile_number,
         r.country,
         r.city,
         c.name AS participant_category,
         r.organisation_institution,
         r.designation,
         r.profession_specialisation,
         r.department_functional_area,
         COALESCE((
           SELECT json_agg(a.name ORDER BY a.id)
           FROM area_of_interest a
           WHERE a.id = ANY (string_to_array(r.area_of_interest, ',')::int[])
         ), '[]'::json) AS areas_of_interest,
         COALESCE((
           SELECT json_agg(e.name ORDER BY e.id)
           FROM explore_option e
           WHERE e.id = ANY (string_to_array(r.explore_conclave, ',')::int[])
         ), '[]'::json) AS explore_conclave,
         r.on_campus_accommodation,
         r.registration_fee,
         COALESCE((
           SELECT json_agg(d.name ORDER BY d.id)
           FROM declaration d
           WHERE d.id = ANY (string_to_array(r.declaration, ',')::int[])
         ), '[]'::json) AS declarations,
         r.preferred_communication_channel,
         COALESCE((
           SELECT json_agg(h.name ORDER BY h.id)
           FROM hear_about h
           WHERE h.id = ANY (string_to_array(r.hear_about_conclave, ',')::int[])
         ), '[]'::json) AS hear_about,
         r.status,
         to_char(r.created_at, 'DD Mon YYYY HH24:MI:SS') AS created_at,
         p.upload_path,
         p.transaction_id,
         to_char(p.registration_date, 'DD Mon YYYY HH24:MI:SS') AS registration_date
       FROM registration r
       JOIN category c ON c.id = r.participant_category
       LEFT JOIN registration_payment p ON p.registration_id = r.id
       WHERE r.id = $1`,
      [id],
    );

    const row = result.rows[0];
    if (!row) {
      return NextResponse.json({ message: "Registration not found." }, { status: 404 });
    }

    const fee = Number(row.registration_fee);
    return NextResponse.json({
      fullName: row.full_name,
      emailAddress: row.email_address,
      mobileNumber: row.mobile_number,
      country: row.country,
      city: row.city,
      participantCategory: row.participant_category,
      organisationInstitution: row.organisation_institution,
      designation: row.designation,
      professionSpecialisation: row.profession_specialisation,
      departmentFunctionalArea: row.department_functional_area,
      areasOfInterest: row.areas_of_interest,
      exploreConclave: row.explore_conclave,
      onCampusAccommodation: row.on_campus_accommodation ? "Yes – Book my stay" : "No – I'll arrange my own",
      registrationFee: `₹ ${fee.toLocaleString("en-IN")}`,
      declarations: row.declarations,
      preferredCommunicationChannel: row.preferred_communication_channel,
      hearAbout: row.hear_about,
      status: statusLabel[row.status] ?? "Draft",
      createdAt: row.created_at,
      uploadPath: row.upload_path,
      transactionId: row.transaction_id,
      registrationDate: row.registration_date,
    });
  } catch {
    return NextResponse.json(
      { message: "Unable to load registration." },
      { status: 500 },
    );
  }
}
