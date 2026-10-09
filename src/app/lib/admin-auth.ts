import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export const adminCookieName = "solix_admin";

const rememberSeconds = 60 * 60 * 24 * 7;
const sessionSeconds = 60 * 60 * 12;

type TokenPayload = { id: string; exp: number };

export type AdminProfile = {
  id: string;
  email: string;
  mobile: string;
  name: string;
  role: string;
  status: number;
};

function sessionSecret() {
  const value = process.env.ADMIN_SESSION_SECRET;
  if (!value) throw new Error("ADMIN_SESSION_SECRET is not set.");
  return value;
}

function sign(payload: string) {
  return createHmac("sha256", sessionSecret()).update(payload).digest("base64url");
}

export function createAdminToken(id: string, remember: boolean) {
  const maxAge = remember ? rememberSeconds : sessionSeconds;
  const body: TokenPayload = { id, exp: Date.now() + maxAge * 1000 };
  const payload = Buffer.from(JSON.stringify(body)).toString("base64url");
  return { token: `${payload}.${sign(payload)}`, maxAge };
}

export function readAdminToken(token: string) {
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;
  const payload = token.slice(0, dot);
  const signature = token.slice(dot + 1);
  const expected = sign(payload);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (actualBuffer.length !== expectedBuffer.length) return null;
  if (!timingSafeEqual(actualBuffer, expectedBuffer)) return null;

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString()) as TokenPayload;
    if (!data.id || typeof data.exp !== "number" || data.exp < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}

export function adminCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

function tokenFromRequest(request: Request) {
  const header = request.headers.get("cookie") ?? "";
  const match = header
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${adminCookieName}=`));
  if (!match) return "";
  return decodeURIComponent(match.slice(adminCookieName.length + 1));
}

export async function requireAdmin(request: Request) {
  let payload: TokenPayload | null = null;
  try {
    payload = readAdminToken(tokenFromRequest(request));
  } catch {
    return {
      response: NextResponse.json(
        { message: "Admin sign-in is not configured." },
        { status: 500 },
      ),
    };
  }

  if (!payload) {
    return {
      response: NextResponse.json({ message: "Sign in to continue." }, { status: 401 }),
    };
  }

  const result = await pool.query<AdminProfile>(
    `SELECT id, email, mobile, name, role, status
     FROM login
     WHERE id = $1
     LIMIT 1`,
    [payload.id],
  );
  const admin = result.rows[0];
  if (!admin || Number(admin.status) !== 1 || !String(admin.role ?? "").trim()) {
    return {
      response: NextResponse.json(
        { message: "You are not allowed to do that." },
        { status: 403 },
      ),
    };
  }

  return { admin };
}
