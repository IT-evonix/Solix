"use client";
import Image from "next/image";


const Signature = () => {
  return (
    <section className="">
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
                            <div className="col-lg-4 text-center"><Image src="/images/signature_connect.png" className="img-fluid" alt="Logo" width={100} height={100} /></div>
                            <div className="col-lg-8">
                                <div className="row">
                                    <div className="col-lg-12 heading21_black mb-2 pb-1" style={{color:"#E7470B", borderBottom:"1px solid #ccc"}}>CONNECT</div>
                                    <div className="col-lg-12 mb-1" style={{fontFamily:"Poppins-Bold", textTransform:"uppercase"}}>
                                        Conference • Knowledge • Experts • Healthcare • Technology • Industry
                                    </div>
                                    {/* <div className="col-lg-12">Experts • Knowledge • Industry</div> */}
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
                            <div className="col-lg-4 text-center"><Image src="/images/signature_create.png" className="img-fluid" alt="Logo" width={100} height={100} /></div>
                            <div className="col-lg-8">
                                <div className="row">
                                    <div className="col-lg-12 heading21_black mb-2 pb-1" style={{color:"#107F44", borderBottom:"1px solid #ccc"}}>CREATE</div>
                                    <div className="col-lg-12 mb-1" style={{fontFamily:"Poppins-Bold", textTransform:"uppercase"}}>
                                        Hackathon • Mentoring • Collaboration • Problem Solving
                                    </div>
                                    {/* <div className="col-lg-12">Mentoring • Collaboration • Problem-solving</div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="signature_list" style={{backgroundColor:"#ECF7FD"}}>
                        <div className="row align-items-center">
                            <div className="col-lg-12">
                                <div className="signature_date" style={{backgroundColor:"#007AB7"}}>12 DECEMBER</div>
                            </div>
                            <div className="col-lg-4 text-center"><Image src="/images/signature_transform.png" className="img-fluid" alt="Logo" width={100} height={100} /></div>
                            <div className="col-lg-8">
                                <div className="row">
                                    <div className="col-lg-12 heading21_black mb-2 pb-1" style={{color:"#007BB7", borderBottom:"1px solid #ccc"}}>TRANSFORM</div>
                                    <div className="col-lg-12 mb-1" style={{fontFamily:"Poppins-Bold", textTransform:"uppercase"}}>
                                        Prototypes • Presentations • Recognition • Future Possibilities
                                    </div>
                                    {/* <div className="col-lg-12">Presentations • Recognition • Possibilities</div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12 text-center mb-4 home_narrative_text">
                    <span>This narrative should be used consistently across the website as a visual and editorial device, rather than as a decorative tagline alone.</span>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Signature;
