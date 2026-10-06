import Link from "next/link";
import Image from "next/image";
import InnerpageBanner from "@/components/InnerpageBanner";
import ContactForm from "@/components/ui/ContactForm";

const ContactPage = () => {
  return (
    <div className="innerpage-wrapper">
      <InnerpageBanner
        title="Contact Us"
        breadcrumbs={[{ label: "Contact" }]}
      />
      <div className="innerpagewrapper">
        <section className="contactsection">
          <div className="container">
            <div className="contactinner">
              <div className="contactbox">
                <div className="contacticon">
                  <Image
                    src="/images/contact/call.png"
                    alt="Call Icon"
                    width={130}
                    height={130}
                    className="img-fluid"
                  />
                </div>
                <Link href="tel:02412346532">
                  0241-2346532
                </Link>
                <Link href="tel:02412324830">
                  0241-2324830
                </Link>
              </div>
              <div className="contactbox">
                <div className="contacticon">
                  <Image
                    src="/images/contact/email.png"
                    alt="Email Icon"
                    width={130}
                    height={130}
                    className="img-fluid"
                  />
                </div>
                <Link href="mailto:imscdr.ac@gmail.com">
                  imscdr.ac@gmail.com
                </Link>
              </div>
              <div className="contactbox">
                <div className="contacticon">
                  <Image
                    src="/images/contact/fax.png"
                    alt="Fax Icon"
                    width={130}
                    height={130}
                    className="img-fluid"
                  />
                </div>
                <span>0241-2346529</span>
              </div>
              <div className="contactbox contactinfo">
                <p>
                  Institute of Management Studies Career Development &
                  Research, Station Road, Ahmednagar (MH) – 414001
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mapwithfrom">
          <div className="mapbox">
            <iframe
              title="IMSCDR Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.3476661080676!2d74.742185074398!3d19.09239805145913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdcb0fa893e7c8d%3A0xcd1d5bf50be28400!2sInstitute%20of%20Management%20Studies%20Career%20Development%20%26%20Research!5e0!3m2!1sen!2sin!4v1782409649936!5m2!1sen!2sin"
              width="100%"
              height="540"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <div className="formbox">
            <ContactForm />
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;