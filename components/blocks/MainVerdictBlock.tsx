"use client";

export default function MainVerdictBlock({ row }: { row: any }) {
  if (!row) return null;

  // ⭐ Parse Final Score safely
  const rawScore = row["Final Score"];
  const numericScore =
    typeof rawScore === "string"
      ? parseFloat(rawScore)
      : Number(rawScore);

  // ⭐ Dynamic background color (Red → Yellow → Green)
  const getBackgroundColor = (score: number) => {
    const pct = Math.max(0, Math.min(100, score)) / 100;

    // 0 = red (0deg), 0.5 = yellow (60deg), 1 = green (120deg)
    const hue = 0 + 120 * pct;

    // ⭐ YOU CAN ADJUST THESE VALUES:
    const saturation = 90; // stronger color
    const lightness = 70;  // darker color

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  // ⭐ Purple override when Final Verdict is "Extended"
  const extendedPurple = "hsl(270, 60%, 70%)";

  const bgColor =
    row["Final Verdict"]?.toLowerCase() === "extended"
      ? extendedPurple
      : getBackgroundColor(numericScore);

  // ⭐ Generic row component
  const Row = ({ label, score, verdict, big = false }) => (
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
        paddingLeft: "20px",     // ⭐ left spacing
        paddingRight: "20px",    // ⭐ right spacing
        backgroundColor: bgColor,
        borderRadius: "12px",    // ⭐ premium rounded edges
        transition: "background-color 0.3s ease",
      }}
    >
      {/* ⭐ Centered Title */}
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

      {/* ⭐ Final Verdict — BIGGER */}
      <Row
        big={true}
        label="Final Verdict & Score"
        score={row["Final Score"]}
        verdict={row["Final Verdict"]}
      />

      {/* ⭐ EMA + CFS */}
      <Row
        label="EMA Verdict, Score and Move"
        score={`${row["CFS Smooth"]} | ${row["CFS Move"]}`}
        verdict={row["EMA Final Verdict"]}
      />

      {/* ⭐ Momentum */}
      <Row
        label="Momentum Score and Category"
        score={row["Overall Momentum Score"]}
        verdict={row["Momentum Category"]}
      />

      {/* ⭐ Behavioural */}
      <Row
        label="Behavioural Classifier"
        score="—"
        verdict={row["Behavioural Classifier"]}
      />
    </div>
  );
}
