import { NextResponse } from "next/server";
import Papa from "papaparse";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  const base = new URL(req.url).origin;
  const csvUrl = `${base}/ASX Prices 52W.csv`;

  const response = await fetch(csvUrl);
  const csvText = await response.text();

  const parsed = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  const rows = parsed.data as any[];
  const row = rows.find((r) => r.Code?.trim() === code);

  if (!row) {
    return NextResponse.json({
      series: [],
      slopeSeries: [],
      low: 1,
      high: 2,
    });
  }

  const weeklyColumns = Object.keys(row).filter((key) => {
    const cleanKey = key.trim();
    return (
      /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(cleanKey) ||
      /^\d{4}-\d{2}-\d{2}$/.test(cleanKey)
    );
  });

  function normalizeDate(key: string) {
    const cleanKey = key.trim();
    if (cleanKey.includes("/")) {
      const [d, m, y] = cleanKey.split("/");
      return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
    }
    return cleanKey;
  }

  // KEEP ZERO VALUES
  let series = weeklyColumns.map((dateKey) => {
    const cleanKey = dateKey.trim();
    const value = parseFloat(row[cleanKey]);

    return {
      date: normalizeDate(cleanKey),
      close: isNaN(value) ? null : value, // keep 0, remove invalid
    };
  });

  series.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const cleaned = series.filter((p) => p.close !== null);

  if (cleaned.length === 0) {
    return NextResponse.json({
      series: [],
      slopeSeries: [],
      low: 1,
      high: 2,
    });
  }

  const low = Math.min(...cleaned.map((p) => p.close));
  const high = Math.max(...cleaned.map((p) => p.close));

  const slopeSeries: any[] = [];

  function addSlopePoint(index: number) {
    if (index < cleaned.length) {
      slopeSeries.push({
        date: cleaned[index].date,
        slope: cleaned[index].close,
      });
    }
  }

  addSlopePoint(0);
  addSlopePoint(13);
  addSlopePoint(26);
  addSlopePoint(39);
  addSlopePoint(cleaned.length - 1);

  return NextResponse.json({
    series,
    slopeSeries,
    low,
    high,
  });
}
