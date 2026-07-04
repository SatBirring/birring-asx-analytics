"use client";

interface BarProps {
  label: string;
  value: number | string;
  type: "trend" | "tmove"  | "move" | "liq" | "vol";
}

export default function SupportingIndicatorsBlock({ row }: { row: any }) {
  if (!row) return null;

  const parseNum = (v: any) =>
    typeof v === "string" ? parseFloat(v) : Number(v);

  const Bar = ({ label, value, type }: BarProps) => {
    const num = parseNum(value);

    let pct = 0;
    let barColor = "#ccc";
    let isCentered = false;
    let isPositive = num >= 0;

    if (type === "trend") {
      // Range -3 to 3 → convert to 0–100%
      pct = Math.abs((num / 3) * 100);
      barColor = isPositive ? "#4CAF50" : "#d9534f";
      isCentered = true;
    }

    if (type === "move") {
      // Range -1 to 1 → convert to 0–100%
      pct = Math.abs((num / 1) * 100);   // ✔ FIXED
      barColor = isPositive ? "#4CAF50" : "#d9534f";
      isCentered = true;
    }
if (type === "tmove") {
      // Range -1 to 1 → convert to 0–100%
      pct = Math.abs((num / 3) * 100);   // ✔ FIXED
      barColor = isPositive ? "#4CAF50" : "#d9534f";
      isCentered = true;
    }

    if (type === "liq") {
      // Range 1–5 → convert to 0–100%
      pct = ((num - 1) / 4) * 100;
      barColor = "#7cd992"; // light green
    }

    if (type === "vol") {
      // Range 1–5 → convert to 0–100%
      pct = ((num - 1) / 4) * 100;
      barColor = "#f0a04b"; // orange
    }

    return (
      <div style={{ padding: "8px 0" }}>
        {/* Label + Value */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "18px",
            fontWeight: 600,
          }}
        >
          <div>{label}</div>
          <div>{value}</div>
        </div>

        {/* Data Bar */}
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
              height: "100%",
              width: `${pct}%`,
              backgroundColor: barColor,
              transition: "width 0.3s ease",
              position: "absolute",
              left: isCentered && isPositive ? "0" : undefined,
              right: isCentered && !isPositive ? "0" : undefined,
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        padding: "14px",
        borderRadius: "10px",
        backgroundColor: "#f1f4e3",
        boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
        color: "#061126",
        width: "100%",
        maxWidth: "550px",
        minWidth: "400px",
        marginBottom: "20px",
      }}
    >
      <h2
        style={{
          marginBottom: "12px",
          fontSize: "32px",
          fontWeight: "700",
          color: "#020c57",
          textAlign: "center",
        }}
      >
        Supporting Indicators — Calculated & Measured
      </h2>

      {/* Trend */}
      <Bar label="Trend Score" value={row["Trend Score"]} type="trend" />
      <Bar label="Trend Move" value={row["Trend Move"]} type="tmove" />

      {/* Liquidity */}
      <Bar label="Liquidity Score" value={row["Liquidity Score"]} type="liq" />
      <Bar label="Liquidity Move" value={row["Liquidity Move"]} type="move" />

      {/* Volatility */}
      <Bar
        label="Volatility Score"
        value={row["Volatility Score"]}
        type="vol"
      />

      {/* Category rows — NO bars */}
      <div style={{ padding: "8px 0", fontSize: "18px", fontWeight: 600 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>Trend Category</div>
          <div>{row["Trend Category"]}</div>
        </div>
      </div>

      <div style={{ padding: "8px 0", fontSize: "18px", fontWeight: 600 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>Liquidity Category</div>
          <div>{row["Liquidity Category"]}</div>
        </div>
      </div>

      <div style={{ padding: "8px 0", fontSize: "18px", fontWeight: 600 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>Volatility Category</div>
          <div>{row["Volatility Category"]}</div>
        </div>
      </div>
    </div>
  );
}
