"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SearchBar({
  onResult,
  prefill = "",
}: {
  onResult: (data: any[]) => void;
  prefill?: string;
}) {
  const [query, setQuery] = useState(prefill);
  const router = useRouter();

  async function handleSearch() {
    if (!query.trim()) return;

    const res = await fetch(`/api/stock?query=${query}`);
    const data = await res.json();

    const best = data.results && data.results.length > 0 ? [data.results[0]] : [];
    onResult(best);
  }

  function handleReset() {
    setQuery("");
    onResult([]);
  }

  function goHome() {
    router.push("/");
  }

  return (
    <div
      style={{
        marginBottom: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
      }}
    >
      <input
        type="text"
        placeholder="Search ASX stock (Code)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
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

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <button
          onClick={handleSearch}
          style={{
            padding: "10px 20px",
            fontSize: "24px",
            cursor: "pointer",
            backgroundColor: "#caff37",
            color: "blue",
            border: "none",
            borderRadius: "6px",
          }}
        >
          Search
        </button>

        {/* ⭐ CLEAR BUTTON RESTORED */}
        <button
          onClick={handleReset}
          style={{
            padding: "10px 20px",
            fontSize: "24px",
            cursor: "pointer",
            backgroundColor: "#ddd",
            border: "3px solid #ccc",
            borderRadius: "6px",
          }}
        >
          Clear

        </button>

        <button
          onClick={goHome}
          style={{
            padding: "10px 20px",
            fontSize: "24px",
            cursor: "pointer",
            backgroundColor: "#444",
            color: "white",
            border: "none",
            borderRadius: "6px",
          }}
        >
          Home
        </button>

        <Link href="/macro">
          <button
            style={{
              padding: "10px 20px",
              fontSize: "20px",
              cursor: "pointer",
              backgroundColor: "#ebf300",
              color: "blue",
              border: "none",
              borderRadius: "6px",
            }}
          >
            Market & Sector Data
          </button>
        </Link>

        <Link href="/categories">
          <button
            style={{
              padding: "10px 20px",
              fontSize: "20px",
              cursor: "pointer",
              backgroundColor: "#f79f23",
              color: "black",
              border: "none",
              borderRadius: "6px",
            }}
          >
            Stock Categories
          </button>
        </Link>
      </div>
    </div>
  );
}
