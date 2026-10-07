import React from "react";
import Image from "next/image";
import Link from "next/link";
import Faq from "@/components/Faq";
import { footerFaq } from "@/data/faqData";

const Footer = () => {
  return (
    <footer>
      
      <section className="footer_faq_section mb-0 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mb-2 heading35_black text-center mb-4">Frequently Asked Questions</div>
          </div>
          <div className="row">
            <div className="col-lg-1"></div>
            <div className="col-lg-10">
              <Faq faqs={footerFaq} />
            </div>
          </div>
        </div>
      </section>
      <section className="footer_blackbox mb-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 align-items-center">
              <div className="footer_list1 footer_list">
                <div className="row">
                  <div className="col-lg-12 mb-4"><Image src="/images/footer-logo.png" className="img-fluid" alt="Logo" width={300} height={300} /></div>
                  <div className="col-lg-12 mb-4 heading21_black" style={{fontFamily:"Poppins-SemiBold", color:"#fff"}}>
                    SYMBIOSIS–SOLIXEMPOWER TECH CONCLAVE 2026
                  </div>
                  <div className="col-lg-12 mb-2">
                    <div className="row">
                      <div className="col-lg-12"><Image src="/images/footer_date.png" className="img-fluid" alt="Logo" width={15} height={15} />&nbsp;&nbsp;&nbsp; 10–12 December 2026</div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-lg-12"><Image src="/images/footer_location.png" className="img-fluid" alt="Logo" width={13} height={13} />&nbsp;&nbsp;&nbsp; SIU Lavale Campus, Pune</div>
                    </div>
                  </div>
                  <div className="col-lg-12"></div>
                  <div className="col-lg-12"></div>
                </div>
              </div>
              <div className="footer_list2 footer_list">
                <div className="row">
                  <div className="col-lg-12 footer_heading pb-2">Other Menu</div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <ul className="footer_menu">
                      <li><Link href="/">Home</Link></li>
                      <li><Link href="/">About Us</Link></li>
                      <li><Link href="/">2026 Edition</Link></li>
                      <li><Link href="/">Hackathon</Link></li>
                      <li><Link href="/">Programme</Link></li>
                      <li><Link href="/">Partner With Us</Link></li>
                      <li><Link href="/">Rules & Timeline</Link></li>
                      <li><Link href="/">Partners / Sponsors</Link></li>
                      <li><Link href="/">Speakers</Link></li>
                      <li><Link href="/">Venue</Link></li>
                      <li><Link href="/">FAQs</Link></li>
                      <li><Link href="/">Contact Us</Link></li>
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12"></div>
                </div>
              </div>
              <div className="footer_list3 footer_list">
                <div className="row">
                  <div className="col-lg-12 footer_heading pb-2">Follow Us</div>
                </div>
                <div className="row">
                  <div className="col-lg-12 follow_btnbox mb-4">
                    <a href="#">
                      <div className="row align-items-center">
                        <div className="col-lg-12 p-0"><Image src="/images/footer_register_icon.png" className="img-fluid" alt="Logo" width={20} height={20} />&nbsp;&nbsp;&nbsp; Register Now</div>
                      </div>
                    </a>
                    <a href="#">
                      <div className="row align-items-center">
                        <div className="col-lg-12 p-0"><Image src="/images/footer_explore_icon.png" className="img-fluid" alt="Logo" width={20} height={20} />&nbsp;&nbsp;&nbsp; Explore Conclave</div>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 footer_social_iconbox">
                    <a href="#"><Image src="/images/footer_facebook2.png" className="img-fluid" alt="Logo" width={300} height={300} /></a>
                    <a href="#"><Image src="/images/footer_linkedin2.png" className="img-fluid" alt="Logo" width={300} height={300} /></a>
                    <a href="#"><Image src="/images/footer_instagram2.png" className="img-fluid" alt="Logo" width={300} height={300} /></a>
                    <a href="#"><Image src="/images/footer_youtube2.png" className="img-fluid" alt="Logo" width={300} height={300} /></a>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="footer_copyrightbox mb-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-7">
              © 2026 Symbiosis–Solix Empower Tech Conclave. All Rights Reserved.
            </div>
            <div className="col-lg-5 col-md-5 craftedby_text">
              Crafted by <a href="https://www.evonix.co/" target="_blank"><Image src="/images/evonix-logo.png" className="img-fluid" alt="Logo" width={80} height={10} /></a>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
