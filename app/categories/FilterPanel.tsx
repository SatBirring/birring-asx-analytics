import styles from "./CategoriesPage.module.css";

interface FilterPanelProps {
  selected: string;
  categoryCount: number;
  momentumFilter: string[];
  typeFilter: string[];
  setShowMomentumPopup: (v: boolean) => void;
  setShowTypePopup: (v: boolean) => void;
  loadCategory: (v: string) => void;
  router: any; // or NextRouter if you want strict typing
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
}) {
  return (
    <div className={styles.filterPanel}>
      <p className={styles.filterText}>
        Dropdown search for Stock Categories Momentum and type.
      </p>

      <select
        value={selected}
        onChange={(e) => loadCategory(e.target.value)}
        style={{
          padding: "12px 16px",
          fontSize: "18px",
          borderRadius: "6px",
          border: "none",
          width: "200px",
          backgroundColor: "rgb(64, 122, 180)",
          color: "rgb(255, 242, 3)",
        }}
      >
        <option value="">Select a category...</option>
        {["Extended", "Strong", "Positive", "Monitor", "Recheck", "Weak"].map((v) => (
          <option key={v} value={v}>{v}</option>
        ))}
      </select>

      <p style={{ color: "#30f998", fontSize: "18px" }}>
        Total in Category: {categoryCount}
      </p>

      <button
        onClick={() => setShowMomentumPopup(true)}
        style={{
          padding: "12px 16px",
          fontSize: "18px",
          borderRadius: "6px",
          width: "200px",
          backgroundColor: "rgb(125, 238, 20)",
          color: "rgb(12, 85, 241)",
          border: "none",
          cursor: "pointer",
        }}
      >
        Momentum {momentumFilter.length > 0 ? `(${momentumFilter.join(", ")})` : ""}
      </button>

      <button
        onClick={() => setShowTypePopup(true)}
        style={{
          padding: "12px 16px",
          fontSize: "18px",
          borderRadius: "6px",
          width: "150px",
          backgroundColor: "rgb(95, 51, 92)",
          color: "rgb(125, 238, 20)",
          border: "none",
          cursor: "pointer",
        }}
      >
        Type {typeFilter.length > 0 ? `(${typeFilter.join(", ")})` : ""}
      </button>

      <button
        onClick={() => router.push("/lookup")}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#444",
          color: "white",
          border: "none",
          borderRadius: "6px",
        }}
      >
        Stock Lookup
      </button>

      <button
        onClick={() => router.push("/macro")}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "6px",
        }}
      >
        Market & Sector Data
      </button>
    </div>
  );
}
