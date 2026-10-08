import InnerpageBanner from "@/components/InnerpageBanner";
import Image from "next/image";
import Faq from "@/components/Faq";
import { Faq_Registration } from "@/data/faqData";

const ContactPage = () => {
  return (
    <section className="register_page_mainbox mb-0">
      <InnerpageBanner title="Conference Registration" />
      <section className="mb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="row">
                <div className="col-lg-12 heading35_black mb-2">Participant Details</div>
              </div>
              <div className="register_form_list mb-5">
                <div className="row">
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-12 text16_black mb-1">Full Name:</div>
                      <div className="col-lg-12"><input type="text" className="input_box"></input></div>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-3">
                    <div className="row">
                      <div className="col-lg-12 text16_black mb-1">Email Address:</div>
                      <div className="col-lg-12"><input type="text" className="input_box"></input></div>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-3">
                    <div className="row">
                      <div className="col-lg-12 text16_black mb-1">Mobile number:</div>
                      <div className="col-lg-12"><input type="text" className="input_box"></input></div>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-3">
                    <div className="row">
                      <div className="col-lg-12 text16_black mb-1">Country:</div>
                      <div className="col-lg-12"><input type="text" className="input_box"></input></div>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-3">
                    <div className="row">
                      <div className="col-lg-12 text16_black mb-1">City:</div>
                      <div className="col-lg-12"><input type="text" className="input_box"></input></div>
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
              <div className="row">
                <div className="col-lg-12 heading35_black mb-2">Professional Details</div>
              </div>
              <div className="register_form_list mb-5" style={{backgroundColor:"#ecf5ff"}}>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-lg-12 heading19_black mb-3"><b>Participant category</b></div>
                      <div className="col-lg-12">
                        <div className="row">
                          <div className="col-lg-4 mb-2">
                            <div className="cat_list">
                              <label htmlFor="1">
                                <input type="radio" name="Participant" id="1" /> &nbsp;&nbsp;
                                Healthcare professional
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-4 mb-2">
                            <div className="cat_list">
                              <label htmlFor="2">
                                <input type="radio" name="Participant" id="2" /> &nbsp;&nbsp;
                                Healthcare professional
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-4 mb-2">
                            <div className="cat_list">
                              <label htmlFor="3">
                                <input type="radio" name="Participant" id="3" /> &nbsp;&nbsp;
                                Researcher
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-4 mb-2">
                            <div className="cat_list">
                              <label htmlFor="4">
                                <input type="radio" name="Participant" id="4" /> &nbsp;&nbsp;
                                Industry professional
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-4 mb-2">
                            <div className="cat_list">
                              <label htmlFor="5">
                                <input type="radio" name="Participant" id="5" /> &nbsp;&nbsp;
                                International delegate
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-4 mb-5">
                            <div className="cat_list">
                              <label htmlFor="6">
                                <input type="radio" name="Participant" id="6" /> &nbsp;&nbsp;
                                Other
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-6 mb-3">
                            <div className="row">
                              <div className="col-lg-12 text16_black mb-1">Organisation / institution:</div>
                              <div className="col-lg-12"><input type="text" className="input_box"></input></div>
                            </div>
                          </div>
                          <div className="col-lg-6 mb-3">
                            <div className="row">
                              <div className="col-lg-12 text16_black mb-1">Designation:</div>
                              <div className="col-lg-12"><input type="text" className="input_box"></input></div>
                            </div>
                          </div>
                          <div className="col-lg-6 mb-3">
                            <div className="row">
                              <div className="col-lg-12 text16_black mb-1">Profession / specialisation:</div>
                              <div className="col-lg-12"><input type="text" className="input_box"></input></div>
                            </div>
                          </div>
                          <div className="col-lg-6 mb-3">
                            <div className="row">
                              <div className="col-lg-12 text16_black mb-1">Department / functional area:</div>
                              <div className="col-lg-12"><input type="text" className="input_box"></input></div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 heading35_black mb-2">Conference Registration</div>
              </div>
              <div className="register_form_list mb-5">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-lg-12 heading19_black mb-3"><b>Areas of Interest</b></div>
                      <div className="col-lg-12 mb-4">
                        <div className="row">

                          <div className="col-lg-6 mb-2">
                            <div className="cat_list">
                              <label htmlFor="areas1">
                                <input type="radio" name="areas" id="areas1" /> &nbsp;&nbsp;
                                AI & emerging technologies in healthcare
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-6 mb-2">
                            <div className="cat_list">
                              <label htmlFor="areas2">
                                <input type="radio" name="areas" id="areas2" /> &nbsp;&nbsp;
                                Digital health & healthcare data
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-6 mb-2">
                            <div className="cat_list">
                              <label htmlFor="areas3">
                                <input type="radio" name="areas" id="areas3" /> &nbsp;&nbsp;
                                Healthcare informatics & ABDM
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-6 mb-2">
                            <div className="cat_list">
                              <label htmlFor="areas4">
                                <input type="radio" name="areas" id="areas4" /> &nbsp;&nbsp;
                                AI ethics, governance & cybersecurity
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-6 mb-2">
                            <div className="cat_list">
                              <label htmlFor="areas5">
                                <input type="radio" name="areas" id="areas5" /> &nbsp;&nbsp;
                                Computational science & in-silico discovery
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-6 mb-2">
                            <div className="cat_list">
                              <label htmlFor="areas6">
                                <input type="radio" name="areas" id="areas6" /> &nbsp;&nbsp;
                                Pharma & drug discovery
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-6 mb-2">
                            <div className="cat_list">
                              <label htmlFor="areas7">
                                <input type="radio" name="areas" id="areas7" /> &nbsp;&nbsp;
                                Medical education & technology
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-6 mb-2">
                            <div className="cat_list">
                              <label htmlFor="areas8">
                                <input type="radio" name="areas" id="areas8" /> &nbsp;&nbsp;
                                Clinical AI & outcomes
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-6 mb-2">
                            <div className="cat_list">
                              <label htmlFor="areas9">
                                <input type="radio" name="areas" id="areas9" /> &nbsp;&nbsp;
                                Medical devices & MedTech
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-6 mb-2">
                            <div className="cat_list">
                              <label htmlFor="areas10">
                                <input type="radio" name="areas" id="areas10" /> &nbsp;&nbsp;
                                Healthcare innovation & entrepreneurship
                              </label>
                            </div>
                          </div>

                        </div>
                      </div>
                      <div className="col-lg-12 heading19_black mb-3"><b>What would you like to explore at the Conclave? </b></div>
                      <div className="col-lg-12">
                        <div className="row">

                          <div className="col-lg-4 mb-2">
                            <div className="cat_list">
                              <label htmlFor="areas1">
                                <input type="radio" name="areas" id="areas1" /> &nbsp;&nbsp;
                                Expert sessions
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-4 mb-2">
                            <div className="cat_list">
                              <label htmlFor="areas1">
                                <input type="radio" name="areas" id="areas1" /> &nbsp;&nbsp;
                                Technology workshops
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-4 mb-2">
                            <div className="cat_list">
                              <label htmlFor="areas1">
                                <input type="radio" name="areas" id="areas1" /> &nbsp;&nbsp;
                                Industry interaction
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-4 mb-2">
                            <div className="cat_list">
                              <label htmlFor="areas1">
                                <input type="radio" name="areas" id="areas1" /> &nbsp;&nbsp;
                                Networking
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-4 mb-2">
                            <div className="cat_list">
                              <label htmlFor="areas1">
                                <input type="radio" name="areas" id="areas1" /> &nbsp;&nbsp;
                                Research collaboration
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-4 mb-2">
                            <div className="cat_list">
                              <label htmlFor="areas1">
                                <input type="radio" name="areas" id="areas1" /> &nbsp;&nbsp;
                                Innovation & startups
                              </label>
                            </div>
                          </div>

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
              <div className="row">
                <div className="col-lg-12 heading35_black mb-2">Accommodation</div>
              </div>
              <div className="register_form_list mb-5" style={{backgroundColor:"#ecf5ff"}}>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-lg-12 heading19_black mb-3"><b>Do you require on-campus accommodation?</b></div>
                      <div className="col-lg-12">
                        <div className="row">

                          <div className="col-lg-6 mb-2">
                            <div className="cat_list">
                              <label htmlFor="Accommodation1">
                                <input type="radio" name="Accommodation" id="Accommodation1" /> &nbsp;&nbsp;
                                Yes – Book my stay
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-6 mb-4">
                            <div className="cat_list">
                              <label htmlFor="Accommodation2">
                                <input type="radio" name="Accommodation" id="Accommodation2" /> &nbsp;&nbsp;
                                No – I'll arrange my own
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-12" style={{fontSize:"12px"}}>
                            If Yes,<br></br>
                            Link to https://www.sandipanihometel.com/ Sandipani Hometel accommodation will be provided to registered Conference participants for 10-11-12 December 2026 with a separate accommodation charge.
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
              <div className="row">
                <div className="col-lg-12 heading35_black mb-2">Payment</div>
              </div>
              <div className="register_form_list mb-5" style={{backgroundColor:"#E7F9EF"}}>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-lg-10 heading19_black mb-2"><b>Conference Registration Fee</b></div>                      
                      <div className="col-lg-2 heading19_black mb-2"><b>₹1,500/-</b></div>                      
                    </div>
                  </div>
                  <div className="col-lg-12" style={{fontSize:"12px"}}>
                    Payment will be completed through the authorised payment gateway. (QR Code)
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 heading35_black mb-2">Declarations & Consent</div>
              </div>
              <div className="register_form_list mb-5">
                <div className="row">
                  <div className="col-lg-12 mb-2">
                    <div className="cat_list">
                      <label htmlFor="Declarations1">
                        <input type="radio" name="Declarations" id="Declarations1" /> &nbsp;&nbsp;
                        I confirm that the information provided in this form is accurate and complete. 
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-2">
                    <div className="cat_list">
                      <label htmlFor="Declarations2">
                        <input type="radio" name="Declarations" id="Declarations2" /> &nbsp;&nbsp;
                        I agree to the Conference Terms & Conditions. 
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-2">
                    <div className="cat_list">
                      <label htmlFor="Declarations3" style={{display:"flex"}}>
                        <input type="radio" name="Declarations" id="Declarations3" /> &nbsp;&nbsp;
                        <span>I consent to the processing of my registration information for conference administration, communication and event-related requirements in accordance with applicable law. </span>
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-2">
                    <div className="cat_list">
                      <label htmlFor="Declarations4">
                        <input type="radio" name="Declarations" id="Declarations4" /> &nbsp;&nbsp;
                        I acknowledge that the programme, speakers, timings and venues may be subject to change. 
                      </label>
                    </div>
                  </div>
                </div>
                
              </div>
              <div className="row">
                <div className="col-lg-12 heading35_black mb-2">Communication</div>
              </div>
              <div className="register_form_list mb-4" style={{backgroundColor:"#ecf5ff"}}>
                <div className="row">
                  <div className="col-lg-12 heading19_black mb-3"><b>Preferred communication channel</b></div>
                  <div className="col-lg-12 mb-4">
                    <div className="row">

                      <div className="col-lg-6 mb-2">
                        <div className="cat_list">
                          <label htmlFor="Accommodation1">
                            <input type="radio" name="Accommodation" id="Accommodation1" /> &nbsp;&nbsp;
                            Email
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 mb-2">
                        <div className="cat_list">
                          <label htmlFor="Accommodation2">
                            <input type="radio" name="Accommodation" id="Accommodation2" /> &nbsp;&nbsp;
                            WhatsApp
                          </label>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div className="col-lg-12 heading19_black mb-3"><b>How did you hear about the Conclave? </b></div>
                  <div className="col-lg-12">
                    <div className="row">

                      <div className="col-lg-4 mb-2">
                        <div className="cat_list">
                          <label htmlFor="Accommodation1">
                            <input type="radio" name="Accommodation" id="Accommodation1" /> &nbsp;&nbsp;
                            College / Faculty Email
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-4 mb-2">
                        <div className="cat_list">
                          <label htmlFor="Accommodation1">
                            <input type="radio" name="Accommodation" id="Accommodation1" /> &nbsp;&nbsp;
                            WhatsApp / Telegram
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-4 mb-2">
                        <div className="cat_list">
                          <label htmlFor="Accommodation1">
                            <input type="radio" name="Accommodation" id="Accommodation1" /> &nbsp;&nbsp;
                            LinkedIn
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-4 mb-2">
                        <div className="cat_list">
                          <label htmlFor="Accommodation1">
                            <input type="radio" name="Accommodation" id="Accommodation1" /> &nbsp;&nbsp;
                            Instagram / Social media
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-4 mb-2">
                        <div className="cat_list">
                          <label htmlFor="Accommodation1">
                            <input type="radio" name="Accommodation" id="Accommodation1" /> &nbsp;&nbsp;
                            Website
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-4 mb-2">
                        <div className="cat_list">
                          <label htmlFor="Accommodation1">
                            <input type="radio" name="Accommodation" id="Accommodation1" /> &nbsp;&nbsp;
                            Friend / Colleague
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-4 mb-2">
                        <div className="cat_list">
                          <label htmlFor="Accommodation1">
                            <input type="radio" name="Accommodation" id="Accommodation1" /> &nbsp;&nbsp;
                            Other
                          </label>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>                
              </div>
              <div className="register_form_list mb-4">
                <div className="row">
                    <div className="col-lg-5">
                      <div className="row">
                        <div className="col-lg-12 heading19_black mb-3"><b>Transcation ID</b></div>
                        <div className="col-lg-12">
                          <div className="row">
                            <div className="col-lg-12 mb-2">
                              <div className="cat_list">
                                <input type="text" name="" className="input_box" id="" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="row">
                        <div className="col-lg-12 heading19_black mb-3"><b>Upload Screenshot</b></div>
                        <div className="col-lg-12">
                          <div className="row">
                            <div className="col-lg-12 mb-2">
                              <div className="cat_list">
                                <input type="file" name="" className="input_box" id="" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12 mb-4">
                  <input type="submit" value="Submit" className="input_button_box" />
                </div>
              </div>
            </div>
            <div className="col-lg-4 mt-5 register_rightbox">
              <div className="row" style={{position:"sticky", top:"50px"}}>
                <div className="col-lg-12">
                  <div className="register_imgbox">
                    <span>Participant<br></br>Registration Form</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="footer_faq_section mb-0 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mb-2 heading35_black text-center mb-4">Frequently Asked Questions</div>
          </div>
          <div className="row">
            <div className="col-lg-1"></div>
            <div className="col-lg-10">
              <Faq faqs={Faq_Registration} />
            </div>
          </div>
        </div>
      </section> */}
    </section>    
  );
};

export default ContactPage;