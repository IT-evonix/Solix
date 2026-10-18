import type { Metadata } from "next";
import "@/components/registration/registration.css";

export const metadata: Metadata = {
  title: "Hackathon 2026 Registration | Symbiosis–SolixEmpower Tech Conclave 2026",
  description: "Round 1 registration for the Symbiosis–SolixEmpower Hackathon 2026. Submit your solution — no payment required.",
};

export default function HackathonRegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
