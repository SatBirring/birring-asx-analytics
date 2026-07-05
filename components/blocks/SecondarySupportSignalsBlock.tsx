"use client";

interface SecProps {
  label: string;
  value: string | number;
}

export default function SecondarySupportSignalsBlock({ row }: { row: any }) {
  if (!row) return null;

  const Row = ({ label, value }: SecProps) => (
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
        backgroundColor: "#becff6",   // same premium blue as other blocks
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
          color: "#061126",
          textAlign: "center",
        }}
      >
        Secondary Support Signals
      </h2>

      <Row label="RSI (14)" value={row["RSI (14)"]} />
      <Row label="MACD" value={row["MACD"]} />
      <Row label="Long Term Trend" value={row["Long-Term Trend"]} />
      <Row label="Breakout classifier" value={row["Breakout  classifier "]} />
      <Row label="Exit Reason" value={row["Exit Reason"]} />
    </div>
  );
}
