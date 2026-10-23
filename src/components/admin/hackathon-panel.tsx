"use client";

import { useEffect, useMemo, useState } from "react";
import type { HackathonRegistration, HackathonStatus, HackathonTab } from "@/app/lib/payments";
import { HackathonDetail } from "./hackathon-detail";

const tabs: HackathonTab[] = ["All", "Submitted", "Under review", "Shortlisted", "Rejected"];

type SortKey = "participant" | "mobile" | "email" | "registration" | "discipline" | "year" | "submitted" | "status";
type SortState = { key: SortKey; direction: "asc" | "desc" };

const sortColumns: { key: SortKey | "solution" | "action"; label: string }[] = [
  { key: "participant", label: "Participant" },
  { key: "mobile", label: "Mobile" },
  { key: "email", label: "Email" },
  { key: "registration", label: "Ref. No." },
  { key: "discipline", label: "Discipline" },
  { key: "year", label: "Year" },
  { key: "solution", label: "Solution" },
  { key: "submitted", label: "Submitted date" },
  { key: "status", label: "Status" },
  { key: "action", label: "Action" },
];

function sortValue(row: HackathonRegistration, key: SortKey) {
  if (key === "participant") return row.fullName;
  if (key === "mobile") return row.mobile;
  if (key === "email") return row.email;
  if (key === "registration") return row.registrationCode;
  if (key === "discipline") return row.discipline;
  if (key === "year") return row.yearOfStudy;
  if (key === "submitted") return row.submittedAt;
  return row.status;
}

function compareRows(left: HackathonRegistration, right: HackathonRegistration, sort: SortState) {
  const order = String(sortValue(left, sort.key)).localeCompare(String(sortValue(right, sort.key)), undefined, {
    numeric: true,
    sensitivity: "base",
  });
  return sort.direction === "asc" ? order : -order;
}

export function HackathonPanel({ onUnauthorized }: { onUnauthorized: () => void }) {
  const [rows, setRows] = useState<HackathonRegistration[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<HackathonTab>("All");
  const [openId, setOpenId] = useState<string | null>(null);
  const [busy, setBusy] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    let active = true;
    async function load() {
      const response = await fetch("/api/hackathon-registrations");
      if (!active) return;
      if (response.status === 401 || response.status === 403) {
        onUnauthorized();
        return;
      }
      if (response.ok) setRows((await response.json()) as HackathonRegistration[]);
      setLoaded(true);
    }
    void load();
    return () => {
      active = false;
    };
  }, [onUnauthorized]);

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return rows.filter((row) => {
      const matchesTab = tab === "All" || row.status === tab;
      const matchesQuery =
        term.length === 0 ||
        [row.fullName, row.email, row.mobile, row.registrationCode, row.institution, row.discipline].some((value) =>
          value.toLowerCase().includes(term),
        );
      return matchesTab && matchesQuery;
    });
  }, [query, rows, tab]);

  async function setStatus(id: string, status: HackathonStatus) {
    const response = await fetch("/api/hackathon-registrations", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (response.status === 401 || response.status === 403) {
      onUnauthorized();
      return null;
    }
    if (!response.ok) return null;
    const updated = (await response.json()) as HackathonRegistration;
    setRows((current) => current.map((row) => (row.id === id ? updated : row)));
    return updated.status;
  }

  function markBusy(id: string, on: boolean) {
    setBusy((current) => {
      const next = new Set(current);
      if (on) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  async function resendConfirmation(row: HackathonRegistration) {
    if (busy.has(row.id)) return;
    if (row.emailStatus === "sent" && !window.confirm(`Resend the confirmation email to ${row.email}?`)) return;
    markBusy(row.id, true);
    try {
      const response = await fetch(`/api/hackathon-registrations/${row.id}/email`, { method: "POST" });
      if (response.status === 401 || response.status === 403) {
        onUnauthorized();
        return;
      }
      const data = (await response.json().catch(() => ({}))) as {
        registration?: HackathonRegistration;
        message?: string;
        result?: string;
        reason?: string;
      };
      if (data.registration) {
        const updated = data.registration;
        setRows((current) => current.map((item) => (item.id === row.id ? updated : item)));
      }
      if (!response.ok) window.alert(data.message ?? "Unable to send the confirmation email.");
      else if (data.result === "skipped") window.alert(data.reason ?? "The confirmation email was not sent.");
    } finally {
      markBusy(row.id, false);
    }
  }

  return (
    <>
      <div className="pay-head">
        <div>
          <h1 className="text-2xl font-semibold">Hackathon Registrations</h1>
          <p className="mt-1 text-sm text-[#7b8d99]">
            Review Round 1 submissions, download solutions, and shortlist participants for the Grand Finale.
          </p>
        </div>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search name, email, mobile, institution, or ref. no."
          className="w-full rounded-xl border border-[#d7e2e8] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#1eb6c9] sm:max-w-xs"
        />
      </div>
      <Stats rows={rows} />
      <List
        rows={visible}
        loaded={loaded}
        tab={tab}
        onTab={setTab}
        onStatus={setStatus}
        onResend={(row) => void resendConfirmation(row)}
        busy={busy}
        onOpen={setOpenId}
      />
      {openId ? <HackathonDetail registrationId={openId} onClose={() => setOpenId(null)} onStatus={setStatus} /> : null}
    </>
  );
}

function Stats({ rows }: { rows: HackathonRegistration[] }) {
  const count = (status: HackathonStatus) => rows.filter((row) => row.status === status).length;
  const cards = [
    ["Total registrations", String(rows.length), "Round 1 submissions", "text-[#12263a]"],
    ["Awaiting review", String(count("Submitted") + count("Under review")), "Submitted or under review", "text-[#d0891c]"],
    ["Shortlisted", String(count("Shortlisted")), "Invited to the Grand Finale", "text-[#128fa0]"],
    ["Rejected", String(count("Rejected")), "Not shortlisted", "text-[#d64545]"],
  ];
  return (
    <div className="pay-stats">
      {cards.map(([label, value, hint, tone]) => (
        <article key={label} className="rounded-2xl bg-white px-5 py-4 shadow-sm">
          <p className="text-sm text-[#7b8d99]">{label}</p>
          <p className={`mt-2 text-3xl font-semibold ${tone}`}>{value}</p>
          <p className="mt-1 text-xs text-[#8b9aa6]">{hint}</p>
        </article>
      ))}
    </div>
  );
}

function exportFileName(extension: "pdf" | "xlsx") {
  const now = new Date();
  const pad = (value: number) => String(value).padStart(2, "0");
  const stamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}`;
  return `hackathon-registrations-${stamp}.${extension}`;
}

const exportHeadings = [
  "Participant",
  "Mobile number",
  "Email",
  "Institution",
  "Course",
  "Year",
  "Discipline",
  "State / UT",
  "Ref. No.",
  "Submitted date",
  "Status",
];

function exportCells(rows: HackathonRegistration[]) {
  return rows.map((row) => [
    row.fullName,
    row.mobile,
    row.email,
    row.institution,
    row.course,
    row.yearOfStudy,
    row.discipline,
    row.state,
    row.registrationCode,
    row.date,
    row.status,
  ]);
}

async function exportPdf(rows: HackathonRegistration[]) {
  const { jsPDF } = await import("jspdf");
  const autoTable = (await import("jspdf-autotable")).default;
  const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
  doc.setFontSize(14);
  doc.text("Hackathon Registrations", 40, 36);
  autoTable(doc, {
    startY: 52,
    head: [exportHeadings],
    body: exportCells(rows),
    styles: { fontSize: 8, cellPadding: 5 },
    headStyles: { fillColor: [18, 38, 58] },
  });
  doc.save(exportFileName("pdf"));
}

async function exportExcel(rows: HackathonRegistration[]) {
  const { downloadWorkbook } = await import("@/lib/excel-export");
  await downloadWorkbook(
    {
      sheetName: "Hackathon",
      headings: exportHeadings,
      rows: exportCells(rows),
      widths: [28, 16, 32, 36, 18, 14, 28, 22, 12, 16, 14],
    },
    exportFileName("xlsx"),
  );
}

function List({
  rows,
  loaded,
  tab,
  onTab,
  onStatus,
  onResend,
  busy,
  onOpen,
}: {
  rows: HackathonRegistration[];
  loaded: boolean;
  tab: HackathonTab;
  onTab: (tab: HackathonTab) => void;
  onStatus: (id: string, status: HackathonStatus) => Promise<HackathonStatus | null>;
  onResend: (row: HackathonRegistration) => void;
  busy: Set<string>;
  onOpen: (id: string) => void;
}) {
  const [sort, setSort] = useState<SortState>({ key: "submitted", direction: "desc" });
  const sorted = useMemo(() => [...rows].sort((left, right) => compareRows(left, right, sort)), [rows, sort]);
  const empty = loaded ? "No hackathon registrations match this search." : "Loading registrations...";

  function onSort(key: SortKey) {
    setSort((current) =>
      current.key === key ? { key, direction: current.direction === "asc" ? "desc" : "asc" } : { key, direction: "asc" },
    );
  }

  return (
    <section className="pay-list rounded-2xl bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-lg font-semibold">Registration list</h2>
          <button type="button" className="pay-export" disabled={rows.length === 0} onClick={() => void exportPdf(sorted)}>
            Export PDF
          </button>
          <button type="button" className="pay-export" disabled={rows.length === 0} onClick={() => void exportExcel(sorted)}>
            Export Excel
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tabs.map((item) => (
            <button key={item} type="button" onClick={() => onTab(item)} className={`pay-tab ${tab === item ? "is-on" : "is-off"}`}>
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 space-y-3 lg:hidden">
        {sorted.map((row) => (
          <article key={row.id} className="rounded-xl border border-[#eef3f5] p-3">
            <div className="flex gap-3">
              <div className="min-w-0 flex-1">
                <button type="button" onClick={() => onOpen(row.id)} className="pay-name">
                  {row.fullName}
                </button>
                <p className="text-xs text-[#7b8d99]">{row.institution}</p>
                <p className="mt-1 text-xs text-[#12263a]">{row.mobile}</p>
                <p className="text-xs text-[#5f7380]">{row.email}</p>
                <p className="mt-1 text-xs font-medium text-[#12263a]">Ref. No. {row.registrationCode}</p>
                <p className="mt-1 text-sm">
                  {row.discipline} · {row.yearOfStudy}
                </p>
                <a href={row.solutionPath} target="_blank" rel="noreferrer" className="text-sm font-medium text-[#128fa0]">
                  Download solution
                </a>
                <p className="text-xs text-[#5f7380]">Submitted {row.date}</p>
              </div>
              <StatusPill status={row.status} />
            </div>
            <div className="mt-3">
              <Actions row={row} onStatus={onStatus} onResend={onResend} busy={busy.has(row.id)} />
            </div>
          </article>
        ))}
        {sorted.length === 0 ? <p className="py-8 text-center text-sm text-[#7b8d99]">{empty}</p> : null}
      </div>
      <div className="pay-table-wrap mt-4 hidden lg:block">
        <table className="pay-table text-left text-sm">
          <thead className="text-xs text-[#8b9aa6]">
            <tr>
              {sortColumns.map((column) => (
                <th key={column.key} className="px-3 py-3 font-medium">
                  {column.key === "solution" || column.key === "action" ? (
                    <span className="pay-sort" style={{ cursor: "default" }}>
                      {column.label}
                    </span>
                  ) : (
                    <button
                      type="button"
                      className={`pay-sort ${sort.key === column.key ? "is-on" : ""}`}
                      onClick={() => onSort(column.key as SortKey)}
                    >
                      <span>{column.label}</span>
                      <span className="pay-sort-mark" aria-hidden="true">
                        {sort.key === column.key ? (sort.direction === "asc" ? "↑" : "↓") : "↕"}
                      </span>
                    </button>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row) => (
              <tr key={row.id}>
                <td className="pay-wrap px-3 py-3">
                  <button type="button" onClick={() => onOpen(row.id)} className="pay-name">
                    {row.fullName}
                  </button>
                  <p className="text-xs text-[#7b8d99]">
                    {row.institution} · {row.course}
                  </p>
                </td>
                <td className="px-3 py-3">{row.mobile}</td>
                <td className="pay-wrap px-3 py-3">{row.email}</td>
                <td className="px-3 py-3 font-medium">{row.registrationCode}</td>
                <td className="pay-wrap px-3 py-3">{row.discipline}</td>
                <td className="px-3 py-3">{row.yearOfStudy}</td>
                <td className="px-3 py-3">
                  <a href={row.solutionPath} target="_blank" rel="noreferrer" className="pay-export inline-block">
                    {row.solutionPath.split(".").pop()?.toUpperCase()}
                  </a>
                </td>
                <td className="px-3 py-3 text-[#5f7380]">{row.date}</td>
                <td className="pay-pin px-3 py-3">
                  <StatusPill status={row.status} />
                </td>
                <td className="pay-pin px-3 py-3">
                  <Actions row={row} onStatus={onStatus} onResend={onResend} busy={busy.has(row.id)} stacked />
                </td>
              </tr>
            ))}
            {sorted.length === 0 ? (
              <tr>
                <td colSpan={10} className="px-3 py-8 text-center text-[#7b8d99]">
                  {empty}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Actions({
  row,
  onStatus,
  onResend,
  busy,
  stacked = false,
}: {
  row: HackathonRegistration;
  onStatus: (id: string, status: HackathonStatus) => Promise<HackathonStatus | null>;
  onResend: (row: HackathonRegistration) => void;
  busy: boolean;
  stacked?: boolean;
}) {
  return (
    <>
      <div className={stacked ? "pay-actions" : "flex flex-wrap gap-2"}>
        <button type="button" className={`pay-action teal ${row.status === "Shortlisted" ? "is-on" : "is-off"}`} onClick={() => void onStatus(row.id, "Shortlisted")}>
          Shortlist
        </button>
        <button type="button" className={`pay-action amber ${row.status === "Under review" ? "is-on" : "is-off"}`} onClick={() => void onStatus(row.id, "Under review")}>
          Review
        </button>
        <button type="button" className={`pay-action red ${row.status === "Rejected" ? "is-on" : "is-off"}`} onClick={() => void onStatus(row.id, "Rejected")}>
          Reject
        </button>
      </div>
      <ConfirmationEmailState row={row} busy={busy} onResend={onResend} />
    </>
  );
}

function ConfirmationEmailState({
  row,
  busy,
  onResend,
}: {
  row: HackathonRegistration;
  busy: boolean;
  onResend: (row: HackathonRegistration) => void;
}) {
  const sending = busy || row.emailStatus === "sending";
  let note = "Confirmation not emailed";
  let tone = "text-[#7b8d99]";
  if (sending) note = "Sending confirmation…";
  else if (row.emailStatus === "sent") {
    note = `Confirmation emailed${row.emailSentAt ? ` · ${row.emailSentAt}` : ""}`;
    tone = "text-[#128fa0]";
  } else if (row.emailStatus === "failed") {
    note = "Confirmation email failed";
    tone = "text-[#e15b64]";
  }
  return (
    <div className="mt-2 text-xs" style={{ maxWidth: 220 }}>
      <p className={`font-medium ${tone}`}>{note}</p>
      {!sending && row.emailStatus === "failed" && row.emailError ? (
        <p className="break-words text-[#7b8d99]">{row.emailError}</p>
      ) : null}
      <button
        type="button"
        disabled={sending}
        onClick={() => onResend(row)}
        className="mt-1 font-medium text-[#128fa0] underline disabled:cursor-not-allowed disabled:opacity-50"
      >
        {row.emailStatus === "sent" ? "Resend email" : "Send email"}
      </button>
    </div>
  );
}

function StatusPill({ status }: { status: HackathonStatus }) {
  const tone =
    status === "Shortlisted" ? "approved" : status === "Rejected" ? "rejected" : status === "Under review" ? "pending" : "draft";
  return <span className={`pay-status ${tone}`}>{status}</span>;
}
