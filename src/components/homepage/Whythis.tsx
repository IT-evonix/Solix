"use client";
import Link from "next/link";
import Image from "next/image";


const Whythis = () => {
  return (
    <section className="whythis_section mb-0">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-8">
                    <div className="row">
                        <div className="col-lg-12 heading35_black mb-3">Why This Conclave?</div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 mb-5">
                            The Symbiosis–SOLIXEMPOWER Tech Conclave 2026 brings together healthcare, technology, research, innovation and industry on one platform. Through the Conference, Hackathon and TALFest, participants can learn from experts, exchange ideas, build meaningful connections and collaborate on real-world healthcare challenges.
                        </div>
                    </div>
                    {/* <div className="row">
                        <div className="col-lg-12 mb-3">
                            <Link href="/aboutus" className="button_box">Explore More</Link>
                        </div>
                    </div> */}
                    <div className="row mb-5">
                        <div className="col-lg-12">
                            <div className="row">
                                <div className="col-lg-4 mb-3">
                                    <div className="signature_list">
                                        <div className="row align-items-center text-center">
                                            <div className="col-lg-12 text-center mb-2"><Image src="/images/signature_connect.png" className="img-fluid" alt="Logo" width={100} height={100} /></div>
                                            <div className="col-lg-12">
                                                <div className="row">
                                                    <div className="col-lg-12 heading21_black mb-1 pb-1" style={{color:"#E7470B"}}>CONNECT</div>
                                                    <div className="col-lg-12 ">
                                                        Bring people, ideas and industries together to build meaningful collaborations.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 mb-3">
                                    <div className="signature_list" style={{backgroundColor:"#E7F9EF"}}>
                                        <div className="row align-items-center text-center">
                                            <div className="col-lg-12 text-center mb-2"><Image src="/images/signature_create.png" className="img-fluid" alt="Logo" width={100} height={100} /></div>
                                            <div className="col-lg-12">
                                                <div className="row">
                                                    <div className="col-lg-12 heading21_black mb-2 pb-1" style={{color:"#00602d", borderBottom:"1px solid #ccc"}}>CREATE</div>
                                                    <div className="col-lg-12 ">
                                                        Turn fresh thinking into innovative ideas and practical solutions to real-world healthcare challenges.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 mb-3">
                                    <div className="signature_list" style={{backgroundColor:"#ECF7FD"}}>
                                        <div className="row align-items-center text-center">
                                            <div className="col-lg-12 text-center mb-2"><Image src="/images/signature_transform.png" className="img-fluid" alt="Logo" width={100} height={100} /></div>
                                            <div className="col-lg-12">
                                                <div className="row">
                                                    <div className="col-lg-12 heading21_black mb-2 pb-1" style={{color:"#007BB7", borderBottom:"1px solid #ccc"}}>TRANSFORM</div>
                                                    <div className="col-lg-12 ">
                                                        Drive meaningful change through technology, collaboration and impactful innovation.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 text-center">
                    <Image src="/images/welcome_img2.png" className="img-fluid" alt="Logo" width={540} height={95} priority />
                </div>
            </div>
            
        </div>
    </section>
    
  );
};

export default Whythis;
