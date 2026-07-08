"use client";

export default function PriceProfileBlock({ row }: { row: any }) {
  if (!row) return null;

  const parseNum = (v: any) =>
    typeof v === "string" ? parseFloat(v) : Number(v);

  // ⭐ Unified symmetric bar renderer (-100 .. 0 .. +100)
  const PercentPriceRow = (
    label: string,
    pctValue: any,
    priceValue: any
  ) => {
    const num = parseNum(pctValue);
    if (isNaN(num)) return null;

    const isPositive = num >= 0;
    const pct = Math.min(Math.abs(num), 100);     // 0..100
    const sideWidth = pct / 2;                    // max 50%
    const barColor = isPositive ? "#4CAF50" : "#d9534f";

    return (
      <div style={{ marginTop: "12px" }}>
        {/* Label | % | Price */}
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

        {/* ⭐ Symmetric bar: -100 .. 0 .. +100 */}
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
          {/* Center zero line */}
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

          {/* Bar growing from center */}
          <div
            style={{
              height: "100%",
              width: `${sideWidth}%`,                 // max 50%
              backgroundColor: barColor,
              position: "absolute",
              left: isPositive ? "50%" : undefined,   // positive → right side
              right: !isPositive ? "50%" : undefined, // negative → left side
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
          fontSize: "28px",
        }}
      >
        {/* Close Price */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <strong>Close Price:</strong>
          <span>{row["Close Price"]}</span>
        </div>

        {/* 1 Day */}
        {PercentPriceRow("Price 1 Day", row["1 Day"], row["Price Close Today"])}

        {/* All other periods */}
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
