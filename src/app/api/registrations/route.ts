import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { formatRegistrationId } from "@/app/lib/payments";
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
  storeUpload,
  type Input,
} from "@/app/lib/registration-input";

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const MAX_PHOTO_BYTES = 2 * 1024 * 1024;
const SCREENSHOT_EXTENSIONS = ["jpg", "png", "webp", "pdf"];
const PHOTO_EXTENSIONS = ["jpg", "png"];
const DIETARY_PREFERENCES = ["Vegetarian", "Non-Vegetarian", "Jain"];

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
  payerName: 200,
  categoryOther: 150,
} as const;

type TextField = keyof typeof textLimits;

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
  payerName: ["payerName", "payer_name"],
  categoryOther: ["categoryOther", "category_other"],
};

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

function dietaryPreference(value: string) {
  return DIETARY_PREFERENCES.find((item) => item.toLowerCase() === value.trim().toLowerCase()) ?? "";
}

function textFields(input: Input) {
  const screenshot = input.file(["screenshot", "upload", "file"]);
  const extension = screenshot ? fileExtension(screenshot, SCREENSHOT_EXTENSIONS) : "";
  const attendeePhoto = input.file(["attendeePhoto", "attendee_photo", "photo"]);
  const photoExtension = attendeePhoto ? fileExtension(attendeePhoto, PHOTO_EXTENSIONS) : "";
  const dietaryInput = first(input, ["dietaryPreference", "dietary_preference", "dietary"]);
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
    payerName: textValue(input, "payerName"),
    categoryOther: textValue(input, "categoryOther"),
    dietaryPreference: dietaryPreference(dietaryInput),
    onCampusAccommodation: accommodation(
      first(input, ["onCampusAccommodation", "on_campus_accommodation", "Accommodation"]),
    ),
    preferredCommunicationChannel: communicationChannel(
      first(input, ["preferredCommunicationChannel", "preferred_communication_channel", "channel"]),
    ),
    screenshot,
    extension,
    attendeePhoto,
    photoExtension,
  };

  if (!fields.fullName || !fields.emailAddress || !fields.mobileNumber || !fields.country || !fields.city) {
    return badRequest("Enter your name, email, mobile number, country, and city.");
  }
  if (!attendeePhoto) return badRequest("Upload your attendee photo.");
  if (attendeePhoto.size > MAX_PHOTO_BYTES) return badRequest("Attendee photo must be 2 MB or smaller.");
  if (!fields.photoExtension) return badRequest("Upload a JPG or PNG attendee photo.");
  if (!EMAIL_PATTERN.test(fields.emailAddress)) {
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
  if (dietaryInput && !fields.dietaryPreference) return badRequest("Select a valid dietary preference.");
  if (!fields.payerName) return badRequest("Enter the payer name as per the UPI / bank transaction.");
  if (!fields.transactionId) return badRequest("Enter the transaction ID.");
  if (!screenshot) return badRequest("Upload the payment receipt.");
  if (screenshot.size > MAX_UPLOAD_BYTES) {
    return badRequest("Payment receipt must be 5 MB or smaller.");
  }
  if (!fields.extension) return badRequest("Upload a JPG, PNG, WEBP, or PDF payment receipt.");
  return { ...fields, onCampusAccommodation, screenshot, attendeePhoto };
}

async function choiceFields(input: Input, categoryOther: string) {
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
  const isOther = categories.find((row) => row.id === participantCategory[0])?.name === "Other";
  if (isOther && !categoryOther) return badRequest("Specify your participant category.");
  if (!areaOfInterest) return badRequest("Select at least one valid area of interest.");
  if (!exploreConclave) return badRequest("Select at least one valid conclave option.");
  if (!declaration || declaration.length !== declarations.length) {
    return badRequest("Accept all declarations to continue.");
  }
  if (!hearAboutConclave) return badRequest("Select how you heard about the conclave.");

  return {
    participantCategory: participantCategory[0],
    categoryOther: isOther ? categoryOther : "",
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
    const choices = await choiceFields(input, texts.categoryOther);
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
  categoryOther: string;
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
  dietaryPreference: string;
  payerName: string;
  transactionId: string;
  screenshot: File;
  extension: string;
  attendeePhoto: File;
  photoExtension: string;
};

async function saveRegistration(data: RegistrationInsert) {
  const client = await pool.connect();
  const storedFiles: string[] = [];

  try {
    await client.query("BEGIN");
    const inserted = await client.query<{ id: string; registration_code: string }>(
      `INSERT INTO registration (
         full_name, email_address, mobile_number, country, city, participant_category,
         organisation_institution, designation, profession_specialisation,
         department_functional_area, area_of_interest, explore_conclave,
         on_campus_accommodation, declaration, preferred_communication_channel,
         hear_about_conclave, category_other, dietary_preference, registration_fee, status
       ) VALUES (
         $1, $2, $3, $4, $5, $6,
         $7, $8, $9,
         $10, $11, $12,
         $13, $14, $15,
         $16, $17, $18, 1500, 1
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
        data.categoryOther || null,
        data.dietaryPreference || null,
      ],
    );

    const row = inserted.rows[0];
    const filename = `${row.id}.${data.extension}`;
    storedFiles.push(await storeUpload(data.screenshot, filename));
    const photoFilename = `${row.id}-photo.${data.photoExtension}`;
    storedFiles.push(await storeUpload(data.attendeePhoto, photoFilename));

    await client.query(
      `UPDATE registration SET attendee_photo_path = $2 WHERE id = $1`,
      [row.id, `/api/uploads/${photoFilename}`],
    );
    await client.query(
      `INSERT INTO registration_payment (registration_id, upload_path, transaction_id, payer_name)
       VALUES ($1, $2, $3, $4)`,
      [row.id, `/api/uploads/${filename}`, data.transactionId, data.payerName],
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
    await removeUploads(storedFiles);
    const code = typeof error === "object" && error && "code" in error ? String(error.code) : "";
    if (code === "23503" || code === "23514") {
      return badRequest("Registration details do not match the allowed options.");
    }
    return NextResponse.json({ message: "Unable to save registration." }, { status: 500 });
  } finally {
    client.release();
  }
}
