"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  function handleLogout() {
    localStorage.removeItem("smarteat-user");
    router.push("/login");
  }

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/add-food", label: "Add Food" },
    { href: "/summary", label: "Summary" },
    { href: "/graphs", label: "Graphs" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-bold text-slate-900 dark:text-white"
        >
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-sky-400 to-emerald-500" />
          Smart Eat
        </Link>

        {/* Nav Links */}
        <div className="hidden gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-medium text-slate-600 transition hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="rounded-lg bg-slate-100 p-2 text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="rounded-lg bg-rose-500 px-3 py-2 text-xs font-semibold text-white shadow-md shadow-rose-500/40 transition hover:scale-105 hover:bg-rose-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
