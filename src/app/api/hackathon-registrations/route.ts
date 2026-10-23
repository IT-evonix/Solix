import { NextResponse, after } from "next/server";
import { pool } from "@/lib/db";
import { requireAdmin } from "@/app/lib/admin-auth";
import { isSingleAddress } from "@/app/lib/mime";
import { clientIp, rateLimitConsume, tooManyRequests } from "@/lib/rate-limit";
import { sendHackathonConfirmation } from "@/app/lib/send-hackathon-confirmation";
import { listSelect, toListItem, type ListRow } from "@/app/lib/hackathon-records";
import {
  formatHackathonId,
  hackathonStatusCodes,
  type HackathonStatus,
} from "@/app/lib/payments";
import {
  EMAIL_PATTERN,
  badRequest,
  collect,
  fileExtension,
  first,
  lookupRows,
  readInput,
  removeUploads,
  resolveIds,
  rejectBadUploads,
  storeUpload,
  tooLarge,
  formLimit,
  TOO_LARGE,
  type Input,
} from "@/app/lib/registration-input";
import {
  GENDERS,
  INSTITUTION_ID_EXTENSIONS,
  MAX_UPLOAD_BYTES,
  MIN_AGE,
  SOLUTION_EXTENSIONS,
  STATES_AND_UTS,
  YEARS_OF_STUDY,
  ageOn,
} from "@/data/hackathonOptions";

const MOBILE_PATTERN = /^[6-9]\d{9}$/;

const textLimits = {
  fullName: 200,
  dateOfBirth: 10,
  gender: 30,
  emailAddress: 255,
  mobileNumber: 30,
  cityDistrict: 100,
  stateUt: 100,
  institutionName: 255,
  courseProgramme: 255,
  specialisation: 255,
  yearOfStudy: 50,
  disciplineOther: 150,
} as const;

type TextField = keyof typeof textLimits;

const textAliases: Record<TextField, string[]> = {
  fullName: ["fullName", "full_name"],
  dateOfBirth: ["dateOfBirth", "date_of_birth", "dob"],
  gender: ["gender"],
  emailAddress: ["emailAddress", "email_address", "email"],
  mobileNumber: ["mobileNumber", "mobile_number", "mobile"],
  cityDistrict: ["cityDistrict", "city_district", "city"],
  stateUt: ["stateUt", "state_ut", "state"],
  institutionName: ["institutionName", "institution_name", "institution"],
  courseProgramme: ["courseProgramme", "course_programme", "course"],
  specialisation: ["specialisation", "branch"],
  yearOfStudy: ["yearOfStudy", "year_of_study"],
  disciplineOther: ["disciplineOther", "discipline_other"],
};

function textValue(input: Input, field: TextField) {
  return first(input, textAliases[field]).slice(0, textLimits[field]);
}

function oneOf(list: string[], value: string) {
  return list.find((item) => item.toLowerCase() === value.trim().toLowerCase()) ?? "";
}

function textFields(input: Input) {
  const institutionId = input.file(["institutionId", "institution_id", "collegeId"]);
  const solution = input.file(["solution", "solutionFile", "solution_file"]);
  const fields = {
    fullName: textValue(input, "fullName"),
    dateOfBirth: textValue(input, "dateOfBirth"),
    gender: oneOf(GENDERS, textValue(input, "gender")),
    emailAddress: textValue(input, "emailAddress"),
    mobileNumber: textValue(input, "mobileNumber"),
    cityDistrict: textValue(input, "cityDistrict"),
    stateUt: oneOf(STATES_AND_UTS, textValue(input, "stateUt")),
    institutionName: textValue(input, "institutionName"),
    courseProgramme: textValue(input, "courseProgramme"),
    specialisation: textValue(input, "specialisation"),
    yearOfStudy: oneOf(YEARS_OF_STUDY, textValue(input, "yearOfStudy")),
    disciplineOther: textValue(input, "disciplineOther"),
    institutionId,
    institutionIdExtension: institutionId ? fileExtension(institutionId, INSTITUTION_ID_EXTENSIONS) : "",
    solution,
    solutionExtension: solution ? fileExtension(solution, SOLUTION_EXTENSIONS) : "",
  };

  if (!fields.fullName) return badRequest("Enter your full name as per your official ID.");
  const age = ageOn(fields.dateOfBirth);
  if (age === null) return badRequest("Enter a valid date of birth.");
  if (age < MIN_AGE) return badRequest(`You must be at least ${MIN_AGE} years old to register.`);
  if (age > 100) return badRequest("Enter a valid date of birth.");
  if (!fields.gender) return badRequest("Select your gender.");
  // isSingleAddress also guarantees the confirmation email can be sent to this address.
  if (!EMAIL_PATTERN.test(fields.emailAddress) || !isSingleAddress(fields.emailAddress)) {
    return badRequest("Enter a valid email address.");
  }
  if (!MOBILE_PATTERN.test(fields.mobileNumber)) return badRequest("Enter a valid 10-digit mobile number.");
  if (!fields.cityDistrict) return badRequest("Enter your city / district.");
  if (!fields.stateUt) return badRequest("Select a valid state / union territory.");
  if (!fields.institutionName || !fields.courseProgramme || !fields.specialisation) {
    return badRequest("Enter your institution, course, and specialisation.");
  }
  if (!fields.yearOfStudy) return badRequest("Select your current year of study.");
  if (institutionId) {
    if (institutionId.size > MAX_UPLOAD_BYTES) return badRequest("College ID must be 5 MB or smaller.");
    if (!fields.institutionIdExtension) return badRequest("Upload the college ID as JPG, PNG, or PDF.");
  }
  if (!solution) return badRequest("Upload your solution to the Round 1 problem statement.");
  if (solution.size > MAX_UPLOAD_BYTES) return badRequest("Solution file must be 5 MB or smaller.");
  if (!fields.solutionExtension) return badRequest("Upload the solution as PDF, PPT, PPTX, DOC, DOCX, or ZIP.");
  return { ...fields, institutionId, solution };
}

async function choiceFields(input: Input, disciplineOther: string) {
  const [disciplines, declarations] = await Promise.all([
    lookupRows("hackathon_discipline"),
    pool.query<{ id: number; name: string }>(`SELECT id, name FROM hackathon_declaration WHERE status = 1 ORDER BY id`),
  ]);
  const discipline = resolveIds(disciplines, collect(input, ["discipline", "primaryDiscipline"]));
  if (!discipline || discipline.length !== 1) return badRequest("Select your primary discipline.");
  const isOther = disciplines.find((row) => row.id === discipline[0])?.name === "Others";
  if (isOther && !disciplineOther) return badRequest("Specify your discipline.");

  const declaration = resolveIds(declarations.rows, collect(input, ["declaration", "declarations"]));
  if (!declaration || declaration.length !== declarations.rows.length) {
    return badRequest("Accept all confirmations to continue.");
  }
  return {
    discipline: discipline[0],
    disciplineOther: isOther ? disciplineOther : "",
    declaration: declaration.join(","),
  };
}

export async function POST(request: Request) {
  const limited = rateLimitConsume(`hackathon:${clientIp(request)}`, 10, 60 * 60 * 1000);
  if (!limited.ok) return tooManyRequests(limited);

  const input = await readInput(request, formLimit(MAX_UPLOAD_BYTES, MAX_UPLOAD_BYTES));
  if (input === TOO_LARGE) return tooLarge();
  if (!input) return badRequest("Invalid registration submission.");

  const texts = textFields(input);
  if (texts instanceof NextResponse) return texts;
  const badUpload = await rejectBadUploads([
    { file: texts.institutionId, extension: texts.institutionIdExtension, label: "The college ID" },
    { file: texts.solution, extension: texts.solutionExtension, label: "The solution file" },
  ]);
  if (badUpload) return badUpload;

  try {
    const choices = await choiceFields(input, texts.disciplineOther);
    if (choices instanceof NextResponse) return choices;
    return await saveRegistration({ ...texts, ...choices });
  } catch {
    return NextResponse.json({ message: "Unable to save registration." }, { status: 500 });
  }
}

type HackathonInsert = {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  emailAddress: string;
  mobileNumber: string;
  cityDistrict: string;
  stateUt: string;
  institutionName: string;
  courseProgramme: string;
  specialisation: string;
  yearOfStudy: string;
  discipline: number;
  disciplineOther: string;
  declaration: string;
  institutionId: File | null;
  institutionIdExtension: string;
  solution: File;
  solutionExtension: string;
};

function duplicateEmail() {
  return NextResponse.json(
    { message: "This email is already registered for the Hackathon." },
    { status: 409 },
  );
}

async function saveRegistration(data: HackathonInsert) {
  const existing = await pool.query(
    `SELECT 1 FROM hackathon_registration WHERE lower(email_address) = lower($1)`,
    [data.emailAddress],
  );
  if (existing.rowCount) return duplicateEmail();

  const client = await pool.connect();
  const storedFiles: string[] = [];

  try {
    await client.query("BEGIN");
    const inserted = await client.query<{ id: string; registration_code: string }>(
      `INSERT INTO hackathon_registration (
         full_name, date_of_birth, gender, email_address, mobile_number,
         city_district, state_ut, institution_name, course_programme,
         specialisation, year_of_study, discipline, discipline_other,
         institution_id_path, solution_path, declaration, status
       ) VALUES (
         $1, $2, $3, $4, $5,
         $6, $7, $8, $9,
         $10, $11, $12, $13,
         '', '', $14, 1
       )
       RETURNING id, registration_code`,
      [
        data.fullName,
        data.dateOfBirth,
        data.gender,
        data.emailAddress,
        data.mobileNumber,
        data.cityDistrict,
        data.stateUt,
        data.institutionName,
        data.courseProgramme,
        data.specialisation,
        data.yearOfStudy,
        data.discipline,
        data.disciplineOther || null,
        data.declaration,
      ],
    );

    const row = inserted.rows[0];
    let institutionIdPath = "NA";
    if (data.institutionId) {
      const idFilename = `hk-${row.id}-id.${data.institutionIdExtension}`;
      storedFiles.push(await storeUpload(data.institutionId, idFilename));
      institutionIdPath = `/api/uploads/${idFilename}`;
    }
    const solutionFilename = `hk-${row.id}-solution.${data.solutionExtension}`;
    storedFiles.push(await storeUpload(data.solution, solutionFilename));

    await client.query(
      `UPDATE hackathon_registration SET institution_id_path = $2, solution_path = $3 WHERE id = $1`,
      [row.id, institutionIdPath, `/api/uploads/${solutionFilename}`],
    );
    await client.query("COMMIT");

    // Sent after the response so a slow or failing Gmail call never delays or fails the registration.
    // Failures are recorded on the row and can be resent from the admin panel.
    after(() =>
      sendHackathonConfirmation(row.id).catch((error) =>
        console.error(`Hackathon confirmation email crashed for registration ${row.id}:`, error),
      ),
    );

    return NextResponse.json(
      {
        id: row.id,
        registrationCode: formatHackathonId(row.registration_code),
        message: "Registration saved.",
      },
      { status: 201 },
    );
  } catch (error) {
    await client.query("ROLLBACK").catch(() => undefined);
    await removeUploads(storedFiles);
    const code = typeof error === "object" && error && "code" in error ? String(error.code) : "";
    if (code === "23505") return duplicateEmail();
    if (code === "23503" || code === "23514") {
      return badRequest("Registration details do not match the allowed options.");
    }
    return NextResponse.json({ message: "Unable to save registration." }, { status: 500 });
  } finally {
    client.release();
  }
}

export async function GET(request: Request) {
  const auth = await requireAdmin(request);
  if ("response" in auth) return auth.response;

  try {
    const result = await pool.query<ListRow>(
      `SELECT ${listSelect}
       FROM hackathon_registration h
       JOIN hackathon_discipline d ON d.id = h.discipline
       ORDER BY h.created_at DESC`,
    );
    return NextResponse.json(result.rows.map(toListItem));
  } catch {
    return NextResponse.json({ message: "Unable to load hackathon registrations." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const auth = await requireAdmin(request);
  if ("response" in auth) return auth.response;

  const body = (await request.json().catch(() => ({}))) as { id?: unknown; status?: unknown };
  const id = String(body.id ?? "");
  const action = String(body.status ?? "") as HackathonStatus;
  const statusCode = hackathonStatusCodes[action];

  if (!/^[0-9a-f-]{36}$/i.test(id) || statusCode === undefined) {
    return NextResponse.json({ message: "Invalid status update." }, { status: 400 });
  }

  try {
    const result = await pool.query<ListRow>(
      `UPDATE hackathon_registration h
       SET status = $1
       FROM hackathon_discipline d
       WHERE d.id = h.discipline AND h.id = $2
       RETURNING ${listSelect}`,
      [statusCode, id],
    );
    if (!result.rows[0]) {
      return NextResponse.json({ message: "Registration not found." }, { status: 404 });
    }
    return NextResponse.json(toListItem(result.rows[0]));
  } catch {
    return NextResponse.json({ message: "Unable to update registration." }, { status: 500 });
  }
}
