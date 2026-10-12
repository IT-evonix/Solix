import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/lib/admin-auth";

const contentTypes: Record<string, string> = {
  ".gif": "image/gif",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

export async function GET(
  request: Request,
  context: { params: Promise<{ filename: string }> },
) {
  const auth = await requireAdmin(request);
  if ("response" in auth) return auth.response;

  const { filename } = await context.params;
  const extension = path.extname(filename).toLowerCase();
  if (!/^[a-f0-9-]+\.(gif|jpe?g|png|webp)$/i.test(filename) || !contentTypes[extension]) {
    return NextResponse.json({ message: "File not found." }, { status: 404 });
  }

  const directory = process.env.UPLOAD_DIR
    ? path.resolve(process.env.UPLOAD_DIR)
    : path.join(process.cwd(), "uploads");

  try {
    const file = await readFile(path.join(directory, filename));
    return new Response(new Uint8Array(file), {
      headers: {
        "Cache-Control": "private, no-store",
        "Content-Type": contentTypes[extension],
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return NextResponse.json({ message: "File not found." }, { status: 404 });
  }
}
