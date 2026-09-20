"use client";

import { useEffect, useState } from "react";

// IMPORT YOUR BUTTON SYSTEM
import {
  btnBlue,
  btnOrange,
  btnYellow,
  btnGreen,
  btnPink,
  btnLime,
  btnGold,
  btnOrangeRed,
  btnRed,
  btnTeal,
  btnNavy,
  btnGrey,
  btnWhiteOutline,
  hoverEnter,
  hoverLeave,
  baseButton
} from "@/components/ButtonStyles";

/* ============================================================
   TOP 10 STRONG TABLE
   ============================================================ */

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
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ color: "#fbdd59", textAlign: "left" }}>
              <th style={{ padding: "10px" }}>Code</th>
              <th style={{ padding: "10px" }}>Price</th>
              <th style={{ padding: "10px" }}>Momentum</th>
              <th style={{ padding: "10px" }}>Final Score</th>
              <th style={{ padding: "10px" }}>PE Valuation</th>
              <th style={{ padding: "10px" }}>Action</th>
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
                <td style={{ padding: "10px", fontWeight: "600" }}>
                  {row.code}
                </td>

                <td style={{ padding: "10px" }}>{row.price}</td>

                <td style={{ padding: "10px" }}>{row.momentum}</td>

                <td style={{ padding: "10px" }}>{row.finalScore}%</td>

                <td style={{ padding: "10px" }}>{row.pevalue}</td>

                <td style={{ padding: "10px" }}>
                  <a
                    href={`/lookup?code=${row.code}`}
                    target="_blank"
                    style={{
                      ...baseButton,
                      padding: "10px 18px",
                      fontSize: "16px",
                      backgroundColor: "#92da0c",
                      color: "black",
                    }}
                    onMouseEnter={hoverEnter}
                    onMouseLeave={hoverLeave}
                  >
                    Report ⧉
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

/* ============================================================
   CATEGORY COUNTS
   ============================================================ */

function CategoryCountsText() {
  const [counts, setCounts] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/categoryCounts");
        const data = await res.json();
        setCounts(data.counts || {});
      } catch (err) {
        console.error("Failed to load category counts:", err);
      }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <p style={{ textAlign: "center", color: "#9cc9ff" }}>
        Loading category summary…
      </p>
    );
  }

  return (
    <p
      style={{
        textAlign: "center",
        color: "#c9de25",
        fontSize: "20px",
        marginBottom: "40px",
        lineHeight: "1.8",
      }}
    >
      Total Count Each Category →
      <a href="/categories?verdict=Extended" style={{ color: "#e625e6" }}>
        Extended = {counts.Extended}
      </a>,{" "}
      <a href="/categories?verdict=Strong" style={{ color: "#1a8d03" }}>
        Strong = {counts.Strong}
      </a>,{" "}
      <a href="/categories?verdict=Positive" style={{ color: "#a3f362" }}>
        Positive = {counts.Positive}
      </a>,{" "}
      <a href="/categories?verdict=Monitor" style={{ color: "#fad83f" }}>
        Monitor = {counts.Monitor}
      </a>,{" "}
      <a href="/categories?verdict=Recheck" style={{ color: "#f58f3c" }}>
        Recheck = {counts.Recheck}
      </a>,{" "}
      <a href="/categories?verdict=Weak" style={{ color: "#f55d16" }}>
        Weak = {counts.Weak}
      </a>
    </p>
  );
}

/* ============================================================
   HOME PAGE
   ============================================================ */

export default function Home() {
  return (
    <div
      style={{
        background: "linear-gradient(180deg, #0e1535, #071427)",
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
              Structured, Quantative behavioural analytics for all ASX‑listed stocks.  
              Multi‑layer signals. Weekly consistency.  
              No forecasts — only measured Market behaviour.
            </p>

            {/* CTA BUTTONS */}
            <div style={{ marginTop: "10px" }}>
              <a
                href="/lookup"
                style={btnBlue}
                onMouseEnter={hoverEnter}
                onMouseLeave={hoverLeave}
              >
                🔍 Search Report (ASX code)

              </a>

              <a
                href="/categories"
                style={btnOrange}
                onMouseEnter={hoverEnter}
                onMouseLeave={hoverLeave}
              >
                📁 Browse Measured Categories
              </a>

              <a
                href="/macro"
                style={btnYellow}
                onMouseEnter={hoverEnter}
                onMouseLeave={hoverLeave}
              >
                📊 ASX Market Macro Snapshot
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
          {[
            {
              title: "Trend Behaviour",
              text: "Directional movement, slope quality, and trend stability across 52 weeks.",
            },
            {
              title: "Price Structure",
              text: "Weekly movement quality, volatility regimes, and liquidity conditions.",
            },
            {
              title: "Macro Alignment",
              text: "Macro‑micro consistency measured against ASX sector flows.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                flex: "1 1 300px",
                backgroundColor: "#102544",
                padding: "20px",
                borderRadius: "10px",
                border: "1px solid #1c3558",
              }}
            >
              <h3 style={{ color: "#fbdd59", marginBottom: "10px" }}>
                {item.title}
              </h3>
              <p style={{ color: "#c9de25", lineHeight: "1.6" }}>
                {item.text}
              </p>
            </div>
          ))}
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
          Category Leaders - Top 10 "Strong"
        </h2>

        <Top10Strong />

        <CategoryCountsText />

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
