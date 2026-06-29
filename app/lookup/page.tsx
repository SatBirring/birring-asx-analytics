"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";

export default function LookupPage() {
  const [results, setResults] = useState<any[]>([]);

  // Helper: group columns into blocks of N
  const groupColumns = (obj: any, size: number) => {
    const entries = Object.entries(obj);
    const groups = [];

    for (let i = 0; i < entries.length; i += size) {
      groups.push(entries.slice(i, i + size));
    }

    return groups;
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>ASX Stock Lookup</h1>

      <SearchBar onResult={setResults} />

      {results.length === 0 && (
        <p style={{ marginTop: "20px" }}>No results yet. Try searching.</p>
      )}

      {results.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h2>Results</h2>

          {results.map((row, index) => {
            const groups = groupColumns(row, 10); // group size = 10

            return (
              <div key={index} style={{ marginBottom: "40px" }}>
                {groups.map((group, gIndex) => (
                  <div
                    key={gIndex}
                    style={{
                      padding: "20px",
                      border: "1px solid "#ddd",
                      borderRadius: "8px",
                      marginBottom: "20px",
                      background: "#fafafa",
                    }}
                  >
                    {group.map(([key, value]) => (
                      <div key={key} style={{ marginBottom: "6px" }}>
                        <strong>{key}:</strong> {String(value ?? "")}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}