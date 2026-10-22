import Herovideo from "@/components/homepage/Herovideo";
import Whythis from "@/components/homepage/Whythis";
import CoreProposition from "@/components/homepage/CoreProposition";
import Signature from "@/components/homepage/Signature";
import OurTestimonials from "@/components/homepage/OurTestimonials";
import WhyAttend from "@/components/homepage/WhyAttend";
import Faq from "@/components/Faq";
import { footerFaq } from "@/data/faqData";

export default function Home() {
  return (
    <main>
      <Herovideo />
      <Whythis />
      <CoreProposition />
      <Signature />
      <OurTestimonials />
      <WhyAttend />
      <section className="footer_faq_section mb-0 mt-5">
        <div className="container" style={{position:"relative", zIndex:"5"}}>
          <div className="row">
            <div className="col-lg-12 mb-2 heading35_black text-center mb-4" style={{color:"#fff"}}>Frequently Asked Questions</div>
          </div>
          <div className="row">
            <div className="col-lg-1"></div>
            <div className="col-lg-10">
              <Faq faqs={footerFaq} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
