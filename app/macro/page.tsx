"use client";

import { useRouter } from "next/navigation";

export default function MacroPage() {
  const router = useRouter();

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1 style={{ marginBottom: "20px" }}>Macro Data Overview</h1>

      {/* Responsive Macro Image */}
      <img
        src="/macro-signal.png"
        alt="Macro Signal"
        style={{
          width: "100%",
          maxWidth: "600px",
          height: "auto",
          margin: "20px auto",
          display: "block",
        }}
      />

      {/* Responsive Buttons */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
          marginTop: "30px",
        }}
      >
        <button
          onClick={() => router.push("/")}
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
          Home
        </button>

        <button
          onClick={() => router.push("/lookup")}
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
          Back to Lookup
        </button>
      </div>
    </div>
  );
}