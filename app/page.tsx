"use client";

import { useEffect, useState } from "react";

function Top10Strong() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/top10Strong");
        const data = await res.json();
        setRows(data.top10 || []);
      } catch (err) {
        console.error("Failed to load Top 10 Strong:", err);
      }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <p style={{ textAlign: "center", color: "#9cc9ff" }}>
        Loading Top 10 Strong…
      </p>
    );
  }

  return (
    <div
  style={{
    backgroundColor: "#102544",
    padding: "20px",
    borderRadius: "10px",
    border: "1px solid #1c3558",
    marginBottom: "60px",
  }}
>
  {/* MOBILE-FRIENDLY SCROLL WRAPPER */}
  <div style={{ overflowX: "auto" }}>
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ color: "#fbdd59", textAlign: "left" }}>
          <th style={{ padding: "10px" }}>Rank</th>
          <th style={{ padding: "10px" }}>Code</th>
          <th style={{ padding: "10px" }}>Momentum</th>
          <th style={{ padding: "10px" }}>Final Score</th>
          <th style={{ padding: "10px" }}>Standing</th>
          <th style={{ padding: "10px", whiteSpace: "nowrap" }}>Action</th>
        </tr>
      </thead>

      <tbody>
        {rows.map((row, index) => (
          <tr
            key={index}
            style={{
              borderBottom: "1px solid #1c3558",
              color: "#c9de25",
            }}
          >
            <td style={{ padding: "10px" }}>{index + 1}</td>

            <td style={{ padding: "10px", fontWeight: "600" }}>
              {row.code}
            </td>

            <td style={{ padding: "10px" }}>
              {row.momentum}
            </td>

            <td style={{ padding: "10px" }}>
              {row.finalScore}%
            </td>

            <td style={{ padding: "10px" }}>
              {row.standing}
            </td>

            {/* COMPACT ACTION ICON — FITS ON MOBILE */}
            <td style={{ padding: "10px", whiteSpace: "nowrap" }}>
              <a
                href={`/lookup?code=${row.code}`}
                target="_blank"
                style={{
                  color: "#fbdd59",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: "18px",
                }}
              >
                Inspect→
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
}

export default function Home() {
  return (
    <div
      style={{
        background: "linear-gradient(180deg, #0b1e39, #071427)",
        color: "white",
        minHeight: "100vh",
        padding: "40px 20px",
        fontFamily: "Arial",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* HERO SECTION */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "60px",
          }}
        >
          <div style={{ flex: "1 1 480px", paddingRight: "20px" }}>
            <h1
              style={{
                fontSize: "48px",
                fontWeight: "700",
                marginBottom: "20px",
                background: "linear-gradient(90deg, #07b8e9, #fe8940, #fbdd59)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Birring Data Analytics
            </h1>

            <p
              style={{
                fontSize: "20px",
                lineHeight: "1.6",
                color: "#c9de25",
                marginBottom: "30px",
              }}
            >
              Structured behavioural analytics for ASX‑listed stocks.  
              Multi‑layer signals. Weekly consistency.  
              No forecasts — only observable market behaviour.
            </p>

            <div style={{ marginTop: "10px" }}>
              <a
                href="/lookup"
                
                style={{
                  display: "inline-block",
                  padding: "14px 28px",
                  backgroundColor: "#0070f3",
                  color: "yellow",
                  borderRadius: "8px",
                  fontSize: "18px",
                  fontWeight: "600",
                  textDecoration: "none",
                  marginRight: "12px",
                  marginBottom: "12px",
                }}
              >
                Start Stock Lookup →
              </a>

              <a
                href="/categories"
                
                style={{
                  display: "inline-block",
                  padding: "14px 28px",
                  backgroundColor: "#fe8940",
                  color: "black",
                  borderRadius: "8px",
                  fontSize: "18px",
                  fontWeight: "600",
                  textDecoration: "none",
                  marginRight: "12px",
                  marginBottom: "12px",
                }}
              >
                Stock Categories
              </a>

              <a
                href="/macro"
                
                style={{
                  display: "inline-block",
                  padding: "14px 28px",
                  backgroundColor: "#fbdd59",
                  color: "#0b1e39",
                  borderRadius: "8px",
                  fontSize: "18px",
                  fontWeight: "600",
                  textDecoration: "none",
                  marginRight: "12px",
                  marginBottom: "12px",
                }}
              >
                Market Macro Snapshot
              </a>
            </div>
          </div>

          <div style={{ flex: "1 1 480px", textAlign: "center" }}>
            <img
              src="/hero.png"
              alt="Birring Analytics Hero"
              style={{
                width: "100%",
                maxWidth: "420px",
                borderRadius: "12px",
                objectFit: "contain",
              }}
            />
          </div>
        </div>

        {/* WHAT WE MEASURE */}
        <h2
          style={{
            fontSize: "32px",
            fontWeight: "700",
            color: "#fbdd59",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          What We Measure
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
            marginBottom: "60px",
          }}
        >
          <div
            style={{
              flex: "1 1 300px",
              backgroundColor: "#102544",
              padding: "20px",
              borderRadius: "10px",
              border: "1px solid #1c3558",
            }}
          >
            <h3 style={{ color: "#fbdd59", marginBottom: "10px" }}>
              Trend Behaviour
            </h3>
            <p style={{ color: "#c9de25", lineHeight: "1.6" }}>
              Directional movement, slope quality, and trend stability across
              52 weeks.
            </p>
          </div>

          <div
            style={{
              flex: "1 1 300px",
              backgroundColor: "#102544",
              padding: "20px",
              borderRadius: "10px",
              border: "1px solid #1c3558",
            }}
          >
            <h3 style={{ color: "#fbdd59", marginBottom: "10px" }}>
              Price Structure
            </h3>
            <p style={{ color: "#c9de25", lineHeight: "1.6" }}>
              Weekly movement quality, volatility regimes, and liquidity
              conditions.
            </p>
          </div>

          <div
            style={{
              flex: "1 1 300px",
              backgroundColor: "#102544",
              padding: "20px",
              borderRadius: "10px",
              border: "1px solid #1c3558",
            }}
          >
            <h3 style={{ color: "#fbdd59", marginBottom: "10px" }}>
              Macro Alignment
            </h3>
            <p style={{ color: "#c9de25", lineHeight: "1.6" }}>
              Macro‑micro consistency measured against ASX sector flows.
            </p>
          </div>
        </div>

        {/* TOP 10 STRONG */}
        <h2
          style={{
            fontSize: "32px",
            fontWeight: "700",
            color: "#fbdd59",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Top 10 Strong Category Leaders
        </h2>

        <Top10Strong />

        {/* FOOTER */}
        <footer
          style={{
            marginTop: "40px",
            paddingTop: "20px",
            borderTop: "1px solid #123",
            color: "#9cc9ff",
            fontSize: "14px",
            textAlign: "center",
          }}
        >
          © 2026 Birring Data Analytics — Behavioural, non‑advisory ASX analytics.  
          Raw Data sourced from MarketIndex.com.au.
        </footer>
      </div>
    </div>
  );
}
