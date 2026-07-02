"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import SearchBar from "@/components/SearchBar";
import HeroBlock from "@/components/HeroBlock";

import StockInfoBlock from "@/components/blocks/StockInfoBlock";
import PriceProfileBlock from "@/components/blocks/PriceProfileBlock";
import PriceLimitsBlock from "@/components/blocks/PriceLimitsBlock";
import MainVerdictBlock from "@/components/blocks/MainVerdictBlock";
import SupportingIndicatorsBlock from "@/components/blocks/SupportingIndicatorsBlock";
import RiskBlock from "@/components/blocks/RiskBlock";
import MacroMicroBlock from "@/components/blocks/MacroMicroBlock";
import SecondarySupportSignalsBlock from "@/components/blocks/SecondarySupportSignalsBlock";

export default function LookupPage() {
  const [results, setResults] = useState<any[]>([]);
  const searchParams = useSearchParams();
  const autoCode = searchParams.get("code");

  // ⭐ Auto-search when coming from Categories page
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
    <div style={{ fontFamily: "Arial" }}>
      <HeroBlock />

      <div style={{ padding: "40px" }}>
        <h1>ASX Stock Lookup</h1>

        {/* ⭐ SearchBar with auto-filled code */}
        <div style={{ width: "100%", overflow: "visible" }}>
          <SearchBar onResult={setResults} prefill={autoCode || ""} />
        </div>

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
      </div>
    </div>
  );
}
