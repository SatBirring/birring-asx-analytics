"use client";

export default function MacroMicroBlock({ row }) {
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
        Macro & Micro Regime Signals
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <div><strong>Micro Regime:</strong> {row["Micro Regime"]}</div>
        <div><strong>Macro VT Regime:</strong> {row["Macro VT Regime"]}</div>
        <div><strong>Micro R Smooth:</strong> {row["Micro R Smooth"]}</div>
        <div><strong>Market Regime Category:</strong> {row["Market Regime Category"]}</div>
      </div>
    </div>
  );
}

