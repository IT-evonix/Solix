import InnerpageBanner from "@/components/InnerpageBanner";
import Image from "next/image";
import Faq from "@/components/Faq";
import { Faq_Speakers } from "@/data/faqData";


const ContactPage = () => {
  return (
    <main>
      <div className="aboutus_page_mainbox mb-0 position_box">
        {/* <InnerpageBanner title="Hackathon" /> */}
        <section className="mb-5 pt-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center heading19_black">Coming Soon...</div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ContactPage;