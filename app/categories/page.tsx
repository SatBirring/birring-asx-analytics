"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const VERDICTS = ["Extended", "Strong", "Positive", "Monitor", "Recheck", "Weak"];
const MOMENTUM_OPTIONS = ["Peak", "Soaring", "Rising", "Climbing", "Stable", "Fading", "Drop phase"];
const TYPE_OPTIONS = ["Bond", "CDI", "EFT", "Option", "Ordinary", "Other"];

export default function CategoriesPage() {
  const [selected, setSelected] = useState<string>("");
  const [momentumFilter, setMomentumFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [stocks, setStocks] = useState<
    { code: string; name: string; momentum?: string; type?: string }[]
  >([]);
  const router = useRouter();

  async function loadCategory(verdict: string) {
    setSelected(verdict);

    const res = await fetch(`/api/category?verdict=${encodeURIComponent(verdict)}`);
    const data = await res.json();

    setStocks(data.results || []);
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

  // Default load on mount
  useEffect(() => {
    loadCategory("Strong"); // preload one category so page isn’t empty
  }, []);

  // Filtering logic
  function filterStocks(list: typeof stocks) {
    let filtered = [...list];

    if (momentumFilter) {
      filtered = filtered.filter((s) => s.momentum === momentumFilter);
    }

    if (typeFilter) {
      filtered = filtered.filter((s) => s.type === typeFilter);
    }

    return filtered;
  }

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#0b1e39",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Arial",
      }}
    >
      {/* HERO BLOCK */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "40px",
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: "#102544",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            marginBottom: "10px",
            background: "linear-gradient(90deg, #e4f71d, #4db8ff, #9cc9ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 700,
          }}
        >
          ASX Behavioural Categories
        </h1>

        <p
          style={{
            fontSize: "24px",
            color: "#30f998",
            maxWidth: "800px",
            margin: "0 auto 30px auto",
            lineHeight: "1.6",
          }}
        >
          The FINAL VERDICT Signals are derived from multi‑angle analytics that measure trend behaviour, market conditions, and the structural health of each stock. Together, these Final Signals classify how ASX stocks are behaving right now — consistently, neutrally, and without subjective interpretation.
        </p>

        {/* ICON ROW */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "25px",
            marginTop: "20px",
          }}
        >
          {VERDICTS.map((label) => (
            <div
              key={label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: "#e7eaef",
                fontSize: "14px",
              }}
            >
              <Image
                src={`/${label}.png`}
                alt={label}
                width={60}
                height={60}
                style={{ borderRadius: "8px" }}
              />
              <span style={{ marginTop: "8px" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CONTROLS */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        {/* Category Dropdown */}
        <select
          value={selected}
          onChange={(e) => loadCategory(e.target.value)}
          style={{
            padding: "12px 16px",
            fontSize: "18px",
            borderRadius: "6px",
            border: "none",
            width: "260px",
            backgroundColor: "#123",
            color: "white",
          }}
        >
          <option value="">Select a category...</option>
          {VERDICTS.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>

        {/* Momentum Filter */}
        <select
          value={momentumFilter}
          onChange={(e) => setMomentumFilter(e.target.value)}
          style={{
            padding: "12px 16px",
            fontSize: "18px",
            borderRadius: "6px",
            border: "none",
            width: "260px",
            backgroundColor: "#123",
            color: "white",
          }}
        >
          <option value="">Filter by Momentum...</option>
          {MOMENTUM_OPTIONS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        {/* Type Filter */}
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          style={{
            padding: "12px 16px",
            fontSize: "18px",
            borderRadius: "6px",
            border: "none",
            width: "260px",
            backgroundColor: "#123",
            color: "white",
          }}
        >
          <option value="">Filter by Type...</option>
          {TYPE_OPTIONS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        {/* Back Button */}
        <button
          onClick={goBack}
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
          ← Back to Lookup
        </button>

        {/* Macro Button */}
        <button
          onClick={goMacro}
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
          Macro & Sector Data →
        </button>
      </div>

      {/* RESULTS */}
      <div style={{ marginTop: "10px" }}>
        {stocks.length === 0 && selected && <p>No stocks found for {selected}.</p>}

        {filterStocks(stocks).map((s) => (
          <div
            key={s.code}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "20px",
              padding: "10px 12px",
              borderBottom: "1px solid #345",
              cursor: "pointer",
            }}
            onClick={() => goToLookup(s.code)}
          >
            <span style={{ fontWeight: 600, width: "80px" }}>{s.code}</span>
            <span style={{ flexGrow: 1 }}>{s.name}</span>
            <span style={{ width: "120px", color: "#30f998" }}>{s.momentum}</span>
            <span style={{ width: "120px", color: "#9cc9ff" }}>{s.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
