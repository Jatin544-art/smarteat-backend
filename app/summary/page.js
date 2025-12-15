"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getTodaySummary } from "@/lib/api";

export default function TodaySummaryPage() {
  const router = useRouter();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("smarteat-user");
    if (!user) router.push("/login");

    async function load() {
      try {
        const data = await getTodaySummary();
        setSummary(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [router]);

  return (
    <div className="space-y-4">
      <div className="card p-6">
        <h1 className="text-lg font-semibold">Today&apos;s Summary</h1>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Full breakdown of your logged intake for today.
        </p>

        <pre className="mt-4 max-h-80 overflow-auto rounded-lg bg-slate-900/5 p-3 text-xs text-slate-700 dark:bg-slate-900/70 dark:text-slate-100">
          {loading
            ? "Loading..."
            : summary
            ? JSON.stringify(summary, null, 2)
            : "No data available."}
        </pre>
      </div>
    </div>
  );
}
