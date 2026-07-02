"use client";

import { useState, useEffect } from "react";
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

export default function DynamicLookup() {
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
            <div key={index} style={{ marginBottom: "40px" }}>
              <StockInfoBlock row={row} />
              <PriceProfileBlock row={row} />
              <PriceLimitsBlock row={row} />
              <MainVerdictBlock row={row} />
              <SupportingIndicatorsBlock row={row} />
              <RiskBlock row={row} />
              <MacroMicroBlock row={row} />
              <SecondarySupportSignalsBlock row={row} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
