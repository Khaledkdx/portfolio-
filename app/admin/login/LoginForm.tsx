"use client";

import { useState, type FormEvent } from "react";

export function LoginForm({ returnTo }: { returnTo: string }) {
  const [email, setEmail] = useState("saim.goodm@gmail.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password, returnTo }),
    });
    const result = (await response.json().catch(() => ({}))) as {
      error?: string;
      returnTo?: string;
    };
    if (!response.ok) {
      setError(result.error ?? "Could not sign in.");
      setSubmitting(false);
      return;
    }
    window.location.assign(result.returnTo || "/admin");
  }

  return (
    <form className="independent-login" onSubmit={submit}>
      <label>
        <span>Email</span>
        <input
          type="email"
          autoComplete="username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </label>
      <label>
        <span>Password</span>
        <input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          minLength={12}
          required
        />
      </label>
      {error && <p role="alert">{error}</p>}
      <button disabled={submitting} type="submit">
        {submitting ? "Signing in…" : "Open admin"}
      </button>
    </form>
  );
}
