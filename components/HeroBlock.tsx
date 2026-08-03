"use client";

export default function HeroBlock() {
  return (
    <div
  style={{
    padding: "20px 10px",
    backgroundColor: "#0b1e39",
    color: "white",
    textAlign: "center"
  }}
>
      <h1
        style={{
          fontSize: "36px",
          fontWeight: "700",
          marginBottom: "10px",
          background: "linear-gradient(90deg, #07b8e9, #fe8940, #fbdd59)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}
      >
        Birring Data Analytics
      </h1>

      <h2
        style={{
          fontSize: "24px",
          color: "#4ed103",
          maxWidth: "700px",
          margin: "0 auto",
          lineHeight: "1.6"
        }}
      >
        ASX Ticker Behavioural Lookup Tool 
      </h2>

      <p
        style={{
          fontSize: "18px",
          color: "#c9de25",
          maxWidth: "700px",
          margin: "0 auto",
          lineHeight: "1.6"
        }}
      >
         
        Trend • Momentum • Liquidity • Volatility • Macro Alignment • Risk
      </p>
    </div>
  );
}
