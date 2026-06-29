import { NextResponse } from "next/server";
import { readCSV } from "@/lib/csv";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query")?.toLowerCase() || "";

  if (!query) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }

  const data = readCSV();

  const results = data.filter((row: any) => {
    return row["Code"]?.toLowerCase().includes(query);
  });

  return NextResponse.json({ results });
}
