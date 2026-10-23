// Renders the conference "Delegate Pass" confirmation email.
// Email-client safe: tables + inline styles only, images as CID attachments.
// Kept free of imports so it can be unit-tested with `node --test`.
// Layout follows the Delegate Pass mockup (same measurements as .pass_card in registration.css).

export type PassImage = { data: Uint8Array; contentType: string; filename: string };

export type PassArt = { calendar: PassImage; pin: PassImage; waves: PassImage; footer: PassImage };

export type DelegatePassData = {
  registrationCode: string; // already formatted, e.g. SSETC-07
  fullName: string;
  organisation: string;
  fee: string | number;
  art: PassArt;
  photo: PassImage; // attendee photo (or placeholder) already framed, see passPhoto
};

export const CONTACT_EMAIL = "s_semtechconclave@smcw.edu.in";
export const HELPLINE = "+91 (020) 6693 6500";

// Card width in px; the mockup is 788 units wide, so u(n) converts mockup units to px.
const WIDTH = 480;
const u = (n: number) => Math.round((n * WIDTH) / 788);

// Pass palette, sampled from the mockup. Keep in sync with the --p-* variables on .pass_card
// in registration.css and the colours in delegate-pass-art.ts.
const CARD = "#fefaf7";
const PANEL = "#fffbf9";
const RED = "#c4060a";
const RED_BAR = "#d00d0d";
const NAVY = "#04056a";
const NAVY_SOFT = "#0f0f66";
const GREEN = "#0b720b";
const LINE = "#5b98c4";
const RULE = "#4a8cbc";
const PILL = "#c3e8fd";
const PILL_TEXT = "#0510c8";
const BLUE = "#0384e0";
const GREEN2 = "#057214";
const ORANGE = "#fa7005";

// Badge photo frame in mockup units (rendered at 2x by passPhoto in delegate-pass-art.ts).
export const PHOTO_W = 256;
export const PHOTO_H = 276;
export const photoPx = { width: u(PHOTO_W), height: u(PHOTO_H) };
const FONT = "font-family:Poppins,'Segoe UI',Arial,Helvetica,sans-serif;";

const privileges = [
  "Full 3-Day Keynotes, Panels &amp; Tracks",
  "Official Delegate Kit &amp; Verified Badge",
  "Lunch &amp; High Tea on All 3 Days",
  "Certificate of Participation",
  "Networking Opportunities",
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

// Blue / green / orange stripe in equal thirds.
function triStripe(height: number, radius = "") {
  const cell = (color: string, corner: string) =>
    `<td width="33%" height="${height}" bgcolor="${color}" style="height:${height}px;line-height:${height}px;font-size:0;background:${color};${corner}">&nbsp;</td>`;
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
    ${cell(BLUE, radius ? `border-radius:${radius} 0 0 0;` : "")}${cell(GREEN2, "")}${cell(ORANGE, radius ? `border-radius:0 ${radius} 0 0;` : "")}
  </tr></table>`;
}

function metaRow(cid: string, alt: string, label: string, title: string, note: string, last: boolean) {
  return `
<tr><td style="padding:0 0 ${last ? 0 : u(24)}px 0;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
    <td width="${u(76)}" valign="middle" style="width:${u(76)}px;">
      <img src="cid:${cid}" width="${u(76)}" height="${u(76)}" alt="${alt}" style="display:block;width:${u(76)}px;height:${u(76)}px;border:0;">
    </td>
    <td valign="middle" style="padding-left:${u(22)}px;${FONT}">
      <div style="font-size:${u(24)}px;line-height:${u(27)}px;letter-spacing:0.4px;font-weight:bold;color:${NAVY};text-transform:uppercase;">${label}</div>
      <div style="font-size:${u(31)}px;line-height:${u(36)}px;font-weight:800;color:${NAVY};">${title}</div>
      <div style="font-size:${u(23)}px;line-height:${u(27)}px;font-style:italic;color:${NAVY_SOFT};">${note}</div>
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
  const paid = fee ? ` of ${fee}` : "";

  const subject = `Your Delegate Pass – Symbiosis–SolixEmpower Tech Conclave 2026 (${code})`;
  const preheader = `Payment verified. Your Delegate Pass ${code} for 10–12 December 2026, SIU Lavale Campus, Pune.`;
  const side = u(54);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>Delegate Pass</title>
</head>
<body style="margin:0;padding:0;background:#eef2f6;-webkit-text-size-adjust:100%;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#eef2f6;font-size:1px;line-height:1px;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#eef2f6" style="background:#eef2f6;">
<tr><td align="center" style="padding:24px 12px;">

<table role="presentation" width="${WIDTH}" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:${WIDTH}px;">
<tr><td style="padding:0 4px 16px 4px;${FONT}font-size:14px;line-height:21px;color:${NAVY_SOFT};">
  Dear ${safeName},<br>
  Your payment${paid} has been verified and your registration for the Symbiosis–SolixEmpower Tech Conclave 2026 is confirmed (Registration ID: <b style="color:${NAVY};">${safeCode}</b>). Please keep this Delegate Pass handy (digital or printed) along with a valid photo ID at the venue.
</td></tr>
</table>

<table role="presentation" width="${WIDTH}" cellpadding="0" cellspacing="0" border="0" bgcolor="${CARD}" style="width:100%;max-width:${WIDTH}px;background:${CARD};border:1px solid #e3e3e3;border-radius:${u(40)}px;">

<!-- Header -->
<tr><td style="padding:${u(26)}px ${side - u(20)}px 0 ${side}px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
    <td valign="middle" style="${FONT}font-size:${u(55)}px;line-height:${u(63)}px;font-weight:800;letter-spacing:-0.5px;color:${RED};">DELEGATE PASS</td>
    <td align="right" valign="middle" style="padding-left:8px;">
      <span style="display:inline-block;${FONT}font-size:${u(26)}px;line-height:${u(26)}px;font-weight:600;color:${GREEN};background:#ffffff;border:2px solid ${GREEN};border-radius:${u(45)}px;padding:${u(8)}px ${u(18)}px;white-space:nowrap;">&#10003; Official</span>
    </td>
  </tr></table>
</td></tr>
<tr><td style="padding:0 ${side}px;${FONT}font-size:${u(26)}px;line-height:${u(34)}px;font-style:italic;color:${RED};">Symbiosis-SolixEmpower Tech Conclave 2026</td></tr>

<!-- Badge: photo | red divider | name & organisation, "Delegate" pill top-right -->
<tr><td style="padding:${u(26)}px ${u(23)}px 0 ${u(25)}px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${PANEL}" style="background:${PANEL};border:1px solid ${LINE};border-radius:${u(24)}px;">
    <tr><td style="padding:0;">${triStripe(u(13), `${u(23)}px`)}</td></tr>
    <tr><td style="padding:${u(18)}px ${u(18)}px ${u(20)}px ${u(20)}px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
        <td width="${photoPx.width}" valign="top" style="width:${photoPx.width}px;padding-top:${u(10)}px;font-size:0;line-height:0;">
          <img src="cid:pass-photo" width="${photoPx.width}" height="${photoPx.height}" alt="${safeName}" style="display:block;width:${photoPx.width}px;height:${photoPx.height}px;border:0;">
        </td>
        <td width="${u(22)}" style="width:${u(22)}px;font-size:0;line-height:0;">&nbsp;</td>
        <td valign="top">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr><td colspan="2" align="right" style="font-size:0;line-height:0;">
              <span style="display:inline-block;${FONT}font-size:${u(28)}px;line-height:${u(42)}px;font-weight:600;color:${PILL_TEXT};background:${PILL};border-radius:${u(42)}px;padding:0 ${u(24)}px;">Delegate</span>
            </td></tr>
            <tr>
              <td width="3" height="${u(224)}" bgcolor="${RED_BAR}" style="width:3px;height:${u(224)}px;background:${RED_BAR};font-size:0;line-height:0;">&nbsp;</td>
              <td valign="middle" style="padding:${u(8)}px 0 ${u(8)}px ${u(40)}px;${FONT}word-break:break-word;overflow-wrap:anywhere;">
                <div style="font-size:${u(64)}px;line-height:${u(70)}px;font-weight:800;color:${NAVY};">${safeName}</div>
                ${safeOrg ? `<div style="font-size:${u(40)}px;line-height:${u(48)}px;font-weight:bold;font-style:italic;color:${NAVY};padding-top:${u(12)}px;">${safeOrg}</div>` : ""}
              </td>
            </tr>
          </table>
        </td>
      </tr></table>
    </td></tr>
  </table>
</td></tr>

<!-- Wave ribbon + rule -->
<tr><td style="padding:${u(2)}px 0 0 0;font-size:0;line-height:0;">
  <img src="cid:pass-waves" width="${WIDTH}" height="${u(164)}" alt="" style="display:block;width:100%;max-width:${WIDTH}px;height:auto;border:0;">
</td></tr>
<tr><td style="padding:0;">${triStripe(u(12))}</td></tr>

<!-- Dates & venue -->
<tr><td style="padding:${u(32)}px ${side}px 0 ${side + u(2)}px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    ${metaRow("icon-calendar", "Dates", "Dates", "10-12 December 2026", "3 Full Days • Connect, Create, Transform", false)}
    ${metaRow("icon-pin", "Venue", "Venue", "SMCW &amp; SUHRC", "SIU Lavale Campus, Pune, Maharashtra", true)}
  </table>
</td></tr>

<!-- Privileges -->
<tr><td style="padding:${u(44)}px ${u(37)}px 0 ${u(37)}px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${PANEL}" style="background:${PANEL};border:1px solid ${LINE};border-radius:${u(22)}px;">
    <tr><td style="padding:${u(12)}px ${u(6)}px 0 ${u(34)}px;${FONT}font-size:${u(40)}px;line-height:${u(50)}px;font-weight:800;color:${RED};text-transform:uppercase;">Delegate Privileges</td></tr>
    ${privileges
      .map(
        (item) => `<tr><td style="padding:${u(13)}px ${u(6)}px 0 ${u(34)}px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
        <td width="${u(31)}" valign="top" style="width:${u(31)}px;${FONT}font-size:${u(30)}px;line-height:${u(30)}px;font-weight:bold;color:${GREEN};">&#10003;</td>
        <td valign="top" style="padding-left:${u(20)}px;${FONT}font-size:${u(27)}px;line-height:${u(30)}px;color:${NAVY_SOFT};">${item}</td>
      </tr></table>
    </td></tr>`,
      )
      .join("\n    ")}
    <tr><td height="${u(18)}" style="height:${u(18)}px;line-height:${u(18)}px;font-size:0;">&nbsp;</td></tr>
  </table>
</td></tr>

<!-- Help -->
<tr><td style="padding:${u(22)}px ${side - u(4)}px 0 ${side - u(4)}px;">
  <div style="border-top:2px solid ${RULE};height:1px;line-height:1px;font-size:0;">&nbsp;</div>
  <div style="${FONT}font-size:${u(21) + 1}px;line-height:${u(31)}px;color:${NAVY};padding:${u(14)}px ${u(2)}px 0 ${u(2)}px;">
    <i>Need assistance with your registration?</i><br>
    Email: <a href="mailto:${CONTACT_EMAIL}" style="color:${NAVY};font-weight:bold;text-decoration:none;">${CONTACT_EMAIL}</a>
  </div>
</td></tr>

<!-- Footer bar -->
<tr><td style="padding:${u(37)}px 0 0 0;font-size:0;line-height:0;">
  <img src="cid:pass-footer" width="${WIDTH}" height="${u(103)}" alt="" style="display:block;width:100%;max-width:${WIDTH}px;height:auto;border:0;border-radius:0 0 ${u(40) - 1}px ${u(40) - 1}px;">
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;

  const text = [
    `Dear ${name},`,
    "",
    `Your payment${paid} has been verified and your registration for the Symbiosis–SolixEmpower Tech Conclave 2026 is confirmed.`,
    "Please keep this Delegate Pass handy (digital or printed) along with a valid photo ID at the venue.",
    "",
    "DELEGATE PASS — Symbiosis-SolixEmpower Tech Conclave 2026",
    `Registration ID: ${code}`,
    `Name: ${name}`,
    ...(organisation ? [`Organisation: ${organisation}`] : []),
    "",
    "Dates: 10-12 December 2026 (3 Full Days • Connect, Create, Transform)",
    "Venue: SMCW & SUHRC, SIU Lavale Campus, Pune, Maharashtra",
    "",
    "Delegate privileges:",
    ...privileges.map((item) => `  ✓ ${item.replace(/&amp;/g, "&")}`),
    "",
    "Need assistance with your registration?",
    `Email: ${CONTACT_EMAIL}`,
  ].join("\n");

  const inline = [
    { cid: "icon-calendar", ...data.art.calendar },
    { cid: "icon-pin", ...data.art.pin },
    { cid: "pass-waves", ...data.art.waves },
    { cid: "pass-footer", ...data.art.footer },
    { cid: "pass-photo", ...data.photo },
  ];

  return { subject, html, text, inline };
}
