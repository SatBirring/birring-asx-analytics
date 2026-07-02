"use client";

import Image from "next/image";

export default function HeroBlock() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "40px",
        padding: "40px 20px",
        backgroundColor: "#0b1e39",
        borderBottom: "1px solid #123",
      }}
    >
      <div style={{ flex: "0 0 380px" }}>
        <Image
          src="/hero.png"
          alt="Birring Data Analytics Hero"
          width={380}
          height={380}
          style={{ borderRadius: "12px" }}
        />
      </div>

      <div style={{ flex: 1 }}>
        <h1 style={{ fontSize: "36px", marginBottom: "10px", color: "white" }}>
          Birring Data Analytics
        </h1>

        <h2 style={{ fontSize: "22px", marginBottom: "20px", color: "#9cc9ff" }}>
          ASX Stocks Behavioural Report
        </h2>

        <p style={{ fontSize: "16px", color: "#c9d6e8", maxWidth: "500px" }}>
          Lookup any ASX stock to view behavioural metrics, trend signals,
          volatility profile, liquidity conditions, and macro‑micro alignment.
        </p>
      </div>
    </div>
  );
}
