// Gmail API sender using an OAuth refresh token (scope: gmail.send).
// Kept free of imports so it can be unit-tested with `node --test`.

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SEND_URL = "https://gmail.googleapis.com/gmail/v1/users/me/messages/send";
const TIMEOUT_MS = 15_000;

export class GmailError extends Error {
  readonly retryable: boolean;

  constructor(message: string, retryable = false) {
    super(message);
    this.name = "GmailError";
    this.retryable = retryable;
  }
}

export type GmailConfig = {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  sender: string;
  senderName: string;
  replyTo: string;
};

export function gmailConfig(env: Record<string, string | undefined> = process.env): GmailConfig {
  const missing = ["GMAIL_CLIENT_ID", "GMAIL_CLIENT_SECRET", "GMAIL_REFRESH_TOKEN", "GMAIL_SENDER"].filter(
    (key) => !env[key]?.trim(),
  );
  if (missing.length) {
    throw new GmailError(`Email is not configured: missing ${missing.join(", ")}.`);
  }
  return {
    clientId: env.GMAIL_CLIENT_ID!.trim(),
    clientSecret: env.GMAIL_CLIENT_SECRET!.trim(),
    refreshToken: env.GMAIL_REFRESH_TOKEN!.trim(),
    sender: env.GMAIL_SENDER!.trim(),
    senderName: env.GMAIL_SENDER_NAME?.trim() ?? "",
    replyTo: env.GMAIL_REPLY_TO?.trim() ?? "",
  };
}

export function emailDisabled(env: Record<string, string | undefined> = process.env) {
  return ["1", "true", "yes"].includes((env.EMAIL_DISABLED ?? "").trim().toLowerCase());
}

let cached: { token: string; expiresAt: number } | null = null;
let pending: Promise<string> | null = null;

export function resetGmailTokenCache() {
  cached = null;
  pending = null;
}

async function readJson(response: Response) {
  return (await response.json().catch(() => ({}))) as Record<string, unknown>;
}

function googleMessage(body: Record<string, unknown>, fallback: string) {
  const error = body.error;
  if (error && typeof error === "object" && "message" in error) return String(error.message);
  if (typeof body.error_description === "string") return body.error_description;
  if (typeof error === "string") return error;
  return fallback;
}

async function refreshAccessToken(config: GmailConfig) {
  let response: Response;
  try {
    response = await fetch(TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        refresh_token: config.refreshToken,
        grant_type: "refresh_token",
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch {
    throw new GmailError("Could not reach Google to authorize the sender (network error or timeout).", true);
  }

  const body = await readJson(response);
  if (!response.ok || typeof body.access_token !== "string") {
    if (body.error === "invalid_grant") {
      throw new GmailError("Gmail authorization was revoked or has expired. A new GMAIL_REFRESH_TOKEN is needed.");
    }
    if (body.error === "invalid_client" || body.error === "unauthorized_client") {
      throw new GmailError("Gmail OAuth client ID/secret is invalid.");
    }
    throw new GmailError(
      `Google token request failed: ${googleMessage(body, `HTTP ${response.status}`)}`,
      response.status >= 500,
    );
  }

  const lifetime = Number(body.expires_in ?? 3600);
  cached = { token: body.access_token, expiresAt: Date.now() + Math.max(lifetime - 60, 30) * 1000 };
  return body.access_token;
}

export async function getAccessToken(config: GmailConfig) {
  if (cached && cached.expiresAt > Date.now()) return cached.token;
  // Concurrent sends share a single refresh.
  pending ??= refreshAccessToken(config).finally(() => {
    pending = null;
  });
  return pending;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function postMessage(raw: string, token: string) {
  try {
    return await fetch(SEND_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ raw }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch {
    return null;
  }
}

// Sends a base64url-encoded MIME message. Returns the Gmail message id.
export async function sendRawMail(raw: string, config = gmailConfig(), retryDelayMs = 1500) {
  let refreshed = false;
  let retried = false;

  for (;;) {
    const token = await getAccessToken(config);
    const response = await postMessage(raw, token);

    if (response?.ok) {
      const body = await readJson(response);
      return String(body.id ?? "");
    }

    if (response?.status === 401 && !refreshed) {
      refreshed = true;
      cached = null;
      continue;
    }

    const transient = !response || response.status === 429 || response.status >= 500;
    if (transient && !retried) {
      retried = true;
      await delay(retryDelayMs);
      continue;
    }

    if (!response) throw new GmailError("Gmail did not respond (network error or timeout).", true);
    const body = await readJson(response);
    const message = googleMessage(body, `HTTP ${response.status}`);
    if (response.status === 403) {
      throw new GmailError(`Gmail refused to send: ${message}. Check the gmail.send scope and that the Gmail API is enabled.`);
    }
    throw new GmailError(`Gmail send failed: ${message}`, transient);
  }
}
