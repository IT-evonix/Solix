"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

interface SidebarItem {
  title: string;
  href: string;
}

interface LeftSidebarProps {
  heading: string;
  menuItems: SidebarItem[];
}

export default function LeftSidebar({
  heading,
  menuItems,
}: LeftSidebarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="leftSidebarmain">
      {/* Mobile Toggle Button */}
      <button
        className="sidebar-toggle"
        onClick={() => setOpen(true)}
      >
        <Menu size={22} />
        <span>{heading}</span>
      </button>

      {/* Overlay */}
      <div
        className={`sidebar-overlay ${open ? "show" : ""}`}
        onClick={() => setOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside className={`left-sidebar ${open ? "show" : ""}`}>

        <div className="sidebar-title">
          {heading}

          <button
            className="sidebar-close"
            onClick={() => setOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`sidebar-link ${
                  pathname === item.href ? "active" : ""
                }`}
                onClick={() => setOpen(false)}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>

      </aside>
    </div>
  );
}