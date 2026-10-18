export type PaymentStatus = "Pending" | "Approved" | "Rejected";
export type PaymentTab = "All" | "Pending" | "Approved" | "Rejected";
// registration.pass_email_status; null when no Delegate Pass email has been attempted
export type PassEmailStatus = "sending" | "sent" | "failed";

export function formatRegistrationId(code: string) {
  return `SSETC-${code}`;
}

export function formatHackathonId(code: string) {
  return `SSETH-${code}`;
}

export function isPdfPath(path: string | null | undefined) {
  return Boolean(path && path.toLowerCase().endsWith(".pdf"));
}

export type Payment = {
  id: string;
  registrationId: string;
  registrationCode: string;
  fullName: string;
  email: string;
  mobile: string;
  detail: string;
  transactionId: string;
  payerName: string;
  amount: string;
  amountValue: number;
  date: string;
  submittedAt: string;
  status: PaymentStatus;
  statusCode: number;
  uploadPath: string;
  emailStatus: PassEmailStatus | null;
  emailSentAt: string;
  emailError: string;
};

// hackathon_registration.status: 1 submitted, 2 under review, 3 shortlisted, 0 rejected
export const hackathonStatusCodes = { Submitted: 1, "Under review": 2, Shortlisted: 3, Rejected: 0 } as const;
export type HackathonStatus = keyof typeof hackathonStatusCodes;
export type HackathonTab = "All" | HackathonStatus;

export type HackathonRegistration = {
  id: string;
  registrationCode: string;
  fullName: string;
  email: string;
  mobile: string;
  institution: string;
  course: string;
  yearOfStudy: string;
  discipline: string;
  state: string;
  solutionPath: string;
  date: string;
  submittedAt: string;
  status: HackathonStatus;
  // hackathon_registration.confirmation_email_status; null when the Round 1 confirmation has not been attempted
  emailStatus: PassEmailStatus | null;
  emailSentAt: string;
  emailError: string;
};
