export const dynamic = "force-dynamic";   // ⭐ REQUIRED FOR VERCEL

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
  const header = lines[0].split(",").map((h) => h.trim().toLowerCase()); // normalize

  const idxCode = header.indexOf("code");
  const idxCompany = header.indexOf("company");
  const idxVerdict = header.indexOf("final verdict");
  const idxScore = header.indexOf("final score");
  const idxMomentum = header.indexOf("momentum category"); // ✅ matches your CSV
  const idxType = header.indexOf("type");                  // ✅ handles TYPE uppercase

  const rows: {
    code: string;
    name: string;
    score: number;
    momentum?: string;
    type?: string;
  }[] = [];

  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(",");

    if (row[idxVerdict] === verdict) {
      rows.push({
        code: row[idxCode],
        name: row[idxCompany],
        score: parseFloat(row[idxScore]) || 0,
        momentum: idxMomentum >= 0 ? row[idxMomentum] : "",
        type: idxType >= 0 ? row[idxType] : "",
      });
    }
  }

  return NextResponse.json({ results: rows });
}
