import Image from "next/image";

const speakers = [
  { name: "Dr. Shiv Kumar Sarin", role: "Keynote Speaker", title: "Founding Director & Chancellor, Institute of Liver and Biliary Sciences (ILBS), New Delhi", image: "ShivKumarSarin.png" },
  { name: "Assoc Prof Liu Nan", role: "Keynote Speaker", title: "Associate Professor, Duke-NUS Medical School", image: "LiuNan.png" },
  { name: "Dr. Yilin Ning", role: "Keynote Speaker", title: "Senior Research Fellow, Duke-NUS Medical School", image: "YilinNing.png" },
  { name: "Mr. Mark Lewis", role: "Panelist", title: "Senior Enterprise Data Strategist, Solix Technologies", image: "MarkLewis.png" },
  { name: "Dr. Dasmit Singh", role: "Keynote & Hackathon Briefing", title: "Professor & Head of Pediatric Surgery, Symbiosis Medical College for Women", image: "DasmitSingh.png" },
  { name: "Shri Sunil Kumar Barnwal (IAS)", role: "Keynote Speaker", title: "Chief Executive Officer, National Health Authority (NHA)", image: "SunilKumarBarnwal.png" },
  { name: "Dr. Kavitha Rajshekhar", role: "Keynote Speaker", title: "Department of Health Research, Ministry of Health and Family Welfare, Government of India", image: "KavithaRajshekhar.png" },
  { name: "Dr. Rahul Gupta", role: "Keynote Speaker", title: "President, GATC Health Corporation", image: "RahulGupta.png" },
  { name: "Dr. Donald E. Ingber, M.D., Ph.D.", role: "Keynote Speaker", title: "Founding Director, Wyss Institute for Biologically Inspired Engineering at Harvard University", image: "DonaldIngber.png" },
  { name: "Dr. Rakesh Kalapala", role: "Keynote Speaker", title: "VP & Director, Centre for AI and Innovation, AIG Hospitals", image: "RakeshKalapala.png" },
  { name: "Dr. Mohit Bhandari", role: "Keynote Speaker", title: "Founder & Director, Mohak Bariatrics and Robotics; President, IRCAD India", image: "MohitBhandari.png" },
  { name: "Prof. Alejandro Sosnik", role: "Keynote Speaker", title: "Professor of Materials Science & Engineering, Technion – Israel Institute of Technology", image: "AlejandroSosnik.png" },
  { name: "Dr. Jana M. Kainerstorfer", role: "Keynote Speaker", title: "Associate Professor of Biomedical Engineering, Carnegie Mellon University", image: "JanaKainerstorfer.png" },
  { name: "Dr. M. Srinivas", role: "Keynote Speaker", title: "Member (Health), NITI Aayog; Former Director, AIIMS New Delhi", image: "srinivas.png" },
];

const SpeakersPage = () => {
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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default SpeakersPage;
