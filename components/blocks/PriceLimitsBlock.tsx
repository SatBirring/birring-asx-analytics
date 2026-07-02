"use client";

export default function PriceLimitsBlock({ row }: { row: any }) {
  if (!row) return null;

  return (
    <div
      style={{
        padding: "14px",
        borderRadius: "10px",
        backgroundColor: "#becff6", // light premium
        boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
        color: "#333",
        width: "100%",
        maxWidth: "380px",        // button-sized
        minWidth: "260px",
      }}
    >
      <div
        style={{
          fontSize: "24px",
          fontWeight: "600",
          marginBottom: "10px",
          color: "#091326",
        }}
      >
        Price Limits
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          fontSize: "18px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <strong>Upper Price Limit:</strong>
          <span>{row["Upper Price Limit"]}</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <strong>Lower Price Limit:</strong>
          <span>{row["Lower Price Limit"]}</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <strong>Target Price Limit:</strong>
          <span>{row["Target Price Limit"]}</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <strong>Stop Price Limit:</strong>
          <span>{row["Stop price Limit"]}</span>
        </div>
      </div>
    </div>
  );
}
