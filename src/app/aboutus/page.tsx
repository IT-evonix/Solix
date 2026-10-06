import InnerpageBanner from "@/components/InnerpageBanner";
import Image from "next/image";

const ContactPage = () => {
  return (
    <section className="aboutus_page_mainbox mb-0">
      <InnerpageBanner title="About Us" />
      <section className="mb-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <div className="row">
                <div className="col-lg-12 text19_black mb-3">
                  <b>SYMBIOSIS–SOLIXEMPOWER TECH CONCLAVE 2026</b> is a multidisciplinary event at the intersection of <b>Healthcare, Technology, Data, AI and Innovation.</b>
                </div>
              </div>
              <div className="row">
                  <div className="col-lg-12 mb-5">
                    As technology continues to reshape the way healthcare is delivered, taught and researched, the Conclave brings together clinicians, academicians, researchers, technologists, industry leaders, innovators and students to explore what comes next.
                    <br></br><br></br>
                    The three-day experience moves from <b>CONNECT → CREATE → TRANSFORM.</b> It will connect people and ideas, create solutions through collaboration and explore how promising ideas can move towards future applications through the med-tech hackathon.
                    <br></br><br></br>
                    The Conclave is designed as an ecosystem, not a sponsor wall. Partners can bring a problem, technology, capability, research question, mentor, demonstration, network or pathway to scale — and participate in the innovation journey itself.
                  </div>
              </div>
            </div>
            <div className="col-lg-4 mb-5">
                <Image
                  src="/images/welcome_img.png"
                  className="img-fluid"
                  alt="Logo"
                  width={540}
                  height={95}
                  priority
                />
            </div>
            <div className="col-lg-12 mb-5">
              This is not a hackathon where technology searches for a problem. It is a MedTech innovation challenge where healthcare problems provide the starting point and multidisciplinary teams work towards solutions that can make sense in the real world.
              <br></br><br></br>
              A successful outcome need not always be a finished product. It may be a validated concept, clinical workflow solution, digital health intervention, medical-device concept, data/AI application, simulation, decision-support approach or another workable pathway — provided it responds meaningfully to the challenge.
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12" style={{display:"flex", justifyContent:"center"}}>
              <div className="about_datebox"><Image src="/images/footer_date.png" className="img-fluid" alt="Logo" width={18} height={18} /> &nbsp;&nbsp;10–12 December 2026 | SIU Campus, Lavale, Pune</div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12"></div>
          </div>
        </div>
      </section>
      <section className="pt-5 pb-5" style={{backgroundColor:"#fbf4f2"}}>
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
                  <div className="col-lg-6 mb-3">
                    <div className="about_white_list">
                      <div className="row">
                        <div className="col-lg-12 mb-4">
                          <Image src="/images/aboutus/siu_logo.png" className="img-fluid" alt="" width={540} height={95} priority />
                        </div>
                        <div className="col-lg-12 mb-3 text19_black"><i>A Multidisciplinary Academic Ecosystem</i></div>
                        <div className="col-lg-12 mb-4 about_text">
                          Established in 1971, Symbiosis International (Deemed University) has grown into a multidisciplinary, multicultural and multinational university guided by the philosophy “Vasudhaiva Kutumbakam – The World is One Family.”
                          <br></br><br></br>
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
                  <div className="col-lg-6 mb-3">
                    <div className="about_white_list">
                      <div className="row">
                        <div className="col-lg-12 mb-4">
                          <Image src="/images/aboutus/suhrc.png" className="img-fluid" alt="" width={540} height={95} priority />
                        </div>
                        <div className="col-lg-12 mb-3 text19_black"><i>Medical Education • Healthcare • Clinical Research</i></div>
                        <div className="col-lg-12 mb-4 about_text">
                          Symbiosis Medical College for Women (SMCW) is the first medical college in Maharashtra exclusively meant for girl students, created with a vision of empowering women through medical education. SMCW is closely integrated with Symbiosis University Hospital & Research Centre (SUHRC), its dedicated teaching hospital. 
                          <br></br><br></br>
                          SUHRC is a 900-bed tertiary-care teaching hospital providing clinical exposure and patient-care experience to medical students alongside comprehensive healthcare services. The hospital includes advanced diagnostic and imaging facilities, operation theatres, intensive care, dialysis, endoscopy, oncology services and 24×7 emergency care.
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
                  <div className="col-lg-6 mb-3">
                    <div className="about_white_list">
                      <div className="row">
                        <div className="col-lg-12 mb-4">
                          <Image src="/images/aboutus/sit-pune.png" className="img-fluid" alt="" width={540} height={95} priority />
                        </div>
                        <div className="col-lg-12 mb-3 text19_black"><i>Engineering & Technology for a Changing World</i></div>
                        <div className="col-lg-12 mb-4 about_text">
                          Established in 2008, Symbiosis Institute of Technology, Pune is a constituent of Symbiosis International (Deemed University), offering a multidisciplinary environment for engineering education, research and innovation.
                          <br></br><br></br>
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
                  <div className="col-lg-6 mb-3">
                    <div className="about_white_list">
                      <div className="row">
                        <div className="col-lg-12 mb-4">
                          <Image src="/images/aboutus/sit-nagpur.png" className="img-fluid" alt="" width={540} height={95} priority />
                        </div>
                        <div className="col-lg-12 mb-3 text19_black"><i>Building Future-Ready Technology Professionals</i></div>
                        <div className="col-lg-12 mb-4 about_text">
                          Established in 2021, Symbiosis Institute of Technology, Nagpur is a constituent of Symbiosis International (Deemed University) focused on contemporary engineering education, emerging technologies and innovation.
                          <br></br><br></br>
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
                  <div className="col-lg-6 mb-3">
                    <div className="about_white_list">
                      <div className="row">
                        <div className="col-lg-12 mb-4">
                          <Image src="/images/aboutus/sit-hyderabad.png" className="img-fluid" alt="" width={540} height={95} priority />
                        </div>
                        <div className="col-lg-12 mb-3 text19_black"><i>Shaping the Next Generation of Technology Leaders</i></div>
                        <div className="col-lg-12 mb-4 about_text">
                          Established in 2024, Symbiosis Institute of Technology, Hyderabad is a constituent of Symbiosis International (Deemed University), created to provide contemporary engineering education with a strong focus on technology, innovation and future-ready skills.
                          <br></br><br></br>
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
                  <div className="col-lg-6 mb-3">
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
                  <div className="col-lg-12 mb-3">
                    <div className="about_white_list">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="row justify-content-center align-items-center">
                            <div className="col-lg-1 heading35_black" style={{color:"#c4161c"}}>
                              i4C
                            </div>
                            <div className="col-lg-11 heading21_black">
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
      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mb-4">
              <div className="about_white_list p-5" style={{backgroundColor:"#ecf5ff"}}>
                <div className="row justify-content-center align-items-center">
                  <div className="col-lg-2 text-center">
                    <svg width="100" height="100" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M42.8973 8.89761C42.9992 9.14309 43.026 9.41327 42.9744 9.67398C42.9227 9.9347 42.7949 10.1742 42.6071 10.3623L37.2322 15.7373C37.1071 15.862 36.9588 15.9608 36.7955 16.0282C36.6323 16.0955 36.4574 16.13 36.2808 16.1297H28.7747L25.1386 19.7659C25.5484 20.624 25.6418 21.5994 25.402 22.5196C25.1623 23.4399 24.605 24.2458 23.8285 24.7948C23.0521 25.3439 22.1065 25.6008 21.159 25.5201C20.2115 25.4394 19.323 25.0263 18.6505 24.3539C17.9781 23.6815 17.565 22.793 17.4844 21.8454C17.4037 20.8979 17.6606 19.9523 18.2096 19.1759C18.7587 18.3994 19.5646 17.8421 20.4848 17.6023C21.405 17.3626 22.3804 17.4559 23.2385 17.8658L26.8747 14.2296V6.72342C26.8743 6.54684 26.9088 6.37193 26.9762 6.20869C27.0435 6.04544 27.1423 5.89707 27.267 5.77205L32.642 0.39705C32.8299 0.208638 33.0695 0.0802709 33.3305 0.0282227C33.5915 -0.0238255 33.862 0.00278899 34.1079 0.104692C34.3537 0.206596 34.5637 0.379199 34.7114 0.600619C34.859 0.82204 34.9375 1.08231 34.9371 1.34843V8.06717H41.6557C41.9216 8.06722 42.1815 8.14615 42.4025 8.29397C42.6236 8.4418 42.7958 8.65188 42.8973 8.89761ZM38.4119 10.7547H33.5933C33.2369 10.7547 32.8952 10.6131 32.6432 10.3611C32.3912 10.1091 32.2496 9.76731 32.2496 9.41092V4.59224L29.5621 7.27974V13.4422H35.7245L38.4119 10.7547ZM41.9433 14.8262C42.6286 16.9279 42.9995 19.1746 42.9995 21.5047C42.9985 26.0464 41.5593 30.4711 38.8883 34.1444C36.2173 37.8176 32.4517 40.5507 28.1315 41.9516C23.8113 43.3525 19.1585 43.3494 14.8402 41.9426C10.5219 40.5358 6.76004 37.7976 4.09403 34.1208C1.42802 30.4439 -0.00515692 26.0172 1.39431e-05 21.4755C0.00518481 16.9338 1.44844 12.5104 4.12281 8.83962C6.79719 5.16884 10.5653 2.43925 14.8868 1.0423C19.2082 -0.354658 23.8611 -0.347218 28.1781 1.06355L26.0066 3.23505C22.0173 2.25141 17.8157 2.60089 14.0437 4.23009C10.2717 5.8593 7.13684 8.67863 5.11806 12.2573C3.09928 15.836 2.30762 19.9772 2.86405 24.0482C3.42047 28.1191 5.29437 31.896 8.19943 34.8017C11.1045 37.7073 14.8809 39.582 18.9518 40.1392C23.0226 40.6964 27.1639 39.9056 30.7429 37.8875C34.3219 35.8694 37.1418 32.735 38.7718 28.9633C40.4017 25.1916 40.752 20.99 39.7691 17.0004L41.9433 14.8262ZM34.6683 18.8172C34.8475 19.6879 34.9371 20.5838 34.9371 21.5047C34.9365 24.2776 34.0781 26.9824 32.4797 29.2482C30.8812 31.514 28.6209 33.2298 26.0088 34.1603C23.3968 35.0908 20.5608 35.1904 17.8898 34.4455C15.2189 33.7005 12.8438 32.1475 11.0903 29.9995C9.33685 27.8514 8.29082 25.2135 8.09571 22.4475C7.90059 19.6815 8.56595 16.9228 10.0005 14.5498C11.4351 12.1769 13.5687 10.3059 16.1086 9.19336C18.6485 8.08085 21.4704 7.78134 24.1872 8.33593V11.0933C21.9041 10.5043 19.4907 10.6823 17.3187 11.5998C15.1467 12.5174 13.3367 14.1235 12.1673 16.171C10.9979 18.2184 10.5341 20.5935 10.8473 22.9305C11.1605 25.2675 12.2334 27.4366 13.9006 29.1039C15.5678 30.7712 17.737 31.844 20.0739 32.1572C22.4108 32.4704 24.7859 32.0066 26.8334 30.8372C28.8808 29.6679 30.4869 27.8577 31.4045 25.6857C32.322 23.5137 32.4999 21.1003 31.911 18.8172H34.6683Z" fill="#007BB7"/>
                    </svg>

                  </div>
                  <div className="col-lg-10">
                    <div className="row">
                      <div className="col-lg-12 heading21_black mb-3 pb-1" style={{color:"#007BB7", borderBottom:"1px solid #ccc"}}>WHY THIS CONCLAVE?</div>
                      <div className="col-lg-12">
                        Healthcare is no longer changing one technology at a time. AI, data, connected devices, digital health, advanced imaging, computational science, robotics and new models of care are converging — and the real question is no longer what technology can do, but where it can create meaningful value in healthcare.
                        <br></br><br></br>
                        The Conclave therefore starts with the healthcare context: the patient, the clinician, the learner, the researcher and the health system. Technology enters the conversation as an enabler — not as the starting point.
                        <br></br><br></br>
                        This is where the multidisciplinary character of Symbiosis becomes an advantage. A clinical problem can be viewed simultaneously through medicine, engineering, data, AI, design, management, research and entrepreneurship — creating the conditions for ideas that are both imaginative and grounded.
                        <br></br><br></br>
                        Healthcare is rapidly evolving through AI, data, digital technologies, engineering and innovation. The Conclave brings healthcare, academia, technology and industry together to create meaningful opportunities for learning, collaboration and innovation.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="about_white_list p-5" style={{backgroundColor:"#fbf4f2"}}>
                <div className="row justify-content-center align-items-center">
                  <div className="col-lg-2 text-center">
                    <svg width="100" height="100" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.3 39.1H29.7M22.65 48.5H27.35M44.975 25H48.5M5.025 25H1.5M25 5.025V1.5M10.8756 10.8756L8.38291 8.38291M39.1244 10.8756L41.6171 8.38291M15.5269 29.7C14.8022 28.2392 14.425 26.6307 14.425 25C14.425 19.1595 19.1595 14.425 25 14.425C30.8405 14.425 35.575 19.1595 35.575 25C35.575 26.6307 35.1978 28.2392 34.4731 29.7" stroke="#107F44" stroke-width="3" stroke-linecap="round"/>
                    </svg>

                  </div>
                  <div className="col-lg-10">
                    <div className="row">
                      <div className="col-lg-12 heading21_black mb-3 pb-1" style={{color:"#107F44", borderBottom:"1px solid #ccc"}}>WHAT THE CONCLAVE OFFERS</div>
                      <div className="col-lg-12">
                        More than a conference programme, the Conclave creates a continuum from insight to interaction to innovation — with opportunities to learn, question, experiment, collaborate and build.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="">
        <div className="container">
          <div className="row">
              <div className="col-lg-12 heading35_black mb-2 text-center">CONNECT. CREATE. TRANSFORM.</div>
          </div>
          <div className="row">
              <div className="col-lg-12 mb-5 text-center">
                CONNECT is about bringing the right people and perspectives into the same room. CREATE is about taking a meaningful problem and working on it with multidisciplinary talent, mentors and technology. TRANSFORM is about asking what happens next — validation, research, collaboration, adoption, incubation or further development.
              </div>
          </div>
          <div className="row">
              <div className="col-lg-12 heading21_black mb-5 text-center">A THREE-DAY JOURNEY</div>
          </div>
          <div className="row mb-5">
              <div className="col-lg-4">
                  <div className="signature_list">
                      <div className="row align-items-center">
                          <div className="col-lg-12">
                              <div className="signature_date">10 DECEMBER</div>
                          </div>
                          <div className="col-lg-4 text-center"><Image src="/images/signature_connect.png" className="img-fluid" alt="Logo" width={100} height={100} /></div>
                          <div className="col-lg-8">
                              <div className="row">
                                  <div className="col-lg-12 heading21_black mb-2 pb-1" style={{color:"#E7470B", borderBottom:"1px solid #ccc"}}>CONNECT</div>
                                  <div className="col-lg-12 mb-2" style={{fontFamily:"Poppins-Bold", textTransform:"uppercase"}}>
                                      Conference • Knowledge • Experts • Healthcare • Technology • Industry
                                  </div>
                                  <div className="journey_text">
                                    Bring together diverse perspectives from healthcare, academia, technology, research and industry. Explore emerging ideas, exchange knowledge and connect with experts shaping the future.
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="col-lg-4">
                  <div className="signature_list" style={{backgroundColor:"#E7F9EF"}}>
                      <div className="row align-items-center">
                          <div className="col-lg-12">
                              <div className="signature_date" style={{backgroundColor:"#107F44"}}>11 DECEMBER</div>
                          </div>
                          <div className="col-lg-4 text-center"><Image src="/images/signature_create.png" className="img-fluid" alt="Logo" width={100} height={100} /></div>
                          <div className="col-lg-8">
                              <div className="row">
                                  <div className="col-lg-12 heading21_black mb-2 pb-1" style={{color:"#107F44", borderBottom:"1px solid #ccc"}}>CREATE</div>
                                  <div className="col-lg-12 mb-2" style={{fontFamily:"Poppins-Bold", textTransform:"uppercase"}}>
                                      Hackathon • Mentoring • Collaboration • Problem Solving
                                  </div>
                                  <div className="journey_text">
                                    Move from ideas to action through the MedTech Innovation Hackathon, bringing together multidisciplinary talent, mentors and experts to work on healthcare challenges and develop innovative solutions. An impressive line up of technology + healthcare experts will share their wisdom on the transformation power of technology.
                                  </div>
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
                                  <div className="col-lg-12 mb-2" style={{fontFamily:"Poppins-Bold", textTransform:"uppercase"}}>
                                      Prototypes • Presentations • Recognition • Future Possibilities
                                  </div>
                                  <div className="journey_text">
                                    Two talks on cutting edge technology in medical kicks of an exciting day when innovation ideas will be rewarded.
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div className="row">
              <div className="col-lg-12"></div>
          </div>
          <div className="row">
              <div className="col-lg-12"></div>
          </div>
          <div className="row">
              <div className="col-lg-12"></div>
          </div>
        </div>
      </section>
      <section className="">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 core_section text-center mb-0 pt-5 pb-5" style={{borderRadius:"50px"}}>
              <div className="row">
                  <div className="col-lg-12">
                      <div className="row">
                          <div className="col-lg-12 heading35_black mb-3" style={{color:"#fff"}}>FROM PROBLEM TO POSSIBILITY</div>
                      </div>
                      <div className="row">
                          <div className="col-lg-1"></div>
                          <div className="col-lg-10 mb-4">
                              The journey is deliberately human before it is technological: understand the problem → bring the right people together → frame the opportunity → develop the idea → build and test → seek expert validation → connect to the ecosystem → explore the path to impact.
                          </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-1"></div>
                          <div className="col-lg-10" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                              <div className="core_list">
                                  <div className="core_list_inner">
                                      <div className="row">
                                          <div className="col-lg-12 mb-2">
                                              <span>
                                                  <Image src="/images/aboutus/problem_icon.svg" className="img-fluid" alt="Logo" width={100} height={100} />
                                              </span>
                                          </div>
                                          <div className="col-lg-12">PROBLEM</div>
                                      </div>
                                  </div>
                              </div>
                              <div className="core_list">
                                  <div className="core_list_inner">
                                      <div className="row">
                                          <div className="col-lg-12 mb-2">
                                              <span>
                                                  <Image src="/images/aboutus/people_icon.svg" className="img-fluid" alt="Logo" width={100} height={100}  />
                                              </span>
                                          </div>
                                          <div className="col-lg-12">PEOPLE</div>
                                      </div>
                                  </div>
                              </div>
                              <div className="core_list">
                                  <div className="core_list_inner">
                                      <div className="row">
                                          <div className="col-lg-12 mb-2">
                                              <span>
                                                  <Image src="/images/aboutus/idea_icon.svg" className="img-fluid" alt="Logo" width={100} height={100}  />
                                              </span>
                                          </div>
                                          <div className="col-lg-12">IDEAS</div>
                                      </div>
                                  </div>
                              </div>
                              <div className="core_list">
                                  <div className="core_list_inner">
                                      <div className="row">
                                          <div className="col-lg-12 mb-2">
                                              <span>
                                                  <Image src="/images/aboutus/prototype_icon.svg" className="img-fluid" alt="Logo" width={100} height={100}  />
                                              </span>
                                          </div>
                                          <div className="col-lg-12">PROTOTYPE</div>
                                      </div>
                                  </div>
                              </div>
                              <div className="core_list">
                                  <div className="core_list_inner">
                                      <div className="row">
                                          <div className="col-lg-12 mb-2">
                                              <span>
                                                  <Image src="/images/aboutus/validation_icon.svg" className="img-fluid" alt="Logo" width={100} height={100}  />
                                              </span>
                                          </div>
                                          <div className="col-lg-12">VALIDATION</div>
                                      </div>
                                  </div>
                              </div>
                              <div className="core_list">
                                  <div className="core_list_inner">
                                      <div className="row">
                                          <div className="col-lg-12 mb-2">
                                              <span>
                                                  <Image src="/images/aboutus/collaboration_icon.svg" className="img-fluid" alt="Logo" width={100} height={100}  />
                                              </span>
                                          </div>
                                          <div className="col-lg-12">COLLABORATION</div>
                                      </div>
                                  </div>
                              </div>
                              <div className="core_list">
                                  <div className="core_list_inner">
                                      <div className="row">
                                          <div className="col-lg-12 mb-2">
                                              <span>
                                                  <Image src="/images/aboutus/impact_icon.svg" className="img-fluid" alt="Logo" width={100} height={100}  />
                                              </span>
                                          </div>
                                          <div className="col-lg-12">IMPACT</div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="row">
                          <div className="col-lg-12 text-center mt-3">
                              <span  style={{backgroundColor:"#ffffff2b", borderRadius:"100px", padding:"10px 30px"}}>This narrative should be used consistently across the website as a visual and editorial device, rather than as a decorative tagline alone.</span>
                          </div>
                      </div>
                      <div className="row">
                          <div className="col-lg-12"></div>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>    
  );
};

export default ContactPage;