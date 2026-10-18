export const NAME_PATTERN = /^(?=.*[A-Za-z])[A-Za-z. ]+$/;
export const MOBILE_PATTERN = /^[6-9]\d{9}$/;
const EMAIL_LOCAL_PATTERN = /^[A-Za-z0-9._%+-]+$/;
const EMAIL_DOMAIN_PATTERN = /^(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;

export type Errors = Record<string, string>;

export function emailError(email: string) {
  if (!email) return "Email address is required.";
  const at = email.lastIndexOf("@");
  const local = at === -1 ? "" : email.slice(0, at);
  const domain = at === -1 ? "" : email.slice(at + 1);
  if (!local || !domain || email.indexOf("@") !== at || !EMAIL_LOCAL_PATTERN.test(local)) {
    return "Enter a valid email address (e.g. name@example.com).";
  }
  if (!EMAIL_DOMAIN_PATTERN.test(domain)) return "Enter an email address with a valid domain.";
  return "";
}

export function nameError(name: string, label = "Full name") {
  if (!name) return `${label} is required.`;
  if (!NAME_PATTERN.test(name)) return `${label} can contain only letters, spaces, and dots.`;
  return "";
}

export function mobileError(mobile: string) {
  if (!mobile) return "Mobile number is required.";
  if (!MOBILE_PATTERN.test(mobile)) return "Enter a valid 10-digit mobile number.";
  return "";
}

// Returns an error for a file that is missing, too large, or of the wrong type.
export function fileError(
  file: File | null,
  { label, maxBytes, extensions }: { label: string; maxBytes: number; extensions: string[] },
) {
  if (!file) return `${label} is required.`;
  const extension = file.name.toLowerCase().split(".").pop() ?? "";
  const normalized = extension === "jpeg" ? "jpg" : extension;
  if (!extensions.includes(normalized)) {
    return `${label} must be ${extensions.map((item) => item.toUpperCase()).join(", ")}.`;
  }
  if (file.size > maxBytes) return `${label} must be ${formatBytes(maxBytes)} or smaller.`;
  return "";
}

export function toggleValue(selected: string[], value: string) {
  return selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value];
}

export function formatBytes(bytes: number) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(bytes % (1024 * 1024) ? 1 : 0)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}
