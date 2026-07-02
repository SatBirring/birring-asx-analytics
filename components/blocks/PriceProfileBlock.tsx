"use client";

export default function PriceProfileBlock({ row }: { row: any }) {
  if (!row) return null;

  return (
    <div
      style={{
        padding: "14px",
        borderRadius: "10px",
        backgroundColor: "#d2efa3", // light premium
        boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
        color: "#333",
        width: "100%",            
        maxWidth: "380px",        
        minWidth: "260px",        
      }}
    >
      <div
        style={{
          fontSize: "28px",
          fontWeight: "600",
          marginBottom: "10px",
          color: "#061126",
        }}
      >
        Price Profile
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          fontSize: "20px",
        }}
      >
        {/* ⭐ Label left — Value right */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <strong>Close Price:</strong>
          <span>{row["Close Price"]}</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <strong>Price Close Today:</strong>
          <span>{row["Price Close Today"]}</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <strong>Price 1 Week:</strong>
          <span>{row["Price 1 Week"]}</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <strong>Price 2 Weeks:</strong>
          <span>{row["Price 2 Weeks"]}</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <strong>Price 3 Weeks:</strong>
          <span>{row["Price 3 Weeks"]}</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <strong>Price 1 Month:</strong>
          <span>{row["Price 1 Month"]}</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <strong>Price 3 Month:</strong>
          <span>{row["Price 3 Month"]}</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <strong>Price 6 Month:</strong>
          <span>{row["Price 6 Month"]}</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <strong>Price 1 Year:</strong>
          <span>{row["Price 1 Year"]}</span>
        </div>
      </div>
    </div>
  );
}
