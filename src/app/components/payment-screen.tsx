"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  type Payment,
  type PaymentStatus,
  type PaymentTab,
} from "@/app/lib/payments";
import { clearAdmin, readAdmin, type AdminSession } from "@/app/lib/session";
import { RegistrationDetail } from "./registration-detail";

const tabs: PaymentTab[] = ["All", "Pending", "Approved", "Rejected"];

export function PaymentScreen() {
  const router = useRouter();
  const [admin, setAdmin] = useState<AdminSession | null>(null);
  const [rows, setRows] = useState<Payment[]>([]);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<PaymentTab>("All");
  const [openRegistrationId, setOpenRegistrationId] = useState<string | null>(null);

  useEffect(() => {
    const saved = readAdmin();
    if (!saved) {
      router.replace("/admin");
      return;
    }
    setAdmin(saved);
    void loadPayments();
  }, [router]);

  async function loadPayments() {
    const response = await fetch("/api/payments");
    if (!response.ok) return;
    const data = (await response.json()) as Payment[];
    setRows(data);
  }

  function logout() {
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
        row.transactionId.toLowerCase().includes(term);
      return matchesTab && matchesQuery;
    });
  }, [query, rows, tab]);

  async function setStatus(id: string, status: PaymentStatus) {
    const response = await fetch("/api/payments", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (!response.ok) return;
    const updated = (await response.json()) as Payment;
    setRows((current) =>
      current.map((row) => (row.id === id ? updated : row)),
    );
  }

  if (!admin) return null;

  return (
    <div className="flex min-h-screen bg-[#f3f6f7] text-[#12263a]">
      <Sidebar admin={admin} onLogout={logout} />
      <main className="min-w-0 flex-1 px-6 py-6 lg:px-8">
        <Header query={query} onQuery={setQuery} />
        <Stats rows={rows} />
        <PaymentList
          rows={visible}
          tab={tab}
          onTab={setTab}
          onStatus={setStatus}
          onOpen={setOpenRegistrationId}
        />
      </main>
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
  onLogout,
}: {
  admin: AdminSession;
  onLogout: () => void;
}) {
  return (
    <aside className="flex w-80 shrink-0 flex-col bg-[#071422] px-4 py-5 text-white">
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
          className="mt-3 w-full rounded-xl border border-[#1eb6c9] px-3 py-2 text-sm font-medium text-[#7fe3f0]"
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
    <div className="flex flex-wrap items-start justify-between gap-4">
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
        className="w-full max-w-xs rounded-xl border border-[#d7e2e8] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#1eb6c9]"
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
    <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
}: {
  rows: Payment[];
  tab: PaymentTab;
  onTab: (tab: PaymentTab) => void;
  onStatus: (id: string, status: PaymentStatus) => void;
  onOpen: (registrationId: string) => void;
}) {
  return (
    <section className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Payment list</h2>
        <div className="flex gap-2">
          {tabs.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onTab(item)}
              className={`rounded-full px-4 py-1.5 text-sm ${
                tab === item
                  ? "bg-[#12263a] text-white"
                  : "bg-[#eef3f5] text-[#5f7380]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="text-xs tracking-wide text-[#8b9aa6]">
            <tr>
              {["Screenshot", "Participant", "Transaction ID", "Payment amount", "Date", "Status", "Action"].map(
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
              <PaymentRow key={row.id} row={row} onStatus={onStatus} onOpen={onOpen} />
            ))}
            {rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-3 py-8 text-center text-[#7b8d99]">
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

function PaymentRow({
  row,
  onStatus,
  onOpen,
}: {
  row: Payment;
  onStatus: (id: string, status: PaymentStatus) => void;
  onOpen: (registrationId: string) => void;
}) {
  return (
    <tr className="border-t border-[#eef3f5]">
      <td className="px-3 py-4">
        <img
          src={row.uploadPath}
          alt={`Payment screenshot for ${row.fullName}`}
          className="h-16 w-12 rounded-lg border border-[#d7e7ec] object-cover"
        />
      </td>
      <td className="px-3 py-4">
        <button
          type="button"
          onClick={() => onOpen(row.registrationId)}
          className="font-medium text-[#128fa0] underline-offset-2 hover:underline"
        >
          {row.fullName}
        </button>
        <p className="text-xs text-[#7b8d99]">{row.detail}</p>
      </td>
      <td className="px-3 py-4 font-medium">{row.transactionId}</td>
      <td className="px-3 py-4 font-semibold">{row.amount}</td>
      <td className="px-3 py-4 text-[#5f7380]">{row.date}</td>
      <td className="px-3 py-4">
        <StatusPill status={row.status} />
      </td>
      <td className="px-3 py-4">
        <div className="flex gap-2">
          <ActionButton label="Approve" active={row.status === "Pending" || row.status === "Approved"} tone="teal" onClick={() => onStatus(row.id, "Approved")} />
          <ActionButton label="Reject" active={row.status === "Pending" || row.status === "Rejected"} tone="red" onClick={() => onStatus(row.id, "Rejected")} />
          <ActionButton label="Pending" active={row.status === "Pending"} tone="amber" onClick={() => onStatus(row.id, "Pending")} />
        </div>
      </td>
    </tr>
  );
}

function StatusPill({ status }: { status: PaymentStatus }) {
  const tone =
    status === "Approved"
      ? "bg-[#e5f7f4] text-[#128fa0]"
      : status === "Rejected"
        ? "bg-[#fdecec] text-[#d64545]"
        : status === "Draft"
          ? "bg-[#eef3f5] text-[#5f7380]"
          : "bg-[#fff4e2] text-[#d0891c]";
  return <span className={`rounded-full px-3 py-1 text-xs font-medium ${tone}`}>{status}</span>;
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
  const solid = {
    teal: "bg-[#1eb6c9] text-white",
    red: "bg-[#e15b64] text-white",
    amber: "bg-[#f0b15a] text-white",
  }[tone];
  const soft = {
    teal: "bg-[#d8f3f6] text-[#128fa0]",
    red: "bg-[#f8dfe1] text-[#e15b64]",
    amber: "bg-[#f8ead3] text-[#d0891c]",
  }[tone];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${active ? solid : soft}`}
    >
      {label}
    </button>
  );
}
