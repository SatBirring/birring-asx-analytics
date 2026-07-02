"use client";

interface RiskProps {
  label: string;
  value: string | number;
  showBar?: boolean;
}

export default function RiskBlock({ row }: { row: any }) {
  if (!row) return null;

  // Convert "64.5%" or "64.5" → 64.5
  const parsePercent = (val: any) => {
    if (typeof val === "string") return parseFloat(val);
    return Number(val);
  };

  const RiskRow = ({ label, value, showBar = false }: RiskProps) => {
    const numeric = parsePercent(value);
    const pct = Math.max(0, Math.min(100, numeric));

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
          <div style={{ textAlign: "right" }}>{value}</div>
        </div>

        {/* Red Risk Bar */}
        {showBar && (
          <div
            style={{
              marginTop: "6px",
              height: "8px",
              width: "100%",
              backgroundColor: "rgba(255,255,255,0.5)",
              borderRadius: "6px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${pct}%`,
                backgroundColor: "#d12924", // 🔥 solid risk red
                transition: "width 0.3s ease",
              }}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        padding: "14px",
        borderRadius: "10px",
        backgroundColor: "#f0d1ac",
        boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
        color: "#061126",
        width: "100%",
        maxWidth: "500px",
        minWidth: "450px",
        marginBottom: "20px",
      }}
    >
      <h2
        style={{
          marginBottom: "12px",
          fontSize: "20px",
          fontWeight: "700",
          color: "#270311",
        }}
      >
        Risk Indicators
      </h2>

      <RiskRow
        label="Over Extension Risk"
        value={row["Over Extention Risk"]}
        showBar={true}
      />

      <RiskRow
        label="Upside Pressure Risk"
        value={row["Upside Pressure Risk"]}
        showBar={true}
      />

      <RiskRow
        label="Overall Risk"
        value={row["Overall Risk"]}
        showBar={true}
      />

      <RiskRow
        label="Overall Risk Class"
        value={row["Overall Risk Class"]}
        showBar={false}
      />
    </div>
  );
}
