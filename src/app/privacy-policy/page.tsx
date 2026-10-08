import InnerpageBanner from "@/components/InnerpageBanner";
import Image from "next/image";

const ContactPage = () => {
  return (
    <section className="aboutus_page_mainbox mb-0">
      <InnerpageBanner title="Privacy Policy" />
      <section className="mb-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12 text-center">
              <div className="row">
                <div className="col-lg-12 text19_black mb-3">
                  <b>SYMBIOSIS–SOLIXEMPOWER TECH CONCLAVE 2026</b>
                </div>
              </div>
              <div className="row">
                  <div className="col-lg-12 mb-5">
                    Our Privacy Policy outlines how we collect, use and safeguard your personal information when you interact with the <b>SYMBIOSIS–SOLIXEMPOWER TECH CONCLAVE 2026</b> website. We are committed to transparency and responsible data practices, collecting only the information reasonably required to facilitate registration, participation, communication and a seamless website experience.
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-5 pb-5 mb-0" style={{backgroundColor:"#fbf4f2"}}>
        <div className="container">          
          <div className="row">
            <div className="col-lg-12">
              <div>
                <div className="row">
                  <div className="col-lg-12 heading21_black mb-2">Information We Collect</div>
                  <div className="col-lg-12 mb-5">
                    We may collect information such as your <b>name, email address, mobile number, organisation/institution, designation, professional or academic details, registration and accommodation information</b> when you use our website or register for the Conclave.
                    <br></br><br></br>
                    We may also collect limited technical information, including browser/device information, IP address, cookies and website usage data.
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 heading21_black mb-2">How We Use Your Information</div>
                </div>
                <div className="row">
                  <div className="col-lg-12 mb-2">
                    <b>Your information may be used to:</b>
                  </div>
                  <div className="col-lg-12 mb-5">
                    •	Process and manage registrations<br></br>
                    •	Facilitate event participation and accommodation<br></br>
                    •	Process payments and confirmations<br></br>
                    •	Communicate important event updates<br></br>
                    •	Respond to enquiries<br></br>
                    •	Improve website performance and user experience<br></br>
                    •	Meet applicable legal and institutional requirements
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 heading21_black mb-2">Payments & Third-Party Platforms</div>
                  <div className="col-lg-12 mb-5">
                    Payments may be processed through authorised third-party payment providers.
                    <br></br><br></br>
                    The <b>MedTech Innovation Hackathon</b> may redirect participants to the i4C platform. Information submitted on external platforms will be governed by their respective privacy policies and terms.
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 heading21_black mb-2">Cookies & Analytics</div>
                  <div className="col-lg-12 mb-5">
                    We may use cookies and similar technologies to support website functionality, understand usage and improve your experience.
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 heading21_black mb-2">Information Sharing & Security</div>
                  <div className="col-lg-12 mb-5">
                    Information may be shared with authorised Symbiosis personnel, participating institutions, event service providers and technology partners where required for legitimate event and administrative purposes.
                    <br></br><br></br>
                    Reasonable measures are taken to safeguard information against unauthorised access, misuse or disclosure.
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 heading21_black mb-2">Photography & Event Media</div>
                  <div className="col-lg-12 mb-5">
                    The Conclave may be photographed, filmed or recorded for <b>event documentation, institutional communication, archival and promotional purposes.</b>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 heading21_black mb-2">External Links</div>
                  <div className="col-lg-12 mb-5">
                    Our website may contain links to third-party websites. We are not responsible for the privacy practices of external websites and recommend reviewing their respective policies.
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 heading21_black mb-2">Applicable Law & Updates</div>
                  <div className="col-lg-12">
                    Information will be handled in accordance with <b>applicable Indian laws, regulations and institutional policies</b> relating to privacy and data protection.
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
    </section>    
  );
};

export default ContactPage;