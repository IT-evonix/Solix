"use client";
import Image from "next/image";


const WhyAttend = () => {
  return (
    <section className="text-center">
        <div className="container">
            <div className="row">
                <div className="col-lg-12 mb-2 heading35_black">Why Attend?</div>
            </div>
            <div className="row">
                <div className="col-lg-12 mb-5">A dedicated conversion-oriented section can bring the proposition together.</div>
            </div>
            <div className="row">
                <div className="col-lg-4 col-md-6 mb-3">
                    <div className="attend_list">
                        <div className="row">
                            <div className="col-lg-12 mb-2">
                                <Image src="/images/learn_icon.png" className="img-fluid" alt="Logo" width={100} height={100} />
                            </div>
                            <div className="col-lg-12 heading21_black mb-1">LEARN</div>
                            <div className="col-lg-12 mb-3">
                                Hear from experts and explore emerging healthcare technologies.
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-3">
                    <div className="attend_list">
                        <div className="row">
                            <div className="col-lg-12 mb-2">
                                <Image src="/images/connect_icon.png" className="img-fluid" alt="Logo" width={100} height={100} />
                            </div>
                            <div className="col-lg-12 heading21_black mb-1">CONNECT</div>
                            <div className="col-lg-12 mb-3">
                                Meet people across healthcare, technology, academia and industry.
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-3">
                    <div className="attend_list">
                        <div className="row">
                            <div className="col-lg-12 mb-2">
                                <Image src="/images/create_icon.png" className="img-fluid" alt="Logo" width={100} height={100} />
                            </div>
                            <div className="col-lg-12 heading21_black mb-1">CREATE</div>
                            <div className="col-lg-12 mb-3">
                                Work on real problems through multidisciplinary innovation.
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-3">
                    <div className="attend_list">
                        <div className="row">
                            <div className="col-lg-12 mb-2">
                                <Image src="/images/collaborate_icon.png" className="img-fluid" alt="Logo" width={100} height={100} />
                            </div>
                            <div className="col-lg-12 heading21_black mb-1">COLLABORATE</div>
                            <div className="col-lg-12 mb-3">
                                Find mentors, peers, institutions and industry connections.
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-3">
                    <div className="attend_list">
                        <div className="row">
                            <div className="col-lg-12 mb-2">
                                <Image src="/images/showcase_icon.png" className="img-fluid" alt="Logo" width={100} height={100} />
                            </div>
                            <div className="col-lg-12 heading21_black mb-1">SHOWCASE</div>
                            <div className="col-lg-12 mb-3">
                                Present ideas, prototypes and innovation.
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-3">
                    <div className="attend_list">
                        <div className="row">
                            <div className="col-lg-12 mb-2">
                                <Image src="/images/participate_icon.png" className="img-fluid" alt="Logo" width={100} height={100} />
                            </div>
                            <div className="col-lg-12 heading21_black mb-1">PARTICIPATE</div>
                            <div className="col-lg-12 mb-3">
                                Become part of a flagship multidisciplinary programme.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default WhyAttend;
