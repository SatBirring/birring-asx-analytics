"use client";

export default function PriceProfileBlock({ row }: { row: any }) {
  if (!row) return null;

  const parseNum = (v: any) =>
    typeof v === "string" ? parseFloat(v) : Number(v);

  const PercentPriceRow = (label: string, pctValue: any, priceValue: any) => {
    const num = parseNum(pctValue);
    if (isNaN(num)) return null;

    const isPositive = num >= 0;
    const pct = Math.min(Math.abs(num), 100);
    const sideWidth = pct / 2;

    const arrow = isPositive ? "▲" : "▼";
    const textColor = isPositive ? "#138d17" : "#cc110a";

    const barGradient = isPositive
      ? "linear-gradient(to right, #1c421e, #3ba03d)"
      : "linear-gradient(to left, #e60c05, #ee4c3d)";

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

          <div style={{ textAlign: "right" }}>{priceValue}</div>
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

  // ⭐ 52‑Week Low/High bar — always renders
 const FiftyTwoWeekBar = () => {
  const low52 = parseNum(row["52w Low"]);
  const high52 = parseNum(row["52w High"]);

  return (
    <div style={{ marginTop: "25px" }}>
      {/* Top labels: Low / High */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "18px",
          fontWeight: 600,
          marginBottom: "6px",
        }}
      >
        <span>52 Weeks Low: {row["52w Low"]}</span>
        <span>52 Weeks High: {row["52w High"]}</span>
      </div>

      {/* Bar only — no pointer */}
      <div
        style={{
          position: "relative",
          height: "10px",
          background: "linear-gradient(to right, #a80a04, #d1bd07, #07bb0d)",
          borderRadius: "6px",
        }}
      />
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

        {PercentPriceRow("Price 2 Week", row["2 Week"], row["Price 2 Weeks"])}
        {PercentPriceRow("Price 3 Week", row["3 Week"], row["Price 3 Weeks"])}
        {PercentPriceRow("Price 1 Month", row["1 Month"], row["Price 1 Month"])}
        {PercentPriceRow("Price 3 Month", row["3 Month"], row["Price 3 Month"])}
        {PercentPriceRow("Price 6 Month", row["6 Month"], row["Price 6 Month"])}
        {PercentPriceRow("Price 1 Year", row["1 Year"], row["Price 1 Year"])}

        {FiftyTwoWeekBar()}
      </div>
    </div>
  );
}
