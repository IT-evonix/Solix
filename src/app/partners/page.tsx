import InnerpageBanner from "@/components/InnerpageBanner";
import Image from "next/image";
import Faq from "@/components/Faq";
import { Faq_Speakers } from "@/data/faqData";


const ContactPage = () => {
  return (
    <main>
      <div className="aboutus_page_mainbox mb-0 position_box">
        {/* <InnerpageBanner title="Partners" /> */}
        <section className="pt-5 pb-5">
          <div className="container">          
            <div className="row">
              <div className="col-lg-12">
                <div>
                  <div className="row">
                    <div className="col-lg-12 heading35_black mb-4 text-center">THE INSTITUTIONS BEHIND THE CONCLAVE</div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 text-center mb-5">
                      The Conclave draws its character from the convergence of four complementary strengths: a multidisciplinary university, a women-focused medical education ecosystem, a tertiary-care teaching hospital and a global data and AI technology company.
                      <br></br><br></br>
                      The <b>SYMBIOSIS–SOLIXEMPOWER TECH CONCLAVE 2026</b> brings together the complementary strengths of a multidisciplinary university, a women-focused medical education ecosystem, a tertiary-care teaching hospital and a global Data + AI technology company.
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 mb-4">
                      <div className="about_white_list">
                        <div className="row">
                          <div className="col-lg-12 mb-4">
                            <Image src="/images/aboutus/siu_logo.png" className="img-fluid" alt="" width={500} height={500} priority />
                          </div>
                          <div className="col-lg-12 mb-3 text19_black"><i>A Multidisciplinary Academic Ecosystem</i></div>
                          <div className="col-lg-5 about_college_img mb-3"><Image src="/images/aboutus/SIU-img.png" className="img-fluid" alt="" width={900} height={900} priority /></div>
                          <div className="col-lg-7 mb-3">
                            Established in 1971, Symbiosis International (Deemed University) has grown into a multidisciplinary, multicultural and multinational university guided by the philosophy “Vasudhaiva Kutumbakam – The World is One Family.”
                          </div>
                          <div className="col-lg-12 mb-4 about_text">
                            Today, SIU has 40,000+ students from 85+ countries, with 45+ institutions, 200+ programmes and 13 research centres across its academic ecosystem. Its disciplines span medical and health sciences, engineering and technology, management, computer studies, law, media and communication, humanities, social sciences, architecture and design.
                            <br></br><br></br>
                            The programme is designed around a simple principle: **sharp conversations, practical exposure and meaningful interaction**. Sessions will connect the strategic questions shaping future healthcare with technologies, research and examples that are already moving from possibility towards application.
                          </div>
                          <div className="col-lg-12">
                            <div className="box_list">
                              <b>At the Conclave:</b><br></br>
                              SIU brings the strength of multidisciplinary education, research, innovation, students and global academic engagement.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 mb-4">
                      <div className="about_white_list">
                        <div className="row">
                          <div className="col-lg-12 mb-4">
                            <Image src="/images/aboutus/suhrc.png" className="img-fluid" alt="" style={{maxHeight:"80px"}} width={540} height={95} priority />
                          </div>
                          <div className="col-lg-12 mb-3 text19_black"><i>Medical Education • Healthcare • Clinical Research</i></div>
                          <div className="col-lg-5 about_college_img mb-3"><Image src="/images/aboutus/SMCW&SUHRC-img.png" className="img-fluid" alt="" width={900} height={900} priority /></div>
                          <div className="col-lg-7 mb-3">
                            Symbiosis Medical College for Women (SMCW) is the first medical college in Maharashtra exclusively meant for girl students, created with a vision of empowering women through medical education. 
                          </div>
                          <div className="col-lg-12 mb-4 about_text">
                            SMCW is closely integrated with Symbiosis University Hospital & Research Centre (SUHRC), its dedicated teaching hospital. SUHRC is a 900-bed tertiary-care teaching hospital providing clinical exposure and patient-care experience to medical students alongside comprehensive healthcare services. The hospital includes advanced diagnostic and imaging facilities, operation theatres, intensive care, dialysis, endoscopy, oncology services and 24×7 emergency care.
                          </div>
                          <div className="col-lg-12">
                            <div className="box_list">
                              <b>At the Conclave:</b><br></br>
                              SMCW & SUHRC bring the real-world healthcare context — the clinical challenges, medical expertise, research environment and future healthcare needs around which technology and innovation can create meaningful possibilities.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 mb-4">
                      <div className="about_white_list">
                        <div className="row">
                          <div className="col-lg-12 mb-4">
                            <Image src="/images/aboutus/sit-pune.png" className="img-fluid" alt="" width={540} height={95} priority />
                          </div>
                          <div className="col-lg-12 mb-3 text19_black"><i>Engineering & Technology for a Changing World</i></div>
                          <div className="col-lg-5 about_college_img mb-3"><Image src="/images/aboutus/SITpune-img.png" className="img-fluid" alt="" width={900} height={900} priority /></div>
                          <div className="col-lg-7 mb-3">
                            Established in 2008, Symbiosis Institute of Technology, Pune is a constituent of Symbiosis International (Deemed University), offering a multidisciplinary environment for engineering education, research and innovation.
                          </div>
                          <div className="col-lg-12 mb-4 about_text">
                            The institute brings together disciplines across Computer Science, Artificial Intelligence & Machine Learning, Electronics & Telecommunication, Mechanical Engineering, Civil Engineering, Robotics and emerging technology domains, with an emphasis on practical learning, industry interaction and technology-driven innovation.
                            <br></br><br></br>
                            The institute provides students with opportunities to engage with contemporary technologies, interdisciplinary projects and real-world engineering challenges, preparing them to contribute to a rapidly evolving technology landscape.
                          </div>
                          <div className="col-lg-12">
                            <div className="box_list">
                              <b>At the Conclave:</b><br></br>
                              SIT Pune brings the strength of engineering education, emerging technologies, research, innovation and industry engagement.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 mb-4">
                      <div className="about_white_list">
                        <div className="row">
                          <div className="col-lg-12 mb-4">
                            <Image src="/images/aboutus/sit-nagpur.png" className="img-fluid" alt="" width={540} height={95} priority />
                          </div>
                          <div className="col-lg-12 mb-3 text19_black"><i>Building Future-Ready Technology Professionals</i></div>
                          <div className="col-lg-5 about_college_img mb-3"><Image src="/images/aboutus/SITNagpur-img.png" className="img-fluid" alt="" width={900} height={900} priority /></div>
                          <div className="col-lg-7 mb-3">
                            Established in 2021, Symbiosis Institute of Technology, Nagpur is a constituent of Symbiosis International (Deemed University) focused on contemporary engineering education, emerging technologies and innovation.
                          </div>
                          <div className="col-lg-12 mb-4 about_text">
                            Its academic ecosystem includes Computer Science & Engineering and specialised areas such as Artificial Intelligence & Machine Learning, Cybersecurity, Artificial Intelligence of Things (AIoT), Data Science & Analytics and Cloud Computing.
                            <br></br><br></br>
                            The institute emphasises practical learning, project-based education, industry interaction and exposure to emerging technologies, enabling students to develop the skills required to address evolving technological and societal challenges.
                          </div>
                          <div className="col-lg-12">
                            <div className="box_list">
                              <b>At the Conclave:</b><br></br>
                              SIT Nagpur brings the strength of AI, data, cybersecurity, cloud computing, emerging technologies and future-ready talent.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 mb-4">
                      <div className="about_white_list">
                        <div className="row">
                          <div className="col-lg-12 mb-4">
                            <Image src="/images/aboutus/sit-hyderabad.png" className="img-fluid" alt="" width={540} height={95} priority />
                          </div>
                          <div className="col-lg-12 mb-3 text19_black"><i>Shaping the Next Generation of Technology Leaders</i></div>
                          <div className="col-lg-5 about_college_img mb-3"><Image src="/images/aboutus/SITHyderabad-img.png" className="img-fluid" alt="" width={900} height={900} priority /></div>
                          <div className="col-lg-7 mb-3">
                            Established in 2024, Symbiosis Institute of Technology, Hyderabad is a constituent of Symbiosis International (Deemed University), created to provide contemporary engineering education with a strong focus on technology, innovation and future-ready skills.
                          </div>
                          <div className="col-lg-12 mb-4 about_text">
                            The institute's academic programmes span Computer Science & Engineering, Computer Engineering, Computer Science & Technology and Artificial Intelligence & Machine Learning, providing students with exposure to emerging areas of computing and technology.
                            <br></br><br></br>
                            The institute aims to create an environment where students can develop technical capabilities, engage with innovation and research, and understand the evolving role of technology in solving real-world challenges.
                          </div>
                          <div className="col-lg-12">
                            <div className="box_list">
                              <b>At the Conclave:</b><br></br>
                              SIT Hyderabad brings the strength of computer science, artificial intelligence, engineering, innovation and emerging technology perspectives.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 mb-4">
                      <div className="about_white_list">
                        <div className="row">
                          <div className="col-lg-12 mb-4">
                            <Image src="/images/aboutus/scie.png" className="img-fluid" alt="" width={540} height={95} priority />
                          </div>
                          <div className="col-lg-12 mb-3 text19_black"><i>Global Education • International Engagement • Cross-Cultural Exchange</i></div>
                          <div className="col-lg-5 about_college_img mb-3"><Image src="/images/aboutus/SCIE-img.png" className="img-fluid" alt="" width={900} height={900} priority /></div>
                          <div className="col-lg-7 mb-3">
                            The Symbiosis Centre for International Education (SCIE) is a nodal department of Symbiosis International (Deemed University) created to support and engage with the University’s international student community. 
                          </div>
                          <div className="col-lg-12 mb-4 about_text">
                            Its mandate extends from supporting international students throughout their journey at Symbiosis to creating opportunities for international exposure, academic engagement and cross-cultural learning. SCIE works as a common platform for international students across Symbiosis and supports initiatives including international student orientation, academic exchanges, international collaborations, student and faculty mobility, and global engagement. The centre also contributes to creating an inclusive environment that enables students from diverse countries and cultures to learn and engage within the Symbiosis ecosystem. 
                          </div>
                          <div className="col-lg-12">
                            <div className="box_list">
                              <b>At the Conclave:</b><br></br>
                              SCIE brings the strength of international engagement, global academic perspectives, cross-cultural exchange and international student participation.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 mb-4">
                      <div className="about_white_list">
                        <div className="row">
                          <div className="col-lg-12 mb-4">
                            <Image src="/images/aboutus/solix.png" className="img-fluid" alt="" width={540} height={95} priority />
                          </div>
                          <div className="col-lg-12 mb-3 text19_black"><i>Data • AI • Enterprise Technology</i></div>
                          <div className="col-lg-12 mb-4 about_text">
                            Solix Technologies, Inc., headquartered in Santa Clara, California, is a global Data + AI company helping enterprises transform data into trusted, AI-powered business outcomes. Founded in 2002, Solix has built its expertise around enterprise data management, data governance, information lifecycle management and AI-ready enterprise data. 
                            <br></br><br></br>
                            Its technology ecosystem includes the Solix Common Data Platform, Enterprise Data Governance and Solix Enterprise AI, along with capabilities such as Data Sense and Data Ask that enable organisations to work with enterprise data through AI and natural-language interaction.
                          </div>
                          <div className="col-lg-12">
                            <div className="box_list">
                              <b>At the Conclave:</b><br></br>
                              Solix brings the technology, data and enterprise AI perspective, connecting emerging technology capabilities with real-world organisational and healthcare challenges.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="col-lg-6 mb-3">
                      <div className="about_white_list">
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="row justify-content-center align-items-center">
                              <div className="col-lg-2 heading35_black" style={{color:"#c4161c"}}>
                                i4C
                              </div>
                              <div className="col-lg-10 heading21_black">
                                INDIA INNOVATION & TECHNOLOGY PARTNER
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-12 mb-3 text19_black mt-4"><i>Enabling the MedTech Innovation Hackathon</i></div>
                          <div className="col-lg-12 mb-4 about_text">
                            i4C is associated with the MedTech Innovation Hackathon as the Challenge Partner, supporting the Hackathon ecosystem and its participant-facing execution. The Hackathon forms the CREATE component of the SYMBIOSIS–SOLIXEMPOWER TECH CONCLAVE 2026, bringing together multidisciplinary participants around healthcare challenges, technology, innovation and problem-solving. 
                            <br></br><br></br>
                            The collaboration supports the Conclave's objective of connecting healthcare needs with technology, engineering, data, design and innovation, enabling participants to move from understanding a problem towards developing and presenting a prototype or workable concept. 
                          </div>
                          <div className="col-lg-12">
                            <div className="box_list">
                              <b>At the Conclave:</b><br></br>
                              i4C brings the strength of Hackathon execution, challenge participation, digital engagement and innovation-led problem-solving.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
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