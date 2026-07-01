"use client";

export default function MainVerdictBlock({ row }) {
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
        Core Signals - Multiple Horizons & Data Sets
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <div><strong>Final Verdict:</strong> {row["Final Verdict"]}</div>
        <div><strong>Final Score:</strong> {row["Final Score"]}</div>
        <div><strong>Behavioural Classifier:</strong> {row["Behavioural Classifier"]}</div>

        <div><strong>EMA Final Verdict:</strong> {row["EMA Final Verdict"]}</div>
        <div><strong>CFS Smooth:</strong> {row["CFS Smooth"]}</div>
        <div><strong>CFS Move:</strong> {row["CFS Move"]}</div>

        <div><strong>Overall Momentum Score:</strong> {row["Overall Momentum Score"]}</div>
        <div><strong>Momentum Category:</strong> {row["Momentum Category"]}</div>
      </div>
    </div>
  );
}