import InnerpageBanner from "@/components/InnerpageBanner";
import Image from "next/image";
import Link from "next/link";
import Faq from "@/components/Faq";
import { Faq_Venue } from "@/data/faqData";

const ContactPage = () => {
  return (
    <section className="venues_page_mainbox mb-0">
      <InnerpageBanner title="Venue" />
      <section className="pt-5 pb-5" style={{backgroundColor:"#fbf4f2"}}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 text-center">
              <Image src="/images/venues/campus.png" className="img-fluid" alt="Logo" width={600} height={500} style={{borderRadius:"30px"}}  />
            </div>
            <div className="col-lg-6 mt-4 mb-4">
              <div className="row">
                <div className="col-lg-12 heading19_black mb-3">
                  The Lavale campus offers an unusual setting for a technology and healthcare Conclave:
                </div>
                <div className="col-lg-12">
                  The academic ecosystem, medical education environment and tertiary-care teaching hospital are part of the same wider campus story. Participants encounter not only a conference venue, but a living environment where healthcare is taught, delivered, researched and continuously reimagined.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 heading35_black text-center mb-5">EXPERIENCE THE CONCLAVE AT LAVALE</div>
          </div>
          <div className="row">
            <div className="col-lg-7 col-md-7">
              <div className="row">
                <div className="col-lg-12 mb-4">
                  <Image src="/images/aboutus/siu_logo.png" className="img-fluid" alt="" width={250} height={95} priority />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 text19_black mb-4">
                  <div className="about_datebox pt-2 pb-2">SMCW & SUHRC | Hill Base, Lavale, Pune</div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 mb-4">
                  Set within the Symbiosis International University campus at Lavale, the Tech Conclave brings together <b>medical education, healthcare, technology, research and innovation</b> in one integrated environment.
                  <br></br><br></br>
                  The Conclave will take place across <b>Symbiosis Medical College for Women (SMCW) and Symbiosis University Hospital & Research Centre (SUHRC)</b>.
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-5">
              <Image src="/images/venues/hillbase_img2.png" className="img-fluid" alt="Logo" width={500} height={500} style={{borderRadius:"30px"}}  />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12"></div>
          </div>
          <div className="row">
            <div className="col-lg-12"></div>
          </div>
        </div>
      </section>
      <section className="pt-5 pb-5" style={{backgroundColor:"#ecf7fd"}}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 heading35_black text-center mb-4">THE CONCLAVE CAMPUS</div>
          </div>
          <div className="row">
            <div className="col-lg-4 mb-4 col-md-4">
              <div className="venue_whitebox">
                <div className="row">
                  <div className="col-lg-12 mb-5">
                    <Image src="/images/venues/smcw_img.png" className="img-fluid" alt="Logo" width={500} height={500} style={{borderRadius:"30px"}}  />
                  </div>
                  <div className="col-lg-12">
                    <div className="campus_img">
                      <svg width="100%" height="100%" viewBox="0 0 57 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.4113 1.43809C24.9408 0.497919 26.7027 0 28.5001 0C30.2974 0 32.0593 0.497919 33.5889 1.43809L56.1875 15.3267C56.4325 15.4772 56.6355 15.6869 56.7775 15.9363C56.9195 16.1858 56.996 16.4669 56.9998 16.7536C57.0037 17.0403 56.9348 17.3233 56.7996 17.5765C56.6644 17.8296 56.4672 18.0447 56.2263 18.2017L46.7395 24.3784V39.4842C46.7395 40.1564 46.3701 40.5743 45.9347 40.9944C45.6337 41.2873 45.3227 41.5699 45.0022 41.8414C43.9044 42.7743 42.7299 43.6137 41.4911 44.3507C38.4542 46.1674 34.0198 48 28.5001 48C22.9826 48 18.5459 46.1674 15.509 44.3507C14.2702 43.6137 13.0957 42.7743 11.9979 41.8414C11.6777 41.5687 11.366 41.2862 11.0632 40.9944C10.6323 40.5743 10.2606 40.1655 10.2606 39.4842V24.3784L3.42085 19.9252V33.8071C3.42085 34.2588 3.24069 34.692 2.92001 35.0114C2.59934 35.3308 2.16441 35.5102 1.7109 35.5102C1.25739 35.5102 0.822462 35.3308 0.501785 35.0114C0.181108 34.692 0.000952974 34.2588 0.000952974 33.8071V17.3433C0.000952974 17.2449 0.00855271 17.1502 0.0237522 17.0594C-0.0327639 16.7252 0.012113 16.3818 0.152641 16.0731C0.293169 15.7645 0.522958 15.5046 0.812607 15.3267L23.4113 1.43809ZM13.6805 26.6061V38.7735C13.828 38.9097 14.0088 39.0702 14.2231 39.2549C14.9117 39.8453 15.9377 40.6356 17.2668 41.4304C19.9298 43.02 23.7601 44.5937 28.5001 44.5937C33.2423 44.5937 37.0726 43.02 39.7333 41.4304C41.0132 40.6639 42.2144 39.774 43.3196 38.7735V26.6061L33.8032 32.8056C32.2266 33.8325 30.3838 34.3793 28.5001 34.3793C26.6164 34.3793 24.7735 33.8325 23.1969 32.8056L13.6805 26.6061ZM31.7923 4.33572C30.8027 3.72759 29.6628 3.40552 28.5001 3.40552C27.3373 3.40552 26.1974 3.72759 25.2078 4.33572L4.89824 16.8164L25.0688 29.9534C26.0889 30.6178 27.2812 30.9716 28.5001 30.9716C29.7189 30.9716 30.9113 30.6178 31.9313 29.9534L52.1019 16.8164L31.7923 4.33572Z" fill="white"/>
                      </svg>

                    </div>
                  </div>
                  <div className="col-lg-12 heading19_black p-4 pt-0 pb-2">SMCW</div>
                  <div className="col-lg-12 p-4 pt-0 pb-2">
                    A multidisciplinary medical education environment forming part of the Conclave's academic and knowledge ecosystem.
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4 col-md-4">
              <div className="venue_whitebox">
                <div className="row">
                  <div className="col-lg-12 mb-5">
                    <Image src="/images/venues/suhrc_img.png" className="img-fluid" alt="Logo" width={500} height={500} style={{borderRadius:"30px"}}  />
                  </div>
                  <div className="col-lg-12">
                    <div className="campus_img">
                      <svg width="100%" height="100%" viewBox="0 0 57 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.4113 1.43809C24.9408 0.497919 26.7027 0 28.5001 0C30.2974 0 32.0593 0.497919 33.5889 1.43809L56.1875 15.3267C56.4325 15.4772 56.6355 15.6869 56.7775 15.9363C56.9195 16.1858 56.996 16.4669 56.9998 16.7536C57.0037 17.0403 56.9348 17.3233 56.7996 17.5765C56.6644 17.8296 56.4672 18.0447 56.2263 18.2017L46.7395 24.3784V39.4842C46.7395 40.1564 46.3701 40.5743 45.9347 40.9944C45.6337 41.2873 45.3227 41.5699 45.0022 41.8414C43.9044 42.7743 42.7299 43.6137 41.4911 44.3507C38.4542 46.1674 34.0198 48 28.5001 48C22.9826 48 18.5459 46.1674 15.509 44.3507C14.2702 43.6137 13.0957 42.7743 11.9979 41.8414C11.6777 41.5687 11.366 41.2862 11.0632 40.9944C10.6323 40.5743 10.2606 40.1655 10.2606 39.4842V24.3784L3.42085 19.9252V33.8071C3.42085 34.2588 3.24069 34.692 2.92001 35.0114C2.59934 35.3308 2.16441 35.5102 1.7109 35.5102C1.25739 35.5102 0.822462 35.3308 0.501785 35.0114C0.181108 34.692 0.000952974 34.2588 0.000952974 33.8071V17.3433C0.000952974 17.2449 0.00855271 17.1502 0.0237522 17.0594C-0.0327639 16.7252 0.012113 16.3818 0.152641 16.0731C0.293169 15.7645 0.522958 15.5046 0.812607 15.3267L23.4113 1.43809ZM13.6805 26.6061V38.7735C13.828 38.9097 14.0088 39.0702 14.2231 39.2549C14.9117 39.8453 15.9377 40.6356 17.2668 41.4304C19.9298 43.02 23.7601 44.5937 28.5001 44.5937C33.2423 44.5937 37.0726 43.02 39.7333 41.4304C41.0132 40.6639 42.2144 39.774 43.3196 38.7735V26.6061L33.8032 32.8056C32.2266 33.8325 30.3838 34.3793 28.5001 34.3793C26.6164 34.3793 24.7735 33.8325 23.1969 32.8056L13.6805 26.6061ZM31.7923 4.33572C30.8027 3.72759 29.6628 3.40552 28.5001 3.40552C27.3373 3.40552 26.1974 3.72759 25.2078 4.33572L4.89824 16.8164L25.0688 29.9534C26.0889 30.6178 27.2812 30.9716 28.5001 30.9716C29.7189 30.9716 30.9113 30.6178 31.9313 29.9534L52.1019 16.8164L31.7923 4.33572Z" fill="white"/>
                      </svg>

                    </div>
                  </div>
                  <div className="col-lg-12 heading19_black p-4 pt-0 pb-2">SUHRC</div>
                  <div className="col-lg-12 p-4 pt-0 pb-2">
                    A tertiary-care teaching hospital providing the clinical and healthcare environment that complements the Conclave's focus on healthcare innovation and technology.
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <div className="venue_whitebox">
                <div className="row">
                  <div className="col-lg-12 mb-5">
                    <Image src="/images/venues/SIULAVALECAMPUS_img.png" className="img-fluid" alt="Logo" width={500} height={500} style={{borderRadius:"30px"}}  />
                  </div>
                  <div className="col-lg-12">
                    <div className="campus_img">
                      <svg width="100%" height="100%" viewBox="0 0 57 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.4113 1.43809C24.9408 0.497919 26.7027 0 28.5001 0C30.2974 0 32.0593 0.497919 33.5889 1.43809L56.1875 15.3267C56.4325 15.4772 56.6355 15.6869 56.7775 15.9363C56.9195 16.1858 56.996 16.4669 56.9998 16.7536C57.0037 17.0403 56.9348 17.3233 56.7996 17.5765C56.6644 17.8296 56.4672 18.0447 56.2263 18.2017L46.7395 24.3784V39.4842C46.7395 40.1564 46.3701 40.5743 45.9347 40.9944C45.6337 41.2873 45.3227 41.5699 45.0022 41.8414C43.9044 42.7743 42.7299 43.6137 41.4911 44.3507C38.4542 46.1674 34.0198 48 28.5001 48C22.9826 48 18.5459 46.1674 15.509 44.3507C14.2702 43.6137 13.0957 42.7743 11.9979 41.8414C11.6777 41.5687 11.366 41.2862 11.0632 40.9944C10.6323 40.5743 10.2606 40.1655 10.2606 39.4842V24.3784L3.42085 19.9252V33.8071C3.42085 34.2588 3.24069 34.692 2.92001 35.0114C2.59934 35.3308 2.16441 35.5102 1.7109 35.5102C1.25739 35.5102 0.822462 35.3308 0.501785 35.0114C0.181108 34.692 0.000952974 34.2588 0.000952974 33.8071V17.3433C0.000952974 17.2449 0.00855271 17.1502 0.0237522 17.0594C-0.0327639 16.7252 0.012113 16.3818 0.152641 16.0731C0.293169 15.7645 0.522958 15.5046 0.812607 15.3267L23.4113 1.43809ZM13.6805 26.6061V38.7735C13.828 38.9097 14.0088 39.0702 14.2231 39.2549C14.9117 39.8453 15.9377 40.6356 17.2668 41.4304C19.9298 43.02 23.7601 44.5937 28.5001 44.5937C33.2423 44.5937 37.0726 43.02 39.7333 41.4304C41.0132 40.6639 42.2144 39.774 43.3196 38.7735V26.6061L33.8032 32.8056C32.2266 33.8325 30.3838 34.3793 28.5001 34.3793C26.6164 34.3793 24.7735 33.8325 23.1969 32.8056L13.6805 26.6061ZM31.7923 4.33572C30.8027 3.72759 29.6628 3.40552 28.5001 3.40552C27.3373 3.40552 26.1974 3.72759 25.2078 4.33572L4.89824 16.8164L25.0688 29.9534C26.0889 30.6178 27.2812 30.9716 28.5001 30.9716C29.7189 30.9716 30.9113 30.6178 31.9313 29.9534L52.1019 16.8164L31.7923 4.33572Z" fill="white"/>
                      </svg>

                    </div>
                  </div>
                  <div className="col-lg-12 heading19_black p-4 pt-0 pb-2">SIU LAVALE CAMPUS</div>
                  <div className="col-lg-12 p-4 pt-0 pb-2">
                    A vibrant academic campus bringing together students, faculty, researchers and institutions across disciplines.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12"></div>
          </div>
        </div>
      </section>
      <section className="">
        <div className="container">
          <div style={{backgroundColor:"#fbf4f2", borderRadius: "30px"}} className="p-5">
            <div className="row">
              <div className="col-lg-6">
                <div className="row">
                  <div className="col-lg-12 heading21_black" style={{color:"#c00808"}}>STAY ON CAMPUS</div>
                </div>
                <div className="row">
                  <div className="col-lg-12 heading35_black mb-4">SANDIPANI HOMETEL</div>
                </div>
                <div className="row">
                  <div className="col-lg-11 mb-5">
                    Participants and delegates can experience the convenience of <b>staying within the Symbiosis campus</b> at Sandipani Hometel.
                    <br></br><br></br>
                    Being on campus allows participants to remain connected to the Conclave experience while making networking and participation more convenient throughout the event.
                  </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 mb-4">
                        <Link href="/" className="button_box">ACCOMMODATION DETAILS</Link>
                    </div>
                </div>
                <div className="row">
                  <div className="col-lg-11 mb-4" style={{fontSize:"12px"}}>
                    <i>Accommodation availability, booking process, room options and applicable charges will be updated separately.</i>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12"></div>
                </div>
              </div>
              <div className="col-lg-6 text-center">
                <Image src="/images/venues/sandipani-hometel.png" className="img-fluid" alt="Logo" width={600} height={500} style={{borderRadius:"30px"}}  />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-7 p-0 col-md-5">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15131.493336008556!2d73.72964077218812!3d18.534625278071108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf9caf148cef%3A0x4b9133b7a228d7d0!2sSymbiosis%20International%20(Deemed%20University)!5e0!3m2!1sen!2sin!4v1791269164081!5m2!1sen!2sin" width="100%" height="500" loading="lazy" ></iframe>
            </div>
            <div className="col-lg-5 p-5 col-md-7 pb-0 pt-3">
              <div className="row">
                <div className="col-lg-12 heading21_black" style={{color:"#c00808"}}>GETTING HERE</div>
                <div className="col-lg-12 heading35_black mb-2">LOCATION</div>
                <div className="col-lg-12 text19_black mb-3">
                  <div className="about_datebox pt-2 pb-2">SMCW & SUHRC</div>
                </div>
                <div className="col-lg-12 mb-4">
                  <b>Symbiosis International University Campus Hill Base, Lavale,</b> <br></br>Pune, Maharashtra, India
                </div>
                <div className="col-lg-12 heading35_black">
                  TRAVEL & STAY
                </div>
                <div className="col-lg-12 mb-3">
                  <b>Detailed information on:</b>
                </div>
                <div className="col-lg-12 mb-5">
                  <div className="row">
                    <div className="col-lg-6">
                      •	Airport connectivity<br></br>
                      •	Railway connectivity <br></br>
                      •	Local transportation <br></br>
                    </div>
                    <div className="col-lg-6">
                      •	Campus access <br></br>
                      •	Accommodation <br></br>
                      •	Event-day movement 
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-5 mb-4"><Link href="/" className="button_box">View on Map</Link></div>
                    {/* <div className="col-lg-6"><Link href="/" className="button_box">Traval Information</Link></div> */}
                  </div>
                </div>
                <div className="col-lg-12"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="footer_faq_section mb-0 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mb-2 heading35_black text-center mb-4">Frequently Asked Questions</div>
          </div>
          <div className="row">
            <div className="col-lg-1"></div>
            <div className="col-lg-10">
              <Faq faqs={Faq_Venue} />
            </div>
          </div>
        </div>
      </section> */}

    </section>    
  );
};

export default ContactPage;