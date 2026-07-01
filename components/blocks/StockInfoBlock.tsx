"use client";

export default function StockInfoBlock({ row }) {
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
        Stock Information
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <div><strong>Code:</strong> {row["Code"]}</div>
        <div><strong>Company:</strong> {row["Company"]}</div>
        <div><strong>Sector:</strong> {row["Sector"]}</div>
        <div><strong>Type:</strong> {row["TYPE"]}</div>
        <div><strong>Market Cap Rank:</strong> {row["Market Cap Rank"]}</div>
        <div><strong>Market Cap Measured:</strong> {row["Market cap Measured"]}</div>
        <div><strong>Ranking:</strong> {row["Ranking"]}</div>
        <div><strong>Market Standing Score:</strong> {row["Market Standing Score"]}</div>
      </div>
    </div>
  );
}