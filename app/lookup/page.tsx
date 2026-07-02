"use client";

import { useState } from "react";

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

  return (
    <div style={{ fontFamily: "Arial" }}>
      <HeroBlock />

      <div style={{ padding: "40px" }}>
        <h1>ASX Stock Lookup</h1>

        <div style={{ width: "100%", overflow: "visible" }}>
          <SearchBar onResult={setResults} />
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
