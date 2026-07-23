import styles from "./CategoriesPage.module.css";

interface TypePopupProps {
  typeFilter: string[];
  setTypeFilter: (v: string[]) => void;
  TYPE_OPTIONS: string[];
  close: () => void;
}

export default function TypePopup({
  typeFilter,
  setTypeFilter,
  TYPE_OPTIONS,
  close
}: TypePopupProps) {
  return (
    <div className={styles.popupContainer}>
      <h3 style={{ marginBottom: "10px" }}>Select Type</h3>

      <div className={styles.popupList}>
        {TYPE_OPTIONS.map((t) => (
          <label key={t} style={{ display: "flex", gap: "10px", marginBottom: "8px" }}>
            <input
              type="checkbox"
              checked={typeFilter.includes(t)}
              onChange={(e) => {
                if (e.target.checked) {
                  setTypeFilter([...typeFilter, t]);
                } else {
                  setTypeFilter(typeFilter.filter((x) => x !== t));
                }
              }}
            />
            {t}
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
