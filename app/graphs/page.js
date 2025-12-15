"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getTodaySummary, getMonthSummary } from "@/lib/api";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

export default function GraphsPage() {
  const router = useRouter();
  const [today, setToday] = useState(null);
  const [monthData, setMonthData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("smarteat-user");
    if (!user) router.push("/login");

    async function load() {
      try {
        const t = await getTodaySummary();

        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const m = await getMonthSummary(year, month);

        setToday(t);
        setMonthData(m);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [router]);

  if (loading) {
    return <p>Loading charts...</p>;
  }

  const todayCalories = today?.totalCalories || 0;
  const todayProtein = today?.totalProtein || 0;
  const todayFat = today?.totalFat || 0;
  const todayCarbs = today?.totalCarbs || 0;

  // Fake 7-day data by scaling monthly avg (demo)
  const avgCal = (monthData?.averageCaloriesPerDay || 0) || 0;
  const avgProt = (monthData?.averageProteinPerDay || 0) || 0;

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const calData = days.map((_, i) => Math.max(0, avgCal + (i - 3) * 30));
  const protData = days.map((_, i) => Math.max(0, avgProt + (i - 3) * 3));

  const lineCalories = {
    labels: days,
    datasets: [
      {
        label: "Calories (kcal)",
        data: calData,
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const lineProtein = {
    labels: days,
    datasets: [
      {
        label: "Protein (g)",
        data: protData,
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const pieToday = {
    labels: ["Protein", "Fat", "Carbs"],
    datasets: [
      {
        data: [todayProtein, todayFat, todayCarbs],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="card p-5">
        <h2 className="text-sm font-semibold">Calories – Last 7 days</h2>
        <p className="mb-2 text-[10px] text-slate-500 dark:text-slate-400">
          Approximation based on your monthly average.
        </p>
        <Line data={lineCalories} />
      </div>

      <div className="card p-5">
        <h2 className="text-sm font-semibold">Protein – Last 7 days</h2>
        <p className="mb-2 text-[10px] text-slate-500 dark:text-slate-400">
          Approximation based on your monthly average.
        </p>
        <Line data={lineProtein} />
      </div>

      <div className="card p-5 md:col-span-2">
        <h2 className="text-sm font-semibold">Today&apos;s macro split</h2>
        <p className="mb-2 text-[10px] text-slate-500 dark:text-slate-400">
          Protein vs Fat vs Carbs for today.
        </p>
        <div className="max-w-xs">
          <Pie data={pieToday} />
        </div>
      </div>
    </div>
  );
}
