"use client";

import HeroBlock from "@/components/HeroBlock";
import DynamicLookup from "@/components/DynamicLookup";

export default function LookupPage() {
  return (
    <div style={{ fontFamily: "Arial" }}>
      <HeroBlock />

      <div style={{ padding: "60px" }}>
        <h1> Type ASX Stock Code to Search</h1>

        <DynamicLookup />
      
      </div>
    </div>
  );
}