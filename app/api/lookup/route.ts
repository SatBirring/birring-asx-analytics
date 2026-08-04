import { NextResponse } from "next/server";

type StockRow = {
  [key: string]: string;
};

// Load CSV from /public/asx.csv
async function loadCsv(request: Request) {
  const csvUrl = new URL("/asx.csv", request.url);
  const text = await fetch(csvUrl).then((res) => res.text());

  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const header = lines[0].split(",");
  const rows = lines.slice(1);

  const data = rows.map((row) => {
    const cols = row.split(",");
    const obj: StockRow = {};
    header.forEach((key, i) => {
      obj[key] = cols[i] ?? "";
    });
    return obj;
  });

  return { header, data };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const codesParam = searchParams.get("code");
  const categoryParam = searchParams.get("category");
  const trendParam = searchParams.get("trend");
  const momentumParam = searchParams.get("momentum");
  const riskParam = searchParams.get("risk");
  const liquidityParam = searchParams.get("liquidity");
  const allParam = searchParams.get("all");

  // Load CSV
  const { header, data: allStocks } = await loadCsv(request);

  // If ?all=true → return full CSV
  if (allParam === "true") {
    return NextResponse.json({
      count: allStocks.length,
      updated: new Date().toISOString(),
      data: allStocks,
    });
  }

  let result = allStocks;

  // Detect correct CSV column name for Code
  const codeField = header.find((h) => h.toLowerCase() === "code");

  // Multi‑ticker or single ticker lookup
  if (codesParam && codeField) {
    const codes = codesParam
      .split(",")
      .map((c) => c.trim().toUpperCase())
      .filter((c) => c.length > 0);

    result = result.filter(
      (row) =>
        row[codeField] &&
        codes.includes(row[codeField].toUpperCase())
    );
  }

  // Category filter
  if (categoryParam) {
    const cat = categoryParam.trim().toLowerCase();
    result = result.filter(
      (row) => row["Sector"]?.toLowerCase() === cat ||
               row["TYPE"]?.toLowerCase() === cat ||
               row["Company"]?.toLowerCase() === cat ||
               row["Category"]?.toLowerCase() === cat
    );
  }

  // Trend filter
  if (trendParam) {
    const t = trendParam.trim().toLowerCase();
    result = result.filter(
      (row) => row["Trend Category"]?.toLowerCase() === t
    );
  }

  // Momentum filter
  if (momentumParam) {
    const m = momentumParam.trim().toLowerCase();
    result = result.filter(
      (row) => row["Momentum Category"]?.toLowerCase() === m
    );
  }

  // Risk filter
  if (riskParam) {
    const r = riskParam.trim().toLowerCase();
    result = result.filter(
      (row) => row["Overall Risk Class"]?.toLowerCase() === r
    );
  }

  // Liquidity filter
  if (liquidityParam) {
    const l = liquidityParam.trim().toLowerCase();
    result = result.filter(
      (row) => row["Liquidity Category"]?.toLowerCase() === l
    );
  }

  // No results
  if (!result.length) {
    return NextResponse.json(
      {
        error: "No matching stocks found",
        filters: Object.fromEntries(searchParams),
      },
      { status: 404 }
    );
  }

  // Final response
  return NextResponse.json({
    count: result.length,
    updated: new Date().toISOString(),
    data: result,
  });
}
