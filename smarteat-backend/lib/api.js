// lib/api.js

const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

export async function addFood(foodName, quantity) {
  const res = await fetch(
    `${BACKEND_BASE_URL}/api/log?foodName=${encodeURIComponent(
      foodName
    )}&quantity=${encodeURIComponent(quantity)}`
  );
  if (!res.ok) throw new Error("Failed to add food");
  return res.json();
}

export async function getTodaySummary() {
  const res = await fetch(`${BACKEND_BASE_URL}/api/summary/today`);
  if (!res.ok) throw new Error("Failed to fetch today summary");
  return res.json();
}

export async function getMonthSummary(year, month) {
  const res = await fetch(
    `${BACKEND_BASE_URL}/api/summary/month?year=${year}&month=${month}`
  );
  if (!res.ok) throw new Error("Failed to fetch month summary");
  return res.json();
}
