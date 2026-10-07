"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "@/css/Header.module.css";
import Image from "next/image";


export default function Header() {
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




  // --------ONCLICK-MENU-OPEN-START
const [menuOpen, setMenuOpen] = useState(false);

  const menu = () => {
    setMenuOpen(!menuOpen);
  };
  // --------ONCLICK-MENU-OPEN-END

  return (
    <header className="page-header">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">

            <div className="logo">
              <Link href="/">
                <Image src="/images/Symbiosis-logo.png" className="img-fluid" alt="Logo" width={240} height={95}/>
              </Link>
            </div>

            <div className={`menu_mainbox ${menuOpen ? "menu_open" : ""}`}>      

              <span className="toggle_menu" onClick={menu}>
                <Image src="/images/menu.svg" className="img-fluid" alt="" width={240} height={95}/>
              </span>

              <div className="menu_box">
                <span className="toggle_menu toggle_menu_close" onClick={menu} >x</span>
                <ul>
                  <li onClick={menu}><Link href="/">Home</Link></li>
                  <li onClick={menu}><Link href="/aboutus">About Us</Link></li>
                  <li onClick={menu}><Link href="/programme">Programme</Link></li>
                  <li onClick={menu}><Link href="/speakers">Speakers</Link></li>
                  <li onClick={menu}><Link href="/hackathon">Hackathon</Link></li>
                  <li onClick={menu}><Link href="/partners">Partners</Link></li>
                  <li onClick={menu}><Link href="/sponsors">Sponsors</Link></li>
                  <li onClick={menu}><Link href="/venue">Venue</Link></li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}