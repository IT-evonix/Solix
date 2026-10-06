"use client";
import Image from "next/image";


const Whythis = () => {
  return (
    <section className="">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-7">
                    <div className="row">
                        <div className="col-lg-12 heading35_black mb-3">Why This Conclave?</div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 mb-5">
                            This note sets out the conceptual direction for the website of the SYMBIOSIS–SOLIXEMPOWER TECH CONCLAVE 2026. It is intended to help the website team understand the programme, its proposition, the intended audience and the experience the website should create before detailed technical requirements are finalised.
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-11 mb-5">
                            <div style={{backgroundColor: "#F2F8FB", padding: "20px", borderRadius: "10px"}}>
                                It should make the proposition immediately clear, build credibility, encourage participation and bring the Conference and MedTech Innovation Hackathon together within one coherent digital experience.
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 mb-5">
                            <a href="{{ url('/') }}" className="button_box">Explore More</a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-5 text-center">
                    <Image
                      src="/images/welcome_img.png"
                      className="img-fluid"
                      alt="Logo"
                      width={540}
                      height={95}
                      priority
                    />
                </div>
            </div>
        </div>
    </section>
  );
};

export default Whythis;
