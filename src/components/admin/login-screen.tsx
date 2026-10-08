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
    <main className="admin-login">
      <NetworkPanel>
        <div className="admin-login-logo">
          <img
            src="/symbiosis-logo.png"
            alt="Symbiosis in collaboration with Solix"
          />
        </div>
        <div className="admin-login-copy">
          <h1>Review payments in one place.</h1>
          <p>
            Sign in to check uploaded payment screenshots, transaction IDs,
            amounts, and dates. Approve, reject, or keep a payment pending.
          </p>
          <ul className="admin-login-points">
            {points.map((point) => (
              <li key={point}>
                <span>✓</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </NetworkPanel>

      <section className="admin-login-formwrap">
        <form onSubmit={onSubmit} className="admin-login-card">
          <h2>Admin login</h2>
          <p className="hint">Use your admin email and password to continue.</p>

          <label>
            Email
            <input
              type="email"
              value={email}
              placeholder="admin@test.com"
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          <label className="admin-login-remember">
            <input
              type="checkbox"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
            />
            Remember me
          </label>

          {error ? <p className="admin-login-error">{error}</p> : null}

          <button type="submit" disabled={loading} className="admin-login-submit">
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </section>
    </main>
  );
}
