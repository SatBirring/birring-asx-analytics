import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  // Path to your CSV file
  const filePath = path.join(process.cwd(), "public", "EOD.csv");
  const csv = fs.readFileSync(filePath, "utf8");

  const rows = csv.trim().split("\n");
  const headers = rows[0].split(",");

  let found = null;

  for (let i = 1; i < rows.length; i++) {
    const cols = rows[i].split(",");
    if (cols[0].toUpperCase() === code.toUpperCase()) {
      found = {
        code: cols[0],
        date: cols[1],
        open: parseFloat(cols[2]),
        high: parseFloat(cols[3]),
        low: parseFloat(cols[4]),
        close: parseFloat(cols[5]),
        volume: parseFloat(cols[6])
      };
      break;
    }
  }

  if (!found) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(found);
}
