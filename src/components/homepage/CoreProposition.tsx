"use client";
import Image from "next/image";


const CoreProposition = () => {
  return (
    <section className="core_section text-center" id="top">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-lg-12 heading35_black mb-3" style={{color:"#fff"}}>The Core Proposition</div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 mb-4">
                            The Conclave brings together healthcare problems and technological capabilities across clinical, technology, engineering, data, research, design and management perspectives. Its purpose is to create meaningful exchange between disciplines and encourage movement from discussion towards practical innovation.
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-lg-12" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                            <div className="core_list">
                                <div className="core_list_inner">
                                    <div className="row">
                                        <div className="col-lg-12 mb-2">
                                            <span>
                                                <Image src="/images/core_1.png" className="img-fluid" alt="Logo" width={100} height={100} />
                                            </span>
                                        </div>
                                        <div className="col-lg-12">HEALTHCARE CHALLENGES</div>
                                    </div>
                                </div>
                            </div>
                            <div className="core_list">
                                <div className="core_list_inner">
                                    <div className="row">
                                        <div className="col-lg-12 mb-2">
                                            <span>
                                                <Image src="/images/core_2.png" className="img-fluid" alt="Logo" width={100} height={100}  />
                                            </span>
                                        </div>
                                        <div className="col-lg-12">MULTIDISCIPLINARY MINDS</div>
                                    </div>
                                </div>
                            </div>
                            <div className="core_list">
                                <div className="core_list_inner">
                                    <div className="row">
                                        <div className="col-lg-12 mb-2">
                                            <span>
                                                <Image src="/images/core_3.png" className="img-fluid" alt="Logo" width={100} height={100}  />
                                            </span>
                                        </div>
                                        <div className="col-lg-12">Advanced TECHNOLOGY</div>
                                    </div>
                                </div>
                            </div>
                            <div className="core_list">
                                <div className="core_list_inner">
                                    <div className="row">
                                        <div className="col-lg-12 mb-2">
                                            <span>
                                                <Image src="/images/core_4.png" className="img-fluid" alt="Logo" width={100} height={100}  />
                                            </span>
                                        </div>
                                        <div className="col-lg-12">INNOVATION Excellence</div>
                                    </div>
                                </div>
                            </div>
                            <div className="core_list">
                                <div className="core_list_inner">
                                    <div className="row">
                                        <div className="col-lg-12 mb-2">
                                            <span>
                                                <Image src="/images/core_5.png" className="img-fluid" alt="Logo" width={100} height={100}  />
                                            </span>
                                        </div>
                                        <div className="col-lg-12">Prototype Development</div>
                                    </div>
                                </div>
                            </div>
                            <div className="core_list">
                                <div className="core_list_inner">
                                    <div className="row">
                                        <div className="col-lg-12 mb-2">
                                            <span>
                                                <Image src="/images/core_6.png" className="img-fluid" alt="Logo" width={100} height={100}  />
                                            </span>
                                        </div>
                                        <div className="col-lg-12">Strategic Collaboration</div>
                                    </div>
                                </div>
                            </div>
                            <div className="core_list">
                                <div className="core_list_inner">
                                    <div className="row">
                                        <div className="col-lg-12 mb-2">
                                            <span>
                                                <Image src="/images/core_7.png" className="img-fluid" alt="Logo" width={100} height={100}  />
                                            </span>
                                        </div>
                                        <div className="col-lg-12">POTENTIAL IMPACT</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12"></div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default CoreProposition;
