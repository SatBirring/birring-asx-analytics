"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const VERDICTS = [
  "Extended",
  "Strong",
  "Positive",
  "Monitor",
  "Recheck",
  "Weak",
];

export default function CategoriesPage() {
  const [selected, setSelected] = useState<string>("");
  const [stocks, setStocks] = useState<{ code: string; name: string }[]>([]);
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

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>Stock Categories by Final Verdict</h1>

      {/* Dropdown */}
      <select
        value={selected}
        onChange={(e) => loadCategory(e.target.value)}
        style={{
          padding: "8px",
          fontSize: "16px",
          marginBottom: "20px",
          width: "250px",
        }}
      >
        <option value="">Select a category...</option>
        {VERDICTS.map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>

      {/* Back Button BELOW dropdown */}
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
          marginBottom: "25px",
        }}
      >
        ← Back to Lookup
      </button>

      {/* Results */}
      <div style={{ marginTop: "10px" }}>
        {stocks.length === 0 && selected && (
          <p>No stocks found for {selected}.</p>
        )}

        {stocks.map((s) => (
          <div
            key={s.code}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "20px",
              padding: "10px 12px",
              borderBottom: "1px solid #eee",
              cursor: "pointer",
            }}
            onClick={() => goToLookup(s.code)}
          >
            <span style={{ fontWeight: 600, width: "80px" }}>{s.code}</span>
            <span style={{ flexGrow: 1 }}>{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
