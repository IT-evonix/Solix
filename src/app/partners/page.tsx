import InnerpageBanner from "@/components/InnerpageBanner";
import Image from "next/image";
import Link from "next/link";
import Faq from "@/components/Faq";
import { Faq_Speakers } from "@/data/faqData";


const ContactPage = () => {
  return (
    <main>
      <div className="partner_page_mainbox mb-0 position_box">
        {/* <InnerpageBanner title="Partners" /> */}
        <section className="pt-5 pb-5">
          <div className="container">          
            <div className="row">
              <div className="col-lg-12">
                <div>
                  <div className="row">
                    <div className="col-lg-12 heading35_black mb-3 text-center">OUR PARTNERS</div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 text-center mb-5">
                      Bringing together technology, academic expertise and industry collaboration to advance innovation in healthcare.
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-5 mb-5">
                      <div className="row">
                        <div className="col-lg-12 mb-3 heading35_black" style={{color:"#c00805"}}>Technology Partner & Co-Organiser</div>
                      </div>
                      <div className="about_white_list" style={{position:"sticky", top:"100px"}}>
                        
                        <div className="row">
                          <div className="col-lg-12 mb-4"><Image src="/images/aboutus/solix.png" className="img-fluid" alt="" width={150} height={95} priority /></div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12 mb-3 text19_black"><i>Data • AI • Enterprise Technology</i></div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12 mb-4">
                            Solix brings expertise in enterprise data management, data governance and AI, supporting conversations around how emerging technologies can address complex, real-world challenges in healthcare and beyond.
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12 mb-4">
                            <Link href="/">www.solix.com</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="row">
                        <div className="col-lg-12 mb-3 heading35_black" style={{color:"#c00805"}}>Partner Institutions</div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12 mb-4">
                          <div className="about_white_list">
                            <div className="row">
                              <div className="col-lg-12 mb-4"><Image src="/images/aboutus/sit-pune.png" className="img-fluid" alt="" width={540} height={95} priority /></div>
                            </div>
                            <div className="row">
                              <div className="col-lg-12 mb-3 heading19_black">Symbiosis Institute of Technology, Pune (SIT Pune)</div>
                            </div>
                            <div className="row">
                              <div className="col-lg-12 mb-4">
                                With a focus on engineering, technology and innovation, SIT Pune contributes an academic and technical perspective to interdisciplinary problem-solving and emerging technology applications.
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-12 mb-4">
                                <Link href="https://www.sitpune.edu.in/" target="_blank">www.sitpune.edu.in</Link>
                              </div>
                            </div>
                            
                          </div>
                        </div>
                        <div className="col-lg-12 mb-4">
                          <div className="about_white_list">
                            <div className="row">
                              <div className="col-lg-12 mb-4"><Image src="/images/aboutus/sit-nagpur.png" className="img-fluid" alt="" width={540} height={95} priority /></div>
                            </div>
                            <div className="row">
                              <div className="col-lg-12 mb-3 heading19_black">Symbiosis Institute of Technology, Nagpur (SIT Nagpur)</div>
                            </div>
                            <div className="row">
                              <div className="col-lg-12 mb-4">
                                With an emphasis on emerging technology areas such as artificial intelligence, data, cybersecurity and cloud computing, SIT Nagpur represents the evolving technology landscape and its potential applications.
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-12 mb-4">
                                <Link href="https://sitnagpur.edu.in/" target="_blank">sitnagpur.edu.in</Link>
                              </div>
                            </div>
                            
                          </div>
                        </div>
                        <div className="col-lg-12 mb-4">
                          <div className="about_white_list">
                            <div className="row">
                              <div className="col-lg-12 mb-4"><Image src="/images/aboutus/sit-hyderabad.png" className="img-fluid" alt="" width={540} height={95} priority /></div>
                            </div>
                            <div className="row">
                              <div className="col-lg-12 mb-3 heading19_black">Symbiosis Institute of Technology, Hyderabad (SIT Hyderabad)</div>
                            </div>
                            <div className="row">
                              <div className="col-lg-12 mb-4">
                                Through its focus on computer science, artificial intelligence and engineering, SIT Hyderabad brings a technology-driven perspective to innovation and future-ready solutions.
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-12 mb-4">
                                <Link href="https://sithyd.edu.in/" target="_blank">https://sithyd.edu.in/</Link>
                              </div>
                            </div>
                            
                          </div>
                        </div>
                        <div className="col-lg-12 mb-4">
                          <div className="about_white_list">
                            <div className="row">
                              <div className="col-lg-12 mb-4"><Image src="/images/aboutus/scie3.png" className="img-fluid" alt="" width={540} height={95} priority /></div>
                            </div>
                            <div className="row">
                              <div className="col-lg-12 mb-3 heading19_black">Symbiosis Centre for International Education (SCIE)</div>
                            </div>
                            <div className="row">
                              <div className="col-lg-12 mb-4">
                                Symbiosis Centre for Entrepreneurship & Innovation (SCEI) is a Technology Business Incubator established by Symbiosis International (Deemed University). As a not-for-profit Section 8 company promoted by SIU and supported by the Department of Science and Technology, Government of India, SCEI works towards socio-economic development by promoting and nurturing entrepreneurship.
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-12 mb-4">
                                <Link href="https://scei.org.in/" target="_blank">https://scei.org.in/</Link>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12"></div>
                      </div>
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
      </div>
    </main>
  );
};

export default ContactPage;