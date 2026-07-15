export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  const cleanCode = code.trim().toUpperCase().replace(".AX", "");
  const symbol = `${cleanCode}.AU`;

  const url = `https://eodhd.com/api/real-time/${symbol}?api_token=demo&fmt=json`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data || data.code === "400") {
      return NextResponse.json({ error: "No data found" }, { status: 404 });
    }

    return NextResponse.json({
      code: cleanCode,
      price: data.close,
      change: data.change_p,
      volume: data.volume,
      high: data.high,
      low: data.low,
      previousClose: data.previousClose,
      timestamp: data.timestamp,
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch price" }, { status: 500 });
  }
}
