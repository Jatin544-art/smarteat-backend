"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("smarteat-user");
    if (user) router.push("/dashboard");
  }, [router]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      setMsg("Please enter email and password");
      return;
    }

    if (isSignup) {
      localStorage.setItem(
        "smarteat-user",
        JSON.stringify({ email, password })
      );
      setMsg("Account created! Redirecting to dashboard...");
      setTimeout(() => router.push("/dashboard"), 800);
    } else {
      const stored = localStorage.getItem("smarteat-user");
      if (!stored) {
        setMsg("No account found. Please sign up first.");
        return;
      }
      const user = JSON.parse(stored);
      if (user.email === email && user.password === password) {
        setMsg("Login successful! Redirecting...");
        setTimeout(() => router.push("/dashboard"), 800);
      } else {
        setMsg("Incorrect email or password");
      }
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="card w-full max-w-md p-8">
        <h1 className="mb-2 text-center text-2xl font-bold">
          {isSignup ? "Create Smart Eat Account" : "Welcome back to Smart Eat"}
        </h1>
        <p className="mb-6 text-center text-sm text-slate-500 dark:text-slate-400">
          Track your calories, macros and more – in a few taps.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white/70 px-3 py-2 text-sm outline-none ring-sky-400/40 focus:border-sky-400 focus:ring-2 dark:border-slate-700 dark:bg-slate-900/70"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white/70 px-3 py-2 text-sm outline-none ring-sky-400/40 focus:border-sky-400 focus:ring-2 dark:border-slate-700 dark:bg-slate-900/70"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {msg && (
            <p className="text-xs text-rose-500 dark:text-rose-400">{msg}</p>
          )}

          <button
            type="submit"
            className="mt-2 w-full rounded-xl bg-sky-500 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/40 transition hover:scale-[1.02] hover:bg-sky-600"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <button
          onClick={() => {
            setIsSignup((x) => !x);
            setMsg("");
          }}
          className="mt-4 w-full text-center text-xs text-sky-600 underline dark:text-sky-400"
        >
          {isSignup ? "Already have an account? Login" : "New here? Create an account"}
        </button>
      </div>
    </div>
  );
}
