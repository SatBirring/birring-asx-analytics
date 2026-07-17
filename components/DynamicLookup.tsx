"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

import styles from "./LookupGrid.module.css";

import SearchBar from "@/components/SearchBar";
import StockInfoBlock from "@/components/blocks/StockInfoBlock";
import PriceProfileBlock from "@/components/blocks/PriceProfileBlock";
import PriceLimitsBlock from "@/components/blocks/PriceLimitsBlock";
import MainVerdictBlock from "@/components/blocks/MainVerdictBlock";
import SupportingIndicatorsBlock from "@/components/blocks/SupportingIndicatorsBlock";
import RiskBlock from "@/components/blocks/RiskBlock";
import MacroMicroBlock from "@/components/blocks/MacroMicroBlock";
import SecondarySupportSignalsBlock from "@/components/blocks/SecondarySupportSignalsBlock";
import DelayedLivePrice from "@/components/blocks/DelayedLivePrice";

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
            <div key={index} className={styles.grid}>
              
              {/* FULL WIDTH */}
              <div className={styles.fullWidth}>
                <StockInfoBlock row={row} />
              </div>

              <div className={styles.fullWidth}>
                <MainVerdictBlock row={row} />
              </div>

              {/* FIRST PAIR */}
              <div className={styles.block550}>
                <PriceProfileBlock row={row} />
              </div>

              <div className={styles.block550}>
                <SupportingIndicatorsBlock row={row} />
              </div>
              

              {/* AUTO-FIT REMAINING */}
              <div className={styles.block500}>
                <PriceLimitsBlock row={row} />
              </div>
              

              <div className={styles.block500}>
                <SecondarySupportSignalsBlock row={row} />
              </div>

              <div className={styles.block550}>
                <RiskBlock row={row} />
              </div>

              <div className={styles.block550}>
                <MacroMicroBlock row={row} />
              </div> 
              
              <div className={styles.block500}>
              {<DelayedLivePrice code={row["Code"]} /> }
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
