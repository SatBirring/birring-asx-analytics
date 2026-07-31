import { NextResponse } from "next/server";
import Papa from "papaparse";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  // Fetch CSV from public folder
  const base = new URL(req.url).origin;
  const csvUrl = `${base}/ASX Prices 52W.csv`;

  const response = await fetch(csvUrl);
  const csvText = await response.text();

  // Parse CSV
  const parsed = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  const rows = parsed.data as any[];
  const row = rows.find((r) => r.Code === code);

  if (!row) {
    return NextResponse.json({
      series: [],
      low: 0,
      high: 0,
    });
  }

  // Detect weekly columns in BOTH formats
  const weeklyColumns = Object.keys(row).filter((key) =>
    /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(key) || /^\d{4}-\d{2}-\d{2}$/.test(key)
  );

  // Normalize date formats to ISO YYYY-MM-DD
  function normalizeDate(key: string) {
    if (key.includes("/")) {
      const [d, m, y] = key.split("/");
      return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
    }
    return key; // already ISO
  }

  // Build series
  let series = weeklyColumns.map((dateKey) => ({
    date: normalizeDate(dateKey),
    close: parseFloat(row[dateKey]) || 0,
  }));

  // Sort by date ascending
  series.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Clean zeros for low/high calculation
  const cleaned = series.filter((p) => p.close > 0);

  const low = cleaned.length ? Math.min(...cleaned.map((p) => p.close)) : 0;
  const high = cleaned.length ? Math.max(...cleaned.map((p) => p.close)) : 0;

  return NextResponse.json({
    series,
    low,
    high,
  });
}
