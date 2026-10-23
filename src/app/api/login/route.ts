import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { pool } from "@/lib/db";
import {
  clientIp,
  rateLimitCheck,
  rateLimitClear,
  rateLimitHit,
  tooManyRequests,
} from "@/lib/rate-limit";
import {
  adminCookieName,
  adminCookieOptions,
  createAdminToken,
  requireAdmin,
} from "@/app/lib/admin-auth";

type LoginRow = {
  id: string;
  email: string;
  mobile: string;
  name: string;
  password: string;
  role: string;
  login_date: string;
  created_at: string;
  status: number;
};

const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES_PER_IP = 5;
const MAX_FAILURES_PER_EMAIL = 10;
const MAX_BODY_BYTES = 4 * 1024;

// Compared against when the account is missing so a wrong email takes as long as a wrong password.
const DUMMY_HASH = bcrypt.hashSync("solix-no-such-account", 10);

export async function GET(request: Request) {
  const auth = await requireAdmin(request);
  if ("response" in auth) return auth.response;
  return NextResponse.json(auth.admin);
}

export async function POST(request: Request) {
  const declared = Number(request.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > MAX_BODY_BYTES) {
    return NextResponse.json({ message: "Invalid sign-in request." }, { status: 413 });
  }
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body || typeof body !== "object") {
    return NextResponse.json({ message: "Invalid sign-in request." }, { status: 400 });
  }
  const email = String(body.email ?? "").trim();
  const password = String(body.password ?? "");
  const remember = body.remember === true;

  if (!email || !password) {
    return NextResponse.json(
      { message: "Enter your admin email and password." },
      { status: 400 },
    );
  }

  const ipKey = `login-ip:${clientIp(request)}`;
  const emailKey = `login-email:${email.toLowerCase()}`;
  const blocked = [
    rateLimitCheck(ipKey, MAX_FAILURES_PER_IP),
    rateLimitCheck(emailKey, MAX_FAILURES_PER_EMAIL),
  ].find((state) => !state.ok);
  if (blocked) return tooManyRequests(blocked);

  const recordFailure = () => {
    rateLimitHit(ipKey, LOGIN_WINDOW_MS);
    rateLimitHit(emailKey, LOGIN_WINDOW_MS);
  };

  try {
    const result = await pool.query<LoginRow>(
      `SELECT id, email, mobile, name, password, role, login_date, created_at, status
       FROM login
       WHERE lower(email) = lower($1)
       LIMIT 1`,
      [email],
    );
    const user = result.rows[0];
    const passwordMatches = await bcrypt.compare(password, user?.password || DUMMY_HASH);

    if (!user || !user.password || !passwordMatches) {
      recordFailure();
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 },
      );
    }

    if (Number(user.status) !== 1) {
      return NextResponse.json(
        { message: "This account is inactive." },
        { status: 403 },
      );
    }

    const updated = await pool.query<LoginRow>(
      `UPDATE login
       SET login_date = LOCALTIMESTAMP
       WHERE id = $1
       RETURNING id, email, mobile, name, role, login_date, created_at, status`,
      [user.id],
    );

    let session: { token: string; maxAge: number };
    try {
      session = createAdminToken(String(updated.rows[0].id), remember);
    } catch {
      return NextResponse.json(
        { message: "Admin sign-in is not configured." },
        { status: 500 },
      );
    }

    rateLimitClear(ipKey);
    rateLimitClear(emailKey);
    const response = NextResponse.json(updated.rows[0]);
    response.cookies.set(adminCookieName, session.token, adminCookieOptions(session.maxAge));
    return response;
  } catch (error) {
    const code =
      typeof error === "object" && error && "code" in error
        ? String(error.code)
        : "";
    console.error(`Admin sign-in failed (database error ${code || "unknown"}).`);
    return NextResponse.json({ message: "Unable to reach the database." }, { status: 500 });
  }
}
