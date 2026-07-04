"use client";

export default function Home() {
  return (
    <div
      style={{
        fontFamily: "Arial",
        textAlign: "center",
        padding: "60px 20px",
        backgroundColor: "#0b1e39",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <img
        src="/hero.png"
        alt="Birring Data Analytics Hero"
        style={{
          width: "100%",
          maxHeight: "350px",
          objectFit: "cover",
          borderRadius: "8px",
          marginBottom: "40px",
        }}
      />

      <h1 className="brandTitle">Birring Data Analytics</h1>

      <style jsx>{`
        .brandTitle {
          font-size: 42px;
          margin-bottom: 10px;
          font-weight: 700;
          letter-spacing: 1px;
          text-shadow: 0 0 12px rgba(208, 243, 9, 0.28);

          /* Gradient applied to text only */
          background: linear-gradient(90deg, #07b8e9, #fe8940, #fbdd59);
          background-size: 100%;
          background-repeat: no-repeat;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .buttonGroup a {
          display: inline-block;
          padding: 12px 24px;
          border-radius: 6px;
          font-size: 18px;
          text-decoration: none;
          margin: 0 10px;
          transition: all 0.3s ease;
        }

        .lookup {
          background-color: #0070f3;
          color: white;
        }

        .macroCategories {
          background-color: #fe8940;
          color: white;
        }

        .macroPages {
          background-color: #fbdd59;
          color: #0b1e39;
        }

        .buttonGroup a:hover {
          transform: scale(1.05);
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }
      `}</style>

      <p
        style={{
          fontSize: "18px",
          color: "#c9de25",
          marginBottom: "40px",
          maxWidth: "800px",
          marginLeft: "auto",
          marginRight: "auto",
          lineHeight: "1.6",
        }}
      >
        We deliver structured, behavioural analytics for ASX‑listed stocks using
        a disciplined, multi‑layer measurement framework. Our model evaluates
        trend direction, price movement quality, volatility regimes, liquidity
        conditions, and macro‑micro alignment — all pivoted to the final
        tradable day of the previous week for consistency across the ASX
        universe.
        <br />
        <br />
        These measured signals are converted into a single Final Verdict & Score,
        supported by Market Standing and ASX Ranking. Every stock is processed
        through the same rules, the same horizons, and the same behavioural
        filters. No forecasts, no advice — only neutral, data‑driven reporting
        of observable market behaviour.
      </p>

      <div className="buttonGroup">
        <a href="/lookup" className="lookup">
          Go to Lookup
        </a>
        <a href="/categories" className="macroCategories">
          Final Desision Categories
        </a>
        <a href="/macro" className="macroPages">
          Macro Pages
        </a>
      </div>

      <footer
        style={{
          marginTop: "60px",
          fontSize: "14px",
          color: "#9cc9ff",
          borderTop: "1px solid #123",
          paddingTop: "20px",
        }}
      >
        © 2026 Birring Data Analytics — Behavioural, non‑advisory ASX analytics.
        Raw Data sourced from MarketIndex.com.au.
      </footer>
    </div>
  );
}
