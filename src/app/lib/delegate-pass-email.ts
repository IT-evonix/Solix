// Renders the conference "Delegate Pass" confirmation email.
// Email-client safe: tables + inline styles only, images as CID attachments.
// Kept free of imports so it can be unit-tested with `node --test`.

export type PassImage = { data: Uint8Array; contentType: string; filename: string };

export type DelegatePassData = {
  registrationCode: string; // already formatted, e.g. SSETC-07
  fullName: string;
  organisation: string;
  fee: string | number;
  icons: { calendar: PassImage; pin: PassImage; user: PassImage };
  photo?: PassImage | null;
};

export const CONTACT_EMAIL = "s_semtechconclave@smcw.edu.in";
export const HELPLINE = "+91 (020) 6693 6500";

const NAVY = "#1f3a5f";
const RED = "#c8102e";
const ORANGE = "#e8480c";
const INK = "#1b2533";
const MUTED = "#7f7f7f";
const FONT = "font-family:Arial,Helvetica,sans-serif;";

const privileges = [
  "Full 3-Day Keynotes, Panels &amp; Tracks",
  "Official Delegate Kit &amp; Verified Badge",
  "Lunch &amp; High Tea on All 3 Days",
  "Certificate of Participation",
];

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function formatFee(fee: string | number) {
  const amount = Number(fee);
  if (!Number.isFinite(amount)) return "";
  return `₹${amount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}

function infoRow(cid: string, alt: string, label: string, title: string, note: string) {
  return `
<tr><td style="padding:0 0 14px 0;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
    <td width="34" valign="top" style="width:34px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
        <td width="32" height="32" align="center" valign="middle" style="width:32px;height:32px;border:1px solid #cfd6df;border-radius:8px;background:#f2f5f9;">
          <img src="cid:${cid}" width="16" height="16" alt="${alt}" style="display:block;width:16px;height:16px;border:0;${FONT}font-size:9px;color:${MUTED};">
        </td>
      </tr></table>
    </td>
    <td valign="top" style="padding-left:12px;${FONT}">
      <div style="font-size:10px;letter-spacing:1.2px;color:${MUTED};font-weight:bold;text-transform:uppercase;">${label}</div>
      <div style="font-size:13px;color:${INK};font-weight:bold;padding-top:2px;">${title}</div>
      <div style="font-size:11px;color:${MUTED};font-style:italic;padding-top:1px;">${note}</div>
    </td>
  </tr></table>
</td></tr>`;
}

export function renderDelegatePass(data: DelegatePassData) {
  const name = data.fullName.trim();
  const organisation = data.organisation.trim();
  const code = data.registrationCode.trim();
  const fee = formatFee(data.fee);
  const safeName = escapeHtml(name);
  const safeOrg = escapeHtml(organisation);
  const safeCode = escapeHtml(code);

  const avatar = data.photo
    ? `<img src="cid:photo" width="48" height="48" alt="Photo" style="display:block;width:48px;height:48px;border-radius:24px;border:0;">`
    : `<img src="cid:icon-user" width="20" height="20" alt="" style="display:block;width:20px;height:20px;border:0;">`;

  const subject = `Your Delegate Pass – Symbiosis–SolixEmpower Tech Conclave 2026 (${code})`;
  const preheader = `Payment verified. Your Delegate Pass ${code} for 10–12 December 2026, SIU Lavale Campus, Pune.`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>Delegate Pass</title>
</head>
<body style="margin:0;padding:0;background:#f7f8fa;-webkit-text-size-adjust:100%;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#f7f8fa;font-size:1px;line-height:1px;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f7f8fa" style="background:#f7f8fa;">
<tr><td align="center" style="padding:24px 12px;">

<table role="presentation" width="480" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:480px;">
<tr><td style="padding:0 4px 14px 4px;${FONT}font-size:14px;line-height:21px;color:${INK};">
  Dear ${safeName},<br>
  Your payment has been verified and your registration for the Symbiosis–SolixEmpower Tech Conclave 2026 is confirmed. Please keep this Delegate Pass handy (digital or printed) along with a valid photo ID at the venue.
</td></tr>
</table>

<table role="presentation" width="480" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="width:100%;max-width:480px;background:#ffffff;border-radius:16px;border:1px solid #e4e8ee;">

<!-- Header -->
<tr><td bgcolor="${ORANGE}" style="background:${ORANGE};background-image:linear-gradient(0deg,${ORANGE} 0%,#d63d04 100%);border-radius:15px 15px 0 0;padding:20px 20px 18px 20px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
    <td valign="middle" style="${FONT}font-size:10px;letter-spacing:1.5px;font-weight:bold;color:#f3c4cc;text-transform:uppercase;">SIU · SolixEmpower</td>
    <td align="right" valign="middle">
      <span style="display:inline-block;${FONT}font-size:10px;font-weight:bold;color:#a7f3c4;background:#1c4a45;border:1px solid #4fd1a1;border-radius:10px;padding:3px 8px;">&#10003; Official</span>
    </td>
  </tr></table>
  <div style="${FONT}font-size:22px;line-height:28px;letter-spacing:2px;font-weight:bold;color:#ffffff;padding-top:12px;">DELEGATE PASS</div>
  <div style="${FONT}font-size:12px;font-style:italic;color:#e2e8f0;padding-top:2px;">Symbiosis–SolixEmpower Tech Conclave 2026</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#d94b16" style="margin-top:16px;background:#d94b16;border:1px solid #dc5827;border-radius:10px;"><tr>
    <td valign="middle" style="padding:12px 14px;${FONT}">
      <div style="font-size:10px;letter-spacing:1.2px;font-weight:bold;color:#f3ded6;text-transform:uppercase;white-space:nowrap;">Confirmed Fee</div>
      <div style="font-size:26px;line-height:32px;font-weight:bold;color:#ffffff;">${fee}<span style="font-size:13px;color:#f3c4cc;font-weight:normal;">/-</span></div>
    </td>
  </tr></table>
</td></tr>
<tr><td height="3" bgcolor="${RED}" style="height:3px;line-height:3px;font-size:0;background:${RED};">&nbsp;</td></tr>

<!-- Body -->
<tr><td style="padding:20px 20px 4px 20px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    ${infoRow("icon-calendar", "Dates", "Dates", "10–12 December 2026", "3 Full Days • Connect, Create, Transform")}
    ${infoRow("icon-pin", "Venue", "Venue", "SMCW &amp; SUHRC", "SIU Lavale Campus, Pune, Maharashtra")}
  </table>
</td></tr>

<tr><td style="padding:4px 20px 16px 20px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f7f8fa" style="background:#f7f8fa;border:1px solid #e4e8ee;border-radius:10px;">
    <tr><td style="padding:14px 16px 4px 16px;${FONT}font-size:11px;letter-spacing:1.2px;font-weight:bold;color:${NAVY};text-transform:uppercase;"><span style="color:#107f44;">&#10003;</span>&nbsp; Delegate Privileges</td></tr>
    ${privileges
      .map(
        (item) =>
          `<tr><td style="padding:6px 16px 0 16px;${FONT}font-size:12px;color:#3d4a5c;"><span style="color:#107f44;font-weight:bold;">&#10003;</span>&nbsp;&nbsp;${item}</td></tr>`,
      )
      .join("\n    ")}
    <tr><td height="14" style="height:14px;line-height:14px;font-size:0;">&nbsp;</td></tr>
  </table>
</td></tr>

<!-- Badge -->
<tr><td style="padding:0 20px 18px 20px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #cfd6df;border-radius:10px;">
    <tr><td height="4" bgcolor="${RED}" style="height:4px;line-height:4px;font-size:0;background:${RED};background-image:linear-gradient(90deg,${RED} 0%,${NAVY} 100%);border-radius:9px 9px 0 0;">&nbsp;</td></tr>
    <tr><td style="padding:12px 14px 0 14px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
        <td valign="middle" style="${FONT}font-size:10px;letter-spacing:1.2px;font-weight:bold;color:${MUTED};text-transform:uppercase;">Delegate Badge</td>
        <td align="right" valign="middle"><span style="display:inline-block;${FONT}font-size:10px;font-weight:bold;color:#01608f;background:#f0f7fc;border-radius:4px;padding:3px 7px;">Participant</span></td>
      </tr></table>
    </td></tr>
    <tr><td style="padding:12px 14px 12px 14px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
        <td width="50" valign="middle" style="width:50px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
            <td width="48" height="48" align="center" valign="middle" bgcolor="#f2f5f9" style="width:48px;height:48px;border-radius:24px;background:#f2f5f9;border:1px solid #cfd6df;">${avatar}</td>
          </tr></table>
        </td>
        <td valign="middle" style="padding-left:12px;${FONT}word-break:break-word;">
          <div style="font-size:15px;line-height:20px;font-weight:bold;color:${INK};">${safeName}</div>
          ${safeOrg ? `<div style="font-size:12px;line-height:17px;font-style:italic;color:${MUTED};padding-top:1px;">${safeOrg}</div>` : ""}
          <div style="font-size:11px;line-height:16px;color:${NAVY};padding-top:3px;">Registration ID: <b>${safeCode}</b></div>
        </td>
      </tr></table>
    </td></tr>
    <tr><td style="padding:0 14px;"><div style="border-top:1px dashed #e4e8ee;height:1px;line-height:1px;font-size:0;">&nbsp;</div></td></tr>
    <tr><td style="padding:9px 14px 11px 14px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
        <td style="${FONT}font-size:11px;color:${MUTED};">&nbsp;</td>
        <td align="right" style="${FONT}font-size:11px;color:${MUTED};white-space:nowrap;">SIU • 2026</td>
      </tr></table>
    </td></tr>
  </table>
</td></tr>

<!-- Footer -->
<tr><td style="padding:0 20px 20px 20px;">
  <div style="border-top:1px solid #e4e8ee;height:1px;line-height:1px;font-size:0;">&nbsp;</div>
  <div style="${FONT}font-size:11px;line-height:18px;color:${MUTED};padding-top:12px;">
    <i>Need assistance with your registration?</i><br>
    <i>Email:</i> <a href="mailto:${CONTACT_EMAIL}" style="color:${INK};font-weight:bold;text-decoration:none;">${CONTACT_EMAIL}</a><br>
    <i>Helpline:</i> <b style="color:${INK};">${HELPLINE}</b>
  </div>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;

  const text = [
    `Dear ${name},`,
    "",
    "Your payment has been verified and your registration for the Symbiosis–SolixEmpower Tech Conclave 2026 is confirmed.",
    "Please keep this Delegate Pass handy (digital or printed) along with a valid photo ID at the venue.",
    "",
    "DELEGATE PASS — SIU · SolixEmpower",
    `Registration ID: ${code}`,
    `Name: ${name}`,
    ...(organisation ? [`Organisation: ${organisation}`] : []),
    `Confirmed fee: ${fee}/-`,
    "",
    "Dates: 10–12 December 2026 (3 Full Days • Connect, Create, Transform)",
    "Venue: SMCW & SUHRC, SIU Lavale Campus, Pune, Maharashtra",
    "",
    "Delegate privileges:",
    ...privileges.map((item) => `  ✓ ${item.replace(/&amp;/g, "&")}`),
    "",
    "Need assistance with your registration?",
    `Email: ${CONTACT_EMAIL}`,
    `Helpline: ${HELPLINE}`,
  ].join("\n");

  const inline = [
    { cid: "icon-calendar", ...data.icons.calendar },
    { cid: "icon-pin", ...data.icons.pin },
    data.photo ? { cid: "photo", ...data.photo } : { cid: "icon-user", ...data.icons.user },
  ];

  return { subject, html, text, inline };
}
