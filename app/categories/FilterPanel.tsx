import styles from "./CategoriesPage.module.css";

// GLOBAL BUTTON SYSTEM
import {
  btnBlue,
  btnOrange,
  btnYellow,
  btnGreen,
  btnGrey,
  btnNavy,
  btnPink,
  btnLime,
  btnOrangeRed,
  btnRed,
  hoverEnter,
  hoverLeave
} from "@/components/ButtonStyles";

interface FilterPanelProps {
  selected: string;
  categoryCount: number;
  momentumFilter: string[];
  typeFilter: string[];
  setShowMomentumPopup: (v: boolean) => void;
  setShowTypePopup: (v: boolean) => void;
  loadCategory: (v: string) => void;
  router: any;
}

export default function FilterPanel({
  selected,
  categoryCount,
  momentumFilter,
  typeFilter,
  setShowMomentumPopup,
  setShowTypePopup,
  loadCategory,
  router
}: FilterPanelProps) {

  // ⭐ Category → Colour mapping
  const categoryColors: Record<string, any> = {
    Extended: btnPink,
    Strong: btnGreen,
    Positive: btnLime,
    Monitor: btnYellow,
    Recheck: btnOrangeRed,
    Weak: btnRed
  };

  const dropdownStyle = categoryColors[selected] || btnBlue;

  return (
    <div className={styles.filterPanel}>

      {/* ⭐ TOP TEXT */}
      <p
        style={{
          fontSize: "20px",
          color: "#9cebff",
          marginBottom: "20px",
          fontWeight: 600,
        }}
      >
        Dropdown search for Stock Categories Momentum and type.
      </p>

      {/* ⭐ CATEGORY SELECT — dynamic colour */}
      <select
        value={selected}
        onChange={(e) => loadCategory(e.target.value)}
        onMouseEnter={hoverEnter}
        onMouseLeave={hoverLeave}
        style={{
          ...dropdownStyle,
          padding: "12px 16px",
          fontSize: "18px",
          width: "240px",
          cursor: "pointer",
          borderRadius: "6px",
        }}
      >
        <option value="">Select a category...</option>
        {["Extended", "Strong", "Positive", "Monitor", "Recheck", "Weak"].map((v) => (
          <option key={v} value={v}>{v}</option>
        ))}
      </select>

      {/* CATEGORY COUNT */}
      <p style={{ color: "#30f998", fontSize: "18px", marginTop: "10px" }}>
        Total in Category: {categoryCount}
      </p>

      {/* ⭐ MOMENTUM BUTTON */}
      <button
        onClick={() => setShowMomentumPopup(true)}
        style={{ ...btnGreen, padding: "12px 16px", width: "240px", fontSize: "18px" }}
        onMouseEnter={hoverEnter}
        onMouseLeave={hoverLeave}
      >
        Momentum {momentumFilter.length > 0 ? `(${momentumFilter.join(", ")})` : ""}
      </button>

      {/* ⭐ TYPE BUTTON */}
      <button
        onClick={() => setShowTypePopup(true)}
        style={{ ...btnOrange, padding: "12px 16px", width: "200px", fontSize: "18px" }}
        onMouseEnter={hoverEnter}
        onMouseLeave={hoverLeave}
      >
        Type {typeFilter.length > 0 ? `(${typeFilter.join(", ")})` : ""}
      </button>

    </div>
  );
}
