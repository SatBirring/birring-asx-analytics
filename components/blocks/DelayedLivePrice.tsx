"use client";

import { useEffect, useState } from "react";

// Convert YYYYMMDD → YYYY-MM-DD
function formatCSVDate(csvDate: string) {
  const year = csvDate.slice(0, 4);
  const month = csvDate.slice(4, 6);
  const day = csvDate.slice(6, 8);
  return `${year}-${month}-${day}`;
}

export default function EODPriceCard({ code }: { code: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadEOD() {
      try {
        const res = await fetch(`/api/eod-csv?code=${code}`);
        const json = await res.json();

        if (json.error) {
          setError(json.error);
        } else {
          setData(json);
        }
      } catch (err) {
        setError("Failed to load EOD data");
      } finally {
        setLoading(false);
      }
    }

    loadEOD();
  }, [code]);

  if (loading) {
    return (
      <div style={cardStyle}>
        <h3 style={titleStyle}>EOD Price</h3>
        <p style={{ color: "#9cc9ff" }}>Loading...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div style={cardStyle}>
        <h3 style={titleStyle}>EOD Price</h3>
        <p style={{ color: "red" }}>{error || "No data found"}</p>
      </div>
    );
  }

  // ⭐ Movement colour logic
  const movementColor = Number(data.close) > Number(data.open)
    ? "#30f998"
    : "#ff6b6b";

  return (
    <div style={cardStyle}>
      <h3 style={titleStyle}>EOD Price</h3>

      <p>
        <strong>Date:</strong>{" "}
        {new Date(formatCSVDate(data.date)).toLocaleDateString("en-AU", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>

      <p><strong>Open:</strong> ${data.open}</p>
      <p><strong>High:</strong> ${data.high}</p>
      <p><strong>Low:</strong> ${data.low}</p>

      <p style={{ color: movementColor }}>
        <strong>Close:</strong> ${data.close}
      </p>

      <p><strong>Share Traded:</strong> {data.volume?.toLocaleString()}</p>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  background: "#0d1b3d",
  padding: "15px",
  borderRadius: "10px",
  color: "white",
  width: "260px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
};

const titleStyle: React.CSSProperties = {
  marginBottom: "10px",
  color: "#30f998",
  fontSize: "20px",
  fontWeight: 600,
};
