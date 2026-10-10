"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  type Payment,
  type PaymentStatus,
  type PaymentTab,
} from "@/app/lib/payments";
import { clearAdmin, saveAdmin, type AdminSession } from "@/app/lib/session";
import { RegistrationDetail } from "./registration-detail";

const tabs: PaymentTab[] = ["All", "Pending", "Approved", "Rejected"];

export function PaymentScreen() {
  const router = useRouter();
  const [admin, setAdmin] = useState<AdminSession | null>(null);
  const [rows, setRows] = useState<Payment[]>([]);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<PaymentTab>("All");
  const [openRegistrationId, setOpenRegistrationId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [preview, setPreview] = useState<{ src: string; name: string } | null>(null);

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
        row.transactionId.toLowerCase().includes(term) ||
        row.registrationCode.toLowerCase().includes(term);
      return matchesTab && matchesQuery;
    });
  }, [query, rows, tab]);

  async function setStatus(id: string, status: PaymentStatus) {
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
  }

  if (!admin) return null;

  return (
    <div className="min-h-screen bg-[#f3f6f7] text-[#12263a] lg:flex">
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
        onClose={() => setMenuOpen(false)}
        onLogout={logout}
      />
      <main className="min-w-0 flex-1 px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
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
        <Header query={query} onQuery={setQuery} />
        <Stats rows={rows} />
        <PaymentList
          rows={visible}
          tab={tab}
          onTab={setTab}
          onStatus={setStatus}
          onOpen={setOpenRegistrationId}
          onPreview={setPreview}
        />
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
  onClose,
  onLogout,
}: {
  admin: AdminSession;
  open: boolean;
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
      <nav className="mt-10">
        <div className="rounded-xl bg-[#1eb6c9] px-3 py-2.5 text-sm font-medium">
          Uploaded Payment
        </div>
      </nav>
      <div className="mt-auto">
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
        placeholder="Search transaction ID or participant"
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

function PaymentList({
  rows,
  tab,
  onTab,
  onStatus,
  onOpen,
  onPreview,
}: {
  rows: Payment[];
  tab: PaymentTab;
  onTab: (tab: PaymentTab) => void;
  onStatus: (id: string, status: PaymentStatus) => void;
  onOpen: (registrationId: string) => void;
  onPreview: (preview: { src: string; name: string }) => void;
}) {
  return (
    <section className="pay-list rounded-2xl bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Payment list</h2>
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
        {rows.map((row) => (
          <PaymentCard key={row.id} row={row} onStatus={onStatus} onOpen={onOpen} onPreview={onPreview} />
        ))}
        {rows.length === 0 ? (
          <p className="py-8 text-center text-sm text-[#7b8d99]">No payments match this search.</p>
        ) : null}
      </div>
      <div className="mt-4 hidden overflow-x-auto lg:block">
        <table className="pay-table w-full min-w-[860px] text-left text-sm">
          <thead className="text-xs tracking-wide text-[#8b9aa6]">
            <tr>
              {["Screenshot", "Participant", "Registration ID", "Transaction ID", "Payment amount", "Date", "Status", "Action"].map(
                (heading) => (
                  <th key={heading} className="px-3 py-3 font-medium">
                    {heading.toUpperCase()}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <PaymentRow key={row.id} row={row} onStatus={onStatus} onOpen={onOpen} onPreview={onPreview} />
            ))}
            {rows.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-3 py-8 text-center text-[#7b8d99]">
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
  onOpen,
  onPreview,
}: {
  row: Payment;
  onStatus: (id: string, status: PaymentStatus) => void;
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
          <p className="mt-1 text-xs font-medium text-[#12263a]">Registration ID {row.registrationCode}</p>
          <p className="mt-1 text-sm font-medium">{row.transactionId}</p>
          <p className="text-sm font-semibold">{row.amount}</p>
          <p className="text-xs text-[#5f7380]">{row.date}</p>
        </div>
        <StatusPill status={row.status} />
      </div>
      <div className="mt-3">
        <PaymentActions row={row} onStatus={onStatus} />
      </div>
    </article>
  );
}

function PaymentActions({
  row,
  onStatus,
}: {
  row: Payment;
  onStatus: (id: string, status: PaymentStatus) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <ActionButton label="Approve" active={row.status === "Pending" || row.status === "Approved"} tone="teal" onClick={() => onStatus(row.id, "Approved")} />
      <ActionButton label="Reject" active={row.status === "Pending" || row.status === "Rejected"} tone="red" onClick={() => onStatus(row.id, "Rejected")} />
      <ActionButton label="Pending" active={row.status === "Pending"} tone="amber" onClick={() => onStatus(row.id, "Pending")} />
    </div>
  );
}

function PaymentRow({
  row,
  onStatus,
  onOpen,
  onPreview,
}: {
  row: Payment;
  onStatus: (id: string, status: PaymentStatus) => void;
  onOpen: (registrationId: string) => void;
  onPreview: (preview: { src: string; name: string }) => void;
}) {
  return (
    <tr>
      <td className="px-3 py-4">
        <ScreenshotButton row={row} onPreview={onPreview} />
      </td>
      <td className="px-3 py-4">
        <button type="button" onClick={() => onOpen(row.registrationId)} className="pay-name">
          {row.fullName}
        </button>
        <p className="text-xs text-[#7b8d99]">{row.detail}</p>
      </td>
      <td className="px-3 py-4 font-medium">{row.registrationCode}</td>
      <td className="px-3 py-4 font-medium">{row.transactionId}</td>
      <td className="px-3 py-4 font-semibold">{row.amount}</td>
      <td className="px-3 py-4 text-[#5f7380]">{row.date}</td>
      <td className="px-3 py-4">
        <StatusPill status={row.status} />
      </td>
      <td className="px-3 py-4">
        <PaymentActions row={row} onStatus={onStatus} />
      </td>
    </tr>
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
      <img
        src={row.uploadPath}
        alt={`Payment screenshot for ${row.fullName}`}
        className="pay-thumb"
      />
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
          <p className="text-sm font-semibold text-[#12263a]">Payment screenshot — {preview.name}</p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-1.5 text-sm text-[#5f7380] hover:bg-[#eef3f5]"
          >
            Close
          </button>
        </div>
        <img
          src={preview.src}
          alt={`Payment screenshot for ${preview.name}`}
          className="mx-auto max-h-[75vh] w-auto max-w-full rounded-xl border border-[#d7e2e8] bg-white object-contain"
        />
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: PaymentStatus }) {
  const tone =
    status === "Approved"
      ? "approved"
      : status === "Rejected"
        ? "rejected"
        : status === "Draft"
          ? "draft"
          : "pending";
  return <span className={`pay-status ${tone}`}>{status}</span>;
}

function ActionButton({
  label,
  active,
  tone,
  onClick,
}: {
  label: string;
  active: boolean;
  tone: "teal" | "red" | "amber";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`pay-action ${tone} ${active ? "is-on" : "is-off"}`}
    >
      {label}
    </button>
  );
}
