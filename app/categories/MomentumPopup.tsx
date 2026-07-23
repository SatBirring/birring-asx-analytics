import styles from "./CategoriesPage.module.css";

export default function MomentumPopup({
  momentumFilter,
  setMomentumFilter,
  MOMENTUM_OPTIONS,
  close
}) {
  return (
    <div className={styles.popupContainer}>
      <h3 style={{ marginBottom: "10px" }}>Select Momentum</h3>

      <div className={styles.popupList}>
        {MOMENTUM_OPTIONS.map((m) => (
          <label key={m} style={{ display: "flex", gap: "10px", marginBottom: "8px" }}>
            <input
              type="checkbox"
              checked={momentumFilter.includes(m)}
              onChange={(e) => {
                if (e.target.checked) {
                  setMomentumFilter([...momentumFilter, m]);
                } else {
                  setMomentumFilter(momentumFilter.filter((x) => x !== m));
                }
              }}
            />
            {m}
          </label>
        ))}
      </div>

      <button
        onClick={close}
        style={{
          marginTop: "10px",
          padding: "8px 12px",
          borderRadius: "6px",
          backgroundColor: "#49d807",
          border: "none",
          cursor: "pointer",
        }}
      >
        Apply
      </button>
    </div>
  );
}
