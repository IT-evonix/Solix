"use client";
import Image from "next/image";


const Herovideo = () => {
  return (
    <section className="banner_section">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 p-0 video_box">
            <video className="w-100" autoPlay muted loop playsInline>
              <source src="/images/banner-video.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="col-lg-12">
            <div className="row">
              <div className="banner_textbox">
                <div className="col-lg-12 mb-4 banner_text1">Symbiosis - Solix Empower</div>
                <div className="col-lg-12 mb-4 banner_tech_img">
                  <Image src="/images/tech.png" className="img-fluid" alt="Logo" width={450} height={10} />
                </div>
                <div className="col-lg-12">
                  <div className="banner_date">
                    <Image src="/images/footer_date.png" className="img-fluid" alt="Logo" width={80} height={10} />
                    10–12 December 2026
                  </div>
                  <div className="banner_date">
                    <Image src="/images/footer_location.png" className="img-fluid" alt="Logo" width={80} height={10} />
                    SIU Lavale Campus, Pune
                  </div>
                </div>
                <div className="col-lg-12 banner_text2">
                  <span>CONNECT</span> <span>CREATE</span> <span>TRANSFORM</span>
                </div>
                <div className="col-lg-12 banner_buttonbox">
                  <a href="#">
                    <div className="row align-items-center">
                      <div className="col-lg-12 p-0"><Image src="/images/footer_register_icon.png" className="img-fluid" alt="Logo" width={20} height={20} /> Register Now</div>
                    </div>
                  </a>
                  <a href="#">
                    <div className="row align-items-center">
                      <div className="col-lg-12 p-0"><Image src="/images/footer_explore_icon.png" className="img-fluid" alt="Logo" width={20} height={20} /> Explore the Conclave</div>
                    </div>
                  </a>
                </div>
                <div className="col-lg-12"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Herovideo;
