"use client";

export default function PriceProfileBlock({ row }: { row: any }) {
  if (!row) return null;

  const parseNum = (v: any) =>
    typeof v === "string" ? parseFloat(v) : Number(v);

  // Helper to render each row: Label | % | Price | Bar
  const PercentPriceRow = (
    label: string,
    pctValue: any,
    priceValue: any
  ) => {
    const num = parseNum(pctValue);
    if (isNaN(num)) return null;

    const isPositive = num >= 0;
    const pct = Math.min(Math.abs(num), 100);
    const barColor = isPositive ? "#4CAF50" : "#d9534f";

    return (
      <div style={{ marginTop: "12px" }}>
        {/* ⭐ Label | % | Price — EXACT SAME GRID AS MainVerdictBlock */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            alignItems: "center",
            fontSize: "18px",
            fontWeight: 600,
            gap: "10px",
          }}
        >
          <div style={{ textAlign: "left" }}>
            <strong>{label}:</strong>
          </div>

          <div style={{ textAlign: "center" }}>
            {pctValue}
          </div>

          <div style={{ textAlign: "right" }}>
            {priceValue}
          </div>
        </div>

        {/* ⭐ Bar */}
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
              height: "100%",
              width: `${pct}%`,
              backgroundColor: barColor,
              position: "absolute",
              left: isPositive ? "0" : undefined,
              right: !isPositive ? "0" : undefined,
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
        maxWidth: "600px",
        minWidth: "550px",
      }}
    >
      <div
  style={{
    fontSize: "28px",
    fontWeight: "600",
    marginBottom: "10px",
    color: "#0c2105",
    textAlign: "center",   // ⭐ FIX: center the header
  }}
>
  Price Profile
</div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          fontSize: "28px",
        }}
      >
        {/* ⭐ Close Price (anchor) */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <strong>Close Price:</strong>
          <span>{row["Close Price"]}</span>
        </div>

        {/* ⭐ 1 Day — same price as today */}
        {PercentPriceRow("Price 1 Day", row["1 Day"], row["Price Close Today"])}

        {/* ⭐ All other periods */}
        {PercentPriceRow("Price 1 Week", row["1 Week"], row["Price 1 Week"])}
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
