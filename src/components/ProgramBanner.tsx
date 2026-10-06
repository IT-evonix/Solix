"use client";

import { usePathname } from "next/navigation";
import InnerpageBanner from "@/components/InnerpageBanner";

interface Props {
  heading: string;
}

export default function ProgramBanner({ heading }: Props) {
  const pathname = usePathname();

  const slug = pathname.split("/").pop() || "";

  const pageTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <InnerpageBanner
      title={`${heading} ${pageTitle}`}
      breadcrumbs={[
        { label: "Programmes", href: "/programmes" },
        { label: heading },
        { label: pageTitle },
      ]}
    />
  );
}