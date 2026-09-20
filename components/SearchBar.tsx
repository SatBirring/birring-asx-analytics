"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ASX_CODES } from "@/data/asxCodes";

// IMPORT BUTTON SYSTEM
import {
  btnBlue,
  btnGrey,
  btnNavy,
  btnYellow,
  btnOrange,
  hoverEnter,
  hoverLeave,
  baseButton
} from "@/components/ButtonStyles";

export default function SearchBar({
  onResult,
  prefill = "",
}: {
  onResult: (data: any[]) => void;
  prefill?: string;
}) {
  const [query, setQuery] = useState(prefill);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value.toUpperCase();
    setQuery(input);

    if (!input) {
      setSuggestions([]);
      return;
    }

    const filtered = ASX_CODES.filter((code) =>
      code.startsWith(input)
    );

    setSuggestions(filtered.slice(0, 10));
  }

  function handleSelect(code: string) {
    setQuery(code);
    setSuggestions([]);
    router.push(`/${code}`);
  }

  async function handleSearch() {
    if (!query.trim()) return;

    const res = await fetch(`/api/stock?query=${encodeURIComponent(query.trim())}`);
    const data = await res.json();

    const results: Array<{ code?: string; Code?: string }> = Array.isArray(data.results)
      ? data.results
      : [];

    const q = query.trim().toUpperCase();

    const sorted = results.slice().sort((a: any, b: any) => {
      const aRaw = typeof a.code === "string" ? a.code : typeof a.Code === "string" ? a.Code : "";
      const bRaw = typeof b.code === "string" ? b.code : typeof b.Code === "string" ? b.Code : "";

      const aCode = aRaw.toUpperCase();
      const bCode = bRaw.toUpperCase();

      const aExact = aCode === q;
      const bExact = bCode === q;
      if (aExact !== bExact) return aExact ? -1 : 1;

      const aStarts = aCode.startsWith(q);
      const bStarts = bCode.startsWith(q);
      if (aStarts !== bStarts) return aStarts ? -1 : 1;

      return aCode.localeCompare(bCode);
    });

    onResult(sorted);
  }

  function handleReset() {
    setQuery("");
    setSuggestions([]);
    onResult([]);
  }

  function goHome() {
    router.push("/");
  }

  return (
    <div style={{ marginBottom: "20px", width: "100%", position: "relative" }}>
      <input
        type="text"
        placeholder="Search ASX stock (Code)"
        value={query}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
          if (e.key === "Escape") handleReset();
        }}
        style={{
          padding: "10px",
          width: "300px",
          fontSize: "16px",
          marginBottom: "10px",
          border: "3px solid #000000",
          borderRadius: "6px",
          outline: "none",
        }}
      />

      {/* Auto-suggest dropdown */}
      {suggestions.length > 0 && (
        <ul
          style={{
            position: "absolute",
            top: "48px",
            left: 0,
            width: "300px",
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "6px",
            listStyle: "none",
            margin: 0,
            padding: 0,
            zIndex: 10,
          }}
        >
          {suggestions.map((code) => (
            <li
              key={code}
              onClick={() => handleSelect(code)}
              style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
            >
              {code}
            </li>
          ))}
        </ul>
      )}

      {/* BUTTONS */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>

        {/* SEARCH BUTTON */}
        <button
          onClick={handleSearch}
          style={{ ...btnBlue, padding: "12px 26px", fontSize: "20px" }}
          onMouseEnter={hoverEnter}
          onMouseLeave={hoverLeave}
        >
          🔍 Search
        </button>

        {/* CLEAR BUTTON */}
        <button
          onClick={handleReset}
          style={{ ...btnGrey, padding: "12px 26px", fontSize: "20px" }}
          onMouseEnter={hoverEnter}
          onMouseLeave={hoverLeave}
        >
          Clear
        </button>

        {/* HOME BUTTON */}
        <button
          onClick={goHome}
          style={{ ...btnNavy, padding: "12px 26px", fontSize: "20px" }}
          onMouseEnter={hoverEnter}
          onMouseLeave={hoverLeave}
        >
          Home
        </button>

        {/* MACRO BUTTON */}
        <Link href="/macro">
          <button
            style={{ ...btnYellow, padding: "12px 26px", fontSize: "18px" }}
            onMouseEnter={hoverEnter}
            onMouseLeave={hoverLeave}
          >
            📊 Market & Sector Data
          </button>
        </Link>

        {/* CATEGORIES BUTTON */}
        <Link href="/categories">
          <button
            style={{ ...btnOrange, padding: "12px 26px", fontSize: "18px" }}
            onMouseEnter={hoverEnter}
            onMouseLeave={hoverLeave}
          >
            📁 Stock Categories
          </button>
        </Link>

      </div>
    </div>
  );
}
