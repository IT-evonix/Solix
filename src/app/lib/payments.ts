export type PaymentStatus = "Draft" | "Pending" | "Approved" | "Rejected";
export type PaymentTab = "All" | "Pending" | "Approved" | "Rejected";

export function formatRegistrationId(code: string) {
  return `SSETC-${code}`;
}

export type Payment = {
  id: string;
  registrationId: string;
  registrationCode: string;
  fullName: string;
  detail: string;
  transactionId: string;
  amount: string;
  date: string;
  status: PaymentStatus;
  statusCode: number;
  uploadPath: string;
};
