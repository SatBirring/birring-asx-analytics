"use client";

export default function SupportingIndicatorsBlock({ row }) {
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
        Supporting Indicators — Calculated & Measured
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        
        {/* Trend */}
        <div><strong>Trend Score:</strong> {row["Trend Score"]}</div>
        <div><strong>Trend Move:</strong> {row["Trend Move"]}</div>
        <div><strong>Trend Category:</strong> {row["Trend Category"]}</div>

        {/* Liquidity */}
        <div><strong>Liquidity Score:</strong> {row["Liquidity Score"]}</div>
        <div><strong>Liquidity Move:</strong> {row["Liquidity Move"]}</div>
        <div><strong>Liquidity Category:</strong> {row["Liquidity Category"]}</div>

        {/* Volatility */}
        <div><strong>Volatility Score:</strong> {row["Volatility Score"]}</div>
        <div><strong>Volatility Category:</strong> {row["Volatility Category"]}</div>

      </div>
    </div>
  );
}