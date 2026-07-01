"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import HeroBlock from "@/components/HeroBlock";

// NEW BLOCK IMPORTS
import StockInfoBlock from "@/components/blocks/StockInfoBlock";
import PriceProfileBlock from "@/components/blocks/PriceProfileBlock";
// The rest will be added as we build them:
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
      {/* Hero Section */}
      <HeroBlock />

      {/* Main Content */}
      <div style={{ padding: "40px" }}>
        <h1>ASX Stock Lookup</h1>

        <SearchBar onResult={setResults} />

        {results.length === 0 && (
          <p style={{ marginTop: "20px" }}>No results yet. Try searching.</p>
        )}

        {results.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <h2>Results</h2>

            {results.map((row, index) => (
              <div key={index} style={{ marginBottom: "40px" }}>
                
                {/* BLOCK 1 — Stock Info */}
                <StockInfoBlock row={row} />

                {/* BLOCK 2 — Price Profile */}
                <PriceProfileBlock row={row} />

                {/* BLOCK 3 — Price Limits (coming next) */}
                <PriceLimitsBlock row={row} />

                {/* BLOCK 4 — Main Verdict */}
                <MainVerdictBlock row={row} /> 

                {/* BLOCK 5 — Supporting Indicators */}
                <SupportingIndicatorsBlock row={row} />

                {/* BLOCK 6 — Risk */}
                <RiskBlock row={row} />

                {/* BLOCK 7 — Macro/Micro */}
                <MacroMicroBlock row={row} />

                {/* BLOCK 8 — Secondary Support Signals */}
                <SecondarySupportSignalsBlock row={row} /> 

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}