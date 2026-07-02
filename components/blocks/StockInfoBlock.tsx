"use client";

export default function StockInfoBlock({ row }: { row: any }) {
  if (!row) return null;

  return (
    <div
      style={{
        padding: "20px",
        marginBottom: "24px",
        borderRadius: "12px",
        backgroundColor: "#01061e",
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
      }}
    >
      {/* ⭐ Row 1 — Code + Company (auto spacing) */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            fontSize: "30px",
            fontWeight: "700",
            color: "#e3e3eb",
          }}
        >
          {row["Code"]}
        </div>

        <div
          style={{
            fontSize: "30px",
            fontWeight: "700",
            color: "#e3e3eb",
          }}
        >
          {row["Company"]}
        </div>
      </div>

      {/* ⭐ Row 2 — Sector + Type */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "20px",
          marginBottom: "16px",
          fontSize: "24px",
          fontWeight: "500",
          color: "#e7dbdb",
        }}
      >
        <div>
          Sector: <strong>{row["Sector"]}</strong>
        </div>

        <div>
          Type: <strong>{row["TYPE"]}</strong>
        </div>
      </div>

      {/* ⭐ Row 3 — Market Cap + Rank + Standing + Measured Ranking */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "24px",
          fontSize: "18px",
          color: "#f0e0e0",
        }}
      >
        <div>
          <strong>Market Cap: $</strong> {row["Market cap Measured"]}
        </div>

        <div>
          <strong>Market Cap Rank:</strong> {row["Market Cap Rank"]}
        </div>

        <div>
          <strong>Market Standing Score:</strong> {row["Market Standing Score"]}
        </div>

        {row["Ranking"] && (
          <div>
            <strong>Measured Ranking:</strong> {row["Ranking"]}
          </div>
        )}
      </div>
    </div>
  );
}
