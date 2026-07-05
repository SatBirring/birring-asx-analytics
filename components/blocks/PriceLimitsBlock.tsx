"use client";

export default function PriceLimitsBlock({ row }: { row: any }) {
  if (!row) return null;

  const clean = (v: any) => parseFloat(String(v).replace(/[^0-9.-]/g, ""));

  const lower = clean(row["Lower Price Limit"]);
  const upper = clean(row["Upper Price Limit"]);
  const target = clean(row["Target Price Limit"]);
  const stop = clean(row["Stop price Limit"]);

  const range = upper - lower || 1;

  // Target pointer position
  let targetPos = ((target - lower) / range) * 100;
  targetPos = Math.max(0, Math.min(100, targetPos));
  if (targetPos < 5) targetPos = 5;
  if (targetPos > 95) targetPos = 95;

  // Stop pointer position
  let stopPos = ((stop - lower) / range) * 100;

  // If stop is below lower limit → hide pointer
  const showStopPointer = stop >= lower;

  if (showStopPointer) {
    stopPos = Math.max(0, Math.min(100, stopPos));
    if (stopPos < 5) stopPos = 5;
    if (stopPos > 95) stopPos = 95;
  }

  return (
    <div
      style={{
        padding: "14px",
        borderRadius: "10px",
        backgroundColor: "#c0e8ef",
        boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
        color: "#012521",
        width: "100%",
        maxWidth: "500px",
        minWidth: "450px",
      }}
    >
      <div
        style={{
          fontSize: "28px",
          fontWeight: "600",
          marginBottom: "10px",
          color: "#021b4a",
          textAlign: "center",
        }}
      >
        Price Limits
      </div>

      {/* Original rows with updated text colors */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          fontSize: "18px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", color: "#4CAF50" }}>
          <strong>Upper Price Limit:</strong>
          <span>{row["Upper Price Limit"]}</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", color: "#d9534f" }}>
          <strong>Lower Price Limit:</strong>
          <span>{row["Lower Price Limit"]}</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", color: "#007bff" }}>
          <strong>Target Price Limit:</strong>
          <span>{row["Target Price Limit"]}</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", color: "#8000ff" }}>
          <strong>Stop Price Limit:</strong>
          <span>{row["Stop price Limit"]}</span>
        </div>
      </div>

      {/* Gradient bar */}
      <div
        style={{
          marginTop: "16px",
          height: "12px",
          width: "100%",
          borderRadius: "6px",
          background: "linear-gradient(to right, #d9534f, #f0ad4e, #4CAF50)",
          position: "relative",
        }}
      >
        {/* Lower pointer (red) */}
        <div
          style={{
            position: "absolute",
            left: "0%",
            top: "-10px",
            width: "14px",
            height: "14px",
            backgroundColor: "#d9534f",
            transform: "translateX(-50%) rotate(45deg)",
            borderRadius: "2px",
          }}
        />

        {/* Target pointer (blue) */}
        <div
          style={{
            position: "absolute",
            left: `${targetPos}%`,
            top: "-10px",
            width: "14px",
            height: "14px",
            backgroundColor: "#007bff",
            transform: "translateX(-50%) rotate(45deg)",
            borderRadius: "2px",
          }}
        />

        {/* Upper pointer (green) */}
        <div
          style={{
            position: "absolute",
            left: "100%",
            top: "-10px",
            width: "14px",
            height: "14px",
            backgroundColor: "#4CAF50",
            transform: "translateX(-50%) rotate(45deg)",
            borderRadius: "2px",
          }}
        />

        {/* Stop pointer (purple) — only if inside range */}
        {showStopPointer && (
          <div
            style={{
              position: "absolute",
              left: `${stopPos}%`,
              top: "-10px",
              width: "14px",
              height: "14px",
              backgroundColor: "#8000ff",
              transform: "translateX(-50%) rotate(45deg)",
              borderRadius: "2px",
            }}
          />
        )}
      </div>
    </div>
  );
}
