"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  isPdfPath,
  type Payment,
  type PaymentStatus,
  type PaymentTab,
} from "@/app/lib/payments";
import { clearAdmin, saveAdmin, type AdminSession } from "@/app/lib/session";
import { RegistrationDetail } from "./registration-detail";
import { HackathonPanel } from "./hackathon-panel";

const tabs: PaymentTab[] = ["All", "Pending", "Approved", "Rejected"];

type AdminView = "conference" | "hackathon";

const adminViews: { key: AdminView; label: string }[] = [
  { key: "conference", label: "Conference Payments" },
  { key: "hackathon", label: "Hackathon Registrations" },
];

type SortKey =
  | "screenshot"
  | "participant"
  | "mobile"
  | "email"
  | "registration"
  | "transaction"
  | "amount"
  | "submitted"
  | "status"
  | "action";

type SortState = { key: SortKey; direction: "asc" | "desc" };

const sortColumns: { key: SortKey; label: string; lines?: [string, string]; className?: string }[] = [
  { key: "screenshot", label: "Screenshot", lines: ["Screen", "Shot"], className: "pay-th-shot" },
  { key: "participant", label: "Participant" },
  { key: "mobile", label: "Mobile" },
  { key: "email", label: "Email" },
  { key: "registration", label: "Registration ID" },
  { key: "transaction", label: "Transaction ID" },
  { key: "amount", label: "Amount" },
  { key: "submitted", label: "Submitted date" },
  { key: "status", label: "Status" },
  { key: "action", label: "Action" },
];

function sortValue(row: Payment, key: SortKey) {
  if (key === "screenshot" || key === "participant") return row.fullName;
  if (key === "mobile") return row.mobile;
  if (key === "email") return row.email;
  if (key === "registration") return row.registrationCode;
  if (key === "transaction") return row.transactionId;
  if (key === "amount") return row.amountValue;
  if (key === "submitted") return row.submittedAt;
  return row.status;
}

function comparePayments(left: Payment, right: Payment, sort: SortState) {
  const a = sortValue(left, sort.key);
  const b = sortValue(right, sort.key);
  const order =
    typeof a === "number" && typeof b === "number"
      ? a - b
      : String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: "base" });
  return sort.direction === "asc" ? order : -order;
}

export function PaymentScreen() {
  const router = useRouter();
  const [admin, setAdmin] = useState<AdminSession | null>(null);
  const [rows, setRows] = useState<Payment[]>([]);
  const [busy, setBusy] = useState<Set<string>>(() => new Set());
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<PaymentTab>("All");
  const [openRegistrationId, setOpenRegistrationId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [preview, setPreview] = useState<{ src: string; name: string } | null>(null);
  const [view, setView] = useState<AdminView>("conference");

  const signOutExpired = useCallback(() => {
    clearAdmin();
    router.replace("/admin");
  }, [router]);

  useEffect(() => {
    if (!preview) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setPreview(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [preview]);

  useEffect(() => {
    let active = true;
    async function start() {
      const response = await fetch("/api/login");
      if (!active) return;
      if (!response.ok) {
        clearAdmin();
        router.replace("/admin");
        return;
      }
      const data = (await response.json()) as AdminSession;
      saveAdmin(data);
      setAdmin(data);
      await loadPayments();
    }
    void start();
    return () => {
      active = false;
    };
  }, [router]);

  async function loadPayments() {
    const response = await fetch("/api/payments");
    if (response.status === 401 || response.status === 403) {
      clearAdmin();
      router.replace("/admin");
      return;
    }
    if (!response.ok) return;
    const data = (await response.json()) as Payment[];
    setRows(data);
  }

  async function logout() {
    await fetch("/api/logout", { method: "POST" });
    clearAdmin();
    router.replace("/admin");
  }

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return rows.filter((row) => {
      const matchesTab = tab === "All" || row.status === tab;
      const matchesQuery =
        term.length === 0 ||
        row.fullName.toLowerCase().includes(term) ||
        row.email.toLowerCase().includes(term) ||
        row.mobile.toLowerCase().includes(term) ||
        row.transactionId.toLowerCase().includes(term) ||
        row.payerName.toLowerCase().includes(term) ||
        row.registrationCode.toLowerCase().includes(term);
      return matchesTab && matchesQuery;
    });
  }, [query, rows, tab]);

  function markBusy(id: string, on: boolean) {
    setBusy((current) => {
      const next = new Set(current);
      if (on) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  async function setStatus(id: string, status: PaymentStatus) {
    if (busy.has(id)) return;
    markBusy(id, true);
    try {
      const response = await fetch("/api/payments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (response.status === 401 || response.status === 403) {
        clearAdmin();
        router.replace("/admin");
        return;
      }
      if (!response.ok) return;
      const updated = (await response.json()) as Payment;
      setRows((current) => current.map((row) => (row.id === id ? updated : row)));
    } finally {
      markBusy(id, false);
    }
  }

  async function resendPass(row: Payment) {
    if (busy.has(row.id)) return;
    if (row.emailStatus === "sent" && !window.confirm(`Resend the Delegate Pass to ${row.email}?`)) return;
    markBusy(row.id, true);
    try {
      const response = await fetch(`/api/payments/${row.id}/email`, { method: "POST" });
      if (response.status === 401 || response.status === 403) {
        clearAdmin();
        router.replace("/admin");
        return;
      }
      const data = (await response.json().catch(() => ({}))) as {
        payment?: Payment;
        message?: string;
        result?: string;
        reason?: string;
      };
      if (data.payment) {
        const updated = data.payment;
        setRows((current) => current.map((item) => (item.id === row.id ? updated : item)));
      }
      if (!response.ok) window.alert(data.message ?? "Unable to send the Delegate Pass.");
      else if (data.result === "skipped") window.alert(data.reason ?? "The Delegate Pass was not sent.");
    } finally {
      markBusy(row.id, false);
    }
  }

  if (!admin) return null;

  return (
    <div className="pay-screen min-h-screen bg-[#f3f6f7] text-[#12263a] lg:flex">
      {menuOpen ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-30 bg-[#071422]/40 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}
      <Sidebar
        admin={admin}
        open={menuOpen}
        view={view}
        onView={(next) => {
          setView(next);
          setMenuOpen(false);
        }}
        onClose={() => setMenuOpen(false)}
        onLogout={logout}
      />
      <main className="pay-main min-w-0 max-w-full flex-1 px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
        <div className="mb-4 flex items-center justify-between gap-3 lg:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="rounded-xl border border-[#d7e2e8] bg-white px-3 py-2 text-sm font-medium"
          >
            Menu
          </button>
          <button
            type="button"
            onClick={logout}
            className="rounded-xl border border-[#1eb6c9] px-3 py-2 text-sm font-medium text-[#128fa0]"
          >
            Log out
          </button>
        </div>
        {view === "hackathon" ? (
          <HackathonPanel onUnauthorized={signOutExpired} />
        ) : (
          <>
            <Header query={query} onQuery={setQuery} />
            <Stats rows={rows} />
            <PaymentList
              rows={visible}
              tab={tab}
              onTab={setTab}
              onStatus={setStatus}
              onResend={resendPass}
              busy={busy}
              onOpen={setOpenRegistrationId}
              onPreview={setPreview}
            />
          </>
        )}
      </main>
      {preview ? <ScreenshotPreview preview={preview} onClose={() => setPreview(null)} /> : null}
      {openRegistrationId ? (
        <RegistrationDetail
          registrationId={openRegistrationId}
          onClose={() => setOpenRegistrationId(null)}
        />
      ) : null}
    </div>
  );
}

function Sidebar({
  admin,
  open,
  view,
  onView,
  onClose,
  onLogout,
}: {
  admin: AdminSession;
  open: boolean;
  view: AdminView;
  onView: (view: AdminView) => void;
  onClose: () => void;
  onLogout: () => void;
}) {
  return (
    <aside
      className={`pay-side ${open ? "flex" : "hidden"} fixed inset-y-0 left-0 z-40 max-w-[85vw] flex-col px-4 py-5 text-white lg:static lg:z-auto lg:flex lg:shrink-0`}
    >
      <button
        type="button"
        onClick={onClose}
        className="mb-3 self-end text-sm text-[#b7d4de] lg:hidden"
      >
        Close
      </button>
      <div className="rounded-xl bg-white px-3 py-2">
        <img
          src="/symbiosis-logo.png"
          alt="Symbiosis in collaboration with Solix"
          className="h-auto w-full"
        />
      </div>
      <nav className="mt-10 space-y-2">
        {adminViews.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => onView(item.key)}
            aria-current={view === item.key ? "page" : undefined}
            className={`block w-full rounded-xl border-0 px-3 py-2.5 text-left text-sm font-medium ${
              view === item.key ? "bg-[#1eb6c9] text-white" : "bg-transparent text-[#b7d4de] hover:bg-[#10283c]"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <div className="mt-3 mb-3">
        <div className="flex items-center gap-3 rounded-2xl bg-[#10283c] px-3 py-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[#1eb6c9] text-xs font-semibold">
            {initials(admin.name)}
          </span>
          <span>
            <span className="block text-sm font-medium">{admin.name}</span>
            <span className="block text-xs text-[#b7d4de]">{admin.role}</span>
          </span>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="mt-3 w-full rounded-xl border border-[#1eb6c9] bg-transparent px-3 py-2 text-sm font-medium text-[#7fe3f0]"
        >
          Log out
        </button>
      </div>
    </aside>
  );
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "S";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

function Header({
  query,
  onQuery,
}: {
  query: string;
  onQuery: (value: string) => void;
}) {
  return (
    <div className="pay-head">
      <div>
        <h1 className="text-2xl font-semibold">Uploaded Payment Screenshots</h1>
        <p className="mt-1 text-sm text-[#7b8d99]">
          Review transaction proof, amount, and date before you approve or reject.
        </p>
      </div>
      <input
        value={query}
        onChange={(event) => onQuery(event.target.value)}
        placeholder="Search name, email, mobile, payer, or transaction ID"
        className="w-full rounded-xl border border-[#d7e2e8] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#1eb6c9] sm:max-w-xs"
      />
    </div>
  );
}

function Stats({ rows }: { rows: Payment[] }) {
  const pending = rows.filter((row) => row.status === "Pending").length;
  const approved = rows.filter((row) => row.status === "Approved").length;
  const rejected = rows.filter((row) => row.status === "Rejected").length;
  const cards = [
    ["Total uploads", String(rows.length), "This month", "text-[#12263a]"],
    ["Pending", String(pending), "Waiting for review", "text-[#d0891c]"],
    ["Approved", String(approved), "Payments confirmed", "text-[#128fa0]"],
    ["Rejected", String(rejected), "Needs a new screenshot", "text-[#d64545]"],
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
  return `uploaded-payments-${stamp}.${extension}`;
}

function exportCells(rows: Payment[]) {
  return rows.map((row) => [
    row.fullName,
    row.mobile,
    row.email,
    row.detail,
    row.registrationCode,
    row.transactionId,
    row.payerName,
    row.amount,
    row.date,
    row.status,
  ]);
}

const exportHeadings = [
  "Participant",
  "Mobile number",
  "Email",
  "Detail",
  "Registration ID",
  "Transaction ID",
  "Payer name",
  "Payment amount",
  "Submitted date",
  "Status",
];

async function exportPdf(rows: Payment[]) {
  const { jsPDF } = await import("jspdf");
  const autoTable = (await import("jspdf-autotable")).default;
  const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
  doc.setFontSize(14);
  doc.text("Uploaded Payment Screenshots", 40, 36);
  autoTable(doc, {
    startY: 52,
    head: [exportHeadings],
    body: exportCells(rows),
    styles: { fontSize: 9, cellPadding: 6 },
    headStyles: { fillColor: [18, 38, 58] },
  });
  doc.save(exportFileName("pdf"));
}

async function exportExcel(rows: Payment[]) {
  const { downloadWorkbook } = await import("@/lib/excel-export");
  await downloadWorkbook(
    {
      sheetName: "Payments",
      headings: exportHeadings,
      rows: exportCells(rows),
      widths: [28, 16, 32, 32, 18, 22, 28, 16, 16, 12],
    },
    exportFileName("xlsx"),
  );
}

function PaymentList({
  rows,
  tab,
  onTab,
  onStatus,
  onResend,
  busy,
  onOpen,
  onPreview,
}: {
  rows: Payment[];
  tab: PaymentTab;
  onTab: (tab: PaymentTab) => void;
  onStatus: (id: string, status: PaymentStatus) => void;
  onResend: (row: Payment) => void;
  busy: Set<string>;
  onOpen: (registrationId: string) => void;
  onPreview: (preview: { src: string; name: string }) => void;
}) {
  const [sort, setSort] = useState<SortState>({ key: "submitted", direction: "desc" });
  const sorted = useMemo(
    () => [...rows].sort((left, right) => comparePayments(left, right, sort)),
    [rows, sort],
  );

  function onSort(key: SortKey) {
    setSort((current) =>
      current.key === key
        ? { key, direction: current.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" },
    );
  }

  return (
    <section className="pay-list rounded-2xl bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-lg font-semibold">Payment list</h2>
          <button
            type="button"
            className="pay-export"
            disabled={rows.length === 0}
            onClick={() => void exportPdf(sorted)}
          >
            Export PDF
          </button>
          <button
            type="button"
            className="pay-export"
            disabled={rows.length === 0}
            onClick={() => void exportExcel(sorted)}
          >
            Export Excel
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tabs.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onTab(item)}
              className={`pay-tab ${tab === item ? "is-on" : "is-off"}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 space-y-3 lg:hidden">
        {sorted.map((row) => (
          <PaymentCard key={row.id} row={row} onStatus={onStatus} onResend={onResend} busy={busy.has(row.id)} onOpen={onOpen} onPreview={onPreview} />
        ))}
        {sorted.length === 0 ? (
          <p className="py-8 text-center text-sm text-[#7b8d99]">No payments match this search.</p>
        ) : null}
      </div>
      <div className="pay-table-wrap mt-4 hidden lg:block">
        <table className="pay-table text-left text-sm">
          <thead className="text-xs text-[#8b9aa6]">
            <tr>
              {sortColumns.map((column) => (
                <th
                  key={column.key}
                  className={`px-3 py-3 font-medium ${column.className ?? ""}`}
                  aria-sort={
                    sort.key === column.key
                      ? sort.direction === "asc"
                        ? "ascending"
                        : "descending"
                      : "none"
                  }
                >
                  <SortButton
                    label={column.label}
                    lines={column.lines}
                    active={sort.key === column.key}
                    direction={sort.direction}
                    onClick={() => onSort(column.key)}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row) => (
              <PaymentRow key={row.id} row={row} onStatus={onStatus} onResend={onResend} busy={busy.has(row.id)} onOpen={onOpen} onPreview={onPreview} />
            ))}
            {sorted.length === 0 ? (
              <tr>
                <td colSpan={10} className="px-3 py-8 text-center text-[#7b8d99]">
                  No payments match this search.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function PaymentCard({
  row,
  onStatus,
  onResend,
  busy,
  onOpen,
  onPreview,
}: {
  row: Payment;
  onStatus: (id: string, status: PaymentStatus) => void;
  onResend: (row: Payment) => void;
  busy: boolean;
  onOpen: (registrationId: string) => void;
  onPreview: (preview: { src: string; name: string }) => void;
}) {
  return (
    <article className="rounded-xl border border-[#eef3f5] p-3">
      <div className="flex gap-3">
        <ScreenshotButton row={row} onPreview={onPreview} />
        <div className="min-w-0 flex-1">
          <button type="button" onClick={() => onOpen(row.registrationId)} className="pay-name">
            {row.fullName}
          </button>
          <p className="text-xs text-[#7b8d99]">{row.detail}</p>
          <p className="mt-1 text-xs text-[#12263a]">{row.mobile}</p>
          <p className="text-xs text-[#5f7380]">{row.email}</p>
          <p className="mt-1 text-xs font-medium text-[#12263a]">Registration ID {row.registrationCode}</p>
          <p className="mt-1 text-sm font-medium">{row.transactionId}</p>
          {row.payerName ? <p className="text-xs text-[#5f7380]">Payer: {row.payerName}</p> : null}
          <p className="text-sm font-semibold">{row.amount}</p>
          <p className="text-xs text-[#5f7380]">Submitted {row.date}</p>
        </div>
        <StatusPill status={row.status} />
      </div>
      <div className="mt-3">
        <PaymentActions row={row} onStatus={onStatus} onResend={onResend} busy={busy} />
      </div>
    </article>
  );
}

function PaymentActions({
  row,
  onStatus,
  onResend,
  busy,
  stacked = false,
}: {
  row: Payment;
  onStatus: (id: string, status: PaymentStatus) => void;
  onResend: (row: Payment) => void;
  busy: boolean;
  stacked?: boolean;
}) {
  return (
    <>
      <div className={stacked ? "pay-actions" : "flex flex-wrap gap-2"}>
        <ActionButton label="Approve" active={row.status === "Pending" || row.status === "Approved"} tone="teal" disabled={busy} onClick={() => onStatus(row.id, "Approved")} />
        <ActionButton label="Reject" active={row.status === "Pending" || row.status === "Rejected"} tone="red" disabled={busy} onClick={() => onStatus(row.id, "Rejected")} />
        <ActionButton label="Pending" active={row.status === "Pending"} tone="amber" disabled={busy} onClick={() => onStatus(row.id, "Pending")} />
      </div>
      {row.status === "Approved" ? <PassEmailState row={row} busy={busy} onResend={onResend} /> : null}
    </>
  );
}

function PassEmailState({
  row,
  busy,
  onResend,
}: {
  row: Payment;
  busy: boolean;
  onResend: (row: Payment) => void;
}) {
  const sending = busy || row.emailStatus === "sending";
  let note = "Pass not emailed";
  let tone = "text-[#7b8d99]";
  if (sending) note = "Sending pass…";
  else if (row.emailStatus === "sent") {
    note = `Pass emailed${row.emailSentAt ? ` · ${row.emailSentAt}` : ""}`;
    tone = "text-[#128fa0]";
  } else if (row.emailStatus === "failed") {
    note = "Pass email failed";
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
        {row.emailStatus === "sent" ? "Resend pass" : "Send pass"}
      </button>
    </div>
  );
}

function PaymentRow({
  row,
  onStatus,
  onResend,
  busy,
  onOpen,
  onPreview,
}: {
  row: Payment;
  onStatus: (id: string, status: PaymentStatus) => void;
  onResend: (row: Payment) => void;
  busy: boolean;
  onOpen: (registrationId: string) => void;
  onPreview: (preview: { src: string; name: string }) => void;
}) {
  return (
    <tr>
      <td className="pay-td-shot px-3 py-3">
        <ScreenshotButton row={row} onPreview={onPreview} />
      </td>
      <td className="pay-wrap px-3 py-3">
        <button type="button" onClick={() => onOpen(row.registrationId)} className="pay-name">
          {row.fullName}
        </button>
        <p className="text-xs text-[#7b8d99]">{row.detail}</p>
      </td>
      <td className="px-3 py-3">{row.mobile}</td>
      <td className="pay-wrap px-3 py-3">{row.email}</td>
      <td className="px-3 py-3 font-medium">{row.registrationCode}</td>
      <td className="pay-wrap px-3 py-3">
        <span className="font-medium">{row.transactionId}</span>
        {row.payerName ? <p className="text-xs text-[#7b8d99]">Payer: {row.payerName}</p> : null}
      </td>
      <td className="px-3 py-3 font-semibold">{row.amount}</td>
      <td className="px-3 py-3 text-[#5f7380]">{row.date}</td>
      <td className="pay-pin px-3 py-3">
        <StatusPill status={row.status} />
      </td>
      <td className="pay-pin px-3 py-3">
        <PaymentActions row={row} onStatus={onStatus} onResend={onResend} busy={busy} stacked />
      </td>
    </tr>
  );
}

function SortButton({
  label,
  lines,
  active,
  direction,
  onClick,
}: {
  label: string;
  lines?: [string, string];
  active: boolean;
  direction: "asc" | "desc";
  onClick: () => void;
}) {
  const name = lines ? lines.join(" ") : label;
  return (
    <button type="button" className={`pay-sort ${active ? "is-on" : ""}`} onClick={onClick}>
      {lines ? (
        <span className="pay-sort-lines">
          <span>{lines[0]}</span>
          <span>{lines[1]}</span>
        </span>
      ) : (
        <span>{label}</span>
      )}
      <span className="pay-sort-mark" aria-hidden="true">
        {active ? (direction === "asc" ? "↑" : "↓") : "↕"}
      </span>
      <span className="sr-only">{active ? `Sorted ${direction === "asc" ? "ascending" : "descending"}` : `Sort by ${name}`}</span>
    </button>
  );
}

function ScreenshotButton({
  row,
  onPreview,
}: {
  row: Payment;
  onPreview: (preview: { src: string; name: string }) => void;
}) {
  return (
    <button
      type="button"
      className="pay-shot shrink-0"
      aria-label={`Open payment screenshot for ${row.fullName}`}
      onClick={() => onPreview({ src: row.uploadPath, name: row.fullName })}
    >
      {isPdfPath(row.uploadPath) ? (
        <span className="pay-thumb grid place-items-center bg-[#fdf2f2] text-xs font-semibold text-[#c8102e]">PDF</span>
      ) : (
        <img
          src={row.uploadPath}
          alt={`Payment screenshot for ${row.fullName}`}
          className="pay-thumb"
        />
      )}
    </button>
  );
}

function ScreenshotPreview({
  preview,
  onClose,
}: {
  preview: { src: string; name: string };
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#071422]/70 p-4">
      <button type="button" className="absolute inset-0" aria-label="Close screenshot" onClick={onClose} />
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-auto rounded-2xl bg-white p-4 shadow-2xl">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-[#12263a]">
            Payment {isPdfPath(preview.src) ? "receipt" : "screenshot"} — {preview.name}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-1.5 text-sm text-[#5f7380] hover:bg-[#eef3f5]"
          >
            Close
          </button>
        </div>
        {isPdfPath(preview.src) ? (
          <iframe
            src={preview.src}
            title={`Payment receipt for ${preview.name}`}
            className="h-[75vh] w-full rounded-xl border border-[#d7e2e8]"
          />
        ) : (
          <img
            src={preview.src}
            alt={`Payment screenshot for ${preview.name}`}
            className="mx-auto max-h-[75vh] w-auto max-w-full rounded-xl border border-[#d7e2e8] bg-white object-contain"
          />
        )}
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: PaymentStatus }) {
  const tone = status === "Approved" ? "approved" : status === "Rejected" ? "rejected" : "pending";
  return <span className={`pay-status ${tone}`}>{status}</span>;
}

function ActionButton({
  label,
  active,
  tone,
  disabled = false,
  onClick,
}: {
  label: string;
  active: boolean;
  tone: "teal" | "red" | "amber";
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`pay-action ${tone} ${active ? "is-on" : "is-off"}`}
    >
      {label}
    </button>
  );
}
