"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { appPath } from "@/app/lib/app-url";
import {
  ChipGrid,
  ChoiceCards,
  Declarations,
  Dropzone,
  Field,
  FormNav,
  PassCard,
  PhoneField,
  PhotoUpload,
  RegHero,
  ReviewSummary,
  StepHeader,
  Stepper,
  SuccessCard,
  toChoices,
} from "./parts";
import { useStepForm } from "./useStepForm";
import { emailError, fileError, mobileError, nameError, toggleValue, type Errors } from "./validation";

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

const STEPS = ["Participant", "Profile", "Preferences", "Payment"];
const UPI_ID = "boism-9028703133@boi";
const MAX_PHOTO_BYTES = 2 * 1024 * 1024;
const MAX_RECEIPT_BYTES = 5 * 1024 * 1024;
const TRANSACTION_PATTERN = /^[A-Za-z0-9]{6,30}$/;

export default function ConferenceRegistration() {
  const [options, setOptions] = useState<Options>(emptyOptions);
  const [fullName, setFullName] = useState("");
  const [attendeePhoto, setAttendeePhoto] = useState<File | null>(null);
  const [emailAddress, setEmailAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [country, setCountry] = useState("India");
  const [city, setCity] = useState("");
  const [participantCategory, setParticipantCategory] = useState("");
  const [categoryOther, setCategoryOther] = useState("");
  const [organisationInstitution, setOrganisationInstitution] = useState("");
  const [designation, setDesignation] = useState("");
  const [professionSpecialisation, setProfessionSpecialisation] = useState("");
  const [departmentFunctionalArea, setDepartmentFunctionalArea] = useState("");
  const [areaOfInterest, setAreaOfInterest] = useState<string[]>([]);
  const [exploreConclave, setExploreConclave] = useState<string[]>([]);
  const [hearAboutConclave, setHearAboutConclave] = useState<string[]>([]);
  const [payerName, setPayerName] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [declaration, setDeclaration] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [registrationCode, setRegistrationCode] = useState("");
  const [copied, setCopied] = useState(false);

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
        if (active) setMessage("Unable to load registration options. Please refresh the page.");
      });
    return () => {
      active = false;
    };
  }, []);

  const categoryName = options.categories.find((item) => String(item.id) === participantCategory)?.name ?? "";
  const isOtherCategory = categoryName === "Other";
  const categoryLabel = isOtherCategory && categoryOther.trim() ? categoryOther.trim() : categoryName;

  function validateStep(step: number) {
    const next: Errors = {};
    if (step === 1) {
      const name = nameError(fullName.trim());
      if (name) next.fullName = name;
      const photo = fileError(attendeePhoto, { label: "Attendee photo", maxBytes: MAX_PHOTO_BYTES, extensions: ["jpg", "png"] });
      if (photo) next.attendeePhoto = photo;
      const email = emailError(emailAddress.trim());
      if (email) next.emailAddress = email;
      const mobile = mobileError(mobileNumber.trim());
      if (mobile) next.mobileNumber = mobile;
      if (!country.trim()) next.country = "Country is required.";
      if (!city.trim()) next.city = "City is required.";
    }
    if (step === 2) {
      if (!participantCategory) next.participantCategory = "Select your participant category.";
      if (isOtherCategory && !categoryOther.trim()) next.categoryOther = "Please specify your category.";
      if (!organisationInstitution.trim()) next.organisationInstitution = "Organisation / institution is required.";
      if (!designation.trim()) next.designation = "Designation is required.";
      if (!professionSpecialisation.trim()) next.professionSpecialisation = "Profession / specialisation is required.";
      if (!departmentFunctionalArea.trim()) next.departmentFunctionalArea = "Department / functional area is required.";
    }
    if (step === 3) {
      if (areaOfInterest.length === 0) next.areaOfInterest = "Select at least one topic of interest.";
      if (exploreConclave.length === 0) next.exploreConclave = "Select at least one option.";
      if (hearAboutConclave.length === 0) next.hearAboutConclave = "Select how you heard about the Conclave.";
    }
    if (step === 4) {
      if (!payerName.trim()) next.payerName = "Payer name is required.";
      const utr = transactionId.trim();
      if (!utr) next.transactionId = "Please enter your transaction reference (UTR) number.";
      else if (!TRANSACTION_PATTERN.test(utr)) next.transactionId = "Enter a valid UTR / transaction ID (letters and digits only).";
      const receipt = fileError(screenshot, {
        label: "Payment receipt",
        maxBytes: MAX_RECEIPT_BYTES,
        extensions: ["jpg", "png", "webp", "pdf"],
      });
      if (receipt) next.screenshot = receipt;
      if (options.declarations.length === 0 || declaration.length !== options.declarations.length) {
        next.declaration = "Please accept all declarations to continue.";
      }
    }
    return next;
  }

  const form = useStepForm(STEPS.length, validateStep);
  const { step, errors, clearError } = form;

  function resetForm() {
    setFullName("");
    setAttendeePhoto(null);
    setEmailAddress("");
    setMobileNumber("");
    setCountry("India");
    setCity("");
    setParticipantCategory("");
    setCategoryOther("");
    setOrganisationInstitution("");
    setDesignation("");
    setProfessionSpecialisation("");
    setDepartmentFunctionalArea("");
    setAreaOfInterest([]);
    setExploreConclave([]);
    setHearAboutConclave([]);
    setPayerName("");
    setTransactionId("");
    setScreenshot(null);
    setDeclaration([]);
    setMessage("");
    setRegistrationCode("");
    form.reset();
  }

  async function copyUpi() {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    if (step < STEPS.length) {
      form.goNext();
      return;
    }
    setMessage("");
    if (!form.validateAll()) return;

    setSubmitting(true);

    const body = new FormData();
    body.set("fullName", fullName.trim());
    body.set("emailAddress", emailAddress.trim());
    body.set("mobileNumber", mobileNumber.trim());
    body.set("country", country.trim());
    body.set("city", city.trim());
    body.set("participantCategory", participantCategory);
    if (isOtherCategory) body.set("categoryOther", categoryOther.trim());
    body.set("organisationInstitution", organisationInstitution.trim());
    body.set("designation", designation.trim());
    body.set("professionSpecialisation", professionSpecialisation.trim());
    body.set("departmentFunctionalArea", departmentFunctionalArea.trim());
    areaOfInterest.forEach((id) => body.append("areaOfInterest", id));
    exploreConclave.forEach((id) => body.append("exploreConclave", id));
    hearAboutConclave.forEach((id) => body.append("hearAboutConclave", id));
    body.set("payerName", payerName.trim());
    body.set("transactionId", transactionId.trim());
    declaration.forEach((id) => body.append("declaration", id));
    if (attendeePhoto) body.set("attendeePhoto", attendeePhoto);
    if (screenshot) body.set("screenshot", screenshot);

    try {
      const response = await fetch(appPath("/api/registrations"), { method: "POST", body });
      const data = (await response.json()) as { message?: string; registrationCode?: string };
      if (!response.ok) {
        setMessage(data.message || "Unable to save registration.");
        return;
      }
      setRegistrationCode(data.registrationCode ?? "");
      form.markCompleted(STEPS.length);
      document.getElementById("reg-stepper")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      setMessage("Unable to save registration. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="reg_scope">
      <RegHero
        badge="Official Summit Registration"
        eyebrow="Symbiosis–SolixEmpower Tech Conclave 2026"
        title="Conference Registration Form"
        sub="Secure Your Spot"
        pills={[
          { icon: "calendar", text: "10–12 December 2026" },
          { icon: "pin", text: "SMCW & SUHRC, SIU Campus, Lavale, Pune" },
          // { icon: "shield", text: "Verified Credential • ₹1,500" },
        ]}
      />

      <div className="container reg_body">
        <div className="row">
          <div className="col-lg-8">
            <Stepper
              steps={STEPS}
              step={registrationCode ? 0 : step}
              completed={form.completed}
              canJump={(target) => !registrationCode && form.canJump(target)}
              onJump={form.jumpTo}
            />

            {registrationCode ? (
              <SuccessCard
                title="Registration Received"
                sub={`Thank you, ${fullName.trim()}. Your registration and payment details have been recorded. UPI payments may take up to one working day (T+1) to reflect in our account. Your registration will be verified and confirmed within 4–5 working days of submission, after which you will receive a confirmation email.`}
                refLabel="Registration ID"
                refValue={registrationCode}
              >
                <div>
                  <button type="button" className="btn_prev_step" onClick={resetForm}>
                    Register another delegate
                  </button>
                </div>
              </SuccessCard>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                {step === 1 ? (
                  <div className="step_pane">
                    <StepHeader
                      kicker="01 — Personal Profile"
                      title="Participant Details"
                      sub="Enter your primary contact information to create your conference badge and credentials."
                    />
                    <Field
                      label="Full Name"
                      htmlFor="fullName"
                      required
                      helper="Your full name as you would like it to appear on your attendance credentials and participation badge."
                      error={errors.fullName}
                    >
                      <input
                        id="fullName"
                        type="text"
                        className={`input_box ${errors.fullName ? "is-invalid" : ""}`}
                        placeholder="e.g. Dr. Rajesh Sharma"
                        value={fullName}
                        onChange={(event) => {
                          setFullName(event.target.value.replace(/[^A-Za-z. ]/g, ""));
                          clearError("fullName");
                        }}
                        autoComplete="name"
                        maxLength={200}
                      />
                    </Field>
                    <Field
                      label="Attendee Photo"
                      required
                      helper="A clear, front-facing passport-style photograph for your delegate badge."
                      error={errors.attendeePhoto}
                    >
                      <PhotoUpload
                        id="attendeePhoto"
                        file={attendeePhoto}
                        onFile={(file) => {
                          setAttendeePhoto(file);
                          clearError("attendeePhoto");
                        }}
                        invalid={Boolean(errors.attendeePhoto)}
                      />
                    </Field>
                    <Field
                      label="Email Address"
                      htmlFor="emailAddress"
                      required
                      helper="Official credentials, receipt confirmations, and schedule updates will be delivered here."
                      error={errors.emailAddress}
                    >
                      <input
                        id="emailAddress"
                        type="email"
                        className={`input_box ${errors.emailAddress ? "is-invalid" : ""}`}
                        placeholder="name@institution.org"
                        value={emailAddress}
                        onChange={(event) => {
                          setEmailAddress(event.target.value);
                          clearError("emailAddress");
                        }}
                        autoComplete="email"
                        maxLength={255}
                      />
                    </Field>
                    <Field
                      label="Mobile Number"
                      htmlFor="mobileNumber"
                      required
                      helper="10-digit mobile number for pass notifications and check-in QR retrieval."
                      error={errors.mobileNumber}
                    >
                      <PhoneField
                        id="mobileNumber"
                        value={mobileNumber}
                        onChange={(value) => {
                          setMobileNumber(value);
                          clearError("mobileNumber");
                        }}
                        invalid={Boolean(errors.mobileNumber)}
                      />
                    </Field>
                    <div className="row">
                      <div className="col-md-6">
                        <Field label="Country" htmlFor="country" required error={errors.country}>
                          <input
                            id="country"
                            type="text"
                            className={`input_box ${errors.country ? "is-invalid" : ""}`}
                            placeholder="India"
                            value={country}
                            onChange={(event) => {
                              setCountry(event.target.value);
                              clearError("country");
                            }}
                            autoComplete="country-name"
                            maxLength={100}
                          />
                        </Field>
                      </div>
                      <div className="col-md-6">
                        <Field label="City" htmlFor="city" required error={errors.city}>
                          <input
                            id="city"
                            type="text"
                            className={`input_box ${errors.city ? "is-invalid" : ""}`}
                            placeholder="e.g. Pune"
                            value={city}
                            onChange={(event) => {
                              setCity(event.target.value);
                              clearError("city");
                            }}
                            autoComplete="address-level2"
                            maxLength={100}
                          />
                        </Field>
                      </div>
                    </div>
                    <FormNav>
                      <button type="submit" className="btn_primary_action">
                        Continue to Professional Details <span aria-hidden="true">→</span>
                      </button>
                    </FormNav>
                  </div>
                ) : null}

                {step === 2 ? (
                  <div className="step_pane">
                    <StepHeader
                      kicker="02 — Professional Credentials"
                      title="Professional Profile"
                      sub="Tell us about your role so we can tailor sessions, networking and your delegate badge."
                    />
                    <Field
                      label="Participant Category"
                      required
                      helper="Select the category that best represents your primary role."
                      error={errors.participantCategory || errors.categoryOther}
                    >
                      <ChoiceCards
                        name="participantCategory"
                        type="radio"
                        items={toChoices(options.categories)}
                        selected={participantCategory ? [participantCategory] : []}
                        onToggle={(value) => {
                          setParticipantCategory(value);
                          clearError("participantCategory");
                          clearError("categoryOther");
                        }}
                      />
                      {isOtherCategory ? (
                        <div className="other_specify">
                          <input
                            type="text"
                            className={`input_box ${errors.categoryOther ? "is-invalid" : ""}`}
                            placeholder="Please specify your category"
                            aria-label="Specify your category"
                            value={categoryOther}
                            onChange={(event) => {
                              setCategoryOther(event.target.value);
                              clearError("categoryOther");
                            }}
                            maxLength={150}
                            autoFocus
                          />
                        </div>
                      ) : null}
                    </Field>
                    <div className="row">
                      <div className="col-md-6">
                        <Field label="Organisation / Institution" htmlFor="organisationInstitution" required error={errors.organisationInstitution}>
                          <input
                            id="organisationInstitution"
                            type="text"
                            className={`input_box ${errors.organisationInstitution ? "is-invalid" : ""}`}
                            placeholder="e.g. Symbiosis International University"
                            value={organisationInstitution}
                            onChange={(event) => {
                              setOrganisationInstitution(event.target.value);
                              clearError("organisationInstitution");
                            }}
                            autoComplete="organization"
                            maxLength={255}
                          />
                        </Field>
                      </div>
                      <div className="col-md-6">
                        <Field label="Designation" htmlFor="designation" required error={errors.designation}>
                          <input
                            id="designation"
                            type="text"
                            className={`input_box ${errors.designation ? "is-invalid" : ""}`}
                            placeholder="e.g. Associate Professor"
                            value={designation}
                            onChange={(event) => {
                              setDesignation(event.target.value);
                              clearError("designation");
                            }}
                            autoComplete="organization-title"
                            maxLength={255}
                          />
                        </Field>
                      </div>
                      <div className="col-md-6">
                        <Field label="Profession / Specialisation" htmlFor="professionSpecialisation" required error={errors.professionSpecialisation}>
                          <input
                            id="professionSpecialisation"
                            type="text"
                            className={`input_box ${errors.professionSpecialisation ? "is-invalid" : ""}`}
                            placeholder="e.g. Cardiology, Data Science"
                            value={professionSpecialisation}
                            onChange={(event) => {
                              setProfessionSpecialisation(event.target.value);
                              clearError("professionSpecialisation");
                            }}
                            maxLength={255}
                          />
                        </Field>
                      </div>
                      <div className="col-md-6">
                        <Field label="Department / Functional Area" htmlFor="departmentFunctionalArea" required error={errors.departmentFunctionalArea}>
                          <input
                            id="departmentFunctionalArea"
                            type="text"
                            className={`input_box ${errors.departmentFunctionalArea ? "is-invalid" : ""}`}
                            placeholder="e.g. Research & Innovation"
                            value={departmentFunctionalArea}
                            onChange={(event) => {
                              setDepartmentFunctionalArea(event.target.value);
                              clearError("departmentFunctionalArea");
                            }}
                            maxLength={255}
                          />
                        </Field>
                      </div>
                    </div>
                    <FormNav backLabel="Back to Participant Details" onBack={form.goBack}>
                      <button type="submit" className="btn_primary_action">
                        Continue to Preferences <span aria-hidden="true">→</span>
                      </button>
                    </FormNav>
                  </div>
                ) : null}

                {step === 3 ? (
                  <div className="step_pane">
                    <StepHeader
                      kicker="03 — Areas of Interest & Engagement"
                      title="Interests & Preferences"
                      sub="Help us curate your Conclave experience."
                    />
                    <Field
                      label="Topics You're Interested In"
                      required
                      helper="Select all multidisciplinary tracks relevant to your practice and interests."
                      error={errors.areaOfInterest}
                    >
                      <ChipGrid
                        name="areaOfInterest"
                        items={toChoices(options.areasOfInterest)}
                        selected={areaOfInterest}
                        onToggle={(value) => {
                          setAreaOfInterest((current) => toggleValue(current, value));
                          clearError("areaOfInterest");
                        }}
                      />
                    </Field>
                    <Field
                      label="What would you like to explore at the Conclave?"
                      required
                      helper="Select all that apply."
                      error={errors.exploreConclave}
                    >
                      <ChipGrid
                        name="exploreConclave"
                        items={toChoices(options.exploreOptions)}
                        selected={exploreConclave}
                        onToggle={(value) => {
                          setExploreConclave((current) => toggleValue(current, value));
                          clearError("exploreConclave");
                        }}
                      />
                    </Field>
                    <div className="conclave_experience">
                      <h3 className="conclave_experience_title">Your Conclave Experience</h3>
                      <p className="conclave_experience_text">
                        Let us help you plan your stay and stay connected throughout the Conclave.
                      </p>
                      <p className="conclave_experience_text">
                        Planning to stay on campus? Complete your Conclave registration first, then visit the{" "}
                        <a href="https://www.sandipanihometel.com/" target="_blank" rel="noreferrer">
                          Sandipani Hometel booking link
                        </a>{" "}
                        to reserve your accommodation, subject to availability and applicable charges.
                      </p>
                    </div>
                    <Field
                      label="How did you hear about the Conclave?"
                      required
                      helper="Select all that apply."
                      error={errors.hearAboutConclave}
                    >
                      <ChipGrid
                        name="hearAboutConclave"
                        items={toChoices(options.hearAbout)}
                        selected={hearAboutConclave}
                        onToggle={(value) => {
                          setHearAboutConclave((current) => toggleValue(current, value));
                          clearError("hearAboutConclave");
                        }}
                      />
                    </Field>
                    <FormNav backLabel="Back to Professional Details" onBack={form.goBack}>
                      <button type="submit" className="btn_primary_action">
                        Continue to Payment &amp; Review <span aria-hidden="true">→</span>
                      </button>
                    </FormNav>
                  </div>
                ) : null}

                {step === 4 ? (
                  <div className="step_pane">
                    <StepHeader
                      kicker="04 — Registration & Payment Verification"
                      title="Payment & Verification"
                      sub="Review your details, complete the payment and upload your receipt for verification."
                    />
                    <ReviewSummary
                      title="Registration Review"
                      onEdit={() => form.jumpTo(1)}
                      rows={[
                        ["Attendee Name", fullName.trim()],
                        ["Contact Email", emailAddress.trim()],
                        ["Mobile Phone", mobileNumber ? `+91 ${mobileNumber}` : ""],
                        ["Organisation", organisationInstitution.trim()],
                        ["Participant Category", categoryLabel],
                      ]}
                      total={["Registration Fee", "₹1,500/-"]}
                    />

                    <div className="info_note is_green payment_verification_note">
                      Your registration shall be confirmed within 4-5 working days after payment verification. An
                      email will be sent with your delegate pass.
                    </div>

                    <div className="payment_panel">
                      <div className="row align-items-center">
                        <div className="col-md-7 mb-4 mb-md-0">
                          <div className="payment_badge_title">Official Delegate Fee</div>
                          <div className="payment_amount_large">
                            ₹1,500
                          </div>
                          <p className="reg_helper mb-3">
                            Scan the QR code using any UPI app (Google Pay, PhonePe, Paytm, BHIM) or transfer directly
                            to the official account.
                          </p>
                          <div className="payment_lines">
                            <div>
                              <b>Beneficiary:</b> Symbiosis International (Deemed University)
                            </div>
                            <div className="my-1 d-flex flex-wrap align-items-center gap-2">
                              <b>UPI ID:</b>
                              <span className="upi_box">
                                <span className="upi_id_text">{UPI_ID}</span>
                                <button type="button" className="upi_copy_btn" onClick={copyUpi}>
                                  {copied ? "Copied" : "Copy"}
                                </button>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-5">
                          <div className="qr_code_card">
                            <Image src="/images/qr-code.png" alt="Official payment QR code" width={170} height={170} />
                            <div className="qr_code_note">Official Payment QR Code</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Field
                      label="Payer Name (as per UPI / Bank Transaction)"
                      htmlFor="payerName"
                      required
                      helper="Enter the account holder's name exactly as it appears on the payment — especially if paid from a family member's or another person's account."
                      error={errors.payerName}
                    >
                      <input
                        id="payerName"
                        type="text"
                        className={`input_box ${errors.payerName ? "is-invalid" : ""}`}
                        placeholder="e.g. Rajesh Sharma"
                        value={payerName}
                        onChange={(event) => {
                          setPayerName(event.target.value);
                          clearError("payerName");
                        }}
                        maxLength={200}
                      />
                    </Field>
                    <div className="row">
                      <div className="col-md-6">
                        <Field
                          label="Transaction Reference (UTR)"
                          htmlFor="transactionId"
                          required
                          helper="The 12-digit UTR or transaction ID from your payment confirmation."
                          error={errors.transactionId}
                        >
                          <input
                            id="transactionId"
                            type="text"
                            className={`input_box ${errors.transactionId ? "is-invalid" : ""}`}
                            placeholder="e.g. 412345678901"
                            value={transactionId}
                            onChange={(event) => {
                              setTransactionId(event.target.value.replace(/\s/g, ""));
                              clearError("transactionId");
                            }}
                            maxLength={30}
                            autoComplete="off"
                          />
                        </Field>
                        <p className="utr_note">
                          Please note: Providing incorrect UTR details or failing to provide the correct UTR details
                          may result in cancellation of registration.
                        </p>
                      </div>
                      <div className="col-md-6">
                        <Field
                          label="Upload Payment Receipt"
                          required
                          helper="A clear screenshot or PDF of your ₹1,500 transfer."
                          error={errors.screenshot}
                        >
                          <Dropzone
                            id="screenshot"
                            accept="image/jpeg,image/png,image/webp,application/pdf"
                            hint="JPG / JPEG / PNG / PDF • Max 5 MB"
                            file={screenshot}
                            onFile={(file) => {
                              setScreenshot(file);
                              clearError("screenshot");
                            }}
                            invalid={Boolean(errors.screenshot)}
                          />
                        </Field>
                      </div>
                    </div>
                    <Field
                      label="Confirmations & Consent"
                      required
                      helper="Please read and accept each statement to complete your registration."
                      error={errors.declaration}
                    >
                      <Declarations
                        name="declaration"
                        items={toChoices(options.declarations)}
                        selected={declaration}
                        onToggle={(value) => {
                          setDeclaration((current) => toggleValue(current, value));
                          clearError("declaration");
                        }}
                        invalid={Boolean(errors.declaration)}
                      />
                    </Field>
                    {message ? <div className="form_status">{message}</div> : null}
                    {submitting ? <div className="form_status is_pending">Recording registration…</div> : null}
                    <FormNav backLabel="Back to Preferences" onBack={form.goBack}>
                      <button type="submit" className="btn_primary_action is_submit" disabled={submitting}>
                        {submitting ? "Submitting…" : "Complete Registration"}
                      </button>
                    </FormNav>
                  </div>
                ) : null}

                {step !== STEPS.length && message ? <div className="form_status">{message}</div> : null}
              </form>
            )}
          </div>

          <PassCard
            variant="delegate"
            title="DELEGATE PASS"
            subtitle="Symbiosis-SolixEmpower Tech Conclave 2026"
            meta={[
              { icon: "calendar", label: "Dates", value: "10-12 December 2026", sub: "3 Full Days • Connect, Create, Transform" },
              { icon: "pin", label: "Venue", value: "SMCW & SUHRC", sub: "SIU Lavale Campus, Pune, Maharashtra" },
            ]}
            inclusionsTitle="Delegate Privileges"
            inclusions={[
              "Full 3-Day Keynotes, Panels & Tracks",
              "Official Delegate Kit & Verified Badge",
              "Lunch & High Tea on All 3 Days",
              "Certificate of Participation",
              "Networking Opportunities",
            ]}
            badge={{
              role: "Delegate",
              name: fullName.trim(),
              org: organisationInstitution.trim(),
              orgPlaceholder: "Your Organisation",
            }}
          />
        </div>
      </div>
    </section>
  );
}
