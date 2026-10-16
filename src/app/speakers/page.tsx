import InnerpageBanner from "@/components/InnerpageBanner";
import Image from "next/image";
import Faq from "@/components/Faq";
import { Faq_Speakers } from "@/data/faqData";


const ContactPage = () => {
  return (
    <main>
      <div className="speakers_page_mainbox mb-0 position_box">
        {/* <InnerpageBanner title="Speakers & Experts" /> */}
        <section className="mb-5 pt-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 heading35_black mb-3">Speakers & Experts</div>
            </div>
            <div className="speaker_list mb-4">
              <div className="row align-items-center">
                <div className="col-lg-3">
                  <div className="row">
                    <div className="col-lg-12"><Image src="/images/speakers/ShivKumarSarin3.png" className="img-fluid" alt="" width={500} height={500} /></div>
                    <div className="col-lg-12">
                      <div className="title_box">
                        <div className="row">
                          <div className="col-lg-12 heading19_white">Dr. Shiv Kumar Sarin</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="row">
                    <div className="col-lg-12 heading19_black mb-2 mt-4">Title: <span>Keynote Speaker</span></div>
                    <div className="col-lg-12 heading19_black mb-2">Expertise & Summary:</div>
                    <div className="col-lg-12 mb-2">
                      <b>- Pioneering Hepatologist & Visionary Leader:</b> Dr. Shiv Kumar Sarin is a globally
                      renowned gastroenterologist, hepatologist, and the Founding Director and Chancellor
                      of the Institute of Liver and Biliary Sciences (ILBS), New Delhi.
                    </div>
                    <div className="col-lg-12 mb-2">
                      <b>- Public Health & Educational Reforms:</b> As former Chairman of the Board of
                      Governors of the Medical Council of India (MCI), he authored the landmark Vision
                      2015 medical education reforms and spearheaded India’s national Hepatitis B
                      vaccination awareness initiatives.
                    </div>
                    <div className="col-lg-12 mb-2">
                      <b>- Clinical Innovations & Global Guidelines:</b> Internationally recognized for
                      establishing standard diagnostic frameworks—such as Sarin’s Classification of
                      Gastric Varices and defining Acute-on-Chronic Liver Failure (ACLF)—his work
                      directly shapes global clinical guidelines.
                    </div>
                    <div className="col-lg-12 mb-2">
                      <b>- Prolific Researcher:</b> With over 850 high-impact scientific publications and tens of
                      thousands of citations, his research integrates data-driven clinical practice, liver
                      regeneration, and healthcare policy innovation.
                    </div>
                    <div className="col-lg-12">
                      <b>- National Honors:</b> Recipient of the prestigious Padma Bhushan and the Shanti
                      Swarup Bhatnagar Prize for outstanding contributions to medical science and
                      healthcare leadership.
                    </div>


                  </div>
                </div>
              </div>
            </div>
            <div className="speaker_list mb-4">
              <div className="row flex-row-reverse align-items-center">
                <div className="col-lg-3">
                  <div className="row">
                    <div className="col-lg-12"><Image src="/images/speakers/LiuNan3.png" className="img-fluid" alt="" width={500} height={500} /></div>
                    <div className="col-lg-12">
                      <div className="title_box">
                        <div className="row">
                          <div className="col-lg-12 heading19_white">Assoc Prof Liu Nan</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="row">
                    <div className="col-lg-12 heading19_black mb-2 mt-4">Title: <span>Keynote Speaker</span></div>
                    <div className="col-lg-12 heading19_black mb-2">Affiliation: <span>Duke-NUS Medical School</span></div>
                    <div className="col-lg-12 heading19_black mb-2">Expertise & Summary:</div>
                    <div className="col-lg-12 mb-2">
                      Associate Professor Liu Nan is a leading researcher at the Centre for
  Quantitative Medicine and the Programme in Health Services and Systems Research at Duke-
  NUS Medical School, Singapore. His primary expertise focuses on interpretable and
  trustworthy machine learning, deep learning for electronic health records, and the translation
  of artificial intelligence into emergency and prehospital care. A key focus of his current work
  involves developing fair, accountable, and transparent generative AI models and large
  language models tailored for global health challenges. He serves on the program committees
  and editorial boards for major AI and biomedical outlets, including PLOS Medicine and npj
  Digital Medicine, advancing responsible AI applications across international healthcare
  systems.
                    </div>


                  </div>
                </div>
              </div>
            </div>
            <div className="speaker_list mb-4">
              <div className="row align-items-center">
                <div className="col-lg-3">
                  <div className="row">
                    <div className="col-lg-12"><Image src="/images/speakers/YilinNing3.png" className="img-fluid" alt="" width={500} height={500} /></div>
                    <div className="col-lg-12">
                      <div className="title_box">
                        <div className="row">
                          <div className="col-lg-12 heading19_white">Dr. Yilin Ning</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="row">
                    <div className="col-lg-12 heading19_black mb-2 mt-4">Title: <span>Keynote Speaker</span></div>
                    <div className="col-lg-12 heading19_black mb-2">Affiliation: <span>Senior Research Fellow, Centre for Biomedical Data Science & DAISI, Duke-NUS Medical School</span></div>
                    <div className="col-lg-12 heading19_black mb-2">Expertise & Summary:</div>
                    <div className="col-lg-12 mb-2">
                      Dr. Yilin Ning is a Senior Research Fellow at Duke-NUS Medical School specializing in
  ethical AI, biostatistics, and explainable machine learning in healthcare. Her research focuses
  on operationalizing trust in medical AI, developing internationally recognized frameworks
  such as CARE-AI for healthcare implementation and the TREGAI checklist for generative AI
  transparency. She leads landmark work on mitigating algorithmic bias, advancing fairness-
  aware survival modeling, and establishing clinical risk prediction models. Dr. Ning
  frequently publishes high-impact research in journals such as Nature Medicine, The Lancet
  Digital Health, and Patterns, shaping global governance and standards for responsible AI
  deployment in medicine.
                    </div>


                  </div>
                </div>
              </div>
            </div>
            <div className="speaker_list mb-4">
              <div className="row flex-row-reverse align-items-center">
                <div className="col-lg-3">
                  <div className="row">
                    <div className="col-lg-12"><Image src="/images/speakers/MarkLewis3.png" className="img-fluid" alt="" width={500} height={500} /></div>
                    <div className="col-lg-12">
                      <div className="title_box">
                        <div className="row">
                          <div className="col-lg-12 heading19_white">Mr. Mark Lewis</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="row">
                    <div className="col-lg-12 heading19_black mb-2 mt-4">Affiliation: <span>Solix Technologies</span></div>
                    <div className="col-lg-12 heading19_black mb-2">Session Type: <span>Panelist</span></div>
                    <div className="col-lg-12 heading19_black mb-2">Bio & Key Areas of Expertise:</div>
                    <div className="col-lg-12 mb-2">
                      Mr. Mark Lewis is a senior enterprise data strategist and domain expert representing Solix
  Technologies. His core expertise lies in AI-ready data governance, quality assurance, and
  building enterprise data management frameworks. He specializes in utilizing Application
  Knowledge Graphs to map complex metadata structures, streamline data assurance, and
  maintain strict data lineage across large-scale enterprise environments. With deep industry
  experience in enterprise archiving and modern data security practices, he helps organizations
  bridge the gap between compliance requirements and advanced AI deployments. His work
  focuses on establishing robust data pipelines that ensure metadata accuracy, regulatory
  transparency, and high-quality inputs for generative AI systems.
                    </div>


                  </div>
                </div>
              </div>
            </div>
            <div className="speaker_list mb-4">
              <div className="row align-items-center">
                <div className="col-lg-3">
                  <div className="row">
                    <div className="col-lg-12"><Image src="/images/speakers/DasmitSingh3.png" className="img-fluid" alt="" width={500} height={500} /></div>
                    <div className="col-lg-12">
                      <div className="title_box">
                        <div className="row">
                          <div className="col-lg-12 heading19_white">Dr. Dasmit Singh</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="row">
                    <div className="col-lg-12 heading19_black mb-2 mt-4">Affiliation: <span>Professor & Head of Pediatric Surgery; Secretary, CURIE (Center for Undergraduate Research, Innovation & Enterprise), Symbiosis Medical College for Women (SMCW)</span></div>
                    <div className="col-lg-12 heading19_black mb-2">Session Type: <span>Keynote & Hackathon Briefing</span></div>
                    <div className="col-lg-12 heading19_black mb-2">Bio & Key Areas of Expertise:</div>
                    <div className="col-lg-12 mb-2">
                      Dr. Dasmit Singh is a senior pediatric surgeon, medical educator, and Secretary of CURIE at
  Symbiosis Medical College for Women (SMCW). With over three decades of clinical
  expertise, he actively promotes interdisciplinary medical technology research, clinical device
  incubation, and student entrepreneurship across healthcare domains. He specializes in guiding
  aspiring clinical innovators through prototype validation, clinical translation, and structured
  hackathon frameworks to tackle real-world health challenges. Through his leadership at
  CURIE, Dr. Singh works to build sustainable mentoring networks that bridge clinical practice
  with engineering and modern technology. His keynote session will outline key trends across
  India’s MedTech ecosystem while introducing the official hackathon rules and team
  formation guidelines.
                    </div>


                  </div>
                </div>
              </div>
            </div>
            <div className="speaker_list mb-4">
              <div className="row flex-row-reverse align-items-center">
                <div className="col-lg-3">
                  <div className="row">
                    <div className="col-lg-12"><Image src="/images/speakers/SunilKumarBarnwal3.png" className="img-fluid" alt="" width={500} height={500} /></div>
                    <div className="col-lg-12">
                      <div className="title_box">
                        <div className="row">
                          <div className="col-lg-12 heading19_white">Shri Sunil Kumar Barnwal (IAS)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="row">
                    <div className="col-lg-12 heading19_black mb-2 mt-4">Affiliation: <span>Chief Executive Officer (CEO), National Health Authority (NHA)</span></div>
                    <div className="col-lg-12 heading19_black mb-2">Session Type: <span>Keynote Speaker</span></div>
                    <div className="col-lg-12 heading19_black mb-2">Bio & Key Areas of Expertise:</div>
                    <div className="col-lg-12 mb-2">
                      Shri Sunil Kumar Barnwal, IAS, serves as the Chief Executive Officer of the National Health
  Authority (NHA), leading India’s flagship digital health ecosystem initiatives. His leadership
  centers on scaling the Ayushman Bharat Digital Mission (ABDM) and Ayushman Bharat
  Pradhan Mantri Jan Arogya Yojana (AB-PMJAY) to deliver equitable, tech-driven healthcare
  access to over a billion citizens. With extensive senior administrative leadership in
  government policymaking, digital governance, and public administration, he specializes in
  building interoperable public tech infrastructure. His core expertise includes orchestrating
  large-scale digital transformation, implementing secure health data exchange protocols, and
  driving public-private healthtech integrations. Through his strategic vision at the NHA, he
  spearheads universal digital health identification, seamless electronic health records
  management, and nationwide digital health adoption.
                    </div>


                  </div>
                </div>
              </div>
            </div>
            <div className="speaker_list mb-4">
              <div className="row align-items-center">
                <div className="col-lg-3">
                  <div className="row">
                    <div className="col-lg-12"><Image src="/images/speakers/KavithaRajshekhar3.png" className="img-fluid" alt="" width={500} height={500} /></div>
                    <div className="col-lg-12">
                      <div className="title_box">
                        <div className="row">
                          <div className="col-lg-12 heading19_white">Dr. Kavitha Rajshekhar</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="row">
                    <div className="col-lg-12 heading19_black mb-2 mt-4">Affiliation: <span>Department of Health Research (DHR), Ministry of Health and Family Welfare, Government of India</span></div>
                    <div className="col-lg-12 heading19_black mb-2">Session Type: <span>Keynote Speaker</span></div>
                    <div className="col-lg-12 heading19_black mb-2">Keynote Topic: <span>Cost effectiveness in healthcare innovation</span></div>
                    <div className="col-lg-12 heading19_black mb-2">Bio & Key Areas of Expertise :</div>
                    <div className="col-lg-12 mb-2">
                      Dr. Kavitha Rajshekhar is a scientist and policymaker at the Department of Health Research
  (DHR), Ministry of Health and Family Welfare, Government of India. She plays a pivotal
  role in leading national Health Technology Assessment (HTA) frameworks, guiding
  evidence-based policy for affordable medical innovation across India. Her primary expertise
  encompasses economic evaluations of healthcare technologies, health benefit package
  pricing, and comparative cost-effectiveness research. She specializes in optimizing resource
  allocation to ensure that high-impact clinical tools and digital health innovations achieve
  sustainable scale within public health systems. Through her work with HTAIn, she bridges
  research and national policy to improve financial risk protection and health outcomes for
  universal health coverage.
                    </div>


                  </div>
                </div>
              </div>
            </div>
            <div className="speaker_list mb-4">
              <div className="row flex-row-reverse align-items-center">
                <div className="col-lg-3">
                  <div className="row">
                    <div className="col-lg-12"><Image src="/images/speakers/RahulGupta3.png" className="img-fluid" alt="" width={500} height={500} /></div>
                    <div className="col-lg-12">
                      <div className="title_box">
                        <div className="row">
                          <div className="col-lg-12 heading19_white">Dr. Rahul Gupta</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="row">
                    <div className="col-lg-12 heading19_black mb-2 mt-4">Affiliation: <span>GATC Health Corporation</span></div>
                    <div className="col-lg-12 heading19_black mb-2">Session Type: <span>Keynote Speaker</span></div>
                    <div className="col-lg-12 heading19_black mb-2">Bio & Key Areas of Expertise:</div>
                    <div className="col-lg-12 mb-2">
                      Dr. Rahul Gupta is a physician executive, public health leader, and President of GATC
  Health. His work focuses on integrating artificial intelligence, advanced multiomics, and
  predictive analytics to revolutionize early-stage drug discovery and safety modeling. A
  former White House Director of the Office of National Drug Control Policy and state health
  commissioner, he brings deep expertise in regulatory policy, pharmacology, and clinical
  governance. He specializes in pioneering non-animal AI toxicity testing platforms that
  accelerate preclinical drug evaluation while accurately predicting human biological
  responses. Through his executive leadership, Dr. Gupta advocates for next-generation
  translational platforms that reduce trial failures and enhance pharmaceutical innovation
  standards.
                    </div>


                  </div>
                </div>
              </div>
            </div>
            <div className="speaker_list mb-4">
              <div className="row align-items-center">
                <div className="col-lg-3">
                  <div className="row">
                    <div className="col-lg-12"><Image src="/images/speakers/DonaldIngber3.png" className="img-fluid" alt="" width={500} height={500} /></div>
                    <div className="col-lg-12">
                      <div className="title_box">
                        <div className="row">
                          <div className="col-lg-12 heading19_white">Dr. Donald E. Ingber, M.D., Ph.D.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="row">
                    <div className="col-lg-12 heading19_black mb-2 mt-4">Affiliation: <span>Founding Director & Core Faculty, Wyss Institute for Biologically Inspired Engineering at Harvard University; Judah Folkman Professor of Vascular Biology, Harvard Medical School & Boston Children's Hospital</span></div>
                    <div className="col-lg-12 heading19_black mb-2">Session Type: <span>Keynote Speaker</span></div>
                    <div className="col-lg-12 heading19_black mb-2">Bio & Key Areas of Expertise:</div>
                    <div className="col-lg-12 mb-2">
                      Dr. Donald E. Ingber, M.D., Ph.D., is a pioneer in the fields of bioinspired engineering,
  mechanobiology, and microfluidic tissue engineering. As the Founding Director of Harvard’s
  Wyss Institute, he led the breakthrough development of human Organ-on-a-Chip
  technology—microengineered devices lined with living human cells that replicate complex
  living organ structures and physiological mechanics. His research focuses on deploying
  organ-chips for human disease modeling, rapid drug discovery, toxicity screening, and
  personalized precision medicine platforms. Dr. Ingber holds over 100 patents and has
  authored more than 500 publications, earning elections to the National Academy of Medicine,
  National Academy of Engineering, National Academy of Inventors, and the American
  Academy of Arts and Sciences. His work bridges physical engineering and cell biology to
  transform preclinical drug testing and accelerate therapeutic translation while reducing
  reliance on animal models.
                    </div>


                  </div>
                </div>
              </div>
            </div>
            <div className="speaker_list mb-4">
              <div className="row flex-row-reverse align-items-center">
                <div className="col-lg-3">
                  <div className="row">
                    <div className="col-lg-12"><Image src="/images/speakers/RakeshKalapala3.png" className="img-fluid" alt="" width={500} height={500} /></div>
                    <div className="col-lg-12">
                      <div className="title_box">
                        <div className="row">
                          <div className="col-lg-12 heading19_white">Dr. Rakesh Kalapala</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="row">
                    <div className="col-lg-12 heading19_black mb-2 mt-4">Affiliation: <span>VP & Director, Centre for AI and Innovation, AIG Hospitals</span></div>
                    <div className="col-lg-12 heading19_black mb-2">Session Type: <span>Keynote Speaker</span></div>
                    <div className="col-lg-12 heading19_black mb-2">Bio & Key Areas of Expertise:</div>
                    <div className="col-lg-12 mb-2">
                      Dr. Rakesh Kalapala is a senior clinician and Vice President & Director at the Centre for AI
  and Innovation, AIG Hospitals. His expertise centers on integrating artificial intelligence,
  predictive operational analytics, and digital health tools directly into acute clinical
  workflows. He specializes in deploying AI-driven hospital management solutions that
  optimize patient throughput, reduce emergency room wait times, and streamline capacity
  planning across high-volume healthcare settings. With deep experience in therapeutic
  endoscopy and clinical innovation, he bridges complex data architecture with real-world
  medical logistics to enhance clinical efficiency. Through his leadership at AIG Hospitals, Dr.
  Kalapala advances responsible AI implementation to improve healthcare accessibility, patient
  safety, and operational performance in modern hospital environments.
                    </div>


                  </div>
                </div>
              </div>
            </div>
            <div className="speaker_list mb-4">
              <div className="row align-items-center">
                <div className="col-lg-3">
                  <div className="row">
                    <div className="col-lg-12"><Image src="/images/speakers/MohitBhandari3.png" className="img-fluid" alt="" width={500} height={500} /></div>
                    <div className="col-lg-12">
                      <div className="title_box">
                        <div className="row">
                          <div className="col-lg-12 heading19_white">Dr. Mohit Bhandari</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="row">
                    <div className="col-lg-12 heading19_black mb-2 mt-4">Affiliation: <span>Founder & Director, Mohak Bariatrics and Robotics; President, IRCAD India</span></div>
                    <div className="col-lg-12 heading19_black mb-2">Session Type: <span>Keynote Speaker</span></div>
                    <div className="col-lg-12 heading19_black mb-2">Bio & Key Areas of Expertise:</div>
                    <div className="col-lg-12 mb-2">
                      Dr. Mohit Bhandari is a world-renowned bariatric, metabolic, and robotic surgeon,
  recognized as a global pioneer in minimally invasive and robotic-assisted surgery. As the
  Founder & Director of Mohak Bariatrics & Robotics and President of IRCAD India, he has
  performed over 45,000 metabolic and bariatric procedures, making him one of the most
  experienced robotic surgeons globally. He is a trailblazer in telesurgery, having executed
  groundbreaking long-distance transcontinental robotic surgeries using advanced dual-robot
  systems and local AI integrations. His core expertise lies in deploying artificial intelligence to
  enhance robotic console precision, optimize surgical workflows, and advance automated risk
  prediction in complex metabolic interventions. Through his leadership, Dr. Bhandari
  continuously drives the development of next-generation robotic surgical training, telesurgical
  infrastructure, and AI-enabled clinical safety standards.
                    </div>


                  </div>
                </div>
              </div>
            </div>
            <div className="speaker_list mb-4">
              <div className="row flex-row-reverse align-items-center">
                <div className="col-lg-3">
                  <div className="row">
                    <div className="col-lg-12"><Image src="/images/speakers/AlejandroSosnik3.png" className="img-fluid" alt="" width={500} height={500} /></div>
                    <div className="col-lg-12">
                      <div className="title_box">
                        <div className="row">
                          <div className="col-lg-12 heading19_white">Prof. Alejandro Sosnik</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="row">
                    <div className="col-lg-12 heading19_black mb-2 mt-4">Affiliation: <span>Laboratory of Pharmaceutical Nanomaterial Science, Department of Materials Science & Engineering, Technion – Israel Institute of Technology</span></div>
                    <div className="col-lg-12 heading19_black mb-2">Session Type: <span>Keynote Speaker</span></div>
                    <div className="col-lg-12 heading19_black mb-2">Bio & Key Areas of Expertise:</div>
                    <div className="col-lg-12 mb-2">
                      Prof. Alejandro Sosnik is a Full Professor of Materials Science and Engineering at Technion
  – Israel Institute of Technology, where he leads the Laboratory of Pharmaceutical
  Nanomaterial Science. His research lies at the intersection of polymer chemistry, biomaterials
  science, and nanomedicine, with a focus on designing smart polymeric and hybrid drug
  delivery vehicles. He specializes in engineering self-assembled nanocarriers—including
  polymeric micelles, nanogels, and hydrogels—to overcome complex biological barriers like
  mucosal surfaces and the blood-brain barrier. His work advances targeted drug release
  strategies for challenging therapies, such as nose-to-brain delivery, cancer treatment, and
  poverty-related infectious diseases. Through his expertise in macromolecular design and
  translation, Prof. Sosnik pioneers next-generation nanotherapeutic platforms that enhance the
  bioaccessibility, stability, and therapeutic index of hydrophobic and sensitive drug
  compounds.
                    </div>


                  </div>
                </div>
              </div>
            </div>
            <div className="speaker_list mb-4">
              <div className="row align-items-center">
                <div className="col-lg-3">
                  <div className="row">
                    <div className="col-lg-12"><Image src="/images/speakers/JanaKainerstorfer3.png" className="img-fluid" alt="" width={500} height={500} /></div>
                    <div className="col-lg-12">
                      <div className="title_box">
                        <div className="row">
                          <div className="col-lg-12 heading19_white">Dr. Jana M. Kainerstorfer</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="row">
                    <div className="col-lg-12 heading19_black mb-2 mt-4">Affiliation: <span>Associate Professor of Biomedical Engineering, Carnegie Mellon University</span></div>
                    <div className="col-lg-12 heading19_black mb-2">Session Type: <span>Keynote Speaker</span></div>
                    <div className="col-lg-12 heading19_black mb-2">Bio & Key Areas of Expertise:</div>
                    <div className="col-lg-12 mb-2">
                      Dr. Jana M. Kainerstorfer is an Associate Professor of Biomedical Engineering at Carnegie
  Mellon University and Principal Investigator of the Biophotonics Lab. Her research
  specializes in non-invasive biophotonic imaging, near-infrared spectroscopy (NIRS), and
  optical sensing modalities for continuous hemodynamic monitoring. As a leader on the
  OMEGA project, she pioneers advanced transabdominal fetal pulse oximetry and non-
  invasive optical tools to continuously assess fetal physiology and oxygenation during labor.
  Her work bridges biophotonics, signal processing algorithms, and translational medical
  devices to transform non-invasive diagnostics in maternal-fetal health and critical care.
                    </div>


                  </div>
                </div>
              </div>
            </div>
            <div className="speaker_list mb-4">
              <div className="row flex-row-reverse align-items-center">
                <div className="col-lg-3">
                  <div className="row">
                    <div className="col-lg-12"><Image src="/images/speakers/srinivas3.png" className="img-fluid" alt="" width={500} height={500} /></div>
                    <div className="col-lg-12">
                      <div className="title_box">
                        <div className="row">
                          <div className="col-lg-12 heading19_white">Dr. M. Srinivas</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="row">
                    <div className="col-lg-12 heading19_black mb-2 mt-4">Affiliation: <span>Member (Health), NITI Aayog; Former Director, AIIMS New Delhi</span></div>
                    <div className="col-lg-12 heading19_black mb-2">Session Type: <span>Keynote Speaker</span></div>
                    <div className="col-lg-12 heading19_black mb-2">Bio & Key Areas of Expertise:</div>
                    <div className="col-lg-12 mb-2">
                      Dr. M. Srinivas is a distinguished pediatric surgeon, medical administrator, and Member
  (Health) at NITI Aayog, Government of India. As the former Director & CEO of AIIMS New
  Delhi, he led key digital transformation initiatives, embedding AI-driven administrative and
  clinical workflows across complex tertiary healthcare systems. His primary expertise
  encompasses healthcare policy formulation, large-scale medical infrastructure development,
  digital health ecosystem modernization, and institutional governance. With over three
  decades of clinical, academic, and policy leadership, he specializes in creating regulatory and
  policy pathways that bridge cutting-edge MedTech innovations with public health delivery.
  Through his national policy role at NITI Aayog, Dr. Srinivas drives strategic frameworks for
  responsible AI adoption, scalable healthcare technology integration, and sustainable health
  systems for a future-ready India
                    </div>


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