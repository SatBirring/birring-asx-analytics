"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

import SearchBar from "@/components/SearchBar";
import StockInfoBlock from "@/components/blocks/StockInfoBlock";
import PriceProfileBlock from "@/components/blocks/PriceProfileBlock";
import PriceLimitsBlock from "@/components/blocks/PriceLimitsBlock";
import MainVerdictBlock from "@/components/blocks/MainVerdictBlock";
import SupportingIndicatorsBlock from "@/components/blocks/SupportingIndicatorsBlock";
import RiskBlock from "@/components/blocks/RiskBlock";
import MacroMicroBlock from "@/components/blocks/MacroMicroBlock";
import SecondarySupportSignalsBlock from "@/components/blocks/SecondarySupportSignalsBlock";

function LookupContent() {
  const [results, setResults] = useState<any[]>([]);
  const searchParams = useSearchParams();
  const autoCode = searchParams.get("code");

  useEffect(() => {
    async function autoSearch() {
      if (!autoCode) return;
      const res = await fetch(`/api/stock?query=${autoCode}`);
      const data = await res.json();
      const best =
        data.results && data.results.length > 0 ? [data.results[0]] : [];
      setResults(best);
    }
    autoSearch();
  }, [autoCode]);

  return (
    <>
      <SearchBar onResult={setResults} prefill={autoCode || ""} />

      {results.length === 0 && (
        <p style={{ marginTop: "20px" }}>No results yet. Try searching.</p>
      )}

      {results.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h2>Results</h2>

          {results.map((row, index) => (
            <div
              key={index}
              style={{
                marginTop: "20px",
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "20px",
                padding: "20px",
                alignItems: "start",
              }}
            >
              {/* FULL-WIDTH BLOCKS */}
              <div style={{ gridColumn: "1 / -1" }}>
                <StockInfoBlock row={row} />
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <MainVerdictBlock row={row} />
              </div>

              {/* STRICT 2-COLUMN BLOCKS */}
              <div style={{ maxWidth: "700px", width: "100%" }}>
                <PriceProfileBlock row={row} />
              </div>
              
              <div style={{ maxWidth: "600px", width: "100%" }}>
                <SupportingIndicatorsBlock row={row} />
              </div>

              <div style={{ maxWidth: "500px", width: "100%" }}>
                <PriceLimitsBlock row={row} />
              </div>

              

              <div style={{ maxWidth: "500px", width: "100%" }}>
                <SecondarySupportSignalsBlock row={row} />
              </div>

              <div style={{ maxWidth: "600px", width: "100%" }}>
                <RiskBlock row={row} />
              </div>

              <div style={{ maxWidth: "600px", width: "100%" }}>
                <MacroMicroBlock row={row} />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default function DynamicLookup() {
  return (
    <Suspense fallback={<p>Loading search...</p>}>
      <LookupContent />
    </Suspense>
  );
}

