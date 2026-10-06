"use client";

import Link from "next/link";
import { GraduationCap, Video, CircleHelp } from "lucide-react";

const TopBar = () => {
  return (
    <div className="topbar">
      <div className="topbar_inner">
        <div className="topbar-contact d-flex flex-wrap align-items-center">
          <span className="me-4">
            Give Us a Call:
            <a href="tel:+919890070077" className="contact-link ms-1">
              +91 9890070077
            </a>
          </span>
          <span className="">
            Email:
            <a href="mailto:imscdr.ac@gmail.com" className="contact-link ms-1">
              imscdr.ac@gmail.com
            </a>
          </span>
        </div>
        <div className="topbar-buttons d-flex justify-content-lg-end justify-content-center flex-wrap gap-3">
          <Link href="#" className="top-btn admission-btn">
            <GraduationCap size={18} />
            <span>Admission</span>
          </Link>
          <Link href="#" className="top-btn white-btn">
            <Video size={18} />
            <span>Infrastructure Video</span>
          </Link>
          <Link href="#" className="top-btn white-btn">
            <CircleHelp size={18} />
            <span>Enquiry Now</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
