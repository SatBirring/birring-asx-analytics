"use client";

export default function PriceProfileBlock({ row }) {
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
        Price Profile
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <div><strong>Close Price:</strong> {row["Close Price"]}</div>
        <div><strong>Price Close Today:</strong> {row["Price Close Today"]}</div>
        <div><strong>Price 1 Week:</strong> {row["Price 1 Week"]}</div>
        <div><strong>Price 2 Weeks:</strong> {row["Price 2 Weeks"]}</div>
        <div><strong>Price 3 Weeks:</strong> {row["Price 3 Weeks"]}</div>
        <div><strong>Price 1 Month:</strong> {row["Price 1 Month"]}</div>
        <div><strong>Price 3 Month:</strong> {row["Price 3 Month"]}</div>
        <div><strong>Price 6 Month:</strong> {row["Price 6 Month"]}</div>
        <div><strong>Price 1 Year:</strong> {row["Price 1 Year"]}</div>
      </div>
    </div>
  );
}