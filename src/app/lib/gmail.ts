// SMTP sender (Gmail STARTTLS on port 587). Conference Delegate Pass and
// Hackathon confirmation emails both go through this module.

import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

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
  host: string;
  port: number;
  user: string;
  pass: string;
  sender: string;
  senderName: string;
  replyTo: string;
};

function envValue(env: Record<string, string | undefined>, ...keys: string[]) {
  for (const key of keys) {
    const value = env[key]?.trim();
    if (value) return value;
  }
  return "";
}

export function gmailConfig(env: Record<string, string | undefined> = process.env): GmailConfig {
  const user = envValue(env, "SMTP_USER", "SMTP_EMAIL");
  const pass = envValue(env, "SMTP_PASS", "SMTP_PASSWORD", "SMTP_APP_PASSWORD").replace(/\s+/g, "");
  const sender = envValue(env, "SMTP_FROM", "GMAIL_SENDER") || user;
  const missing: string[] = [];
  if (!user) missing.push("SMTP_USER");
  if (!pass) missing.push("SMTP_PASS");
  if (!sender) missing.push("SMTP_FROM");
  if (missing.length) {
    throw new GmailError(`Email is not configured: missing ${missing.join(", ")}.`);
  }
  return {
    host: envValue(env, "SMTP_HOST") || "smtp.gmail.com",
    port: Number(envValue(env, "SMTP_PORT") || "587"),
    user,
    pass,
    sender,
    senderName: envValue(env, "SMTP_SENDER_NAME", "GMAIL_SENDER_NAME"),
    replyTo: envValue(env, "SMTP_REPLY_TO", "GMAIL_REPLY_TO"),
  };
}

export function emailDisabled(env: Record<string, string | undefined> = process.env) {
  return ["1", "true", "yes"].includes((env.EMAIL_DISABLED ?? "").trim().toLowerCase());
}

let cached: { key: string; transporter: Transporter } | null = null;

function transporter(config: GmailConfig) {
  const key = `${config.host}:${config.port}:${config.user}`;
  if (cached?.key === key) return cached.transporter;
  const smtp: Transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    requireTLS: config.port === 587,
    auth: { user: config.user, pass: config.pass },
    connectionTimeout: TIMEOUT_MS,
    greetingTimeout: TIMEOUT_MS,
    socketTimeout: TIMEOUT_MS,
  });
  cached = { key, transporter: smtp };
  return smtp;
}

export function resetGmailTokenCache() {
  cached = null;
}

function decodeRaw(raw: string) {
  const padded = raw.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
  return Buffer.from(`${padded}${pad}`, "base64").toString("utf8");
}

function headerBlock(mime: string) {
  return mime.split(/\r?\n\r?\n/, 1)[0] ?? "";
}

function mimeHeader(mime: string, name: string) {
  const match = headerBlock(mime).match(new RegExp(`^${name}:\\s*([\\s\\S]*?)(?=\\r?\\n[\\w-]+:|$)`, "im"));
  return (match?.[1] ?? "").replace(/\s+/g, " ").trim();
}

function envelopeAddress(value: string) {
  const angle = value.match(/<([^>]+)>/);
  return (angle?.[1] ?? value).trim();
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function smtpMessage(error: unknown, fallback: string) {
  if (error && typeof error === "object" && "response" in error && typeof error.response === "string") {
    return error.response;
  }
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

function isTransient(error: unknown) {
  const code = error && typeof error === "object" && "code" in error ? String(error.code) : "";
  const responseCode =
    error && typeof error === "object" && "responseCode" in error ? Number(error.responseCode) : 0;
  return (
    ["ETIMEDOUT", "ECONNRESET", "ECONNREFUSED", "ESOCKET", "ECONNECTION"].includes(code) ||
    responseCode === 421 ||
    responseCode === 451 ||
    responseCode >= 500
  );
}

// Sends a base64url-encoded MIME message over SMTP. Returns the transport message id.
export async function sendRawMail(raw: string, config = gmailConfig(), retryDelayMs = 1500) {
  const mime = decodeRaw(raw);
  const to = envelopeAddress(mimeHeader(mime, "To"));
  if (!to) throw new GmailError("SMTP send failed: the message has no To address.");

  let retried = false;
  for (;;) {
    try {
      const info = await transporter(config).sendMail({
        envelope: { from: config.sender, to },
        raw: mime,
      });
      return String(info.messageId ?? "");
    } catch (error) {
      const transient = isTransient(error);
      if (transient && !retried) {
        retried = true;
        resetGmailTokenCache();
        await delay(retryDelayMs);
        continue;
      }
      throw new GmailError(`SMTP send failed: ${smtpMessage(error, "unknown error")}`, transient);
    }
  }
}
