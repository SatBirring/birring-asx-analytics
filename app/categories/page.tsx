"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./CategoriesPage.module.css";

import CategoryHeader from "./CategoryHeader";
import FilterPanel from "./FilterPanel";
import MomentumPopup from "./MomentumPopup";
import TypePopup from "./TypePopup";
import StockList from "./StockList";

// GLOBAL BUTTON SYSTEM
import {
  btnBlue,
  btnYellow,
  btnNavy,
  hoverEnter,
  hoverLeave
} from "@/components/ButtonStyles";

const VERDICTS = ["Extended", "Strong", "Positive", "Monitor", "Recheck", "Weak"];
const MOMENTUM_OPTIONS = ["Peak", "Soaring", "Rising", "Climbing", "Stable", "Fading", "Drop phase"];
const TYPE_OPTIONS = ["Bond", "CDI", "ETF", "Option", "Ordinary", "Other"];

function CategoriesPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const verdictFromURL = searchParams.get("verdict") || "Positive";
  const [selected, setSelected] = useState(verdictFromURL);

  const [stocks, setStocks] = useState<any[]>([]);
  const [categoryCount, setCategoryCount] = useState(0);

  const [momentumFilter, setMomentumFilter] = useState<string[]>([]);
  const [typeFilter, setTypeFilter] = useState<string[]>([]);

  const [showMomentumPopup, setShowMomentumPopup] = useState(false);
  const [showTypePopup, setShowTypePopup] = useState(false);

  async function loadCategory(verdict: string) {
    setSelected(verdict);

    const res = await fetch(`/api/category?verdict=${encodeURIComponent(verdict)}`);
    const data = await res.json();

    setStocks(data.results || []);
    setCategoryCount(data.results?.length || 0);
  }

  useEffect(() => {
    loadCategory(verdictFromURL);
  }, [verdictFromURL]);

  function filterStocks(list: any[]) {
    let filtered = [...list];

    if (momentumFilter.length > 0) {
      filtered = filtered.filter((s) => momentumFilter.includes(s.momentum));
    }

    if (typeFilter.length > 0) {
      filtered = filtered.filter((s) => typeFilter.includes(s.type));
    }

    return filtered;
  }

  return (
    <div className={styles.page}>

      {/* HEADER */}
      <CategoryHeader
      selected={selected}
      VERDICTS={VERDICTS}
      loadCategory={loadCategory}
      />

      {/* ⭐ TOP NAVIGATION BUTTONS */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => router.push("/")}
          style={{ ...btnNavy, padding: "12px 24px", fontSize: "18px" }}
          onMouseEnter={hoverEnter}
          onMouseLeave={hoverLeave}
        >
          🏠 Home
        </button>

        <button
          onClick={() => router.push("/lookup")}
          style={{ ...btnBlue, padding: "12px 24px", fontSize: "18px" }}
          onMouseEnter={hoverEnter}
          onMouseLeave={hoverLeave}
        >
          🔍 Stock Lookup
        </button>

        <button
          onClick={() => router.push("/macro")}
          style={{ ...btnYellow, padding: "12px 24px", fontSize: "18px" }}
          onMouseEnter={hoverEnter}
          onMouseLeave={hoverLeave}
        >
          📊 Market & Sector Data
        </button>
      </div>

      
      {/* FILTER PANEL */}
      <FilterPanel
        selected={selected}
        categoryCount={categoryCount}
        momentumFilter={momentumFilter}
        typeFilter={typeFilter}
        setShowMomentumPopup={setShowMomentumPopup}
        setShowTypePopup={setShowTypePopup}
        loadCategory={loadCategory}
        router={router}
      />

      {/* POPUPS */}
      {showMomentumPopup && (
        <MomentumPopup
          momentumFilter={momentumFilter}
          setMomentumFilter={setMomentumFilter}
          MOMENTUM_OPTIONS={MOMENTUM_OPTIONS}
          close={() => setShowMomentumPopup(false)}
        />
      )}

      {showTypePopup && (
        <TypePopup
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          TYPE_OPTIONS={TYPE_OPTIONS}
          close={() => setShowTypePopup(false)}
        />
      )}

      {/* STOCK LIST */}
      <StockList
        stocks={filterStocks(stocks)}
        goToLookup={(code) => router.push(`/lookup?code=${code}`)}
      />

      {/* ⭐ BOTTOM NAVIGATION BUTTONS */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          marginTop: "30px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => router.push("/")}
          style={{ ...btnNavy, padding: "12px 24px", fontSize: "18px" }}
          onMouseEnter={hoverEnter}
          onMouseLeave={hoverLeave}
        >
          🏠 Home
        </button>

        <button
          onClick={() => router.push("/lookup")}
          style={{ ...btnBlue, padding: "12px 24px", fontSize: "18px" }}
          onMouseEnter={hoverEnter}
          onMouseLeave={hoverLeave}
        >
          🔍 Stock Lookup
        </button>

        <button
          onClick={() => router.push("/macro")}
          style={{ ...btnYellow, padding: "12px 24px", fontSize: "18px" }}
          onMouseEnter={hoverEnter}
          onMouseLeave={hoverLeave}
        >
          📊 Market & Sector Data
        </button>
      </div>
    </div>
  );
}

export default function CategoriesPage() {
  return (
    <Suspense fallback={<div style={{ color: "#fff", padding: "20px" }}>Loading…</div>}>
      <CategoriesPageInner />
    </Suspense>
  );
}
