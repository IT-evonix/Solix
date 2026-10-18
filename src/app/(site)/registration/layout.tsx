import type { Metadata } from "next";
import "@/components/registration/registration.css";

export const metadata: Metadata = {
  title: "Conference Registration | Symbiosis–SolixEmpower Tech Conclave 2026",
  description: "Register for your Delegate Pass to the Symbiosis–SolixEmpower Tech Conclave 2026, 10–12 December 2026, Pune.",
};

export default function RegistrationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
