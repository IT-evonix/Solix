"use client";

import { useEffect, useState, type ReactNode } from "react";
import { isPdfPath, type HackathonStatus, type PassEmailStatus } from "@/app/lib/payments";

type HackathonDetailData = {
  registrationCode: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  emailAddress: string;
  mobileNumber: string;
  cityDistrict: string;
  stateUt: string;
  institutionName: string;
  courseProgramme: string;
  specialisation: string;
  yearOfStudy: string;
  discipline: string;
  institutionIdPath: string;
  solutionPath: string;
  commitments: string[];
  consents: string[];
  status: HackathonStatus;
  createdAt: string;
  emailStatus: PassEmailStatus | null;
  emailSentAt: string;
  emailError: string;
};

function emailLabel(detail: HackathonDetailData) {
  if (detail.emailStatus === "sent") return `Sent${detail.emailSentAt ? ` · ${detail.emailSentAt}` : ""}`;
  if (detail.emailStatus === "sending") return "Sending…";
  if (detail.emailStatus === "failed") return `Failed${detail.emailError ? ` · ${detail.emailError}` : ""}`;
  return "Not sent";
}

function fileLabel(path: string) {
  return path.split(".").pop()?.toUpperCase() ?? "FILE";
}

export function HackathonDetail({
  registrationId,
  onClose,
  onStatus,
}: {
  registrationId: string;
  onClose: () => void;
  onStatus: (id: string, status: HackathonStatus) => Promise<HackathonStatus | null>;
}) {
  const [detail, setDetail] = useState<HackathonDetailData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function load() {
      const response = await fetch(`/api/hackathon-registrations/${registrationId}`);
      const data = (await response.json()) as HackathonDetailData & { message?: string };
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

  async function changeStatus(status: HackathonStatus) {
    const updated = await onStatus(registrationId, status);
    if (updated) setDetail((current) => (current ? { ...current, status: updated } : current));
  }

  const hasInstitutionId = detail
    ? !["", "NA"].includes(detail.institutionIdPath.trim().toUpperCase())
    : false;
  const idIsImage = detail && hasInstitutionId ? !isPdfPath(detail.institutionIdPath) : false;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#071422]/50 p-4">
      <button type="button" className="absolute inset-0" aria-label="Close" onClick={onClose} />
      <section className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <header className="sticky top-0 flex items-start justify-between gap-4 border-b border-[#e6eef2] bg-white px-6 py-5">
          <div>
            <p className="text-xs font-medium tracking-wide text-[#128fa0]">
              HACKATHON REGISTRATION{detail ? ` · ${detail.registrationCode}` : ""}
            </p>
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
            <div className="flex flex-wrap gap-2">
              <button type="button" className={`pay-action teal ${detail.status === "Shortlisted" ? "is-on" : "is-off"}`} onClick={() => void changeStatus("Shortlisted")}>
                Shortlist
              </button>
              <button type="button" className={`pay-action amber ${detail.status === "Under review" ? "is-on" : "is-off"}`} onClick={() => void changeStatus("Under review")}>
                Under review
              </button>
              <button type="button" className={`pay-action red ${detail.status === "Rejected" ? "is-on" : "is-off"}`} onClick={() => void changeStatus("Rejected")}>
                Reject
              </button>
            </div>
            <Section title="Personal profile">
              <Field label="Full name (as per official ID)" value={detail.fullName} />
              <Field label="Date of birth" value={detail.dateOfBirth} />
              <Field label="Gender" value={detail.gender} />
              <Field label="Email address" value={detail.emailAddress} />
              <Field label="Mobile number" value={detail.mobileNumber} />
              <Field label="City / district" value={detail.cityDistrict} />
              <Field label="State / union territory" value={detail.stateUt} />
            </Section>
            <Section title="Academic credentials">
              <Field label="Institution / college / university" value={detail.institutionName} />
              <Field label="Course / programme" value={detail.courseProgramme} />
              <Field label="Specialisation / branch" value={detail.specialisation} />
              <Field label="Current year of study" value={detail.yearOfStudy} />
              <Field label="Primary discipline" value={detail.discipline} />
              <div className="sm:col-span-2">
                <p className="text-sm font-medium text-[#12263a]">College / institution ID</p>
                {!hasInstitutionId ? (
                  <p className="mt-2 text-sm text-[#7b8d99]">Not provided</p>
                ) : idIsImage ? (
                  <a href={detail.institutionIdPath} target="_blank" rel="noreferrer" className="mt-2 inline-block">
                    <img
                      src={detail.institutionIdPath}
                      alt={`College ID of ${detail.fullName}`}
                      className="h-48 rounded-xl border border-[#d7e2e8] object-contain"
                    />
                  </a>
                ) : (
                  <FileLink href={detail.institutionIdPath} label={`Open college ID (${fileLabel(detail.institutionIdPath)})`} />
                )}
              </div>
            </Section>
            <Section title="Hackathon registration">
              <ChipField label="Participation confirmations" values={detail.commitments} />
              <div className="sm:col-span-2">
                <p className="text-sm font-medium text-[#12263a]">Round 1 solution</p>
                <FileLink href={detail.solutionPath} label={`Download solution (${fileLabel(detail.solutionPath)})`} />
              </div>
            </Section>
            <Section title="Confirmations and consent">
              <ChipField label="Consent" values={detail.consents} />
              <Field label="Submitted at" value={detail.createdAt} />
              <Field label="Round 1 confirmation email" value={emailLabel(detail)} />
            </Section>
          </form>
        ) : null}
      </section>
    </div>
  );
}

function FileLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="mt-2 inline-block rounded-xl border border-[#1eb6c9] px-3 py-2 text-sm font-medium text-[#128fa0]"
    >
      {label}
    </a>
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
