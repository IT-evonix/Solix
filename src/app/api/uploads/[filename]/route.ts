import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/lib/admin-auth";
import { uploadDirectory } from "@/app/lib/registration-input";

const contentTypes: Record<string, string> = {
  ".gif": "image/gif",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".ppt": "application/vnd.ms-powerpoint",
  ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".zip": "application/zip",
};

// Images and PDFs open in the browser; office files and archives download.
const inlineExtensions = [".gif", ".jpg", ".png", ".webp", ".pdf"];

export async function GET(
  request: Request,
  context: { params: Promise<{ filename: string }> },
) {
  const auth = await requireAdmin(request);
  if ("response" in auth) return auth.response;

  const { filename } = await context.params;
  const extension = path.extname(filename).toLowerCase();
  if (!/^[a-z0-9-]+\.[a-z0-9]+$/i.test(filename) || !contentTypes[extension]) {
    return NextResponse.json({ message: "File not found." }, { status: 404 });
  }

  try {
    const file = await readFile(path.join(uploadDirectory(), filename));
    return new Response(new Uint8Array(file), {
      headers: {
        "Cache-Control": "private, no-store",
        "Content-Type": contentTypes[extension],
        "Content-Disposition": `${inlineExtensions.includes(extension) ? "inline" : "attachment"}; filename="${filename}"`,
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return NextResponse.json({ message: "File not found." }, { status: 404 });
  }
}
