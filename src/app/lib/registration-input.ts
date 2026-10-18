import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export type LookupTable =
  | "category"
  | "area_of_interest"
  | "explore_option"
  | "declaration"
  | "hear_about"
  | "hackathon_discipline";

export type LookupRow = { id: number; name: string };

export type Input = {
  get(name: string): string;
  getAll(name: string): string[];
  file(names: string[]): File | null;
};

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
    file(names) {
      for (const name of names) {
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

export async function readInput(request: Request) {
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

export function first(input: Input, names: string[]) {
  for (const name of names) {
    const value = input.get(name);
    if (value) return value;
  }
  return "";
}

export function collect(input: Input, names: string[]) {
  return names.flatMap((name) => input.getAll(name));
}

const lookupOrder: Partial<Record<LookupTable, string>> = {
  category: "sort_order, id",
};

export async function lookupRows(table: LookupTable) {
  const result = await pool.query<LookupRow>(
    `SELECT id, name FROM ${table} WHERE status = 1 ORDER BY ${lookupOrder[table] ?? "id"}`,
  );
  return result.rows;
}

export function resolveIds(rows: LookupRow[], tokens: string[]) {
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

export function badRequest(message: string) {
  return NextResponse.json({ message }, { status: 400 });
}

export const imageTypes: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export const documentTypes: Record<string, string> = {
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
  "application/vnd.ms-powerpoint": "ppt",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",
  "application/zip": "zip",
  "application/x-zip-compressed": "zip",
};

// Extension for an upload, limited to `allowed`. Checks the MIME type first, then the file name.
export function fileExtension(file: File, allowed: string[]) {
  const fromType = imageTypes[file.type] ?? documentTypes[file.type];
  if (fromType && allowed.includes(fromType)) return fromType;
  const match = file.name.toLowerCase().match(/\.([a-z0-9]+)$/);
  const extension = match?.[1] === "jpeg" ? "jpg" : match?.[1];
  if (extension && allowed.includes(extension)) return extension;
  return "";
}

export function uploadDirectory() {
  return process.env.UPLOAD_DIR
    ? path.resolve(process.env.UPLOAD_DIR)
    : path.join(process.cwd(), "uploads");
}

// Writes the file into the upload directory and returns its absolute path.
export async function storeUpload(file: File, filename: string) {
  const directory = uploadDirectory();
  const stored = path.join(directory, filename);
  await mkdir(directory, { recursive: true });
  await writeFile(stored, Buffer.from(await file.arrayBuffer()));
  return stored;
}

export async function removeUploads(paths: string[]) {
  await Promise.all(paths.map((stored) => unlink(stored).catch(() => undefined)));
}
