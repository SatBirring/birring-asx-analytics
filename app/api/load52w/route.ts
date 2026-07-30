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

  // Detect weekly columns (DD/MM/YYYY)
  const weeklyColumns = Object.keys(row).filter((key) =>
    /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(key)
  );

  // Convert to simple { date, close }
  const series = weeklyColumns.map((dateKey) => ({
    date: dateKey,
    close: parseFloat(row[dateKey]) || 0,
  }));

  // Remove zeros
  const cleaned = series.filter((p) => p.close > 0);

  // Calculate 52W low/high
  const low = Math.min(...cleaned.map((p) => p.close));
  const high = Math.max(...cleaned.map((p) => p.close));

  return NextResponse.json({
    series: cleaned,
    low,
    high,
  });
}
