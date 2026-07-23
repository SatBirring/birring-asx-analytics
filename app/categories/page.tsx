"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./CategoriesPage.module.css";

import CategoryHeader from "./CategoryHeader";
import FilterPanel from "./FilterPanel";
import MomentumPopup from "./MomentumPopup";
import TypePopup from "./TypePopup";
import StockList from "./StockList";

const VERDICTS = ["Extended", "Strong", "Positive", "Monitor", "Recheck", "Weak"];
const MOMENTUM_OPTIONS = ["Peak", "Soaring", "Rising", "Climbing", "Stable", "Fading", "Drop phase"];
const TYPE_OPTIONS = ["Bond", "CDI", "ETF", "Option", "Ordinary", "Other"];

export default function CategoriesPage() {
  const router = useRouter();

  const [selected, setSelected] = useState("Extended");
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
    loadCategory("Extended");
  }, []);

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
      <CategoryHeader
        selected={selected}
        VERDICTS={VERDICTS}
        loadCategory={loadCategory}
      />

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

      <StockList
        stocks={filterStocks(stocks)}
        goToLookup={(code) => router.push(`/lookup?code=${code}`)}
      />
    </div>
  );
}
