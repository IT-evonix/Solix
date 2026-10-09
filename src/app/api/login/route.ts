import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { pool } from "@/lib/db";
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

export async function GET(request: Request) {
  const auth = await requireAdmin(request);
  if ("response" in auth) return auth.response;
  return NextResponse.json(auth.admin);
}

export async function POST(request: Request) {
  const body = await request.json();
  const email = String(body.email ?? "").trim();
  const password = String(body.password ?? "");
  const remember = body.remember === true;

  if (!email || !password) {
    return NextResponse.json(
      { message: "Enter your admin email and password." },
      { status: 400 },
    );
  }

  try {
    const result = await pool.query<LoginRow>(
      `SELECT id, email, mobile, name, password, role, login_date, created_at, status
       FROM login
       WHERE lower(email) = lower($1)
       LIMIT 1`,
      [email],
    );
    const user = result.rows[0];
    const passwordMatches = user
      ? await bcrypt.compare(password, user.password)
      : false;

    if (!user || !passwordMatches) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 },
      );
    }

    if (user.status !== 1) {
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

    const response = NextResponse.json(updated.rows[0]);
    response.cookies.set(adminCookieName, session.token, adminCookieOptions(session.maxAge));
    return response;
  } catch (error) {
    const code =
      typeof error === "object" && error && "code" in error
        ? String(error.code)
        : "";
    const message =
      code === "28P01"
        ? "Database rejected the password for user postgres."
        : "Unable to reach the database.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
