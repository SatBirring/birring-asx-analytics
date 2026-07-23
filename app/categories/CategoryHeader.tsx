import Image from "next/image";
import styles from "./CategoriesPage.module.css";

interface CategoryHeaderProps {
  selected: string;
  VERDICTS: string[];
  loadCategory: (v: string) => void;
}

export default function CategoryHeader({
  selected,
  VERDICTS,
  loadCategory
}: CategoryHeaderProps) {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>ASX Behavioural Categories</h1>

      <p className={styles.subtitle}>
        The FINAL VERDICT Signals are derived from multi‑angle analytics.
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "25px",
          marginTop: "20px",
        }}
      >
        {VERDICTS.map((label) => (
          <div
            key={label}
            className={styles.categoryIcon}
            onClick={() => loadCategory(label)}
          >
            <Image
              src={`/${label}.png`}
              alt={label}
              width={60}
              height={60}
              style={{ borderRadius: "8px" }}
            />
            <span style={{ marginTop: "8px" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
