// app/api/lookup/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type StockRow = {
  code: string;
  name: string;
  trend: string;
  momentum: string;
  risk: string;
  liquidity: string;
  alignment: string;
  category: string;
  [key: string]: string;
};

function loadCsv(request: Request): Promise<StockRow[]> {
  const csvUrl = new URL("/asx.csv", request.url);

  return fetch(csvUrl)
    .then(res => res.text())
    .then(text => {
      const lines = text
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l.length > 0);

      const header = lines[0].split(",");
      const rows = lines.slice(1);

      return rows.map((row) => {
        const cols = row.split(",");
        const obj: StockRow = {} as StockRow;
        header.forEach((key, i) => {
          obj[key] = cols[i] ?? "";
        });
        return obj;
      });
    });
}


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const codesParam = searchParams.get("code"); // e.g. "NAB,S32"
  const categoryParam = searchParams.get("category"); // e.g. "Banks"
  const trendParam = searchParams.get("trend"); // e.g. "Strong"
  const momentumParam = searchParams.get("momentum"); // e.g. "Rising"
  const riskParam = searchParams.get("risk"); // e.g. "Low"
  const liquidityParam = searchParams.get("liquidity"); // e.g. "High"
  const allParam = searchParams.get("all"); // e.g. "true"

  const allStocks = await loadCsv(request);

  // If ?all=true → return full CSV as JSON
  if (allParam === "true") {
    return NextResponse.json({
      count: allStocks.length,
      updated: new Date().toISOString(),
      data: allStocks,
    });
  }

  let result = allStocks;

  // Filter by codes (single or multi-ticker)
  if (codesParam) {
  const codes = codesParam
    .split(",")
    .map((c) => c.trim().toUpperCase())
    .filter((c) => c.length > 0);

  // Detect correct CSV column name (Code / code / CODE)
  const codeField = header.find(h => h.toLowerCase() === "code");

  result = result.filter((row) =>
    row[codeField] &&
    codes.includes(row[codeField].toUpperCase())
  );
}


  // Filter by category
  if (categoryParam) {
    const cat = categoryParam.trim().toLowerCase();
    result = result.filter(
      (row) => row.category?.toLowerCase() === cat
    );
  }

  // Filter by trend
  if (trendParam) {
    const t = trendParam.trim().toLowerCase();
    result = result.filter(
      (row) => row.trend?.toLowerCase() === t
    );
  }

  // Filter by momentum
  if (momentumParam) {
    const m = momentumParam.trim().toLowerCase();
    result = result.filter(
      (row) => row.momentum?.toLowerCase() === m
    );
  }

  // Filter by risk
  if (riskParam) {
    const r = riskParam.trim().toLowerCase();
    result = result.filter(
      (row) => row.risk?.toLowerCase() === r
    );
  }

  // Filter by liquidity
  if (liquidityParam) {
    const l = liquidityParam.trim().toLowerCase();
    result = result.filter(
      (row) => row.liquidity?.toLowerCase() === l
    );
  }

  if (!result.length) {
    return NextResponse.json(
      { error: "No matching stocks found", filters: Object.fromEntries(searchParams) },
      { status: 404 }
    );
  }

  return NextResponse.json({
    count: result.length,
    updated: new Date().toISOString(),
    data: result,
  });
}
