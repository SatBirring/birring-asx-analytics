export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const verdict = searchParams.get("verdict");

  if (!verdict) {
    return NextResponse.json({ results: [] });
  }

  const filePath = path.join(process.cwd(), "public", "WEB Data.csv");
  const fileContent = fs.readFileSync(filePath, "utf8");

  const lines = fileContent.split("\n").map((l) => l.trim());
  const header = lines[0].split(",").map((h) => h.trim().toLowerCase());

  // REQUIRED FIELDS
  const idxCode = header.indexOf("code");
  const idxCompany = header.indexOf("company");
  const idxVerdict = header.indexOf("final verdict");
  const idxScore = header.indexOf("final score");
  const idxMomentum = header.indexOf("momentum category");
  const idxType = header.indexOf("type");

  // ⭐ NEW FIELDS YOU REQUESTED
  const idxSector = header.indexOf("sector");
  const idxTrendCategory = header.indexOf("trend category");
  const idxRiskClass = header.indexOf("overall risk class");
  const idxRSI = header.indexOf("rsi (14)");
  const idxLiquidityCategory = header.indexOf("liquidity category");
  const idxprice = header.indexOf("close price");
  const rows: any[] = [];

  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(",");

    if (row[idxVerdict] === verdict) {
      rows.push({
        code: row[idxCode],
        name: row[idxCompany],
        score: parseFloat(row[idxScore]) || 0,
        momentum: row[idxMomentum],
        type: row[idxType],

        // ⭐ NEW FIELDS ADDED
        price: row[idxprice],
        sector: row[idxSector],
        trendCategory: row[idxTrendCategory],
        riskClass: row[idxRiskClass],
        rsi: row[idxRSI],
        liquidityCategory: row[idxLiquidityCategory],
      });
    }
  }
  rows.sort((a, b) => b.score - a.score);
  return NextResponse.json({ results: rows });
}
