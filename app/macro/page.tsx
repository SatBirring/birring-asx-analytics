"use client";

import { useRouter } from "next/navigation";

// GLOBAL BUTTON SYSTEM
import {
  btnBlue,
  btnOrange,
  btnNavy,
  hoverEnter,
  hoverLeave
} from "@/components/ButtonStyles";

export default function MacroPage() {
  const router = useRouter();

  return (
    <div
      style={{
        backgroundColor: "#e8ebff",
        minHeight: "100vh",
        padding: "20px",
        textAlign: "center",
      }}
    >
      {/* PAGE TITLE */}
      <h1 style={{ marginBottom: "20px", fontSize: "32px", fontWeight: "bold" }}>
        Macro Data Overview
      </h1>

      <h2 style={{ marginBottom: "20px", fontSize: "20px", fontWeight: "bold" }}>
        Macro data is systematically measured and compiled across the market and individual sectors,
        providing a unified view of directional momentum, trend development, and volatility behaviour.
      </h2>

      {/* FIRST IMAGE */}
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

      {/* ⭐ TOP BUTTON BAR — moved under macro-signal */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
          margin: "20px 0",
        }}
      >
        <button
          onClick={() => router.push("/")}
          style={{ ...btnNavy, padding: "12px 26px", fontSize: "18px" }}
          onMouseEnter={hoverEnter}
          onMouseLeave={hoverLeave}
        >
         🏠 Home
        </button>

        <button
          onClick={() => router.push("/lookup")}
          style={{ ...btnBlue, padding: "12px 26px", fontSize: "18px" }}
          onMouseEnter={hoverEnter}
          onMouseLeave={hoverLeave}
        >
          🔍 Stock Lookup
        </button>

        <button
          onClick={() => router.push("/categories")}
          style={{ ...btnOrange, padding: "12px 26px", fontSize: "18px" }}
          onMouseEnter={hoverEnter}
          onMouseLeave={hoverLeave}
        >
          📁 Stock Categories
        </button>
      </div>

      {/* REMAINING IMAGES */}
      {[
        "/macro-chart.png",
        "/macro-chart 1.png",
        "/macro-chart 2.png",
        "/macro-chart 3.png",
      ].map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`Macro Chart ${idx}`}
          style={{
            width: "100%",
            maxWidth: "1000px",
            height: "auto",
            margin: "20px auto",
            display: "block",
          }}
        />
      ))}

      {/* ⭐ BOTTOM BUTTON BAR — also without macro button */}
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
          style={{ ...btnNavy, padding: "12px 26px", fontSize: "18px" }}
          onMouseEnter={hoverEnter}
          onMouseLeave={hoverLeave}
        >
          🏠 Home
        </button>

        <button
          onClick={() => router.push("/lookup")}
          style={{ ...btnBlue, padding: "12px 26px", fontSize: "18px" }}
          onMouseEnter={hoverEnter}
          onMouseLeave={hoverLeave}
        >
          🔍 Stock Lookup
        </button>

        <button
          onClick={() => router.push("/categories")}
          style={{ ...btnOrange, padding: "12px 26px", fontSize: "18px" }}
          onMouseEnter={hoverEnter}
          onMouseLeave={hoverLeave}
        >
          📁 Stock Categories
        </button>
      </div>
    </div>
  );
}
