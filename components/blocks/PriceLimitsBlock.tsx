"use client";

export default function PriceLimitsBlock({ row }: { row: any }) {
  if (!row) return null;

  return (
    <div
      style={{
        padding: "16px",
        marginBottom: "20px",
        borderRadius: "10px",
        backgroundColor: "#f8f9fa",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{
          marginBottom: "12px",
          fontSize: "20px",
          fontWeight: "600",
          color: "#333",
        }}
      >
        Price Limits
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <div><strong>Upper Price Limit:</strong> {row["Upper Price Limit"]}</div>
        <div><strong>Lower Price Limit:</strong> {row["Lower Price Limit"]}</div>
        <div><strong>Target Price Limit:</strong> {row["Target Price Limit"]}</div>
        <div><strong>Stop Price Limit:</strong> {row["Stop price Limit"]}</div>
      </div>
    </div>
  );
}
