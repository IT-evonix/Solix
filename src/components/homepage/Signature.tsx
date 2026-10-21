"use client";
import Image from "next/image";


const Signature = () => {
  return (
    <section className="signature_section">
        <div className="container">
            <div className="row">
                <div className="col-lg-12 heading35_black mb-2 text-center">The Signature Narrative</div>
            </div>
            <div className="row">
                <div className="col-lg-12 mb-5 text-center">The three-day programme provides a strong narrative for the digital experience</div>
            </div>
            <div className="row mb-5">
                <div className="col-lg-4 mb-3">
                    <div className="signature_list">
                        <div className="row align-items-center">
                            <div className="col-lg-12">
                                <div className="signature_date">10 DECEMBER</div>
                            </div>
                            <div className="col-lg-3 text-center"><Image src="/images/signature_connect.png" className="img-fluid" alt="Logo" width={100} height={100} /></div>
                            <div className="col-lg-9">
                                <div className="row">
                                    <div className="col-lg-12 heading21_black mb-2 pb-1" style={{color:"#E7470B", borderBottom:"1px solid #ccc"}}>CONNECT</div>
                                    <div className="col-6 mb-1">
                                        • Conference <br></br>
                                        • Knowledge <br></br>
                                        • Experts
                                    </div>
                                    <div className="col-6 mb-1">
                                        • Healthcare <br></br>
                                        • Technology <br></br>
                                        • Industry
                                    </div>
                                    <div className="journey_text">
                                        Bring together diverse perspectives from healthcare, academia, technology, research and industry. Explore emerging ideas, exchange knowledge and connect with experts shaping the future.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 mb-3">
                    <div className="signature_list" style={{backgroundColor:"#E7F9EF"}}>
                        <div className="row align-items-center">
                            <div className="col-lg-12">
                                <div className="signature_date" style={{backgroundColor:"#107F44"}}>11 DECEMBER</div>
                            </div>
                            <div className="col-lg-3 text-center"><Image src="/images/signature_create.png" className="img-fluid" alt="Logo" width={100} height={100} /></div>
                            <div className="col-lg-9">
                                <div className="row">
                                    <div className="col-lg-12 heading21_black mb-2 pb-1" style={{color:"#00602d", borderBottom:"1px solid #ccc"}}>CREATE</div>
                                    <div className="col-5 mb-1">
                                        • Hackathon <br></br>
                                        • Mentoring 
                                    </div>
                                    <div className="col-7 mb-1">
                                        • Collaboration <br></br>
                                        • Problem Solving
                                    </div>
                                    <div className="journey_text">
                                        Move from ideas to action through the MedTech Innovation Hackathon, bringing together multidisciplinary talent, mentors and experts to work on healthcare challenges and develop innovative solutions. An impressive line up of technology + healthcare experts will share their wisdom on the transformation power of technology.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 mb-3">
                    <div className="signature_list" style={{backgroundColor:"#ECF7FD"}}>
                        <div className="row align-items-center">
                            <div className="col-lg-12">
                                <div className="signature_date" style={{backgroundColor:"#007AB7"}}>12 DECEMBER</div>
                            </div>
                            <div className="col-lg-3 text-center"><Image src="/images/signature_transform.png" className="img-fluid" alt="Logo" width={100} height={100} /></div>
                            <div className="col-lg-9">
                                <div className="row">
                                    <div className="col-lg-12 heading21_black mb-2 pb-1" style={{color:"#007BB7", borderBottom:"1px solid #ccc"}}>TRANSFORM</div>
                                    <div className="col-5 mb-1">
                                        • Prototypes <br></br>
                                        • Presentations <br></br>
                                    </div>
                                    <div className="col-7 mb-1">
                                        • Recognition <br></br>
                                        • Future Possibilities
                                    </div>
                                    <div className="journey_text">
                                        Two talks on cutting edge technology in medical kicks of an exciting day when innovation ideas will be rewarded.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Signature;
