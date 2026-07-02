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

  // Dynamic block wrapper style
  const blockStyle = {
    flex: "1 1 350px",   // minimum width → ensures max 2 per row
    width: "100%",
  };

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
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                padding: "20px",
                justifyContent: "center",
              }}
            >
              {/* FULL-WIDTH BLOCKS */}
              <div style={{ width: "100%" }}>
                <StockInfoBlock row={row} />
              </div>

              <div style={{ width: "100%" }}>
                <MainVerdictBlock row={row} />
              </div>

              {/* DYNAMIC 2-COLUMN BLOCKS */}
              <div style={{ ...blockStyle, maxWidth: "600px" }}>
                <PriceProfileBlock row={row} />
              </div>
              
              <div style={{ ...blockStyle, maxWidth: "600px" }}>
                <SupportingIndicatorsBlock row={row} />
              </div>

              <div style={{ ...blockStyle, maxWidth: "500px" }}>
                <PriceLimitsBlock row={row} />
              </div>
              
              <div style={{ ...blockStyle, maxWidth: "600px" }}>
                <RiskBlock row={row} />
              </div>

              <div style={{ ...blockStyle, maxWidth: "600px" }}>
                <MacroMicroBlock row={row} />
              </div>
              
              <div style={{ ...blockStyle, maxWidth: "500px" }}>
                <SecondarySupportSignalsBlock row={row} />
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
