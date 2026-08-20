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

  const families: Record<
    string,
    { hueMin: number; hueMax: number; sat: number; negative?: boolean }
  > = {
    weak: { hueMin: 5, hueMax: 18, sat: 60, negative: true },
    recheck: { hueMin: 19, hueMax: 40, sat: 85, negative: true },
    monitor: { hueMin: 41, hueMax: 58, sat: 90 },
    positive: { hueMin: 59, hueMax: 75, sat: 75 },
    strong: { hueMin: 76, hueMax: 100, sat: 75 },
    extended: { hueMin: 250, hueMax: 270, sat: 60},
  };

  const key = category?.toLowerCase();
  const fam = families[key];

  if (!fam) {
    // fallback
    const fallbackHue = 120 * pct;
    return `hsl(${fallbackHue}, 90%, 70%)`;
  }

  // Hue inside category band
  const hue = fam.hueMin + pct * (fam.hueMax - fam.hueMin);

  // Expanded shade range
  const baseLight = 90;
  const range = 50;

  let lightness;

  if (fam.negative) {
    // Negative categories: lower score = darker
    lightness = baseLight - (1 - pct) * range;
  } else {
    // Positive categories: higher score = darker
    lightness = baseLight - pct * range;
  }

  return `hsl(${hue}, ${fam.sat}%, ${lightness}%)`;
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
        Measured Core Signals – Multiple Horizons & Data Sets
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
