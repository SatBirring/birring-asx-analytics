export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "WEB Data.csv");
    const fileContent = fs.readFileSync(filePath, "utf8");

    const lines = fileContent.split("\n").map((l) => l.trim());
    const header = lines[0].split(",").map((h) => h.trim().toLowerCase());

    // FIELD INDEXES
    const idxCode = header.indexOf("code");
    const idxCompany = header.indexOf("company");
    const idxMomentum = header.indexOf("momentum category");
    const idxFinalScore = header.indexOf("final score");
    const idxStanding = header.indexOf("market standing score");
    const idxCategory = header.indexOf("final verdict");

    const rows: any[] = [];

    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(",");

      // Only include STRONG category
      if (row[idxCategory]?.toLowerCase() === "strong") {
        rows.push({
          code: row[idxCode],
          name: row[idxCompany],
          momentum: row[idxMomentum],
          finalScore: parseFloat(row[idxFinalScore]) || 0,
          standing: parseFloat(row[idxStanding]) || 0,
          category: row[idxCategory],
        });
      }
    }

    // Sort by Final Score (descending)
    const sorted = rows.sort((a, b) => b.finalScore - a.finalScore);

    // Top 10
    const top10 = sorted.slice(0, 10);

    return NextResponse.json({ top10 });
  } catch (err) {
    console.error("Top10Strong API Error:", err);
    return NextResponse.json(
      { error: "Server error generating Top 10 Strong" },
      { status: 500 }
    );
  }
}
