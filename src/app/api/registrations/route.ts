import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { formatRegistrationId } from "@/app/lib/payments";

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

const imageExtensions: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

const textLimits = {
  fullName: 200,
  emailAddress: 255,
  mobileNumber: 30,
  country: 100,
  city: 100,
  organisationInstitution: 255,
  designation: 255,
  professionSpecialisation: 255,
  departmentFunctionalArea: 255,
  transactionId: 100,
} as const;

type TextField = keyof typeof textLimits;
type LookupTable =
  | "category"
  | "area_of_interest"
  | "explore_option"
  | "declaration"
  | "hear_about";

type LookupRow = { id: number; name: string };

type Input = {
  get(name: string): string;
  getAll(name: string): string[];
  file(): File | null;
};

const textAliases: Record<TextField, string[]> = {
  fullName: ["fullName", "full_name"],
  emailAddress: ["emailAddress", "email_address", "email"],
  mobileNumber: ["mobileNumber", "mobile_number", "mobile"],
  country: ["country"],
  city: ["city"],
  organisationInstitution: ["organisationInstitution", "organisation_institution", "organisation"],
  designation: ["designation"],
  professionSpecialisation: ["professionSpecialisation", "profession_specialisation", "profession"],
  departmentFunctionalArea: ["departmentFunctionalArea", "department_functional_area", "department"],
  transactionId: ["transactionId", "transaction_id"],
};

function fromForm(form: FormData): Input {
  return {
    get(name) {
      const value = form.get(name);
      return value instanceof File ? "" : String(value ?? "").trim();
    },
    getAll(name) {
      return form
        .getAll(name)
        .flatMap((value) =>
          value instanceof File ? [] : String(value).split(",").map((part) => part.trim()),
        )
        .filter(Boolean);
    },
    file() {
      for (const name of ["screenshot", "upload", "file"]) {
        const value = form.get(name);
        if (value instanceof File && value.size > 0) return value;
      }
      return null;
    },
  };
}

function fromJson(body: Record<string, unknown>): Input {
  return {
    get(name) {
      const value = body[name];
      if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean).join(",");
      return String(value ?? "").trim();
    },
    getAll(name) {
      const value = body[name];
      if (Array.isArray(value)) {
        return value.map((item) => String(item).trim()).filter(Boolean);
      }
      return String(value ?? "")
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean);
    },
    file() {
      return null;
    },
  };
}

async function readInput(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  try {
    if (contentType.includes("application/json")) {
      return fromJson((await request.json()) as Record<string, unknown>);
    }
    return fromForm(await request.formData());
  } catch {
    return null;
  }
}

function first(input: Input, names: string[]) {
  for (const name of names) {
    const value = input.get(name);
    if (value) return value;
  }
  return "";
}

function collect(input: Input, names: string[]) {
  return names.flatMap((name) => input.getAll(name));
}

function textValue(input: Input, field: TextField) {
  return first(input, textAliases[field]).slice(0, textLimits[field]);
}

function accommodation(value: string) {
  const normalized = value.trim().toLowerCase();
  if (["true", "1", "yes"].includes(normalized) || normalized.startsWith("yes")) return true;
  if (["false", "0", "no"].includes(normalized) || normalized.startsWith("no")) return false;
  return null;
}

function communicationChannel(value: string) {
  const normalized = value.trim().toLowerCase();
  if (normalized === "email") return "Email";
  if (normalized === "whatsapp") return "WhatsApp";
  return "";
}

function imageExtension(file: File) {
  const fromType = imageExtensions[file.type];
  if (fromType) return fromType;
  const match = file.name.toLowerCase().match(/\.([a-z0-9]+)$/);
  const extension = match?.[1] === "jpeg" ? "jpg" : match?.[1];
  if (extension && ["jpg", "png", "webp", "gif"].includes(extension)) return extension;
  return "";
}

async function lookupRows(table: LookupTable) {
  const result = await pool.query<LookupRow>(
    `SELECT id, name FROM ${table} WHERE status = 1 ORDER BY id`,
  );
  return result.rows;
}

function resolveIds(rows: LookupRow[], tokens: string[]) {
  const ids: number[] = [];
  for (const token of tokens) {
    const numeric = Number(token);
    const match = Number.isInteger(numeric)
      ? rows.find((row) => row.id === numeric)
      : rows.find((row) => row.name.toLowerCase() === token.toLowerCase());
    if (!match) return null;
    if (!ids.includes(match.id)) ids.push(match.id);
  }
  return ids.length ? ids : null;
}

function badRequest(message: string) {
  return NextResponse.json({ message }, { status: 400 });
}

function textFields(input: Input) {
  const screenshot = input.file();
  const extension = screenshot ? imageExtension(screenshot) : "";
  const fields = {
    fullName: textValue(input, "fullName"),
    emailAddress: textValue(input, "emailAddress"),
    mobileNumber: textValue(input, "mobileNumber"),
    country: textValue(input, "country"),
    city: textValue(input, "city"),
    organisationInstitution: textValue(input, "organisationInstitution"),
    designation: textValue(input, "designation"),
    professionSpecialisation: textValue(input, "professionSpecialisation"),
    departmentFunctionalArea: textValue(input, "departmentFunctionalArea"),
    transactionId: textValue(input, "transactionId"),
    onCampusAccommodation: accommodation(
      first(input, ["onCampusAccommodation", "on_campus_accommodation", "Accommodation"]),
    ),
    preferredCommunicationChannel: communicationChannel(
      first(input, ["preferredCommunicationChannel", "preferred_communication_channel", "channel"]),
    ),
    screenshot,
    extension,
  };

  if (!fields.fullName || !fields.emailAddress || !fields.mobileNumber || !fields.country || !fields.city) {
    return badRequest("Enter your name, email, mobile number, country, and city.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.emailAddress)) {
    return badRequest("Enter a valid email address.");
  }
  if (
    !fields.organisationInstitution ||
    !fields.designation ||
    !fields.professionSpecialisation ||
    !fields.departmentFunctionalArea
  ) {
    return badRequest("Enter your organisation, designation, profession, and department.");
  }
  const onCampusAccommodation = fields.onCampusAccommodation;
  if (onCampusAccommodation === null) {
    return badRequest("Select whether you need on-campus accommodation.");
  }
  if (!fields.preferredCommunicationChannel) {
    return badRequest("Select Email or WhatsApp as your communication channel.");
  }
  if (!fields.transactionId) return badRequest("Enter the transaction ID.");
  if (!screenshot) return badRequest("Upload the payment screenshot.");
  if (screenshot.size > MAX_UPLOAD_BYTES) {
    return badRequest("Payment screenshot must be 5 MB or smaller.");
  }
  if (!fields.extension) return badRequest("Upload a PNG, JPG, WEBP, or GIF screenshot.");
  return { ...fields, onCampusAccommodation, screenshot };
}

async function choiceFields(input: Input) {
  const [categories, interests, exploreOptions, declarations, hearAbout] = await Promise.all([
    lookupRows("category"),
    lookupRows("area_of_interest"),
    lookupRows("explore_option"),
    lookupRows("declaration"),
    lookupRows("hear_about"),
  ]);
  const participantCategory = resolveIds(
    categories,
    collect(input, ["participantCategory", "participant_category", "Participant"]),
  );
  const areaOfInterest = resolveIds(
    interests,
    collect(input, ["areaOfInterest", "area_of_interest", "areas"]),
  );
  const exploreConclave = resolveIds(
    exploreOptions,
    collect(input, ["exploreConclave", "explore_conclave", "explore"]),
  );
  const declaration = resolveIds(
    declarations,
    collect(input, ["declaration", "declarations", "Declarations"]),
  );
  const hearAboutConclave = resolveIds(
    hearAbout,
    collect(input, ["hearAboutConclave", "hear_about_conclave", "hearAbout"]),
  );

  if (!participantCategory || participantCategory.length !== 1) {
    return badRequest("Select a valid participant category.");
  }
  if (!areaOfInterest) return badRequest("Select at least one valid area of interest.");
  if (!exploreConclave) return badRequest("Select at least one valid conclave option.");
  if (!declaration || declaration.length !== declarations.length) {
    return badRequest("Accept all declarations to continue.");
  }
  if (!hearAboutConclave) return badRequest("Select how you heard about the conclave.");

  return {
    participantCategory: participantCategory[0],
    areaOfInterest: areaOfInterest.join(","),
    exploreConclave: exploreConclave.join(","),
    declaration: declaration.join(","),
    hearAboutConclave: hearAboutConclave.join(","),
  };
}

export async function POST(request: Request) {
  const input = await readInput(request);
  if (!input) return badRequest("Invalid registration submission.");

  const texts = textFields(input);
  if (texts instanceof NextResponse) return texts;

  try {
    const choices = await choiceFields(input);
    if (choices instanceof NextResponse) return choices;
    return await saveRegistration({ ...texts, ...choices });
  } catch {
    return NextResponse.json({ message: "Unable to save registration." }, { status: 500 });
  }
}

type RegistrationInsert = {
  fullName: string;
  emailAddress: string;
  mobileNumber: string;
  country: string;
  city: string;
  participantCategory: number;
  organisationInstitution: string;
  designation: string;
  professionSpecialisation: string;
  departmentFunctionalArea: string;
  areaOfInterest: string;
  exploreConclave: string;
  onCampusAccommodation: boolean;
  declaration: string;
  preferredCommunicationChannel: string;
  hearAboutConclave: string;
  transactionId: string;
  screenshot: File;
  extension: string;
};

async function saveRegistration(data: RegistrationInsert) {
  const client = await pool.connect();
  let storedFile = "";

  try {
    await client.query("BEGIN");
    const inserted = await client.query<{ id: string; registration_code: string }>(
      `INSERT INTO registration (
         full_name, email_address, mobile_number, country, city, participant_category,
         organisation_institution, designation, profession_specialisation,
         department_functional_area, area_of_interest, explore_conclave,
         on_campus_accommodation, declaration, preferred_communication_channel,
         hear_about_conclave, registration_fee, status
       ) VALUES (
         $1, $2, $3, $4, $5, $6,
         $7, $8, $9,
         $10, $11, $12,
         $13, $14, $15,
         $16, 1500, 1
       )
       RETURNING id, registration_code`,
      [
        data.fullName,
        data.emailAddress,
        data.mobileNumber,
        data.country,
        data.city,
        data.participantCategory,
        data.organisationInstitution,
        data.designation,
        data.professionSpecialisation,
        data.departmentFunctionalArea,
        data.areaOfInterest,
        data.exploreConclave,
        data.onCampusAccommodation,
        data.declaration,
        data.preferredCommunicationChannel,
        data.hearAboutConclave,
      ],
    );

    const row = inserted.rows[0];
    const filename = `${row.id}.${data.extension}`;
    const directory = path.join(process.cwd(), "public", "uploads");
    storedFile = path.join(directory, filename);
    await mkdir(directory, { recursive: true });
    await writeFile(storedFile, Buffer.from(await data.screenshot.arrayBuffer()));

    await client.query(
      `INSERT INTO registration_payment (registration_id, upload_path, transaction_id)
       VALUES ($1, $2, $3)`,
      [row.id, `/uploads/${filename}`, data.transactionId],
    );
    await client.query("COMMIT");

    return NextResponse.json(
      {
        id: row.id,
        registrationCode: formatRegistrationId(row.registration_code),
        message: "Registration saved.",
      },
      { status: 201 },
    );
  } catch (error) {
    await client.query("ROLLBACK").catch(() => undefined);
    if (storedFile) await unlink(storedFile).catch(() => undefined);
    const code = typeof error === "object" && error && "code" in error ? String(error.code) : "";
    if (code === "23503" || code === "23514") {
      return badRequest("Registration details do not match the allowed options.");
    }
    return NextResponse.json({ message: "Unable to save registration." }, { status: 500 });
  } finally {
    client.release();
  }
}
