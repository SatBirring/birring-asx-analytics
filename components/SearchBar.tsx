 "use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SearchBar({ onResult }: { onResult: (data: any[]) => void }) {
  const [query, setQuery] = useState("");
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
        placeholder="Search ASX stock (code or name)"
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
          border: "1px solid #ccc",
          borderRadius: "6px",
          outline: "none",
        }}
      />

      {/* ⭐ WRAPPING BUTTON CONTAINER */}
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
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "6px",
          }}
        >
          Search
        </button>

        <button
          onClick={handleReset}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#ddd",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        >
          Reset
        </button>

        <button
          onClick={goHome}
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
          Home
        </button>

        <Link href="/macro">
          <button
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
            Macro & Sector Data
          </button>
        </Link>

        {/* ⭐ CATEGORY BUTTON — NOW VISIBLE */}
        <Link href="/categories">
          <button
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
            Category View
          </button>
        </Link>
      </div>
    </div>
  );
}