"use client";

import HeroBlock from "@/components/HeroBlock";
import DynamicLookup from "@/components/DynamicLookup";

export default function LookupPage() {
  return (
    <div style={{ fontFamily: "Arial" }}>
      <HeroBlock />

      <div style={{ padding: "40px" }}>
        <h1>ASX Stock Lookup</h1>

        <DynamicLookup />
      </div>
    </div>
  );
}