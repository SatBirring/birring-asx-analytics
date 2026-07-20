"use client";

interface BarProps {
  label: string;
  value: number | string;
  type: "trend" | "tmove" | "move" | "liq" | "vol";
}

export default function SupportingIndicatorsBlock({ row }: { row: any }) {
  if (!row) return null;

  const parseNum = (v: any) =>
    typeof v === "string" ? parseFloat(v) : Number(v);

    const Bar = ({ label, value, type }: BarProps) => {
  const num = parseNum(value);
  const isPositive = num >= 0;

  let pct = 0;
  let barColor = "#ccc";
  let symmetric = false;

  if (type === "trend") {
    pct = Math.min(Math.abs((num / 3) * 100), 100);
    barColor = isPositive ? "#0db313" : "#d11c16";
    symmetric = true;
  }

  if (type === "move") {
    pct = Math.min(Math.abs((num / 1) * 100), 100);
    barColor = isPositive ? "#202bc7" : "#c72cc7";
    symmetric = true;
  }

  if (type === "tmove") {
    pct = Math.min(Math.abs((num / 3) * 100), 100);
    barColor = isPositive ? "#05a10b" : "#d81009";
    symmetric = true;
  }

  if (type === "liq") {
    pct = ((num - 1) / 4) * 100;
    barColor = "#d4e914";
  }

  if (type === "vol") {
    pct = ((num - 1) / 4) * 100;
    barColor = "#f09737";
  }

  const sideWidth = symmetric ? pct / 2 : pct;

  // ⭐ Text color
  const textColor = symmetric
    ? isPositive
      ? "#4CAF50"
      : "#d9534f"
    : "#061126";

  // ⭐ Arrow icon
  const arrow = symmetric
    ? isPositive
      ? "▲"
      : "▼"
    : "";

  // ⭐ Gradient bar
  const barGradient = symmetric
    ? isPositive
      ? "linear-gradient(to right, #02a807fb, #369638e0)"
      : "linear-gradient(to left, #df0d06ad, #ee7267)"
    : type === "liq"
    ? "linear-gradient(to right, #e7e304, #cdf16a)"
    : type === "vol"
    ? "linear-gradient(to right, #e27705, #f1a840)"
    : barColor;

  return (
    <div style={{ padding: "8px 0" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "18px",
          fontWeight: 600,
          color: textColor,
        }}
      >
        <div>{label}</div>
        <div>
          {value} {arrow}
        </div>
      </div>

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
        {symmetric && (
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: "1px",
              backgroundColor: "rgba(0,0,0,0.25)",
            }}
          />
        )}

        <div
          style={{
            height: "100%",
            width: `${sideWidth}%`,
            background: barGradient,
            transition: "width 0.3s ease",
            position: "absolute",
            left: symmetric && isPositive ? "50%" : symmetric ? undefined : "0",
            right: symmetric && !isPositive ? "50%" : undefined,
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

      {/* ⭐ Symmetric bars */}
      <Bar label="Trend Score" value={row["Trend Score"]} type="trend" />
      <Bar label="Trend Move" value={row["Trend Move"]} type="tmove" />
      <Bar label="Liquidity Move" value={row["Liquidity Move"]} type="move" />

      {/* ⭐ Left‑anchored bars */}
      <Bar label="Liquidity Score" value={row["Liquidity Score"]} type="liq" />
      <Bar label="Volatility Score" value={row["Volatility Score"]} type="vol" />

      {/* Categories (no bars) */}
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
