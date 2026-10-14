export type PaymentStatus = "Pending" | "Approved" | "Rejected";
export type PaymentTab = "All" | "Pending" | "Approved" | "Rejected";

export function formatRegistrationId(code: string) {
  return `SSETC-${code}`;
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
  amount: string;
  amountValue: number;
  date: string;
  submittedAt: string;
  status: PaymentStatus;
  statusCode: number;
  uploadPath: string;
};
