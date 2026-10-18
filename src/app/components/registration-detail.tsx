"use client";

import { useEffect, useState, type ReactNode } from "react";

type RegistrationDetailData = {
  fullName: string;
  emailAddress: string;
  mobileNumber: string;
  country: string;
  city: string;
  participantCategory: string;
  organisationInstitution: string;
  designation: string;
  professionSpecialisation: string;
  departmentFunctionalArea: string;
  areasOfInterest: string[];
  exploreConclave: string[];
  onCampusAccommodation: string;
  registrationFee: string;
  declarations: string[];
  preferredCommunicationChannel: string;
  hearAbout: string[];
  status: string;
  createdAt: string;
  uploadPath: string | null;
  transactionId: string | null;
  registrationDate: string | null;
};

export function RegistrationDetail({
  registrationId,
  onClose,
}: {
  registrationId: string;
  onClose: () => void;
}) {
  const [detail, setDetail] = useState<RegistrationDetailData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function load() {
      const response = await fetch(`/api/registrations/${registrationId}`);
      const data = (await response.json()) as RegistrationDetailData & { message?: string };
      if (!active) return;
      if (!response.ok) {
        setError(data.message ?? "Unable to load registration.");
        return;
      }
      setDetail(data);
    }
    void load();
    return () => {
      active = false;
    };
  }, [registrationId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#071422]/50 p-4">
      <button type="button" className="absolute inset-0" aria-label="Close" onClick={onClose} />
      <section className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <header className="sticky top-0 flex items-start justify-between gap-4 border-b border-[#e6eef2] bg-white px-6 py-5">
          <div>
            <p className="text-xs font-medium tracking-wide text-[#128fa0]">REGISTRATION</p>
            <h2 className="mt-1 text-2xl font-semibold text-[#12263a]">
              {detail?.fullName ?? "Participant details"}
            </h2>
            {detail ? <p className="mt-1 text-sm text-[#7b8d99]">{detail.status}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-1.5 text-sm text-[#5f7380] hover:bg-[#eef3f5]"
          >
            Close
          </button>
        </header>

        {error ? <p className="px-6 py-8 text-sm text-[#d64545]">{error}</p> : null}
        {!detail && !error ? <p className="px-6 py-8 text-sm text-[#7b8d99]">Loading registration...</p> : null}

        {detail ? (
          <form className="space-y-6 px-6 py-6" onSubmit={(event) => event.preventDefault()}>
            <Section title="Participant details">
              <Field label="Full name" value={detail.fullName} />
              <Field label="Email address" value={detail.emailAddress} />
              <Field label="Mobile number" value={detail.mobileNumber} />
              <Field label="Country" value={detail.country} />
              <Field label="City" value={detail.city} />
            </Section>
            <Section title="Professional details">
              <Field label="Participant category" value={detail.participantCategory} />
              <Field label="Organisation / institution" value={detail.organisationInstitution} />
              <Field label="Designation" value={detail.designation} />
              <Field label="Profession / specialisation" value={detail.professionSpecialisation} />
              <Field label="Department / functional area" value={detail.departmentFunctionalArea} />
            </Section>
            <Section title="Conference registration">
              <ChipField label="Areas of interest" values={detail.areasOfInterest} />
              <ChipField label="What would you like to explore at the Conclave?" values={detail.exploreConclave} />
            </Section>
            <Section title="Accommodation and payment">
              <Field label="On-campus accommodation" value={detail.onCampusAccommodation} />
              <Field label="Registration fee" value={detail.registrationFee} />
              <Field label="Transaction ID" value={detail.transactionId ?? "—"} />
              <Field label="Registration date" value={detail.registrationDate ?? "—"} />
              {detail.uploadPath ? (
                <div className="sm:col-span-2">
                  <p className="text-sm font-medium text-[#12263a]">Payment screenshot</p>
                  <img
                    src={detail.uploadPath}
                    alt="Uploaded payment screenshot"
                    className="mt-2 h-56 rounded-xl border border-[#d7e2e8] object-contain"
                  />
                </div>
              ) : null}
            </Section>
            <Section title="Declarations and communication">
              <ChipField label="Declarations and consent" values={detail.declarations} />
              <Field label="Preferred communication channel" value={detail.preferredCommunicationChannel} />
              <ChipField label="How did you hear about the Conclave?" values={detail.hearAbout} />
              <Field label="Created at" value={detail.createdAt} />
            </Section>
          </form>
        ) : null}
      </section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="rounded-2xl border border-[#e6eef2] p-4">
      <legend className="px-2 text-sm font-semibold text-[#128fa0]">{title}</legend>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="block text-sm font-medium text-[#12263a]">
      {label}
      <input
        readOnly
        value={value}
        className="mt-1.5 w-full rounded-xl border border-[#d7e2e8] bg-[#f7fbfc] px-3 py-2.5 text-sm font-normal text-[#12263a] outline-none"
      />
    </label>
  );
}

function ChipField({ label, values }: { label: string; values: string[] }) {
  return (
    <div className="sm:col-span-2">
      <p className="text-sm font-medium text-[#12263a]">{label}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {values.map((value) => (
          <span key={value} className="rounded-full bg-[#e7f7f9] px-3 py-1 text-sm text-[#0e7484]">
            {value}
          </span>
        ))}
      </div>
    </div>
  );
}
