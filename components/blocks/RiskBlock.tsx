"use client";

export default function RiskBlock({ row }) {
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
        Risk Indicators
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <div><strong>Over Extension Risk:</strong> {row["Over Extention Risk"]}</div>
        <div><strong>Upside Pressure Risk:</strong> {row["Upside Pressure Risk"]}</div>
        <div><strong>Overall Risk:</strong> {row["Overall Risk"]}</div>
        <div><strong>Overall Risk Class:</strong> {row["Overall Risk Class"]}</div>
      </div>
    </div>
  );
}
