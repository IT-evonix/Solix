// Fixed-window, in-memory rate limiting. State lives in this Node process only: it resets on
// restart and is not shared between instances, so a multi-instance deployment needs a shared
// store (Redis or the database) instead.

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
let lastPrune = 0;

function prune(now: number) {
  if (now - lastPrune < 60_000) return;
  lastPrune = now;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

function live(key: string, now: number) {
  const bucket = buckets.get(key);
  return bucket && bucket.resetAt > now ? bucket : null;
}

export type RateLimitState = { ok: boolean; retryAfterSeconds: number };

// Whether `key` is still under `limit`, without counting a new attempt.
export function rateLimitCheck(key: string, limit: number, now = Date.now()): RateLimitState {
  prune(now);
  const bucket = live(key, now);
  if (!bucket || bucket.count < limit) return { ok: true, retryAfterSeconds: 0 };
  return { ok: false, retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)) };
}

// Counts one attempt against `key`; the window starts at the first attempt.
export function rateLimitHit(key: string, windowMs: number, now = Date.now()) {
  prune(now);
  const bucket = live(key, now);
  if (bucket) bucket.count += 1;
  else buckets.set(key, { count: 1, resetAt: now + windowMs });
}

export function rateLimitClear(key: string) {
  buckets.delete(key);
}

// Checks and counts in one step; for endpoints where every request is an attempt.
export function rateLimitConsume(key: string, limit: number, windowMs: number, now = Date.now()) {
  const state = rateLimitCheck(key, limit, now);
  if (state.ok) rateLimitHit(key, windowMs, now);
  return state;
}

export function resetRateLimits() {
  buckets.clear();
}

// TRUSTED_PROXY=false when Node is exposed directly: X-Forwarded-For is then client-controlled
// and ignored. Behind a reverse proxy the LAST entry is the one the proxy itself appended.
export function clientIp(request: Request, env: Record<string, string | undefined> = process.env) {
  if ((env.TRUSTED_PROXY ?? "true").trim().toLowerCase() !== "false") {
    const forwarded = (request.headers.get("x-forwarded-for") ?? "")
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);
    const last = forwarded[forwarded.length - 1];
    if (last) return last;
    const real = request.headers.get("x-real-ip")?.trim();
    if (real) return real;
  }
  return "unknown";
}

export function tooManyRequests(state: RateLimitState) {
  return new Response(JSON.stringify({ message: "Too many attempts. Please try again later." }), {
    status: 429,
    headers: {
      "Content-Type": "application/json",
      "Retry-After": String(state.retryAfterSeconds),
    },
  });
}
