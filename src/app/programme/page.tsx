import InnerpageBanner from "@/components/InnerpageBanner";
import Image from "next/image";
import Faq from "@/components/Faq";
import { Faq_Programme } from "@/data/faqData";


const ContactPage = () => {
  return (
    <section className="aboutus_page_mainbox mb-0">
      <InnerpageBanner title="Programme" />
      <section className="mb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center heading19_black">Coming Soon...</div>
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
              <Faq faqs={Faq_Programme} />
            </div>
          </div>
        </div>
      </section> */}


    </section>    
  );
};

export default ContactPage;