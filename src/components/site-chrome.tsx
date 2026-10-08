"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Header from "@/components/header";
import Footer from "@/components/Footer";

const adminRoutes = ["/admin", "/payments"];

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = adminRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
  if (isAdmin) return children;
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
