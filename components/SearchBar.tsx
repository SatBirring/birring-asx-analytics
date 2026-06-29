"use client";

import { useState } from "react";

export default function SearchBar({ onResult }: { onResult: (data: any[]) => void }) {
  const [query, setQuery] = useState("");

  async function handleSearch() {
    if (!query.trim()) return;

    const res = await fetch(`/api/stock?query=${query}`);
    const data = await res.json();

    onResult(data.results || []);
  }

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Search ASX stock (code or name)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          fontSize: "16px",
          marginRight: "10px",
        }}
      />
      <button
        onClick={handleSearch}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Search
      </button>
    </div>
  );
}
