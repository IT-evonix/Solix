import React from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

const Footer = () => {
  return (
    <>
    <footer>      
      <section className="footer_blackbox mb-0">
        <div className="container" style={{position:"relative", zIndex:"5"}}>
          <div className="row">
            <div className="col-lg-12 align-items-center">
              <div className="footer_list1 footer_list">
                <div className="row">
                  <div className="col-lg-12 mb-4">
                    <div className="footer_logo"><Image src="/images/Symbiosis-logo.png" className="img-fluid" alt="Logo" width={300} height={300} /></div>
                  </div>
                  <div className="col-lg-12 mb-3 heading21_black" style={{fontFamily:"Poppins-SemiBold", color:"#fff"}}>
                    SYMBIOSIS–SOLIXEMPOWER TECH CONCLAVE 2026
                  </div>
                  <div className="col-lg-12 mb-2">
                    <div className="row">
                      <div className="col-lg-12"><Image src="/images/footer_date.png" className="img-fluid" alt="Logo" width={15} height={15} />&nbsp;&nbsp;&nbsp; 10–12 December 2026</div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-lg-12"><Image src="/images/footer_location.png" className="img-fluid" alt="Logo" width={13} height={13} />&nbsp;&nbsp;&nbsp; SMCW & SUHRC, SIU CAMPUS, Pune</div>
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
                      <li><Link href="/aboutus">About Us</Link></li>
                      <li><Link href="/programme">Programme</Link></li>
                      <li><Link href="/speakers">Speakers</Link></li>
                      <li><Link href="/hackathon">Hackathon</Link></li>
                      <li><Link href="/partners">Partners</Link></li>
                      <li><Link href="/sponsors">Sponsors</Link></li>
                      <li><Link href="/venue">Venue</Link></li>
                      <li><Link href="/privacy-policy">Privacy Policy</Link></li>
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
                    <Link href="/conference">
                      <div className="row align-items-center">
                        <div className="col-lg-12 p-0"><Image src="/images/footer_register_icon.png" className="img-fluid" alt="Logo" width={20} height={20} />&nbsp;&nbsp;&nbsp; Register for Conference</div>
                      </div>
                    </Link>
                    <Link href="/">
                      <div className="row align-items-center">
                        <div className="col-lg-12 p-0"><Image src="/images/footer_explore_icon.png" className="img-fluid" alt="Logo" width={20} height={20} />&nbsp;&nbsp;&nbsp; Register for Hackathon</div>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 footer_social_iconbox">
                    <Link href="#"><Image src="/images/footer_facebook2.png" className="img-fluid" alt="Logo" width={300} height={300} /></Link>
                    <Link href="#"><Image src="/images/footer_linkedin2.png" className="img-fluid" alt="Logo" width={300} height={300} /></Link>
                    <Link href="#"><Image src="/images/footer_instagram2.png" className="img-fluid" alt="Logo" width={300} height={300} /></Link>
                    <Link href="#"><Image src="/images/footer_youtube2.png" className="img-fluid" alt="Logo" width={300} height={300} /></Link>
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
              Crafted by <Link href="https://www.evonix.co/" target="_blank"><Image src="/images/evonix-logo.png" className="img-fluid" alt="Logo" width={80} height={10} /></Link>
            </div>
          </div>
        </div>
      </section>
    </footer>
      {/* Bot247 Widget Script */}
      <Script src="https://bot247.live/widget.js?tenant=symbiosis-solix-empower" strategy="afterInteractive" />
    </>
  );
};

export default Footer;