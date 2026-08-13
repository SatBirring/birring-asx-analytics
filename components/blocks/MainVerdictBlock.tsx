"use client";

interface RowProps {
  label: string;
  score?: string | number;
  verdict: string;
  big?: boolean;
}

export default function MainVerdictBlock({ row }: { row: any }) {
  if (!row) return null;

  const rawScore = row["Final Score"];
  const numericScore =
    typeof rawScore === "string" ? parseFloat(rawScore) : Number(rawScore);

  // CATEGORY → COLOUR FAMILY → SHADE BY SCORE
  const getCategoryColor = (category: string, score: number) => {
    const pct = Math.max(0, Math.min(100, score)) / 100;

    const families: Record<string, { hue: number; sat: number }> = {
      extended: { hue: 290, sat: 50},   // purple
      weak: { hue: 1, sat: 80 },         // red
      recheck: { hue: 25, sat: 100 },     // orange
      monitor: { hue: 60, sat: 85 },     // yellow
      positive: { hue: 75, sat: 70 },    // yellow-green
      strong: { hue: 96, sat: 70 },     // green
    };

    const key = category?.toLowerCase();
    const fam = families[key];

    if (!fam) {
      // fallback to old score-based green-red scale
      const hue = 120 * pct;
      return `hsl(${hue}, 90%, 70%)`;
    }

    // Shade logic: higher score = deeper colour
    const baseLight = 78;
    const range = 25;
    const lightness = baseLight - pct * range;

    return `hsl(${fam.hue}, ${fam.sat}%, ${lightness}%)`;
  };

  const category = row["Final Verdict"];
  const bgColor = getCategoryColor(category, numericScore);

  const Row = ({ label, score, verdict, big = false }: RowProps) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        padding: big ? "18px 0" : "12px 0",
        fontSize: big ? "26px" : "20px",
        fontWeight: big ? "700" : "500",
        borderBottom: "1px solid rgba(0,0,0,0.15)",
      }}
    >
      <div style={{ fontWeight: big ? "700" : "600" }}>{label}</div>
      <div style={{ textAlign: "center" }}>{score}</div>
      <div style={{ textAlign: "right", fontWeight: big ? "700" : "600" }}>
        {verdict}
      </div>
    </div>
  );

  return (
    <div
      style={{
        width: "100%",
        padding: "20px 0",
        paddingLeft: "20px",
        paddingRight: "20px",
        backgroundColor: bgColor,
        borderRadius: "12px",
        transition: "background-color 0.3s ease",
      }}
    >
      <h2
        style={{
          marginBottom: "22px",
          fontSize: "30px",
          fontWeight: "700",
          textAlign: "center",
          color: "#061126",
        }}
      >
        Core Signals – Multiple Horizons & Data Sets
      </h2>

      <Row
        big={true}
        label="Final Score & Verdict Category"
        score={row["Final Score"]}
        verdict={row["Final Verdict"]}
      />

      <Row
        label="Last Week Verdict, Score and Move"
        score={`${row["CFS Smooth"]} | ${row["CFS Move"]}`}
        verdict={row["EMA Final Verdict"]}
      />

      <Row
        label="Momentum Score and Category"
        score={row["Overall Momentum Score"]}
        verdict={row["Momentum Category"]}
      />

      <Row
        label="Category Confidence"
        verdict={row["Confidence State"]}
      />

      <Row
        label="Behavioural Classifier"
        verdict={row["Behavioural Classifier"]}
      />
    </div>
  );
}
