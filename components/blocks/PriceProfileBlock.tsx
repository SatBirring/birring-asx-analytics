"use client";

import { useState, useEffect } from "react";

export default function PriceProfileBlock({ row }: { row: any }) {
  if (!row) return null;

  // ⭐ ADD THIS BLOCK HERE
  const [eodClose, setEodClose] = useState<number | null>(null);

  useEffect(() => {
    async function loadEOD() {
      try {
        const res = await fetch(`/api/eod-csv?code=${row["Code"]}`);
        const data = await res.json();

        if (data.close) {
          setEodClose(data.close);
        }
      } catch (err) {
        console.error("EOD CSV error:", err);
      }
    }

    loadEOD();
  }, [row]);
  // ⭐ END OF BLOCK
  const parseNum = (v: any) =>
    typeof v === "string" ? parseFloat(v) : Number(v);

  const PercentPriceRow = (
  label: string,
  pctValue: any,
  priceValue: any
) => {
  const num = parseNum(pctValue);
  if (isNaN(num)) return null;

  const isPositive = num >= 0;
  const pct = Math.min(Math.abs(num), 100);
  const sideWidth = pct / 2;

  // Arrow icon
  const arrow = isPositive ? "▲" : "▼";

  // Text colour
  const textColor = isPositive ? "#138d17" : "#cc110a";

  // Gradient bar (choose A or B)
     const barGradient = isPositive
     ? "linear-gradient(to right, #1c421e, #3ba03d)"
      : "linear-gradient(to left, #e60c05, #ee4c3d)";

      //3‑colour gradient option
      //const barGradient = isPositive
      //? "linear-gradient(to right, #4CAF50, #C8E96B, #F7E967)"
      //: "linear-gradient(to left, #d9534f, #F7E967, #C8E96B)";

  return (
    <div style={{ marginTop: "12px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          alignItems: "center",
          fontSize: "18px",
          fontWeight: 600,
          gap: "10px",
          color: textColor,
        }}
      >
        <div style={{ textAlign: "left" }}>
          <strong>{label}:</strong>
        </div>

        <div style={{ textAlign: "center" }}>
          {pctValue} {arrow}
        </div>

        <div style={{ textAlign: "right" }}>
          {priceValue}
        </div>
      </div>

      <div
        style={{
          marginTop: "6px",
          height: "8px",
          width: "100%",
          backgroundColor: "rgba(255,255,255,0.5)",
          borderRadius: "6px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: "1px",
            backgroundColor: "rgba(0,0,0,0.25)",
          }}
        />

        <div
          style={{
            height: "100%",
            width: `${sideWidth}%`,
            background: barGradient,
            position: "absolute",
            left: isPositive ? "50%" : undefined,
            right: !isPositive ? "50%" : undefined,
            transition: "width 0.3s ease",
          }}
        />
      </div>
    </div>
  );
};

  return (
    <div
      style={{
        padding: "14px",
        borderRadius: "10px",
        backgroundColor: "#dff2d2",
        boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
        color: "#333",
        width: "100%",
        maxWidth: "550px",
        minWidth: "450px",
      }}
    >
      <div
        style={{
          fontSize: "28px",
          fontWeight: "600",
          marginBottom: "10px",
          color: "#0c2105",
          textAlign: "center",
        }}
      >
        Price Profile
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          fontSize: "24px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <strong>Price Friday close:</strong>
          <span>{row["Close Price"]}</span>
        </div>

        {/*PercentPriceRow("Last updated price", row["1 Day"],eodClose ?? row["Price Close Today"])*/}

        {PercentPriceRow("Price 2 Week", row["2 Week"], row["Price 2 Weeks"])}
        {PercentPriceRow("Price 3 Week", row["3 Week"], row["Price 3 Weeks"])}
        {PercentPriceRow("Price 1 Month", row["1 Month"], row["Price 1 Month"])}
        {PercentPriceRow("Price 3 Month", row["3 Month"], row["Price 3 Month"])}
        {PercentPriceRow("Price 6 Month", row["6 Month"], row["Price 6 Month"])}
        {PercentPriceRow("Price 1 Year", row["1 Year"], row["Price 1 Year"])}
      </div>
    </div>
  );
}
