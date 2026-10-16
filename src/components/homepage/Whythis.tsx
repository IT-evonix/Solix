"use client";
import Link from "next/link";
import Image from "next/image";


const Whythis = () => {
  return (
    <section className="whythis_section mb-0">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-7">
                    <div className="row">
                        <div className="col-lg-12 heading35_black mb-3">Why This Conclave?</div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 mb-5">
                            The Symbiosis–SOLIXEMPOWER Tech Conclave 2026 brings together healthcare, technology, research, innovation and industry on one platform. Through the Conference, Hackathon and TALFest, participants can learn from experts, exchange ideas, build meaningful connections and collaborate on real-world healthcare challenges. 
                            <br></br><br></br>
                            It is an opportunity for students, professionals, researchers and innovators to learn beyond boundaries, showcase ideas and be part of shaping the future of healthcare and technology.
                        </div>
                    </div>
                    {/* <div className="row">
                        <div className="col-lg-11 mb-5">
                            <div style={{backgroundColor: "#f1f1f1", padding: "20px", borderRadius: "20px"}}>
                                It should make the proposition immediately clear, build credibility, encourage participation and bring the Conference and MedTech Innovation Hackathon together within one coherent digital experience.
                            </div>
                        </div>
                    </div> */}
                    <div className="row">
                        <div className="col-lg-12 mb-5">
                            <Link href="/aboutus" className="button_box">Explore More</Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-5 text-center">
                    <Image src="/images/welcome_img2.png" className="img-fluid" alt="Logo" width={540} height={95} priority />
                </div>
            </div>
        </div>
    </section>
  );
};

export default Whythis;
