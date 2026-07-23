import { useState } from "react";
import styles from "./CategoriesPage.module.css";

export default function StockList({ stocks, goToLookup }) {
  const [hoveredStock, setHoveredStock] = useState<any>(null);

  return (
    <div style={{ marginTop: "10px" }}>
      {stocks.length === 0 && <p>No stocks found.</p>}

      {stocks.map((s) => (
        <div
          key={s.code}
          className={styles.stockRow}
          onMouseEnter={() => setHoveredStock(s)}
          onMouseLeave={() => setHoveredStock(null)}
          onClick={(e) => {
            if (e.ctrlKey) {
              window.open(`/lookup?code=${s.code}`, "_blank");
              return;
            }
            goToLookup(s.code);
          }}
        >
          <div className={styles.stockRowContent}>
            <span style={{ fontWeight: 600, width: "80px" }}>{s.code}</span>
            <span style={{ flexGrow: 1 }}>{s.name}</span>
            <span style={{ width: "120px", color: "#30f998" }}>{s.momentum}</span>
            <span style={{ width: "120px", color: "#9cc9ff" }}>{s.type}</span>

            <span
              style={{
                fontSize: "20px",
                padding: "4px 8px",
                borderRadius: "6px",
                backgroundColor: "#1a2b4d",
                color: "#9cc9ff",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.stopPropagation();
                setHoveredStock(null);
                setTimeout(() => setHoveredStock(s), 0);
              }}
            >
              ℹ️
            </span>

            <span
              style={{
                fontSize: "20px",
                padding: "4px 8px",
                borderRadius: "6px",
                backgroundColor: "#1a2b4d",
                color: "#49d807",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.stopPropagation();
                window.open(`/lookup?code=${s.code}`, "_blank");
              }}
            >
              ⧉
            </span>
          </div>

          {hoveredStock?.code === s.code && (
            <div className={styles.popupCard}>
              <h3 style={{ marginBottom: "6px" }}>{s.code}</h3>
              <p style={{ margin: "4px 0" }}>Price Friday Close: {s.price || "N/A"}</p>
              <p style={{ margin: "4px 0" }}>Sector: {s.sector || "N/A"}</p>
              <p style={{ margin: "4px 0" }}>Trend Category: {s.trendCategory || "N/A"}</p>
              <p style={{ margin: "4px 0" }}>Overall Risk Class: {s.riskClass || "N/A"}</p>
              <p style={{ margin: "4px 0" }}>RSI (14): {s.rsi || "N/A"}</p>
              <p style={{ margin: "4px 0" }}>Liquidity Category: {s.liquidityCategory || "N/A"}</p>
              <p style={{ marginTop: "10px", fontSize: "20px", color: "#49d807" }}>
                Click for details
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
