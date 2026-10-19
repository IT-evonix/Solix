import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";

const adminCookieName = "solix_admin";

// Kept self-contained on purpose: importing the API auth helper would pull the
// pg pool into the proxy bundle, and proxy must stay free of database work.
function hasAdminSession(request: NextRequest) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return false;

  const token = request.cookies.get(adminCookieName)?.value ?? "";
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return false;

  const payload = token.slice(0, dot);
  const signature = token.slice(dot + 1);
  const expected = createHmac("sha256", secret).update(payload).digest("base64url");

  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (actualBuffer.length !== expectedBuffer.length) return false;
  if (!timingSafeEqual(actualBuffer, expectedBuffer)) return false;

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString()) as {
      id?: unknown;
      exp?: unknown;
    };
    return Boolean(data.id) && typeof data.exp === "number" && data.exp >= Date.now();
  } catch {
    return false;
  }
}

export function proxy(request: NextRequest) {
  if (hasAdminSession(request)) return NextResponse.next();

  // Hide the admin portal behind a real 404 instead of revealing it exists.
  return NextResponse.rewrite(new URL("/404", request.url), { status: 404 });
}

export const config = {
  matcher: ["/payments", "/payments/:path*"],
};
