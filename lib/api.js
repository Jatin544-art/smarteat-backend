const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export async function addFood(foodName, quantity) {
  const response = await fetch(
    `${API_BASE}/log?foodName=${encodeURIComponent(foodName)}&quantity=${quantity}`,
    { method: "POST" }
  );
  if (!response.ok) throw new Error("Failed to add food");
  return response.json();
}

export async function getTodaySummary() {
  const response = await fetch(`${API_BASE}/summary/today`);
  if (!response.ok) throw new Error("Failed to fetch today's summary");
  return response.json();
}

export async function getMonthSummary(year, month) {
  const response = await fetch(
    `${API_BASE}/summary/month?year=${year}&month=${month}`
  );
  if (!response.ok) throw new Error("Failed to fetch month summary");
  return response.json();
}
