"use client";

import { useEffect, useState } from "react";

export default function DelayedLivePrice({ code }: { code: string }) {
  const [priceData, setPriceData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPrice() {
      try {
        const res = await fetch(`/api/price?code=${code}`);
        const data = await res.json();

        if (data.error) {
          setError(data.error);
        } else {
          setPriceData(data);
        }
      } catch (err) {
        setError("Failed to load price");
      } finally {
        setLoading(false);
      }
    }

    loadPrice();
  }, [code]);

  if (loading) {
    return (
      <div style={cardStyle}>
        <h3 style={titleStyle}>Live Price (Delayed)</h3>
        <p style={{ color: "#9cc9ff" }}>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={cardStyle}>
        <h3 style={titleStyle}>Live Price (Delayed)</h3>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  const changeColor = priceData.change >= 0 ? "#30f998" : "#ff6b6b";

  return (
    <div style={cardStyle}>
      <h3 style={titleStyle}>Live Price (Delayed)</h3>

      <p style={{ margin: "6px 0" }}>
        <strong>Price:</strong> ${priceData.price}
      </p>

      <p style={{ margin: "6px 0", color: changeColor }}>
        <strong>Change:</strong> {priceData.change}%
      </p>

      <p style={{ margin: "6px 0" }}>
        <strong>High:</strong> ${priceData.high}
      </p>

      <p style={{ margin: "6px 0" }}>
        <strong>Low:</strong> ${priceData.low}
      </p>

      <p style={{ margin: "6px 0" }}>
        <strong>Volume:</strong>{" "}
        {priceData.volume ? priceData.volume.toLocaleString() : "N/A"}
      </p>

      <p style={{ marginTop: "10px", fontSize: "12px", color: "#9cc9ff" }}>
        Updated: {new Date(priceData.timestamp * 1000).toLocaleTimeString()}
      </p>
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
