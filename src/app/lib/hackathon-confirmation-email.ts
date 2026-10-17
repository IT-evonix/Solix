// Renders the Hackathon Round 1 "Registration Confirmed" email.
// Email-client safe: tables + inline styles only, no images.
// Only imports pure helpers so it can be unit-tested with `node --test`.

import { CONTACT_EMAIL, HELPLINE, escapeHtml } from "./delegate-pass-email.ts";

export type HackathonConfirmationData = {
  registrationCode: string; // already formatted, e.g. SSETH-07
  fullName: string;
};

const RED = "#c8102e";
const NAVY = "#1e3a5f";
const INK = "#12263a";
const MUTED = "#6b7785";
const GREEN = "#107f44";
const ORANGE = "#e8480c";
const BLUE = "#007bb7";
const FONT = "font-family:Arial,Helvetica,sans-serif;";

const EVENT = "SYMBIOSIS–SOLIXEMPOWER TECH CONCLAVE 2026";
const SHORTLIST =
  "The top 100 shortlisted students will advance to the on-campus Grand Finale. The ₹1,500 fee is payable only after shortlisting.";
const CLOSING = "Get ready to connect, create and transform healthcare challenges into meaningful solutions!";

export function displayName(fullName: string) {
  return fullName.replace(/\s+/g, " ").trim() || "Participant";
}

function detailRow(label: string, value: string, valueStyle: string, last: boolean) {
  const border = last ? "" : "border-bottom:1px solid #dde4ec;";
  return `<tr>
      <td width="34%" valign="top" style="width:34%;padding:10px 12px;${border}border-right:1px solid #dde4ec;${FONT}font-size:13px;font-weight:bold;color:${INK};white-space:nowrap;">${label}</td>
      <td valign="top" style="padding:10px 12px;${border}${FONT}font-size:13px;${valueStyle}word-break:break-word;">${value}</td>
    </tr>`;
}

export function renderHackathonConfirmation(data: HackathonConfirmationData) {
  const name = displayName(data.fullName);
  const code = data.registrationCode.trim();
  const safeName = escapeHtml(name);
  const safeCode = escapeHtml(code);

  const subject = `Registration Confirmed | SSETC Hackathon 2026 (${code})`;
  const preheader = `Your Round 1 registration ${code} is confirmed. Round 1 is free.`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>Registration Confirmed</title>
</head>
<body style="margin:0;padding:0;background:#eef2f6;-webkit-text-size-adjust:100%;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#eef2f6;font-size:1px;line-height:1px;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#eef2f6" style="background:#eef2f6;">
<tr><td align="center" style="padding:24px 12px;">

<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="width:100%;max-width:600px;background:#ffffff;border-radius:12px;border:1px solid #dde4ec;">

<!-- Header -->
<tr><td align="center" style="padding:24px 24px 0 24px;${FONT}font-size:12px;letter-spacing:0.5px;font-weight:bold;color:${RED};">${EVENT}</td></tr>
<tr><td style="padding:8px 24px 0 24px;"><div style="height:2px;line-height:2px;font-size:0;background:${RED};">&nbsp;</div></td></tr>
<tr><td align="center" style="padding:12px 24px 4px 24px;${FONT}font-size:26px;line-height:32px;font-weight:bold;color:${NAVY};">SSETC HACKATHON 2026</td></tr>

<!-- Body -->
<tr><td style="padding:20px 24px 0 24px;${FONT}font-size:15px;line-height:23px;color:${INK};word-break:break-word;">
  Dear ${safeName},
  <p style="margin:12px 0 0 0;">Thank you for registering for the SSETC Hackathon 2026!</p>
  <p style="margin:12px 0 0 0;font-weight:bold;color:${RED};">Your Round 1 registration is confirmed.</p>
</td></tr>

<tr><td style="padding:14px 24px 0 24px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f5f7fa" style="background:#f5f7fa;border:1px solid #dde4ec;border-radius:6px;">
    ${detailRow("Registration ID", safeCode, `font-weight:bold;color:${NAVY};`, false)}
    ${detailRow("Round 1 Fee", "Free", `font-weight:bold;color:${GREEN};`, true)}
  </table>
</td></tr>

<tr><td style="padding:14px 24px 0 24px;${FONT}font-size:15px;line-height:23px;color:${INK};">
  <p style="margin:0;">${SHORTLIST}</p>
  <p style="margin:12px 0 0 0;">${CLOSING}</p>
</td></tr>

<!-- Sign-off -->
<tr><td style="padding:20px 24px 0 24px;${FONT}font-size:15px;line-height:23px;color:${INK};">
  Warm regards,
  <div style="font-weight:bold;color:${RED};padding-top:2px;">Organising Team</div>
  <div style="font-weight:bold;color:${NAVY};">${EVENT}</div>
  <div style="font-size:13px;color:${MUTED};">10–12 December 2026 | Lavale, Pune</div>
</td></tr>

<!-- Help -->
<tr><td style="padding:20px 24px 0 24px;">
  <div style="border-top:1px solid #e1e7ee;height:1px;line-height:1px;font-size:0;">&nbsp;</div>
  <div style="${FONT}font-size:12px;line-height:18px;color:${MUTED};padding-top:12px;">
    Questions? Email <a href="mailto:${CONTACT_EMAIL}" style="color:${INK};font-weight:bold;text-decoration:none;">${CONTACT_EMAIL}</a> or call <b style="color:${INK};white-space:nowrap;">${HELPLINE}</b>
  </div>
</td></tr>

<!-- Tagline -->
<tr><td align="center" style="padding:18px 24px 22px 24px;${FONT}font-size:12px;letter-spacing:0.5px;font-weight:bold;">
  <span style="color:${ORANGE};">CONNECT</span> <span style="color:${GREEN};">&bull;</span> <span style="color:${GREEN};">CREATE</span> <span style="color:${BLUE};">&bull;</span> <span style="color:${BLUE};">TRANSFORM</span>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;

  const text = [
    EVENT,
    "SSETC HACKATHON 2026",
    "",
    `Dear ${name},`,
    "",
    "Thank you for registering for the SSETC Hackathon 2026!",
    "",
    "Your Round 1 registration is confirmed.",
    "",
    `Registration ID: ${code}`,
    "Round 1 Fee: Free",
    "",
    SHORTLIST,
    "",
    CLOSING,
    "",
    "Warm regards,",
    "Organising Team",
    EVENT,
    "10–12 December 2026 | Lavale, Pune",
    "",
    `Questions? Email ${CONTACT_EMAIL} or call ${HELPLINE}`,
    "",
    "CONNECT • CREATE • TRANSFORM",
  ].join("\n");

  return { subject, html, text };
}
