"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Speaker = {
  name: string;
  role: string;
  title: string;
  image: string;
  content: string;
};

const speakers: Speaker[] = [
  { 
    name: "Dr Dasmit Singh Khokar", 
    role: "Keynote Speaker", 
    title: "Paediatric Surgeon & Surgical Innovator, Pune, India", 
    image: "DasmitSingh.png",
    content: "- Ranked first at the University of Poona in MS (General Surgery); completed MCh in Paediatric Surgery in 1993. - Former Professor and Head of Paediatric Surgery at B. J. Government Medical College, Pune.•	A pioneer in paediatric endoscopic surgery, with expertise in paediatric urology and minimally invasive surgery.•	Developed innovative surgical techniques and contributed to medical-device innovation.•	Author of 200+ scientific lectures and publications, with multiple conference paper awards.•	Has held leadership roles in paediatric surgical associations and mentors healthcare innovators through medical hackathons.",
  },
  { 
    name: "Prof. (Dr) Ramakrishnan Raman", 
    role: "Keynote Speaker", 
    title: "Vice Chancellor, SIU", 
    image: "RamakrishnanRaman.png",
    content: "•	Holds a Bachelor’s degree in Computer Science and Engineering, an MBA in Systems and Marketing, and a PhD in Management from Pune University.•	Over two decades of experience across corporate, academic and research domains.•	Has served Symbiosis as Director of the Symbiosis Centre for Information Technology and of SIBM Pune, Dean of the Faculty of Management, and Director – Strategy & Development.•	Research interests include Information Systems, IT Strategy, Entrepreneurship, AI and Big Data, with papers in Scopus and Web of Science indexed journals.•	Built international collaborations with universities in Japan, Canada, the United Kingdom and the United States.	Honorary Professor at Aston University’s Aston India Centre for Applied Research (term ending 2027); appointed to University Grants Commission committees in 2024.",
  },
  { 
    name: "Dr Rakesh Kalapala", 
    role: "Keynote Speaker", 
    title: "Gastroenterologist & Director of Endoscopy, AIG Hospitals, Hyderabad, India", 
    image: "RakeshKalapala.png" ,
    content: "•	Senior Consultant Gastroenterologist and Director of Endoscopy at the Centre for Obesity and Metabolic Therapy, AIG Hospitals, Hyderabad.•	MBBS, MD (General Medicine) and DNB (Gastroenterology); 15+ years of experience in advanced endoscopy, including ERCP, endoscopic ultrasound and colonoscopy, with bariatric endoscopy as his focus.•	Skilled in endobariatric procedures such as intragastric balloons, endoscopic sleeve gastroplasty and duodenal-jejunal bypass liners.•	Principal Investigator on several studies on obesity, type 2 diabetes and NASH.•	Young Investigator Award at the Asian Neurogastroenterology & Motility Association (2011); Fellow of ASGE, the Japanese Gastrointestinal Endoscopic Society and the Society of Gastrointestinal Endoscopy of India.•	Appointed Associate Editor of iGIE, the official journal of the American Society for Gastrointestinal Endoscopy.",
  },
  { 
    name: "Dr Sumer Sethi", 
    role: "Panelist", 
    title: "Radiologist, Founder – DAMS", 
    image: "SumerSethi.png" ,
    content: "•	Radiologist, entrepreneur, blogger, innovator and TEDx speaker who has mentored lakhs of medical graduates over two decades.•	Founder of the Delhi Academy of Medical Sciences (DAMS), a leading medical education academy in India; a topper in the AIPG and AIIMS PG entrance exams himself.•	Founded TeleRad Providers, a remote radiology interpretation service.•	Author of the bestselling undergraduate textbook ‘Review of Radiology’ and of ‘Fire in the Belly’.•	Pioneer of radiology blogging: his blog was the first, and became the most visited, radiology blog in the world, and he coined the term “radblogging”.•	Named among the Top 25 Most Influential Radiologists by RT Image (2007), in Dailyrounds’ Iconic Doctors list (2016), and among AuntMinnie’s top global radiology educators (2017–19).",
  },
  { 
    name: "Dr (Brig.) Suman Pramanik", 
    role: "Debate", 
    title: "Professor & Head, Department of Medicine, AFMC, Pune", 
    image: "noimg.png" ,
    content: "•	Brigadier; Professor and Head of the Department of Internal Medicine at the Armed Forces Medical College (AFMC), Pune.•	MBBS, MD (General Medicine) and DM (Clinical Haematology).•	Areas of interest include haematology, stem cell transplantation, research methodology, artificial intelligence and computational medicine.•	Mentor to the AFMC Students’ Scientific Society and a guest expert on the MedPOD AFMC podcast.",
  },
  { 
    name: "Dr Ashish Rawandale-Patil", 
    role: "Panelist", 
    title: "Urologist, Dhule, Maharashtra, India", 
    image: "AshishRawandalePatil.png" ,
    content: "•	Chief Urologist and Director of the Institute of Urology, Dhule, Maharashtra; Chairman and Managing Director of Tejnaksh Healthcare Ltd.•	Holds a Guinness World Record for the most kidney stones removed from a single patient: 172,155 stones, removed endoscopically on 8 December 2009.•	His Institute of Urology, Dhule, also recorded the then-largest kidney removed from a patient (2.14 kg, 2011).•	Executive Member of the Urological Society of India and of the Research Board of Maharashtra University of Health Sciences.•	Trustee and Secretary of ACPM Medical College.",
  },
  { 
    name: "Dr. Sridhar Bodapati", 
    role: "Panelist", 
    title: "Paediatrician, Healthcare IT Leader & Founder – EdQueries", 
    image: "SridharBodapati.png" ,
    content: "•	A medical doctor and healthcare technology professional working at the intersection of medicine, digital health, artificial intelligence and education.•	Founder and CEO of EdQueries, a digital learning platform focused on inclusive education and supporting children with special educational needs.•	Brings expertise in healthcare IT, electronic medical records (EMR), e-prescribing and pharmacovigilance, with a focus on integrating technology into clinical workflows.•	Guest faculty at the Institute of Health Management Research, Bangalore (IIHMR-B), where he teaches AI and Data Science, healthcare innovation and practical applications of emerging technologies.•	Actively involved in AI education and digital health initiatives, helping healthcare professionals understand and adopt AI tools responsibly to improve productivity, learning and healthcare delivery.•	Advocates the use of technology to bridge healthcare and education, with a focus on practical innovation, accessibility and inclusive learning.",
  },
  { 
    name: "Dr A. V. S. Suresh", 
    role: "Moderator", 
    title: "Medical Oncologist & Haematologist, Hyderabad, India", 
    image: "AVSSuresh.png" ,
    content: "•	Medical Oncologist and Haematologist at Continental Hospitals, Hyderabad, with 15+ years of experience treating solid and haematological cancers.•	MBBS and MD (Medicine) from the Institute of Medical Sciences, Banaras Hindu University, with further training in medical oncology.•	Achievements include India’s first autologous transplant using GM-CSF and Andhra Pradesh’s first haplo-identical transplant; his team has performed over 1,500 transplants of all kinds.•	Author of 84+ publications in international journals and a reviewer for journals including the American Journal of Clinical Oncology and Leukemia Research.•	Awards include the AACR Scholar-in-Training Award (2007), the ESMO Young Oncologist Supportive Award for developing nations (2008) and a Department of Science and Technology, Govt. of India award (2006).•	Has contributed to 85+ clinical research projects and served on international steering committees and data safety monitoring boards.",
  },
  { 
    name: "Dr Ashlesha Kelkar", 
    role: "Moderator", 
    title: "Vertical Lead – Digital Health Community Medicine", 
    image: "AshleshaKelkar.png" ,
    content: "•	Major (Retd.), Army Medical Corps veteran and public health expert; MBBS, MD (Community Medicine), MIPHA and FRSPH.•	Associate Professor of Community Medicine at MGM Medical College, Navi Mumbai, and Associate Professor / Consultant in Digital Health at Maharashtra University of Health Sciences (MUHS), Nashik.•	Digital health lead at CHAKRA (Centre for Health Applied Knowledge and Research Autonomy), MUHS; supported the MUHS digital health course for over 450 medical colleges in Maharashtra.•	Secretary of the Indian College of AI in Medicine and an editorial board member of HealthGuard: Health and Preventive Medicine Research.•	Certificates in digital health from Harvard Business School Online and Yale SOM.•	Honours include service medals for her work in Jammu & Kashmir, the Sanjeevani Sanman (Zee Yuva Gaurav Puraskar) and an international fellowship in Nonviolence and Peace.",
  },
  { 
    name: "Gp Capt (Dr) S. A. Raheem", 
    role: "Panelist", 
    title: "Radiologist, Associate Professor - Armed Forces Medical College (AFMC), Pune", 
    image: "SARaheem.png" ,
    content: "•	A specialist in Radiodiagnosis with academic and research experience at the Armed Forces Medical College, Pune.•	Serves as Associate Professor in Radiology and Officer-in-Charge of the Armed Forces Centre for Computational Medicine (AFCCM).•	His work focuses on integrating artificial intelligence, deep learning and computational methods into medical imaging and diagnostic applications.•	Contributes to research in AI-enabled radiology, including the development of computational tools for analysing CT and MRI images.•	Combines clinical radiology expertise with medical research and technology-driven innovation to advance diagnostic capabilities and computational medicine.",
  },
  { 
    name: "Dr Arun Jamkar", 
    role: "Moderator", 
    title: "Distinguished Professor | Healthcare Innovation & Medical Education Symbiosis International (Deemed University), Pune, India", 
    image: "ArunJamkar.png" ,
    content: "•	Surgeon (MS) and Ex-Vice Chancellor of Maharashtra University of Health Sciences (MUHS), Nashik.•	Distinguished Professor at Symbiosis International (Deemed University), Pune, and Healthcare Consultant at Persistent Systems; IEEE Senior Member.•	Lifetime Achievement Awards from MEU India and from the Research Society of B. J. Government Medical College & Sassoon General Hospitals, Pune.•	Delivered the Dr Rita Memorial Oration on “Mirror neurons and surgical education” (MEU India, 2022).•	Received the Excellence in Sports in Higher Education award at the AIU West Zone Vice Chancellors’ meet (2018).",
  },
];

const speakerContentLines = (content: string) =>
  content
    .split(/^\s*-\s+|\s*•\s*|\s+-\s+/)
    .map((line) => line.trim())
    .filter(Boolean);

const SpeakersPage = () => {
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  useEffect(() => {
    if (!selectedSpeaker) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedSpeaker(null);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedSpeaker]);

  return (
    <main>
      <div className="speakers_page_mainbox mb-0 position_box">
        <section className="mb-5 pt-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 heading35_black mb-4 text-center">Speakers & Experts</div>
            </div>
            <div className="row g-4">
              {speakers.map((speaker) => (
                <div className="col-xl-3 col-lg-4 col-sm-6" key={speaker.name}>
                  <div className="speaker_card">
                    <div className="speaker_card_img">
                      <Image src={`/images/speakers/${speaker.image}`} alt={speaker.name} width={300} height={100} />
                    </div>
                    <div className="speaker_card_body">
                      <div className="speaker_card_role">{speaker.role}</div>
                      <div className="speaker_card_name">{speaker.name}</div>
                      <div className="speaker_card_title">{speaker.title}</div>
                      <div className="speaker_card_btn" onClick={() => setSelectedSpeaker(speaker)}>Click Here</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {selectedSpeaker && (
        <div className="speaker_popup_overlay" onClick={() => setSelectedSpeaker(null)}>
          <div
            className="speaker_popup"
            role="dialog"
            aria-modal="true"
            aria-labelledby="speaker-popup-name"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="speaker_popup_close"
              aria-label="Close"
              onClick={() => setSelectedSpeaker(null)}
            >
              ×
            </button>
            <div className="row">
              <div className="col-lg-4 text-center">
                <Image src={`/images/speakers/${selectedSpeaker.image}`} className="img-fluid" style={{borderRadius:"20px"}} alt={selectedSpeaker.name} width={420} height={420} />
                <div className="speaker_card_role">{selectedSpeaker.role}</div>
              </div>
              <div className="col-lg-8 pt-3">
                <div className="row" id="speaker-popup-name">
                  <div className="col-lg-12 heading19_black mb-2">{selectedSpeaker.name}</div>
                  <div className="col-lg-12">
                    {speakerContentLines(selectedSpeaker.content).map((line, index) => (
                      <span key={index}>
                        {index > 0 &&  ""}
                        {line}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      )}
    </main>
  );
};

export default SpeakersPage;
