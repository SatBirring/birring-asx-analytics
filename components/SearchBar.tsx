"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar({ onResult }: { onResult: (data: any[]) => void }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  async function handleSearch() {
    if (!query.trim()) return;

    const res = await fetch(`/api/stock?query=${query}`);
    const data = await res.json();

    // Return only the single best match (first row)
    const best = data.results && data.results.length > 0 ? [data.results[0]] : [];
    onResult(best);
  }

  function handleReset() {
    setQuery("");
    onResult([]); // clear results
  }

  function goHome() {
    router.push("/"); // navigate to main page
  }

  return (
    <div style={{ marginBottom: "20px" }}>
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
          marginRight: "10px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          outline: "none",
        }}
      />

      <button
        onClick={handleSearch}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          marginRight: "10px",
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
          marginRight: "10px",
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
    </div>
  );
}