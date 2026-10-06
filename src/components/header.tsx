"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "@/css/Header.module.css";
import { menuItems, MenuItem } from "@/data/menuData";
import Image from "next/image";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Plus,
  Minus,
} from "lucide-react";
import TopBar from "./TopBar";


export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [isSticky, setIsSticky] = useState(false);

  // Sticky Header
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Always start from top after refresh
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);
  }, []);

  // Lock background when mobile menu opens
  useEffect(() => {
    if (!mobileOpen) return;

    const scrollY = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";

      window.scrollTo(0, scrollY);
    };
  }, [mobileOpen]);

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const DesktopMenuItem = ({ item }: { item: MenuItem }) => (
    <li className={styles.menuItem}>
      <Link href={item.href || "#"}>
        {item.label}
        {item.children && <ChevronDown size={16} />}
      </Link>

      {item.children && (
        <ul className={styles.dropdown}>
          {item.children.map((child) => (
            <li key={child.label}>
              <Link href={child.href || "#"}>
                {child.label}
                {child.children && <ChevronRight size={15} />}
              </Link>

              {child.children && (
                <ul className={styles.subDropdown}>
                  {child.children.map((sub) => (
                    <li key={sub.label}>
                      <Link href={sub.href || "#"}>{sub.label}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </li>
  );

  return (
    <header className="page-header">
      <div className="container">
        <div className="row">
            <div className="col-lg-12">
                <div className="logo">
                    {/* <img src="{{ asset('assets/images/Symbiosis-logo.png') }}" className="img-fluid" alt="Symbiosis Logo"> */}
                    <Link href="/"><Image
                        src="/images/Symbiosis-logo.png"
                        className="img-fluid"
                        alt="Logo"
                        width={240}
                        height={95}
                        priority
                      />
                    </Link>
                </div>
                <div className="mainmenubox">
                    <ul>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/aboutus">About Us</Link></li>
                        <li><Link href="/programme">Programme</Link></li>
                        <li><Link href="/speakers">Speakers</Link></li>
                        <li><Link href="/hackathon">Hackathon</Link></li>
                        <li><Link href="/partners">Partners</Link></li>
                        <li><Link href="/sponsors">Sponsors</Link></li>
                        <li><Link href="/venue">Venue</Link></li>
                    </ul>
                </div>
            </div>
        </div>
      </div>
    </header>
  );
}