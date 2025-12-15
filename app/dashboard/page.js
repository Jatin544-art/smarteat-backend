"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getTodaySummary } from "@/lib/api";

export default function DashboardPage() {
  const router = useRouter();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("smarteat-user");
    if (!user) {
      router.push("/login");
      return;
    }

    async function load() {
      try {
        const data = await getTodaySummary();
        setSummary(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [router]);

  const cards = [
    {
      title: "Calories Today",
      key: "totalCalories",
      unit: "kcal",
      accent: "from-orange-400 to-rose-500",
    },
    {
      title: "Protein Today",
      key: "totalProtein",
      unit: "g",
      accent: "from-sky-400 to-indigo-500",
    },
    {
      title: "Fat Today",
      key: "totalFat",
      unit: "g",
      accent: "from-amber-400 to-emerald-500",
    },
    {
      title: "Carbs Today",
      key: "totalCarbs",
      unit: "g",
      accent: "from-fuchsia-400 to-purple-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Your Smart Eat Dashboard
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Quick snapshot of your day&apos;s nutrition and trends.
          </p>
        </div>
        <button
          onClick={() => router.push("/add-food")}
          className="mt-2 inline-flex items-center rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-emerald-500/40 transition hover:scale-105 hover:bg-emerald-600 sm:mt-0"
        >
          + Add Food Entry
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {cards.map((card) => (
          <div key={card.key} className="card relative overflow-hidden p-4">
            <div
              className={`pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-gradient-to-br opacity-40 ${card.accent}`}
            />
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {card.title}
            </p>
            <p className="mt-3 text-2xl font-bold">
              {loading
                ? "..."
                : summary
                ? `${Math.round(summary[card.key] || 0)} ${card.unit}`
                : `0 ${card.unit}`}
            </p>
            <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-400">
              Based on all entries logged for today.
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="card col-span-2 p-5">
          <h2 className="text-sm font-semibold">Today&apos;s Overview</h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Date:{" "}
            {summary?.date ? summary.date : new Date().toISOString().slice(0, 10)}
          </p>
          <pre className="mt-3 max-h-40 overflow-auto rounded-lg bg-slate-900/5 p-3 text-xs text-slate-700 dark:bg-slate-900/70 dark:text-slate-100">
            {loading
              ? "Loading..."
              : summary
              ? JSON.stringify(summary, null, 2)
              : "No data yet. Try adding some food entries."}
          </pre>
        </div>

        <div className="card p-5">
          <h2 className="text-sm font-semibold">Smart Suggestion</h2>
          <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
            {summary?.suggestion ||
              "Log your meals to get personalized suggestions here."}
          </p>
        </div>
      </div>
    </div>
  );
}
