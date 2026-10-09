"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import InnerpageBanner from "@/components/InnerpageBanner";
import { appPath } from "@/app/lib/app-url";
import Image from "next/image";


type Option = { id: number; name: string };

type Options = {
  categories: Option[];
  areasOfInterest: Option[];
  exploreOptions: Option[];
  declarations: Option[];
  hearAbout: Option[];
};

const emptyOptions: Options = {
  categories: [],
  areasOfInterest: [],
  exploreOptions: [],
  declarations: [],
  hearAbout: [],
};

const NAME_PATTERN = /^(?=.*[A-Za-z])[A-Za-z. ]+$/;
const EMAIL_LOCAL_PATTERN = /^[A-Za-z0-9._%+-]+$/;
const EMAIL_DOMAIN_PATTERN = /^(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;
const MOBILE_PATTERN = /^[6-9]\d{9}$/;

function emailError(email: string) {
  if (!email) return "Email address is required.";
  const at = email.lastIndexOf("@");
  const local = at === -1 ? "" : email.slice(0, at);
  const domain = at === -1 ? "" : email.slice(at + 1);
  if (!local || !domain || email.indexOf("@") !== at || !EMAIL_LOCAL_PATTERN.test(local)) {
    return "Enter a valid email address.";
  }
  if (!EMAIL_DOMAIN_PATTERN.test(domain)) return "Enter an email address with a valid domain.";
  return "";
}

function toggleId(selected: number[], id: number) {
  return selected.includes(id) ? selected.filter((item) => item !== id) : [...selected, id];
}

function RequiredMark() {
  return (
    <span className="required_mark" aria-hidden="true">
      *
    </span>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="field_error">{message}</p>;
}

function ChoiceList({
  items,
  name,
  columnClass,
  lastColumnClass,
  type,
  wrap,
  selected,
  onSelect,
}: {
  items: Option[];
  name: string;
  columnClass: string;
  lastColumnClass?: string;
  type: "checkbox" | "radio";
  wrap?: boolean;
  selected: number[];
  onSelect: (id: number) => void;
}) {
  return items.map((item, index) => (
    <div
      className={index === items.length - 1 && lastColumnClass ? lastColumnClass : columnClass}
      key={item.id}
    >
      <div className="cat_list">
        <label htmlFor={`${name}-${item.id}`} style={wrap ? { display: "flex" } : undefined}>
          <input
            type={type}
            name={name}
            id={`${name}-${item.id}`}
            value={item.id}
            checked={selected.includes(item.id)}
            onChange={() => onSelect(item.id)}
          /> &nbsp;&nbsp;
          {wrap ? <span>{item.name}</span> : item.name}
        </label>
      </div>
    </div>
  ));
}

const ContactPage = () => {
  const [options, setOptions] = useState<Options>(emptyOptions);
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [participantCategory, setParticipantCategory] = useState<number[]>([]);
  const [organisationInstitution, setOrganisationInstitution] = useState("");
  const [designation, setDesignation] = useState("");
  const [professionSpecialisation, setProfessionSpecialisation] = useState("");
  const [departmentFunctionalArea, setDepartmentFunctionalArea] = useState("");
  const [areaOfInterest, setAreaOfInterest] = useState<number[]>([]);
  const [exploreConclave, setExploreConclave] = useState<number[]>([]);
  const [onCampusAccommodation, setOnCampusAccommodation] = useState("");
  const [declaration, setDeclaration] = useState<number[]>([]);
  const [preferredCommunicationChannel, setPreferredCommunicationChannel] = useState("");
  const [hearAboutConclave, setHearAboutConclave] = useState<number[]>([]);
  const [transactionId, setTransactionId] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;
    fetch(appPath("/api/registration-options"))
      .then(async (response) => {
        const data = (await response.json()) as Options & { message?: string };
        if (!response.ok) throw new Error(data.message);
        return data;
      })
      .then((data) => {
        if (active) setOptions(data);
      })
      .catch(() => {
        if (active) setMessage("Unable to load registration options.");
      });
    return () => {
      active = false;
    };
  }, []);

  function validate() {
    const next: Record<string, string> = {};
    const email = emailAddress.trim();

    const name = fullName.trim();
    if (!name) next.fullName = "Full name is required.";
    else if (!NAME_PATTERN.test(name)) next.fullName = "Full name can contain only letters, spaces, and dots.";
    const emailMessage = emailError(email);
    if (emailMessage) next.emailAddress = emailMessage;
    const mobile = mobileNumber.trim();
    if (!mobile) next.mobileNumber = "Mobile number is required.";
    else if (!MOBILE_PATTERN.test(mobile)) next.mobileNumber = "Enter a valid 10-digit mobile number.";
    if (!country.trim()) next.country = "Country is required.";
    if (!city.trim()) next.city = "City is required.";
    if (participantCategory.length !== 1) next.participantCategory = "Select a participant category.";
    if (!organisationInstitution.trim()) next.organisationInstitution = "Organisation / institution is required.";
    if (!designation.trim()) next.designation = "Designation is required.";
    if (!professionSpecialisation.trim()) next.professionSpecialisation = "Profession / specialisation is required.";
    if (!departmentFunctionalArea.trim()) next.departmentFunctionalArea = "Department / functional area is required.";
    if (areaOfInterest.length === 0) next.areaOfInterest = "Select at least one area of interest.";
    if (exploreConclave.length === 0) next.exploreConclave = "Select at least one option.";
    if (onCampusAccommodation !== "yes" && onCampusAccommodation !== "no") {
      next.onCampusAccommodation = "Select whether you need on-campus accommodation.";
    }
    if (options.declarations.length === 0 || declaration.length !== options.declarations.length) {
      next.declaration = "Accept all declarations to continue.";
    }
    if (!preferredCommunicationChannel) next.preferredCommunicationChannel = "Select a communication channel.";
    if (hearAboutConclave.length === 0) next.hearAboutConclave = "Select how you heard about the conclave.";
    if (!transactionId.trim()) next.transactionId = "Transaction ID is required.";
    if (!screenshot) next.screenshot = "Upload the payment screenshot.";
    return next;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setMessage("Please complete the required fields.");
      return;
    }

    setSubmitting(true);
    setMessage("");

    const body = new FormData();
    body.set("fullName", fullName);
    body.set("emailAddress", emailAddress);
    body.set("mobileNumber", mobileNumber);
    body.set("country", country);
    body.set("city", city);
    participantCategory.forEach((id) => body.append("participantCategory", String(id)));
    body.set("organisationInstitution", organisationInstitution);
    body.set("designation", designation);
    body.set("professionSpecialisation", professionSpecialisation);
    body.set("departmentFunctionalArea", departmentFunctionalArea);
    areaOfInterest.forEach((id) => body.append("areaOfInterest", String(id)));
    exploreConclave.forEach((id) => body.append("exploreConclave", String(id)));
    body.set("onCampusAccommodation", onCampusAccommodation);
    declaration.forEach((id) => body.append("declaration", String(id)));
    body.set("preferredCommunicationChannel", preferredCommunicationChannel);
    hearAboutConclave.forEach((id) => body.append("hearAboutConclave", String(id)));
    body.set("transactionId", transactionId);
    if (screenshot) body.set("screenshot", screenshot);

    try {
      const response = await fetch(appPath("/api/registrations"), { method: "POST", body });
      const data = (await response.json()) as { message?: string; registrationCode?: string };
      if (!response.ok) {
        setMessage(data.message || "Unable to save registration.");
        return;
      }
      setMessage(`Registration saved. Your ID is ${data.registrationCode}.`);
    } catch {
      setMessage("Unable to save registration.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="register_page_mainbox mb-0">
      <InnerpageBanner title="Conference Registration" />
      <section className="mb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <form onSubmit={onSubmit} noValidate>
              <div className="row">
                <div className="col-lg-12 heading35_black mb-2">Participant Details</div>
              </div>
              <div className="register_form_list mb-5">
                <div className="row">
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-12 text16_black mb-1">Full Name:<RequiredMark /></div>
                      <div className="col-lg-12"><input type="text" className="input_box" value={fullName} onChange={(event) => setFullName(event.target.value.replace(/[^A-Za-z. ]/g, ""))} required aria-required="true" autoComplete="name" /><FieldError message={errors.fullName} /></div>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-3">
                    <div className="row">
                      <div className="col-lg-12 text16_black mb-1">Email Address:<RequiredMark /></div>
                      <div className="col-lg-12"><input type="email" className="input_box" value={emailAddress} onChange={(event) => setEmailAddress(event.target.value)} required aria-required="true" autoComplete="email" /><FieldError message={errors.emailAddress} /></div>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-3">
                    <div className="row">
                      <div className="col-lg-12 text16_black mb-1">Mobile number:<RequiredMark /></div>
                      <div className="col-lg-12"><input type="tel" className="input_box" inputMode="numeric" maxLength={10} value={mobileNumber} onChange={(event) => setMobileNumber(event.target.value.replace(/\D/g, "").slice(0, 10))} required aria-required="true" autoComplete="tel" /><FieldError message={errors.mobileNumber} /></div>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-3">
                    <div className="row">
                      <div className="col-lg-12 text16_black mb-1">Country:<RequiredMark /></div>
                      <div className="col-lg-12"><input type="text" className="input_box" value={country} onChange={(event) => setCountry(event.target.value)} required aria-required="true" /><FieldError message={errors.country} /></div>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-3">
                    <div className="row">
                      <div className="col-lg-12 text16_black mb-1">City:<RequiredMark /></div>
                      <div className="col-lg-12"><input type="text" className="input_box" value={city} onChange={(event) => setCity(event.target.value)} required aria-required="true" /><FieldError message={errors.city} /></div>
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
                      <div className="col-lg-12 heading19_black mb-3"><b>Participant category<RequiredMark /></b><FieldError message={errors.participantCategory} /></div>
                      <div className="col-lg-12">
                        <div className="row">
                          <ChoiceList
                            items={options.categories}
                            name="Participant"
                            columnClass="col-lg-4 mb-2"
                            lastColumnClass="col-lg-4 mb-5"
                            type="radio"
                            selected={participantCategory}
                            onSelect={(id) => setParticipantCategory([id])}
                          />
                          <div className="col-lg-6 mb-3">
                            <div className="row">
                              <div className="col-lg-12 text16_black mb-1">Organisation / institution:<RequiredMark /></div>
                              <div className="col-lg-12"><input type="text" className="input_box" value={organisationInstitution} onChange={(event) => setOrganisationInstitution(event.target.value)} required aria-required="true" /><FieldError message={errors.organisationInstitution} /></div>
                            </div>
                          </div>
                          <div className="col-lg-6 mb-3">
                            <div className="row">
                              <div className="col-lg-12 text16_black mb-1">Designation:<RequiredMark /></div>
                              <div className="col-lg-12"><input type="text" className="input_box" value={designation} onChange={(event) => setDesignation(event.target.value)} required aria-required="true" /><FieldError message={errors.designation} /></div>
                            </div>
                          </div>
                          <div className="col-lg-6 mb-3">
                            <div className="row">
                              <div className="col-lg-12 text16_black mb-1">Profession / specialisation:<RequiredMark /></div>
                              <div className="col-lg-12"><input type="text" className="input_box" value={professionSpecialisation} onChange={(event) => setProfessionSpecialisation(event.target.value)} required aria-required="true" /><FieldError message={errors.professionSpecialisation} /></div>
                            </div>
                          </div>
                          <div className="col-lg-6 mb-3">
                            <div className="row">
                              <div className="col-lg-12 text16_black mb-1">Department / functional area:<RequiredMark /></div>
                              <div className="col-lg-12"><input type="text" className="input_box" value={departmentFunctionalArea} onChange={(event) => setDepartmentFunctionalArea(event.target.value)} required aria-required="true" /><FieldError message={errors.departmentFunctionalArea} /></div>
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
                      <div className="col-lg-12 heading19_black mb-3"><b>Areas of Interest<RequiredMark /></b><FieldError message={errors.areaOfInterest} /></div>
                      <div className="col-lg-12 mb-4">
                        <div className="row">
                          <ChoiceList
                            items={options.areasOfInterest}
                            name="areaOfInterest"
                            columnClass="col-lg-6 mb-2"
                            type="checkbox"
                            selected={areaOfInterest}
                            onSelect={(id) => setAreaOfInterest((current) => toggleId(current, id))}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12 heading19_black mb-3"><b>What would you like to explore at the Conclave?<RequiredMark /></b><FieldError message={errors.exploreConclave} /></div>
                      <div className="col-lg-12">
                        <div className="row">
                          <ChoiceList
                            items={options.exploreOptions}
                            name="exploreConclave"
                            columnClass="col-lg-4 mb-2"
                            type="checkbox"
                            selected={exploreConclave}
                            onSelect={(id) => setExploreConclave((current) => toggleId(current, id))}
                          />
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
                      <div className="col-lg-12 heading19_black mb-3"><b>Do you require on-campus accommodation?<RequiredMark /></b><FieldError message={errors.onCampusAccommodation} /></div>
                      <div className="col-lg-12">
                        <div className="row">

                          <div className="col-lg-6 mb-2">
                            <div className="cat_list">
                              <label htmlFor="Accommodation1">
                                <input type="radio" name="Accommodation" id="Accommodation1" value="yes" checked={onCampusAccommodation === "yes"} onChange={() => setOnCampusAccommodation("yes")} /> &nbsp;&nbsp;
                                Yes – Book my stay
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-6 mb-4">
                            <div className="cat_list">
                              <label htmlFor="Accommodation2">
                                <input type="radio" name="Accommodation" id="Accommodation2" value="no" checked={onCampusAccommodation === "no"} onChange={() => setOnCampusAccommodation("no")} /> &nbsp;&nbsp;
                                No – I'll arrange my own
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-12" style={{fontSize:"12px"}}>
                            Link to <Link href="https://www.sandipanihometel.com/" target="_blank">https://www.sandipanihometel.com/</Link> Sandipani Hometel accommodation will be provided to registered Conference participants for 10-11-12 December 2026 with a separate accommodation charge.
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
                <div className="row justify-content-center align-items-center">
                  <div className="col-lg-9">
                    <div className="row">
                      <div className="col-lg-12 heading19_black mb-2"><b>Conference Registration Fee</b></div>
                      <div className="col-lg-12 heading19_black mb-2"><b>₹1,500/-</b></div>
                      <div className="col-lg-12" style={{fontSize:"12px"}}>
                        Payment will be completed through the authorised payment gateway. (QR Code)
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 text-center qr_img">
                    <Image src="/images/qr-code.png" className="img-fluid" alt="" width={540} height={95} priority />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 heading35_black mb-2">Declarations & Consent<RequiredMark /></div>
              </div>
              <div className="register_form_list mb-5">
                <div className="row">
                  <ChoiceList
                    items={options.declarations}
                    name="declaration"
                    columnClass="col-lg-12 mb-2"
                    type="checkbox"
                    wrap
                    selected={declaration}
                    onSelect={(id) => setDeclaration((current) => toggleId(current, id))}
                  />
                  <div className="col-lg-12"><FieldError message={errors.declaration} /></div>
                </div>
                
              </div>
              <div className="row">
                <div className="col-lg-12 heading35_black mb-2">Communication</div>
              </div>
              <div className="register_form_list mb-4" style={{backgroundColor:"#ecf5ff"}}>
                <div className="row">
                  <div className="col-lg-12 heading19_black mb-3"><b>Preferred communication channel<RequiredMark /></b><FieldError message={errors.preferredCommunicationChannel} /></div>
                  <div className="col-lg-12 mb-4">
                    <div className="row">

                      <div className="col-lg-6 mb-2">
                        <div className="cat_list">
                          <label htmlFor="channel-email">
                            <input type="radio" name="channel" id="channel-email" value="Email" checked={preferredCommunicationChannel === "Email"} onChange={() => setPreferredCommunicationChannel("Email")} /> &nbsp;&nbsp;
                            Email
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 mb-2">
                        <div className="cat_list">
                          <label htmlFor="channel-whatsapp">
                            <input type="radio" name="channel" id="channel-whatsapp" value="WhatsApp" checked={preferredCommunicationChannel === "WhatsApp"} onChange={() => setPreferredCommunicationChannel("WhatsApp")} /> &nbsp;&nbsp;
                            WhatsApp
                          </label>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div className="col-lg-12 heading19_black mb-3"><b>How did you hear about the Conclave?<RequiredMark /></b><FieldError message={errors.hearAboutConclave} /></div>
                  <div className="col-lg-12">
                    <div className="row">
                      <ChoiceList
                        items={options.hearAbout}
                        name="hearAboutConclave"
                        columnClass="col-lg-4 mb-2"
                        type="checkbox"
                        selected={hearAboutConclave}
                        onSelect={(id) => setHearAboutConclave((current) => toggleId(current, id))}
                      />
                    </div>
                  </div>
                </div>                
              </div>
              <div className="register_form_list mb-4">
                <div className="row">
                    <div className="col-lg-5">
                      <div className="row">
                        <div className="col-lg-12 heading19_black mb-3"><b>Transcation ID<RequiredMark /></b></div>
                        <div className="col-lg-12">
                          <div className="row">
                            <div className="col-lg-12 mb-2">
                              <div className="cat_list">
                                <input type="text" className="input_box" value={transactionId} onChange={(event) => setTransactionId(event.target.value)} required aria-required="true" />
                                <FieldError message={errors.transactionId} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="row">
                        <div className="col-lg-12 heading19_black mb-3"><b>Upload Screenshot<RequiredMark /></b></div>
                        <div className="col-lg-12">
                          <div className="row">
                            <div className="col-lg-12 mb-2">
                              <div className="cat_list">
                                <input type="file" className="input_box" accept="image/png,image/jpeg,image/webp,image/gif" required aria-required="true" onChange={(event) => setScreenshot(event.target.files?.[0] ?? null)} />
                                <FieldError message={errors.screenshot} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                </div>
              </div>

              <div className="row">
                {message ? <div className="col-lg-12 text16_black mb-2">{message}</div> : null}
                <div className="col-lg-12 mb-4">
                  <input type="submit" value="Submit" className="input_button_box" disabled={submitting} />
                </div>
              </div>
              </form>
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
