// Builds RFC 5322 / MIME messages for the Gmail API `raw` field.
// Kept free of imports so it can be unit-tested with `node --test`.

export type InlineImage = {
  cid: string;
  filename: string;
  contentType: string;
  data: Uint8Array;
};

export type MailMessage = {
  from: { email: string; name?: string };
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
  inline?: InlineImage[];
};

// Header values come partly from user input; CR/LF would allow header injection.
export function headerSafe(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

// A single plain addr-spec. Rejects anything a mail header could read as extra recipients
// or a display name (commas, semicolons, quotes, angle brackets, spaces, non-ASCII).
const ADDRESS_PATTERN =
  /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)+$/;

export function isSingleAddress(value: string) {
  return value.length <= 254 && ADDRESS_PATTERN.test(value) && !value.startsWith(".") && !value.includes("..");
}

// RFC 2047 encoded-word; ASCII-only values are left readable.
export function encodeWord(value: string) {
  const safe = headerSafe(value);
  if (/^[\x20-\x7e]*$/.test(safe)) return safe;
  // Split into chunks so each encoded word stays under the 75-char limit.
  const words: string[] = [];
  let chunk = "";
  for (const char of safe) {
    if (Buffer.byteLength(chunk + char, "utf8") > 45) {
      words.push(chunk);
      chunk = "";
    }
    chunk += char;
  }
  if (chunk) words.push(chunk);
  return words.map((word) => `=?UTF-8?B?${Buffer.from(word, "utf8").toString("base64")}?=`).join("\r\n ");
}

function address(email: string, name?: string) {
  const cleanEmail = headerSafe(email);
  if (!name) return cleanEmail;
  const cleanName = headerSafe(name);
  const display = /^[\x20-\x7e]*$/.test(cleanName)
    ? `"${cleanName.replace(/["\\]/g, "\\$&")}"`
    : encodeWord(cleanName);
  return `${display} <${cleanEmail}>`;
}

function base64Lines(data: Uint8Array | string) {
  const encoded = Buffer.from(data as Uint8Array).toString("base64");
  return encoded.replace(/.{1,76}/g, "$&\r\n").trimEnd();
}

function boundary(tag: string) {
  return `=_${tag}_${crypto.randomUUID().replace(/-/g, "")}`;
}

export function buildMime(message: MailMessage, now = new Date()) {
  const domain = message.from.email.split("@")[1] ?? "localhost";
  const related = boundary("rel");
  const alternative = boundary("alt");
  const inline = message.inline ?? [];

  const headers = [
    `From: ${address(message.from.email, message.from.name)}`,
    `To: ${address(message.to)}`,
    ...(message.replyTo ? [`Reply-To: ${address(message.replyTo)}`] : []),
    `Subject: ${encodeWord(message.subject)}`,
    `Date: ${now.toUTCString().replace("GMT", "+0000")}`,
    `Message-ID: <${crypto.randomUUID()}@${headerSafe(domain)}>`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/related; boundary="${related}"; type="multipart/alternative"`,
  ];

  const parts = [
    `--${related}`,
    `Content-Type: multipart/alternative; boundary="${alternative}"`,
    "",
    `--${alternative}`,
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    base64Lines(Buffer.from(message.text, "utf8")),
    `--${alternative}`,
    "Content-Type: text/html; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    base64Lines(Buffer.from(message.html, "utf8")),
    `--${alternative}--`,
  ];

  for (const image of inline) {
    const filename = headerSafe(image.filename).replace(/"/g, "");
    parts.push(
      `--${related}`,
      `Content-Type: ${headerSafe(image.contentType)}; name="${filename}"`,
      "Content-Transfer-Encoding: base64",
      `Content-ID: <${headerSafe(image.cid)}>`,
      `Content-Disposition: inline; filename="${filename}"`,
      "",
      base64Lines(image.data),
    );
  }
  parts.push(`--${related}--`, "");

  return `${headers.join("\r\n")}\r\n\r\n${parts.join("\r\n")}`;
}

export function toBase64Url(raw: string) {
  return Buffer.from(raw, "utf8").toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
