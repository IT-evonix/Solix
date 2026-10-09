import InnerpageBanner from "@/components/InnerpageBanner";
import Image from "next/image";
import Link from "next/link";
import Faq from "@/components/Faq";
import { Faq_Registration } from "@/data/faqData";

const ContactPage = () => {
  return (
    <section className="conference_page_mainbox mb-0">
      <InnerpageBanner title="Register for Conference" />
      <section className="pt-5 pb-5" style={{backgroundColor:"#fbf4f2", backgroundImage:"linear-gradient(0, #fbf4f2,#fff)"}}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 heading35_black mb-3 text-center">TECH CONFERENCE 2026</div>
          </div>
          <div className="row">
            <div className="col-lg-12 mb-3" style={{display:"flex", justifyContent:"center"}}>
              <div className="about_datebox p-3 pt-2 pb-2 text-center" style={{backgroundColor:"#fff", color:"#000", border:"1px solid #e7d0c9"}}><b>10–12 December 2026 | SMCW & SUHRC | SIU Campus, Hill Base, Lavale, Pune</b></div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 text-center mb-4 text16_black">
              A multidisciplinary conference bringing together healthcare, technology, AI, data, research and innovation.
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 text-center">
                <Link href="/registration-form" className="button_box">Register Now</Link>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12"></div>
          </div>
        </div>
      </section>
      <section className="text-center">
          <div className="container">
              <div className="row">
                  <div className="col-lg-12 mb-2 heading35_black">CONFERENCE HIGHLIGHTS</div>
              </div>
              <div className="row">
                  <div className="col-lg-12 mb-4 heading19_black">Key Focus Areas</div>
              </div>
              <div className="row" style={{display:"flex", justifyContent:"center"}}>
                  <div className="col-lg-4 col-md-6 mb-3">
                      <div className="attend_list">
                          <div className="row">
                              <div className="col-lg-12 text16_black mb-1">AI & Emerging Technologies in Healthcare</div>
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-3">
                      <div className="attend_list">
                          <div className="row">
                              <div className="col-lg-12 text16_black mb-1">Digital Health & Healthcare Data</div>
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-3">
                      <div className="attend_list">
                          <div className="row">
                              <div className="col-lg-12 text16_black mb-1">AI Ethics, Governance & Cybersecurity</div>
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-3">
                      <div className="attend_list">
                          <div className="row">
                              <div className="col-lg-12 text16_black mb-1">Healthcare Informatics & ABDM</div>
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-3">
                      <div className="attend_list">
                          <div className="row">
                              <div className="col-lg-12 text16_black mb-1">Medical Education & Technology</div>
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-3">
                      <div className="attend_list">
                          <div className="row">
                              <div className="col-lg-12 text16_black mb-1">Clinical AI & Outcomes</div>
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-3">
                      <div className="attend_list">
                          <div className="row">
                              <div className="col-lg-12 text16_black mb-1">Medical Devices & MedTech</div>
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-3">
                      <div className="attend_list">
                          <div className="row">
                              <div className="col-lg-12 text16_black mb-1">Research & Drug Discovery</div>
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-3">
                      <div className="attend_list">
                          <div className="row">
                              <div className="col-lg-12 text16_black mb-1">Healthcare Innovation & Entrepreneurship</div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
      <section className="">
          <div className="container">
              <div className="row">
                  <div className="col-lg-12 heading35_black mb-5 text-center">THREE-DAY EXPERIENCE</div>
              </div>
              <div className="row mb-5">
                  <div className="col-lg-4 mb-3">
                      <div className="signature_list">
                          <div className="row align-items-center">
                              <div className="col-lg-12">
                                  <div className="signature_date">10 DECEMBER</div>
                              </div>
                              <div className="col-lg-4 text-center"><Image src="/images/signature_connect.png" className="img-fluid" alt="Logo" width={100} height={100} /></div>
                              <div className="col-lg-8">
                                  <div className="row">
                                      <div className="col-lg-12 heading21_black mb-2 pb-1" style={{color:"#E7470B", borderBottom:"1px solid #ccc"}}>CONNECT</div>
                                      <div className="col-lg-12 mb-1" style={{fontFamily:"Poppins-Bold", textTransform:"uppercase"}}>
                                          AI • Data • Governance • MedTech • Enterprise Technology
                                      </div>
                                      {/* <div className="col-lg-12">Experts • Knowledge • Industry</div> */}
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-4 mb-3">
                      <div className="signature_list" style={{backgroundColor:"#E7F9EF"}}>
                          <div className="row align-items-center">
                              <div className="col-lg-12">
                                  <div className="signature_date" style={{backgroundColor:"#107F44"}}>11 DECEMBER</div>
                              </div>
                              <div className="col-lg-4 text-center"><Image src="/images/signature_create.png" className="img-fluid" alt="Logo" width={100} height={100} /></div>
                              <div className="col-lg-8">
                                  <div className="row">
                                      <div className="col-lg-12 heading21_black mb-2 pb-1" style={{color:"#107F44", borderBottom:"1px solid #ccc"}}>CREATE</div>
                                      <div className="col-lg-12 mb-1" style={{fontFamily:"Poppins-Bold", textTransform:"uppercase"}}>
                                          Digital Health • Healthcare Data • Clinical AI • Research • Medical Education
                                      </div>
                                      {/* <div className="col-lg-12">Mentoring • Collaboration • Problem-solving</div> */}
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-4">
                      <div className="signature_list" style={{backgroundColor:"#ECF7FD"}}>
                          <div className="row align-items-center">
                              <div className="col-lg-12">
                                  <div className="signature_date" style={{backgroundColor:"#007AB7"}}>12 DECEMBER</div>
                              </div>
                              <div className="col-lg-4 text-center"><Image src="/images/signature_transform.png" className="img-fluid" alt="Logo" width={100} height={100} /></div>
                              <div className="col-lg-8">
                                  <div className="row">
                                      <div className="col-lg-12 heading21_black mb-2 pb-1" style={{color:"#007BB7", borderBottom:"1px solid #ccc"}}>TRANSFORM</div>
                                      <div className="col-lg-12 mb-1" style={{fontFamily:"Poppins-Bold", textTransform:"uppercase"}}>
                                          Emerging Research • Innovation • Hackathon Finale • Future Possibilities
                                      </div>
                                      {/* <div className="col-lg-12">Presentations • Recognition • Possibilities</div> */}
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="row">
                  <div className="col-lg-12 text-center">
                      <Link href="/programme" className="button_box">View All Program</Link>
                  </div>
              </div>
          </div>
      </section>
      <section className="pt-5 pb-5" style={{backgroundColor:"#fbf4f2"}}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 heading35_black mb-2 text-center">FEATURED SPEAKERS</div>
          </div>
          <div className="row">
            <div className="col-lg-12 mb-5 text-center">
              A multidisciplinary conference bringing together healthcare, technology, AI, data, research and innovation.
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 text-center">
                <Link href="/" className="button_box">View All Speakers</Link>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12"></div>
          </div>
        </div>
      </section>
      <section className="text-center">
          <div className="container">
              <div className="row">
                  <div className="col-lg-12 mb-4 heading35_black">MORE THAN A CONFERENCE</div>
              </div>
              <div className="row" style={{display:"flex", justifyContent:"center"}}>
                  <div className="col-lg-4 col-md-6 mb-3">
                      <div className="attend_list p-4">
                          <div className="row">
                              <div className="col-lg-12 heading19_black mb-2">EXPERT SESSIONS</div>
                              <div className="col-lg-12 mb-1">Keynotes, panels and conversations with leading voices.</div>
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-3">
                      <div className="attend_list p-4">
                          <div className="row">
                              <div className="col-lg-12 heading19_black mb-2">TECHNOLOGY WORKSHOPS</div>
                              <div className="col-lg-12 mb-1">Hands-on exploration of emerging technology and healthcare applications.</div>
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-3">
                      <div className="attend_list p-4">
                          <div className="row">
                              <div className="col-lg-12 heading19_black mb-2">TAL TALKS / TALFEST </div>
                              <div className="col-lg-12 mb-1">A dedicated programme stream bringing additional perspectives and conversations.</div>
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-5 col-md-6 mb-3">
                      <div className="attend_list p-4">
                          <div className="row">
                              <div className="col-lg-12 heading19_black mb-2">NETWORKING</div>
                              <div className="col-lg-12 mb-1">Meaningful interaction across healthcare, academia, technology and industry.</div>
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-3">
                      <div className="attend_list p-4">
                          <div className="row">
                              <div className="col-lg-12 heading19_black mb-2">MEDTECH INNOVATION HACKATHON</div>
                              <div className="col-lg-12 mb-1">From healthcare challenges to ideas, prototypes and possibilities.</div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
      <section className="pt-4 pb-4" style={{backgroundColor:"#fbf4f2"}}>
          <div className="container">
              <div className="row justify-content-center align-items-center">
                  <div className="col-lg-6 pt-5 pb-5">

                    <div>
                        <div className="row">
                          <div className="col-lg-12 heading21_black mb-1">REGISTRATION</div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12 heading19_black">Be part of the Future-Tech Conference 2026.</div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12 heading19_black mb-3">₹1,500/- per participant</div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12 text16_black mb-4">Full conference access | 10-11-12 December 2026</div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12 mb-3">
                              <Link href="/registration-form" className="button_box">Register Now</Link>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12"></div>
                        </div>
                    </div>
                  </div>
                  <div className="col-lg-6" style={{position:"relative"}}>
                    <Image src="/images/registration_venue_img2.png" className="img-fluid" alt="Logo" style={{borderRadius:"20px"}} width={800} height={800} />
                    <div className="register_venu_box">
                      <div className="row text-center">
                        <div className="col-lg-12">SMCW & SUHRC</div>
                        <div className="col-lg-12">SIU Campus, Hill Base, Lavale, Pune</div>
                        <div className="col-lg-12"></div>
                      </div>
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
              <Faq faqs={Faq_Registration} />
            </div>
          </div>
        </div>
      </section> */}
    </section>    
  );
};

export default ContactPage;