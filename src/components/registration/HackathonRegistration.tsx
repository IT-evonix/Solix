"use client";

import { FormEvent, useEffect, useState } from "react";
import { appPath } from "@/app/lib/app-url";
import {
  GENDERS,
  INSTITUTION_ID_EXTENSIONS,
  MAX_UPLOAD_BYTES,
  MIN_AGE,
  SOLUTION_EXTENSIONS,
  STATES_AND_UTS,
  YEARS_OF_STUDY,
  ageOn,
} from "@/data/hackathonOptions";
import {
  ChoiceCards,
  Declarations,
  Dropzone,
  Field,
  FormNav,
  PassCard,
  PhoneField,
  RegHero,
  ReviewSummary,
  StepHeader,
  Stepper,
  SuccessCard,
  toChoices,
  type Choice,
} from "./parts";
import { useStepForm } from "./useStepForm";
import { emailError, fileError, mobileError, nameError, toggleValue, type Errors } from "./validation";

type Option = { id: number; name: string };

type Options = {
  disciplines: Option[];
  commitments: Option[];
  consents: Option[];
};

const emptyOptions: Options = { disciplines: [], commitments: [], consents: [] };

const STEPS = ["Profile", "Academic", "Participate", "Confirm"];
const genderChoices: Choice[] = GENDERS.map((item) => ({ value: item, label: item }));

function todayIso() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

function formatDate(iso: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  return match ? `${match[3]}/${match[2]}/${match[1]}` : "";
}

export default function HackathonRegistration() {
  const [options, setOptions] = useState<Options>(emptyOptions);
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [cityDistrict, setCityDistrict] = useState("");
  const [stateUt, setStateUt] = useState("");
  const [institutionName, setInstitutionName] = useState("");
  const [courseProgramme, setCourseProgramme] = useState("");
  const [specialisation, setSpecialisation] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");
  const [institutionId, setInstitutionId] = useState<File | null>(null);
  const [discipline, setDiscipline] = useState("");
  const [disciplineOther, setDisciplineOther] = useState("");
  const [commitments, setCommitments] = useState<string[]>([]);
  const [solution, setSolution] = useState<File | null>(null);
  const [consents, setConsents] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [registrationCode, setRegistrationCode] = useState("");

  useEffect(() => {
    let active = true;
    fetch(appPath("/api/hackathon-options"))
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

  const disciplineName = options.disciplines.find((item) => String(item.id) === discipline)?.name ?? "";
  const isOtherDiscipline = disciplineName === "Others";
  const disciplineLabel = isOtherDiscipline && disciplineOther.trim() ? disciplineOther.trim() : disciplineName;

  function validateStep(step: number) {
    const next: Errors = {};
    if (step === 1) {
      const name = nameError(fullName.trim());
      if (name) next.fullName = name;
      const age = ageOn(dateOfBirth);
      if (!dateOfBirth) next.dateOfBirth = "Date of birth is required.";
      else if (age === null || age > 100) next.dateOfBirth = "Enter a valid date of birth.";
      else if (age < MIN_AGE) next.dateOfBirth = `You must be at least ${MIN_AGE} years old to register.`;
      if (!gender) next.gender = "Select your gender.";
      const email = emailError(emailAddress.trim());
      if (email) next.emailAddress = email;
      const mobile = mobileError(mobileNumber.trim());
      if (mobile) next.mobileNumber = mobile;
      if (!cityDistrict.trim()) next.cityDistrict = "City / district is required.";
      if (!stateUt) next.stateUt = "Select your state / union territory.";
    }
    if (step === 2) {
      if (!institutionName.trim()) next.institutionName = "Institution name is required.";
      if (!courseProgramme.trim()) next.courseProgramme = "Course / programme is required.";
      if (!specialisation.trim()) next.specialisation = "Specialisation / branch is required.";
      if (!yearOfStudy) next.yearOfStudy = "Select your current year of study.";
      const idFile = fileError(institutionId, {
        label: "College ID",
        maxBytes: MAX_UPLOAD_BYTES,
        extensions: INSTITUTION_ID_EXTENSIONS,
      });
      if (idFile) next.institutionId = idFile;
      if (!discipline) next.discipline = "Select your primary discipline.";
      else if (isOtherDiscipline && !disciplineOther.trim()) next.discipline = "Please specify your discipline.";
    }
    if (step === 3) {
      if (options.commitments.length === 0 || commitments.length !== options.commitments.length) {
        next.commitments = "Please confirm all three statements to continue.";
      }
      const solutionFile = fileError(solution, {
        label: "Solution file",
        maxBytes: MAX_UPLOAD_BYTES,
        extensions: SOLUTION_EXTENSIONS,
      });
      if (solutionFile) next.solution = solutionFile;
    }
    if (step === 4) {
      if (options.consents.length === 0 || consents.length !== options.consents.length) {
        next.consents = "Please accept all confirmations to continue.";
      }
    }
    return next;
  }

  const form = useStepForm(STEPS.length, validateStep);
  const { step, errors, clearError } = form;

  function resetForm() {
    setFullName("");
    setDateOfBirth("");
    setGender("");
    setEmailAddress("");
    setMobileNumber("");
    setCityDistrict("");
    setStateUt("");
    setInstitutionName("");
    setCourseProgramme("");
    setSpecialisation("");
    setYearOfStudy("");
    setInstitutionId(null);
    setDiscipline("");
    setDisciplineOther("");
    setCommitments([]);
    setSolution(null);
    setConsents([]);
    setMessage("");
    setRegistrationCode("");
    form.reset();
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
    body.set("dateOfBirth", dateOfBirth);
    body.set("gender", gender);
    body.set("emailAddress", emailAddress.trim());
    body.set("mobileNumber", mobileNumber.trim());
    body.set("cityDistrict", cityDistrict.trim());
    body.set("stateUt", stateUt);
    body.set("institutionName", institutionName.trim());
    body.set("courseProgramme", courseProgramme.trim());
    body.set("specialisation", specialisation.trim());
    body.set("yearOfStudy", yearOfStudy);
    body.set("discipline", discipline);
    if (isOtherDiscipline) body.set("disciplineOther", disciplineOther.trim());
    [...commitments, ...consents].forEach((id) => body.append("declaration", id));
    if (institutionId) body.set("institutionId", institutionId);
    if (solution) body.set("solution", solution);

    try {
      const response = await fetch(appPath("/api/hackathon-registrations"), { method: "POST", body });
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
        badge="Screening Round Registration"
        eyebrow="Symbiosis–SolixEmpower Tech Conclave 2026"
        title="HACKATHON 2026"
        sub="Register now and submit your innovative solution to real-world healthcare challenge"
        pills={[
          { icon: "calendar", text: "10–12 December 2026" },
          { icon: "pin", text: "SMCW & SUHRC, SIU, Lavale, Pune" },
          { icon: "spark", text: "Connect • Create • Transform" },
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
                title="Registration Submitted"
                sub={`Thank you, ${fullName.trim()}. Your Round 1 registration and solution have been received. A confirmation email is on its way to ${emailAddress.trim()} — if you don't see it within a few minutes, check your Spam or Promotions folder. Shortlisted participants will be informed by email for the on-campus Grand Finale.`}
                refLabel="Registration Ref. No."
                refValue={registrationCode}
              >
                <div>
                  <button type="button" className="btn_prev_step" onClick={resetForm}>
                    Register another participant
                  </button>
                </div>
              </SuccessCard>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                {step === 1 ? (
                  <div className="step_pane">
                    <StepHeader
                      kicker="01 — Personal Profile"
                      title="Profile Details"
                      sub="Fields marked * are mandatory. Please enter details exactly as they appear on your official ID."
                    />
                    <Field
                      label="Full Name (as per official ID)"
                      htmlFor="fullName"
                      required
                      helper="This name will appear on your participation certificate."
                      error={errors.fullName}
                    >
                      <input
                        id="fullName"
                        type="text"
                        className={`input_box ${errors.fullName ? "is-invalid" : ""}`}
                        placeholder="e.g. Ananya Iyer"
                        value={fullName}
                        onChange={(event) => {
                          setFullName(event.target.value.replace(/[^A-Za-z. ]/g, ""));
                          clearError("fullName");
                        }}
                        autoComplete="name"
                        maxLength={200}
                      />
                    </Field>
                    <div className="row">
                      <div className="col-md-6">
                        <Field
                          label="Date of Birth"
                          htmlFor="dateOfBirth"
                          required
                          helper={`DD/MM/YYYY — participants must be at least ${MIN_AGE} years old.`}
                          error={errors.dateOfBirth}
                        >
                          <input
                            id="dateOfBirth"
                            type="date"
                            className={`input_box ${errors.dateOfBirth ? "is-invalid" : ""}`}
                            value={dateOfBirth}
                            max={todayIso()}
                            min="1926-01-01"
                            onChange={(event) => {
                              setDateOfBirth(event.target.value);
                              clearError("dateOfBirth");
                            }}
                            autoComplete="bday"
                          />
                        </Field>
                      </div>
                    </div>
                    <Field label="Gender" required error={errors.gender}>
                      <ChoiceCards
                        name="gender"
                        type="radio"
                        items={genderChoices}
                        selected={gender ? [gender] : []}
                        onToggle={(value) => {
                          setGender(value);
                          clearError("gender");
                        }}
                      />
                    </Field>
                    <div className="row">
                      <div className="col-md-6">
                        <Field
                          label="Email Address"
                          htmlFor="emailAddress"
                          required
                          helper="All Hackathon communication sent here."
                          error={errors.emailAddress}
                        >
                          <input
                            id="emailAddress"
                            type="email"
                            className={`input_box ${errors.emailAddress ? "is-invalid" : ""}`}
                            placeholder="name@college.edu"
                            value={emailAddress}
                            onChange={(event) => {
                              setEmailAddress(event.target.value);
                              clearError("emailAddress");
                            }}
                            autoComplete="email"
                            maxLength={255}
                          />
                        </Field>
                      </div>
                      <div className="col-md-6">
                        <Field
                          label="Mobile Number"
                          htmlFor="mobileNumber"
                          required
                          helper="10-digit number for urgent updates."
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
                      </div>
                      <div className="col-md-6">
                        <Field label="City / District" htmlFor="cityDistrict" required error={errors.cityDistrict}>
                          <input
                            id="cityDistrict"
                            type="text"
                            className={`input_box ${errors.cityDistrict ? "is-invalid" : ""}`}
                            placeholder="e.g. Pune"
                            value={cityDistrict}
                            onChange={(event) => {
                              setCityDistrict(event.target.value);
                              clearError("cityDistrict");
                            }}
                            autoComplete="address-level2"
                            maxLength={100}
                          />
                        </Field>
                      </div>
                      <div className="col-md-6">
                        <Field label="State / Union Territory" htmlFor="stateUt" required error={errors.stateUt}>
                          <select
                            id="stateUt"
                            className={`input_box ${stateUt ? "" : "is-empty"} ${errors.stateUt ? "is-invalid" : ""}`}
                            value={stateUt}
                            onChange={(event) => {
                              setStateUt(event.target.value);
                              clearError("stateUt");
                            }}
                            autoComplete="address-level1"
                          >
                            <option value="">Select state / UT</option>
                            {STATES_AND_UTS.map((item) => (
                              <option key={item} value={item}>
                                {item}
                              </option>
                            ))}
                          </select>
                        </Field>
                      </div>
                    </div>
                    <FormNav>
                      <button type="submit" className="btn_primary_action">
                        Continue to Academic Details <span aria-hidden="true">→</span>
                      </button>
                    </FormNav>
                  </div>
                ) : null}

                {step === 2 ? (
                  <div className="step_pane">
                    <StepHeader
                      kicker="02 — Academic Credentials"
                      title="Academic Details"
                      sub="Tell us about your current programme of study and primary discipline."
                    />
                    <Field
                      label="Institution / College / University Name"
                      htmlFor="institutionName"
                      required
                      error={errors.institutionName}
                    >
                      <input
                        id="institutionName"
                        type="text"
                        className={`input_box ${errors.institutionName ? "is-invalid" : ""}`}
                        placeholder="e.g. Symbiosis Institute of Technology, Pune"
                        value={institutionName}
                        onChange={(event) => {
                          setInstitutionName(event.target.value);
                          clearError("institutionName");
                        }}
                        autoComplete="organization"
                        maxLength={255}
                      />
                    </Field>
                    <div className="row">
                      <div className="col-md-6">
                        <Field label="Course / Programme" htmlFor="courseProgramme" required error={errors.courseProgramme}>
                          <input
                            id="courseProgramme"
                            type="text"
                            className={`input_box ${errors.courseProgramme ? "is-invalid" : ""}`}
                            placeholder="e.g. B.Tech, MBBS, M.Sc"
                            value={courseProgramme}
                            onChange={(event) => {
                              setCourseProgramme(event.target.value);
                              clearError("courseProgramme");
                            }}
                            maxLength={255}
                          />
                        </Field>
                      </div>
                      <div className="col-md-6">
                        <Field
                          label="Specialisation / Branch / Discipline"
                          htmlFor="specialisation"
                          required
                          error={errors.specialisation}
                        >
                          <input
                            id="specialisation"
                            type="text"
                            className={`input_box ${errors.specialisation ? "is-invalid" : ""}`}
                            placeholder="e.g. Computer Science"
                            value={specialisation}
                            onChange={(event) => {
                              setSpecialisation(event.target.value);
                              clearError("specialisation");
                            }}
                            maxLength={255}
                          />
                        </Field>
                      </div>
                      <div className="col-md-6">
                        <Field label="Current Year of Study" htmlFor="yearOfStudy" required error={errors.yearOfStudy}>
                          <select
                            id="yearOfStudy"
                            className={`input_box ${yearOfStudy ? "" : "is-empty"} ${errors.yearOfStudy ? "is-invalid" : ""}`}
                            value={yearOfStudy}
                            onChange={(event) => {
                              setYearOfStudy(event.target.value);
                              clearError("yearOfStudy");
                            }}
                          >
                            <option value="">Select year</option>
                            {YEARS_OF_STUDY.map((item) => (
                              <option key={item} value={item}>
                                {item}
                              </option>
                            ))}
                          </select>
                        </Field>
                      </div>
                    </div>
                    <Field
                      label="College / Institution ID"
                      required
                      helper="Upload a clear photo or scan of your valid college / institution ID card."
                      error={errors.institutionId}
                    >
                      <Dropzone
                        id="institutionId"
                        accept="image/jpeg,image/png,application/pdf"
                        hint="JPG / PNG / PDF • Max 5 MB"
                        file={institutionId}
                        onFile={(file) => {
                          setInstitutionId(file);
                          clearError("institutionId");
                        }}
                        invalid={Boolean(errors.institutionId)}
                      />
                    </Field>
                    <Field
                      label="Primary Discipline Category"
                      required
                      helper="Tick the one category that best describes your primary discipline."
                      error={errors.discipline}
                    >
                      <ChoiceCards
                        name="discipline"
                        type="radio"
                        items={toChoices(options.disciplines)}
                        selected={discipline ? [discipline] : []}
                        onToggle={(value) => {
                          setDiscipline(value);
                          clearError("discipline");
                        }}
                      />
                      {isOtherDiscipline ? (
                        <div className="other_specify">
                          <input
                            type="text"
                            className={`input_box ${errors.discipline ? "is-invalid" : ""}`}
                            placeholder="If Others, specify your discipline"
                            aria-label="Specify your discipline"
                            value={disciplineOther}
                            onChange={(event) => {
                              setDisciplineOther(event.target.value);
                              clearError("discipline");
                            }}
                            maxLength={150}
                            autoFocus
                          />
                        </div>
                      ) : null}
                    </Field>
                    <FormNav backLabel="Back to Personal Details" onBack={form.goBack}>
                      <button type="submit" className="btn_primary_action">
                        Continue to Hackathon <span aria-hidden="true">→</span>
                      </button>
                    </FormNav>
                  </div>
                ) : null}

                {step === 3 ? (
                  <div className="step_pane">
                    <StepHeader
                      kicker="03 — Participate"
                      title="Hackathon Participation"
                      sub="Round 1 is an individual submission. Confirm your participation and upload your proposed solution."
                    />
                    <Field
                      label="Participation Confirmation"
                      required
                      helper="Please confirm each statement."
                      error={errors.commitments}
                    >
                      <Declarations
                        name="commitment"
                        items={toChoices(options.commitments)}
                        selected={commitments}
                        onToggle={(value) => {
                          setCommitments((current) => toggleValue(current, value));
                          clearError("commitments");
                        }}
                        invalid={Boolean(errors.commitments)}
                      />
                    </Field>
                    <Field
                      label="Upload Your Solution to the Official Round 1 Problem Statement"
                      required
                      helper="Attach your proposed solution as a single document, presentation or archive."
                      error={errors.solution}
                    >
                      <Dropzone
                        id="solution"
                        accept=".pdf,.ppt,.pptx,.doc,.docx,.zip,application/pdf,application/zip"
                        hint="PDF / PPT / PPTX / DOC / DOCX / ZIP • Maximum file size: 5 MB"
                        file={solution}
                        onFile={(file) => {
                          setSolution(file);
                          clearError("solution");
                        }}
                        invalid={Boolean(errors.solution)}
                        prompt="Upload solution"
                      />
                    </Field>
                    <FormNav backLabel="Back to Academic Details" onBack={form.goBack}>
                      <button type="submit" className="btn_primary_action">
                        Continue to Review <span aria-hidden="true">→</span>
                      </button>
                    </FormNav>
                  </div>
                ) : null}

                {step === 4 ? (
                  <div className="step_pane">
                    <StepHeader
                      kicker="04 — Confirmations & Consent"
                      title="Review & Submit"
                      sub="Check your details before submitting. A registration reference number will be issued on submission."
                    />
                    <ReviewSummary
                      title="Registration Review"
                      onEdit={() => form.jumpTo(1)}
                      rows={[
                        ["Full Name", fullName.trim()],
                        ["Date of Birth", formatDate(dateOfBirth)],
                        ["Email", emailAddress.trim()],
                        ["Mobile", mobileNumber ? `+91 ${mobileNumber}` : ""],
                        ["Location", [cityDistrict.trim(), stateUt].filter(Boolean).join(", ")],
                        ["Institution", institutionName.trim()],
                        ["Course / Year", [courseProgramme.trim(), yearOfStudy].filter(Boolean).join(" • ")],
                        ["Primary Discipline", disciplineLabel],
                        ["Solution File", solution?.name ?? ""],
                      ]}
                      total={["Registration Fee", "No payment required"]}
                    />
                    <Field
                      label="Confirmations & Consent"
                      required
                      helper="Please read and accept each statement to complete your registration."
                      error={errors.consents}
                    >
                      <Declarations
                        name="consent"
                        items={toChoices(options.consents)}
                        selected={consents}
                        onToggle={(value) => {
                          setConsents((current) => toggleValue(current, value));
                          clearError("consents");
                        }}
                        invalid={Boolean(errors.consents)}
                      />
                    </Field>
                    <div className="info_note is_green">
                      Submitting this form does not involve any payment. A registration reference number will be issued
                      on submission.
                    </div>
                    {message ? <div className="form_status">{message}</div> : null}
                    {submitting ? <div className="form_status is_pending">Recording registration…</div> : null}
                    <FormNav backLabel="Back to Hackathon" onBack={form.goBack}>
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
            brand="SIU • SolixEmpower"
            title="HACKATHON PASS"
            subtitle="Symbiosis–SolixEmpower Tech Conclave 2026"
            priceLabel="Round 1 Registration"
            price="Free"
            priceBadge="No Payment"
            meta={[
              { icon: "calendar", label: "Grand Finale", value: "10–12 December 2026", sub: "On-campus, for shortlisted participants" },
              { icon: "pin", label: "Venue", value: "SMCW & SUHRC", sub: "Symbiosis International University, Lavale, Pune" },
            ]}
            inclusionsTitle="How It Works"
            inclusions={[
              "Round 1: individual solution to the official problem statement",
              "Shortlisted participants form cross-disciplinary teams",
              "On-campus Grand Finale with expert mentoring",
              "Certificate of Participation",
            ]}
            badge={{
              label: "Participant Badge",
              role: disciplineLabel || "Hackathon",
              name: fullName.trim(),
              org: institutionName.trim() || "Your Institution",
              footerLeft: (
                <>
                  Year: <b>{yearOfStudy || "—"}</b>
                </>
              ),
              footerRight: "Round 1 • 2026",
            }}
          />
        </div>
      </div>
    </section>
  );
}
