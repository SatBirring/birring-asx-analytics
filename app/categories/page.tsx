"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const VERDICTS = ["Extended", "Strong", "Positive", "Monitor", "Recheck", "Weak"];
const MOMENTUM_OPTIONS = ["Peak", "Soaring", "Rising", "Climbing", "Stable", "Fading", "Drop phase"];
const TYPE_OPTIONS = ["Bond", "CDI", "ETF", "Option", "Ordinary", "Other"];

export default function CategoriesPage() {
  const [selected, setSelected] = useState<string>("Extended");

  // ⭐ Multi-select arrays
  const [momentumFilter, setMomentumFilter] = useState<string[]>([]);
  const [typeFilter, setTypeFilter] = useState<string[]>([]);

  // ⭐ Popup visibility
  const [showMomentumPopup, setShowMomentumPopup] = useState(false);
  const [showTypePopup, setShowTypePopup] = useState(false);

  const [stocks, setStocks] = useState<any[]>([]);
  const [hoveredStock, setHoveredStock] = useState<any>(null);

  const router = useRouter();

  async function loadCategory(verdict: string) {
    setSelected(verdict);
    const res = await fetch(`/api/category?verdict=${encodeURIComponent(verdict)}`);
    const data = await res.json();
    setStocks(data.results || []);
  }

  useEffect(() => {
    loadCategory("Extended");
  }, []);

  // ⭐ Updated filter logic
  function filterStocks(list: any[]) {
    let filtered = [...list];

    if (momentumFilter.length > 0) {
      filtered = filtered.filter((s) => momentumFilter.includes(s.momentum));
    }

    if (typeFilter.length > 0) {
      filtered = filtered.filter((s) => typeFilter.includes(s.type));
    }

    return filtered;
  }

  function goToLookup(code: string) {
    router.push(`/lookup?code=${code}`);
  }

  function goBack() {
    router.push("/lookup");
  }

  function goMacro() {
    router.push("/macro");
  }

  return (
    <div style={{ padding: "20px", backgroundColor: "#0b1e39", minHeight: "100vh", color: "white", fontFamily: "Arial" }}>
      
      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "40px", padding: "20px", borderRadius: "10px", backgroundColor: "#102544" }}>
        <h1 style={{ fontSize: "42px", marginBottom: "10px", background: "linear-gradient(90deg, #e4f71d, #4db8ff, #9cc9ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 700 }}>
          ASX Behavioural Categories
        </h1>
        <p style={{ fontSize: "24px", color: "#30f998", maxWidth: "800px", margin: "0 auto 30px auto", lineHeight: "1.6" }}>
          The FINAL VERDICT Signals are derived from multi‑angle analytics.
        </p>

        {/* CATEGORY ICONS */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "25px", marginTop: "20px" }}>
          {VERDICTS.map((label) => (
            <div
              key={label}
              onClick={() => loadCategory(label)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: "#e7eaef",
                fontSize: "14px",
                cursor: "pointer",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              <Image src={`/${label}.png`} alt={label} width={60} height={60} style={{ borderRadius: "8px" }} />
              <span style={{ marginTop: "8px" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FILTER PANEL */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <p style={{ fontSize: "20px", color: "#30f998", maxWidth: "800px", margin: "0 auto 20px auto", lineHeight: "1.6" }}>
          Dropdown search for Stock Categories Momentum and type.
        </p>

        {/* CATEGORY DROPDOWN (unchanged) */}
        <select
          value={selected}
          onChange={(e) => loadCategory(e.target.value)}
          style={{
            padding: "12px 16px",
            fontSize: "18px",
            borderRadius: "6px",
            border: "none",
            width: "260px",
            backgroundColor: "rgb(64, 122, 180)",
            color: "rgb(255, 242, 3)",
          }}
        >
          <option value="">Select a category...</option>
          {VERDICTS.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>

        {/* ⭐ MOMENTUM BUTTON */}
        <button
          onClick={() => setShowMomentumPopup(true)}
          style={{
            padding: "12px 16px",
            fontSize: "18px",
            borderRadius: "6px",
            width: "260px",
            backgroundColor: "rgb(125, 238, 20)",
            color: "rgb(12, 85, 241)",
            border: "none",
            cursor: "pointer",
          }}
        >
          Momentum {momentumFilter.length > 0 ? `(${momentumFilter.join(", ")})` : ""}
        </button>

        {/* ⭐ TYPE BUTTON */}
        <button
          onClick={() => setShowTypePopup(true)}
          style={{
            padding: "12px 16px",
            fontSize: "18px",
            borderRadius: "6px",
            width: "260px",
            backgroundColor: "rgb(95, 51, 92)",
            color: "rgb(125, 238, 20)",
            border: "none",
            cursor: "pointer",
          }}
        >
          Type {typeFilter.length > 0 ? `(${typeFilter.join(", ")})` : ""}
        </button>

        <button
          onClick={goBack}
          style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer", backgroundColor: "#444", color: "white", border: "none", borderRadius: "6px" }}
        >
          Stock Lookup
        </button>

        <button
          onClick={goMacro}
          style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer", backgroundColor: "#0070f3", color: "white", border: "none", borderRadius: "6px" }}
        >
          Market & Sector Data
        </button>
      </div>

      {/* ⭐ MOMENTUM POPUP */}
      {showMomentumPopup && (
        <div style={{
          position: "fixed",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#102544",
          padding: "20px",
          borderRadius: "10px",
          width: "300px",
          zIndex: 1000,
          border: "1px solid #345",
        }}>
          <h3 style={{ marginBottom: "10px" }}>Select Momentum</h3>

          <div style={{ maxHeight: "200px", overflowY: "auto" }}>
            {MOMENTUM_OPTIONS.map((m) => (
              <label key={m} style={{ display: "flex", gap: "10px", marginBottom: "8px" }}>
                <input
                  type="checkbox"
                  checked={momentumFilter.includes(m)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setMomentumFilter([...momentumFilter, m]);
                    } else {
                      setMomentumFilter(momentumFilter.filter((x) => x !== m));
                    }
                  }}
                />
                {m}
              </label>
            ))}
          </div>

          <button
            onClick={() => setShowMomentumPopup(false)}
            style={{ marginTop: "10px", padding: "8px 12px", borderRadius: "6px", backgroundColor: "#49d807", border: "none", cursor: "pointer" }}
          >
            Apply
          </button>
        </div>
      )}

      {/* ⭐ TYPE POPUP */}
      {showTypePopup && (
        <div style={{
          position: "fixed",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#102544",
          padding: "20px",
          borderRadius: "10px",
          width: "300px",
          zIndex: 1000,
          border: "1px solid #345",
        }}>
          <h3 style={{ marginBottom: "10px" }}>Select Type</h3>

          <div style={{ maxHeight: "200px", overflowY: "auto" }}>
            {TYPE_OPTIONS.map((t) => (
              <label key={t} style={{ display: "flex", gap: "10px", marginBottom: "8px" }}>
                <input
                  type="checkbox"
                  checked={typeFilter.includes(t)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setTypeFilter([...typeFilter, t]);
                    } else {
                      setTypeFilter(typeFilter.filter((x) => x !== t));
                    }
                  }}
                />
                {t}
              </label>
            ))}
          </div>

          <button
            onClick={() => setShowTypePopup(false)}
            style={{ marginTop: "10px", padding: "8px 12px", borderRadius: "6px", backgroundColor: "#49d807", border: "none", cursor: "pointer" }}
          >
            Apply
          </button>
        </div>
      )}

      {/* STOCK LIST */}
      <div style={{ marginTop: "10px" }}>
        {stocks.length === 0 && selected && <p>No stocks found for {selected}.</p>}

        {filterStocks(stocks).map((s) => (
          <div
            key={s.code}
            style={{ display: "flex", flexDirection: "column", borderBottom: "1px solid #345", padding: "10px 12px", cursor: "pointer" }}
            onMouseEnter={() => setHoveredStock(s)}
            onMouseLeave={() => setHoveredStock(null)}
            onClick={(e) => {
              if (e.ctrlKey) {
                window.open(`/lookup?code=${s.code}`, "_blank");
                return;
              }
              goToLookup(s.code);
            }}
          >
            <div style={{ display: "flex", flexDirection: "row", gap: "20px", alignItems: "center" }}>
              <span style={{ fontWeight: 600, width: "80px" }}>{s.code}</span>
              <span style={{ flexGrow: 1 }}>{s.name}</span>
              <span style={{ width: "120px", color: "#30f998" }}>{s.momentum}</span>
              <span style={{ width: "120px", color: "#9cc9ff" }}>{s.type}</span>

              {/* ℹ️ INFO ICON */}
              <span
                style={{
                  fontSize: "20px",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  backgroundColor: "#1a2b4d",
                  color: "#9cc9ff",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setHoveredStock(null);
                  setTimeout(() => setHoveredStock(s), 0);
                }}
              >
                ℹ️
              </span>

              {/* ⧉ OPEN IN NEW TAB */}
              <span
                style={{
                  fontSize: "20px",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  backgroundColor: "#1a2b4d",
                  color: "#49d807",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(`/lookup?code=${s.code}`, "_blank");
                }}
              >
                ⧉
              </span>
            </div>

            {hoveredStock?.code === s.code && (
              <div className="popup-card">
                <h3 style={{ marginBottom: "6px" }}>{s.code}</h3>
                <p style={{ margin: "4px 0" }}>Price Friday Close: {s.price || "N/A"}</p>
                <p style={{ margin: "4px 0" }}>Sector: {s.sector || "N/A"}</p>
                <p style={{ margin: "4px 0" }}>Trend Category: {s.trendCategory || "N/A"}</p>
                <p style={{ margin: "4px 0" }}>Overall Risk Class: {s.riskClass || "N/A"}</p>
                <p style={{ margin: "4px 0" }}>RSI (14): {s.rsi || "N/A"}</p>
                <p style={{ margin: "4px 0" }}>Liquidity Category: {s.liquidityCategory || "N/A"}</p>
                <p style={{ marginTop: "10px", fontSize: "20px", color: "#49d807" }}>Click for details</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        .popup-card {
          background: #030851;
          border: 1px solid #345;
          border-radius: 10px;
          padding: 12px;
          margin-top: 10px;
          width: 25%;
          color: yellow;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
