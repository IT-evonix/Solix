"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";


export default function Header() {
const [isSticky, setIsSticky] = useState(false);
const pathname = usePathname();


 // Sticky Header on Scroll
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

  // Check active menu
  const isActive = (path: string) => pathname === path;

  return (
    <header className={`header-top ${isSticky ? "sticky-header" : ""}`}>
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
                  <li className={isActive("/") ? "active" : ""} onClick={menu}><Link href="/">Home</Link></li>
                  <li className={isActive("/aboutus") ? "active" : ""} onClick={menu}><Link href="/aboutus">About Us</Link></li>
                  <li className={isActive("/programme") ? "active" : ""} onClick={menu}><Link href="/programme">Programme</Link></li>
                  <li className={isActive("/speakers") ? "active" : ""} onClick={menu}><Link href="/speakers">Speakers</Link></li>
                  <li className={isActive("/hackathon") ? "active" : ""} onClick={menu}><Link href="/hackathon">Hackathon</Link></li>
                  <li className={isActive("/partners") ? "active" : ""} onClick={menu}><Link href="/partners">Partners</Link></li>
                  <li className={isActive("/sponsors") ? "active" : ""} onClick={menu}><Link href="/sponsors">Sponsors</Link></li>
                  <li className={isActive("/venue") ? "active" : ""} onClick={menu}><Link href="/venue">Venue</Link></li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}