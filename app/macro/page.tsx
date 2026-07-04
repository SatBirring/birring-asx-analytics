"use client";

import { useRouter } from "next/navigation";

export default function MacroPage() {
  const router = useRouter();

  return (
    <div
      style={{
        backgroundColor: "#e8ebff",   // ⭐ Light blue background
        minHeight: "100vh",           // ⭐ Full page height
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1 style={{ marginBottom: "20px", fontSize: "32px", fontWeight: "bold" }}>
        Macro Data Overview
      </h1>
      <h2 style={{ marginBottom: "20px", fontSize: "20px", fontWeight: "bold" }}>
        Macro data is systematically measured and compiled across the market and individual sectors, providing a unified view of directional momentum, trend development, and volatility behaviour.
      
      </h2>

      {/* Responsive Macro Image */}
      <img
        src="/macro-signal.png"
        alt="Macro Signal"
        style={{
          width: "100%",
          maxWidth: "1000px",
          height: "auto",
          margin: "20px auto",
          display: "block",
        }}
      />

      <img
        src="/macro-chart.png"
        alt="Macro Chart"
        style={{
          width: "100%",
          maxWidth: "1000px",
          height: "auto",
          margin: "20px auto",
          display: "block",
        }}
      />

      {/* Responsive Buttons */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
          marginTop: "30px",
        }}
      >
        <button
          onClick={() => router.push("/")}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#444",
            color: "white",
            border: "none",
            borderRadius: "6px",
          }}
        >
          Home
        </button>

        <button
          onClick={() => router.push("/lookup")}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "6px",
          }}
        >
          Back to Lookup
        </button>
      </div>
    </div>
  );
}
