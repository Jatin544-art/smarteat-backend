"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addFood } from "@/lib/api";

export default function AddFoodPage() {
  const router = useRouter();
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("smarteat-user");
    if (!user) router.push("/login");
  }, [router]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!foodName || !quantity) {
      setResult("Please enter food and quantity.");
      return;
    }
    try {
      setLoading(true);
      const res = await addFood(foodName, quantity);
      setResult(JSON.stringify(res, null, 2));
      setFoodName("");
      setQuantity(1);
    } catch (e) {
      setResult("Error: " + e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="card p-6">
        <h1 className="text-lg font-semibold">Log a Food Entry</h1>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Supported examples: egg, chapati, rice, dal (more later).
        </p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="text-xs font-medium">Food name</label>
            <input
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white/80 px-3 py-2 text-sm outline-none ring-sky-400/40 focus:border-sky-400 focus:ring-2 dark:border-slate-700 dark:bg-slate-900/70"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              placeholder="e.g. 2 eggs, chapati, rice"
            />
          </div>
          <div>
            <label className="text-xs font-medium">Quantity (units)</label>
            <input
              type="number"
              min="0"
              step="0.1"
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white/80 px-3 py-2 text-sm outline-none ring-sky-400/40 focus:border-sky-400 focus:ring-2 dark:border-slate-700 dark:bg-slate-900/70"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-emerald-500 py-2 text-sm font-semibold text-white shadow-md shadow-emerald-500/40 transition hover:scale-[1.02] hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging..." : "Add Food Entry"}
          </button>
        </form>
      </div>

      <div className="card p-6">
        <h2 className="text-sm font-semibold">Last Response</h2>
        <pre className="mt-3 max-h-72 overflow-auto rounded-lg bg-slate-900/5 p-3 text-xs text-slate-700 dark:bg-slate-900/70 dark:text-slate-100">
          {result || "Your API response will appear here after you log food."}
        </pre>
      </div>
    </div>
  );
}
