"use client";

interface MacroProps {
  label: string;
  value: string | number;
}

export default function MacroMicroBlock({ row }: { row: any }) {
  if (!row) return null;

  const Row = ({ label, value }: MacroProps) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "8px 0",
        fontSize: "18px",
        fontWeight: 600,
      }}
    >
      <div>{label}</div>
      <div style={{ textAlign: "right" }}>{value}</div>
    </div>
  );

  return (
    <div
      style={{
        padding: "14px",
        borderRadius: "10px",
        backgroundColor: "#abefd6",   // same premium blue as Price Limits
        boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
        color: "#061126",
        width: "100%",
        maxWidth: "550px",            // button-sized
        minWidth: "400px",
        marginBottom: "20px",
      }}
    >
      <h2
        style={{
          marginBottom: "12px",
          fontSize: "28px",
          fontWeight: "700",
          color: "#113802",
          textAlign: "center",
        }}
      >
        Macro & Micro Regime Signals
      </h2>

      <Row label="Micro Regime" value={row["Micro Regime"]} />      
      <Row label="Micro Regime Historical" value={row["Micro R Smooth"]} />
      <Row label="Macro Voltality & Trend  Regime" value={row["Macro VT Regime"]} />
      <Row label="Market Regime Category" value={row["Market Regime Category"]} />
    </div>
  );
}
