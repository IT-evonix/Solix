"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { NetworkPanel } from "./network-panel";
import { saveAdmin, type AdminSession } from "@/app/lib/session";

const points = [
  "Payment screenshot review",
  "Transaction ID, amount, and date",
  "Approve, Reject, or Pending",
];

export function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Enter your admin email and password.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await response.json()) as AdminSession & { message?: string };
      if (!response.ok) {
        setError(data.message ?? "Invalid email or password.");
        return;
      }
      saveAdmin({
        id: data.id,
        email: data.email,
        mobile: data.mobile,
        name: data.name,
        role: data.role,
        status: data.status,
      });
      router.push("/payments");
    } catch {
      setError("Unable to sign in right now.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen bg-[#f4f7f8]">
      <NetworkPanel>
        <div className="relative z-10 w-full max-w-xl rounded-2xl bg-white px-5 py-4 shadow-lg">
          <img
            src="/symbiosis-logo.png"
            alt="Symbiosis in collaboration with Solix"
            className="h-auto w-full"
          />
        </div>
        <div className="mt-28 max-w-md">
          <h1 className="text-5xl font-semibold leading-tight tracking-tight">
            Review payments in one place.
          </h1>
          <p className="mt-6 text-base leading-7 text-[#c5dde6]">
            Sign in to check uploaded payment screenshots, transaction IDs,
            amounts, and dates. Approve, reject, or keep a payment pending.
          </p>
          <ul className="mt-10 space-y-4">
            {points.map((point) => (
              <li key={point} className="flex items-center gap-3 text-[#d5eaf0]">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-[#16384a] text-xs text-[#7fe3f0]">
                  ✓
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </NetworkPanel>

      <section className="flex flex-1 items-center justify-center px-6 py-12">
        <form
          onSubmit={onSubmit}
          className="w-full max-w-md rounded-2xl bg-white px-8 py-8 shadow-[0_16px_50px_rgba(7,20,34,0.08)]"
        >
          <h2 className="text-2xl font-semibold text-[#12263a]">Admin login</h2>
          <p className="mt-1 text-sm text-[#7b8d99]">
            Use your admin email and password to continue.
          </p>

          <label className="mt-7 block text-sm font-medium text-[#12263a]">
            Email
            <input
              type="email"
              value={email}
              placeholder="admin@test.com"
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-xl border border-[#d7e2e8] px-4 py-3 text-sm outline-none focus:border-[#1eb6c9]"
            />
          </label>

          <label className="mt-5 block text-sm font-medium text-[#12263a]">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-xl border border-[#d7e2e8] px-4 py-3 text-sm outline-none focus:border-[#1eb6c9]"
            />
          </label>

          <label className="mt-4 flex items-center gap-2 text-sm text-[#12263a]">
            <input
              type="checkbox"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
              className="h-4 w-4 accent-[#1eb6c9]"
            />
            Remember me
          </label>

          {error ? <p className="mt-3 text-sm text-[#d64545]">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-[#1eb6c9] py-3 text-sm font-semibold text-white hover:bg-[#189eaf] disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </section>
    </main>
  );
}
