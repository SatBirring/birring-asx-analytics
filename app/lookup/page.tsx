"use client";

import HeroBlock from "@/components/HeroBlock";
import DynamicLookup from "@/components/DynamicLookup";

export default function LookupPage() {
  return (
    <div
      style={{
        fontFamily: "Arial",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* TOP SECTION (HeroBlock – will later convert to text-only) */}
      <div>
        <HeroBlock />
      </div>

      {/* MAIN CONTENT */}
      <div style={{ padding: "30px", flex: 1 }}>
        <h1
        style={{
          padding: "10px",
          textAlign: "left",
          fontSize: "24px",
          color: "#0019a5",
          
            }}
        >
          Type ASX Stock Code to Search
          </h1>

        <DynamicLookup />
      </div>

      {/* FOOTER – ALWAYS STAYS AT BOTTOM */}
      <footer
        style={{
          padding: "20px",
          textAlign: "center",
          borderTop: "1px solid #123",
          color: "#9cc9ff",
          backgroundColor: "#0b1e39"
        }}
      >
        © 2026 Birring Data Analytics — Behavioural, non‑advisory ASX analytics.
      </footer>
    </div>
  );
}
