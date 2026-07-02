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
  const header = lines[0].split(",");

  const idxCode = header.indexOf("Code");
  const idxCompany = header.indexOf("Company");
  const idxVerdict = header.indexOf("Final Verdict");
  const idxScore = header.indexOf("Final Score");

  const rows: { code: string; name: string; score: number }[] = [];

  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(",");

    if (row[idxVerdict] === verdict) {
      rows.push({
        code: row[idxCode],
        name: row[idxCompany],
        score: parseFloat(row[idxScore]) || 0,
      });
    }
  }

  return NextResponse.json({ results: rows });
}
