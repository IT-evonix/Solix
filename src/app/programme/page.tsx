import Image from "next/image";


type Session = {
  time: string;
  type?: string;
  title?: string;
  people?: string[];
};

type ProgrammeDay = {
  id: string;
  heading: string;
  color: string;
  sessions: Session[];
};

const days: ProgrammeDay[] = [
  {
    id: "day-1",
    heading: "DAY 1  |  THURSDAY, 10 DECEMBER 2026",
    color: "#E7470B",
    sessions: [
      { time: "8:00–9:00 AM", type: "LOGISTICS", title: "Networking breakfast and check-in" },
      {
        time: "9:00–9:45 AM",
        type: "CEREMONY",
        title: "Inauguration and Welcome Address",
        people: ["Provost, FoMHS, SIU", "President, Solix Technologies", "Chancellor, SIU"],
      },
      {
        time: "9:45–10:15 AM",
        type: "KEYNOTE",
        title: "AI-Ready People – Knowledge in the New Age",
        people: ["Dr R. Raman, Vice Chancellor, SIU"],
      },
      {
        time: "10:15–10:45 AM",
        type: "KEYNOTE",
        title: "Big Data in Healthcare from a Physician’s Perspective",
        people: ["Dr Shiv Kumar Sarin"],
      },
      { time: "10:45–11:00 AM", type: "TEA BREAK" },
      {
        time: "11:00–11:30 AM",
        type: "KEYNOTE",
        title: "Generative AI in Global Health",
        people: ["Assoc Prof Liu Nan – Duke-NUS"],
      },
      {
        time: "11:30 AM–12:00 PM",
        type: "KEYNOTE",
        title: "Trust By Design: Ethics, transparency and explainability in Healthcare AI",
        people: ["Dr Ning Yiling, Duke-NUS"],
      },
      {
        time: "12:00–12:50 PM",
        type: "PANEL",
        title: "AI-Ready Governance: Data Governance / Assurance / QA with Application Knowledge Graph",
        people: ["Solix team (Mr Mark L)"],
      },
      {
        time: "12:50–1:30 PM",
        type: "KEYNOTE AND SESSION",
        title: "MedTech Innovation Ecosystem in India, and reveal of hackathon rules of team formation",
        people: ["Dr Dasmit Singh", "Aakanksha Ringsia, Secretary, CURIE, SMCW"],
      },
      { time: "1:30–2:00 PM", type: "LUNCH BREAK" },
      {
        time: "2:00–2:50 PM",
        type: "PANEL",
        title: "Beyond Efficiency: How Agentic AI Creates Enterprise Value Across Pharma and Other Industry Workflows",
      },
      {
        time: "2:50–3:40 PM",
        type: "PANEL",
        title: "Building a Resilient Agentic Foundation for Enterprises",
      },
      { time: "3:40–4:00 PM", type: "TEA BREAK" },
      { time: "4:00–4:50 PM", type: "PANEL", title: "AI and data preservation" },
      { time: "4:50–5:00 PM", type: "CEREMONY", title: "Day 1 closing" },
      { time: "Evening", type: "LOGISTICS", title: "Networking dinner" },
    ],
  },
  {
    id: "day-2",
    heading: "DAY 2  |  FRIDAY, 11 DECEMBER 2026",
    color: "#107F44",
    sessions: [
      { time: "8:00–9:00 AM", type: "LOGISTICS", title: "Networking breakfast and check-in" },
      {
        time: "9:00–9:30 AM",
        type: "KEYNOTE",
        title: "Ayushman Bharat Digital Mission: Overview of the Largest Digital Public Health Infrastructure in the World",
        people: ["Dr Sunil Kumar Barnwal, CEO, NHA"],
      },
      {
        time: "9:30–10:20 AM",
        type: "PANEL",
        title: "Managing Large Healthcare Data Systems",
        people: [
          "Moderator: Dr Arvind Sivaramakrishnan, CTO, Asia Healthcare",
          "Panelist: Dr B. Sridhar",
          "Panelist: Maj Gen Atul Kotwal Holdings; former Group CIO, Apollo Hospitals",
        ],
      },
      { time: "10:20–10:30 AM", type: "TEA BREAK" },
      {
        time: "10:30–11:00 AM",
        type: "KEYNOTE",
        title: "Cost effectiveness in healthcare innovation",
        people: ["Dr Kavita Rajshekhar"],
      },
      { time: "11:20–11:30 AM", type: "Tea break" },
      {
        time: "11:30 AM–12:00 PM",
        type: "KEYNOTE",
        title: "Future of Drug Toxicity Testing",
        people: ["Dr Rahul Gupta, Director, GATC Health"],
      },
      {
        time: "12:00–12:30 PM",
        type: "KEYNOTE",
        title: "Organ-on-chips: applications in disease modelling, drug discovery and precision medicine",
        people: ["Dr Donald E. Ingber, Harvard University"],
      },
      { time: "12:30–1:00 PM", type: "BREAK", title: "Lunch" },
      {
        time: "1:00–1:30 PM",
        type: "KEYNOTE",
        title: "How AI Improves Patient Flow in a Busy Hospital",
        people: ["Dr Rakesh Kalapala, VP & Director, Centre for AI and Innovation, AIG Hospitals"],
      },
      {
        time: "1:30–2:00 PM",
        type: "PANEL",
        title: "AI in Clinical Outcomes: applications for improving clinical outcomes",
        people: [
          "Moderator: Dr Ashlesha Kelkar",
          "Panelist: Dr Keerthi Vijayan, SRM Institute of Science and Technology, Chennai",
          "Dr Gp Capt Abdul Raheem (HOD Radiology, AFMC)",
          "Panelist: Dr Vijay Raghavan, High Fidelity Simulations, Global Surgical Institute",
          "Dr Sudha Jasmine Rajan (CMC Vellore)",
        ],
      },
      {
        time: "2:00–2:30 PM",
        type: "KEYNOTE",
        title: "AI Revolution in Robotic Surgery",
        people: ["Dr Mohit Bhandari"],
      },
      {
        time: "2:30–3:00 PM",
        type: "DEBATE",
        title: "AI in Medical Education: Boon or Bane?",
        people: [
          "Moderator: Dr Arun Jamkar",
          "For: Dr Avinash Supe",
          "Against: Dr (Brig.) Pramanik, HOD Medicine, AFMC.",
        ],
      },
      { time: "3:00–3:10 PM", type: "BREAK", title: "Tea" },
      {
        time: "3:10–4:00 PM",
        type: "PANEL",
        title: "How Technology is Disrupting the Medical Education Landscape",
        people: [
          "Moderator: Dr AVS Suresh, NBEMS National Convenor",
          "Panelist: Dr Sanjeev Sinha",
          "Panelist: Dr Y. K. Gupta",
          "Panelist: Dr Adith Chinnaswami, Co-founder and COO, MediSim VR",
          "Panelist: Dr Sumer Sethi, Founder, DAMS and eMedicoz",
        ],
      },
      {
        time: "4:00–4:45 PM",
        type: "PANEL",
        title: "From Idea to Product",
        people: ["Moderator: Dr Saptarishi Ghosh. Kishore, Solix, to assist in identifying panelists."],
      },
    ],
  },
  {
    id: "day-3",
    heading: "DAY 3  |  SATURDAY, 12 DECEMBER 2026",
    color: "#007AB7",
    sessions: [
      { time: "8:00–9:00 AM", type: "LOGISTICS", title: "Networking breakfast and check-in" },
      {
        time: "9:00–9:30 AM",
        type: "KEYNOTE",
        title: "Novel Drug Delivery Vehicles",
        people: ["Prof. Alejandro Sosnik, Technion – Israel Institute of Technology"],
      },
      {
        time: "9:30–10:00 AM",
        type: "KEYNOTE",
        title: "New technology for assessing foetal wellbeing (OMEGA project)",
        people: ["Dr Jana M. Kainerstorfer"],
      },
      {
        time: "10:00–11:30 AM",
        type: "SESSION",
        title: "Hackathon presentations, judging and evaluation",
        people: ["Student teams and jury. Dr Dasmit Singh, Lead Mentor and Jury Chair."],
      },
      { time: "11:30–11:45 AM", title: "Refreshment break" },
      {
        time: "11:45 AM–12:05 PM",
        type: "CEREMONY",
        title: "Hackathon results and recognition of selected teams",
        people: ["Dr Aravind Ranade, Director, National Innovation Foundation"],
      },
      {
        time: "12:05–12:30 PM",
        type: "KEYNOTE",
        title: "Reimagining healthcare through MedTech and AI: Policy pathways for a future ready India",
        people: ["Dr M Srinivas: Member (Health) Niti Ayog, Previous Director AIIMS, Paed Surgeon, Digital transformation of AIIMS Delhi"],
      },
      { time: "12:30–1:30 PM", type: "LOGISTICS", title: "Lunch and disperse" },
    ],
  },
];

const mentors = [
  "Dr (Maj.) Satish S. Jeevannavar, Founder & CEO, Ai Health Highway, Bengaluru",
  "Ms Ranu Khade, Co-Founder, Flawsome",
  "Dr Ashish Rawandale-Patil, CEO & MD, Tejnaksh Healthcare, Dhule",
  "Prashant Singh, Director IT & CIO, Max Healthcare",
  "Bipin Kumar Chaudhary, CIO, Fortis Healthcare",
  "Capri Jalota, AIG Hospitals, Hyderabad",
  "Nandkishor Dhomne, CIO, Manipal Health Enterprises",
  "Himanshu Bhardwaj, Adani Healthcare",
  "Vinod Raman, Group CTO, QCIL (CARE Hospitals)",
];

const ProgrammePage = () => {
  return (
    <main>
      <div className="programme_page_mainbox position_box">
        <section className="pt-5 mb-0">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 heading35_black mb-3 text-center">Programme</div>
              <div className="col-lg-12 text19_black mb-4 text-center">
                <b style={{ color: "#e8480c" }}>Symbiosis SolixEmpower Tech Conclave 2026</b>
              </div>
            </div>
          </div>
        </section>
        <section className="programme_green_box mb-3">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 programme_dates">

                  <a href="#day-1" className="about_datebox">
                    <Image src="/images/footer_date.png" className="img-fluid" alt="" width={18} height={18} />
                    &nbsp;&nbsp;10 December 2026 · Day 1
                  </a>
                  <a href="#day-2" className="about_datebox">
                    <Image src="/images/footer_date.png" className="img-fluid" alt="" width={18} height={18} />
                    &nbsp;&nbsp;11 December 2026 · Day 2
                  </a>
                  <a href="#day-3" className="about_datebox">
                    <Image src="/images/footer_date.png" className="img-fluid" alt="" width={18} height={18} />
                    &nbsp;&nbsp;12 December 2026 · Day 3
                  </a>

              </div>
            </div>
          </div>
        </section>

        {days.map((day) => (
          <section id={day.id} key={day.id} className="programme_day pt-5 pb-4" style={{ backgroundColor: "#fbf4f2" }}>
            <div className="container">
              <div className="row">
                <div className="col-lg-12 heading35_black mb-4 text-center" style={{ color: day.color }}>
                  {day.heading}
                </div>
              </div>

              <div className="row">
                {day.sessions.map((session) => (
                    <div className="col-lg-12 mb-4" key={`${day.id}-${session.time}-${session.title ?? session.type}`}>
                      <div className="about_white_list programme_session">
                        <div className="programme_session_time" style={{ color: day.color }}>{session.time}</div>
                        <div className="programme_session_body">
                          {session.type && (
                            <div className="programme_session_type" style={{ backgroundColor: day.color }}>{session.type}</div>
                          )}
                          {session.title && <div className="heading19_black">{session.title}</div>}
                          {session.people?.map((person) => (
                            <div className="programme_session_people" key={person}>{person}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* <section className="pb-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 heading35_black mb-2">Hackathon mentorship and domain support</div>
              <div className="col-lg-12 mb-2 heading19_black">
                36 hrs (launch Day 1 to presentations Day 3)
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 aboutus_outcomes_box programme_mentors">
                <ul>
                  {mentors.map((mentor) => (
                    <li key={mentor}>{mentor}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section> */}
      </div>
    </main>
  );
};

export default ProgrammePage;
