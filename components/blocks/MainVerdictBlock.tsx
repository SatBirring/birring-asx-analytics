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

  const getBackgroundColor = (score: number) => {
    const pct = Math.max(0, Math.min(100, score)) / 100;
    const hue = 0 + 120 * pct;

    const saturation = 90;
    const lightness = 70;

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const extendedPurple = "hsl(270, 60%, 70%)";

  const bgColor =
    row["Final Verdict"]?.toLowerCase() === "extended"
      ? extendedPurple
      : getBackgroundColor(numericScore);

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
        label="Final Verdict & Score"
        score={row["Final Score"]}
        verdict={row["Final Verdict"]}
      />

      <Row
        label="EMA Verdict, Score and Move"
        score={`${row["CFS Smooth"]} | ${row["CFS Move"]}`}
        verdict={row["EMA Final Verdict"]}
      />

      <Row
        label="Momentum Score and Category"
        score={row["Overall Momentum Score"]}
        verdict={row["Momentum Category"]}
      />

      <Row
        label="Behavioural Classifier"
        score="—"
        verdict={row["Behavioural Classifier"]}
      />
    </div>
  );
}
