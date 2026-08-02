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

    const idxVerdict = header.indexOf("final verdict");

    const counts: any = {
      Extended: 0,
      Strong: 0,
      Positive: 0,
      Monitor: 0,
      Recheck: 0,
      Weak: 0,
    };

    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(",");
      const verdict = row[idxVerdict]?.trim();

      if (counts[verdict] !== undefined) {
        counts[verdict]++;
      }
    }

    return NextResponse.json({ counts });
  } catch (err) {
    console.error("CategoryCounts API Error:", err);
    return NextResponse.json(
      { error: "Server error generating category counts" },
      { status: 500 }
    );
  }
}
