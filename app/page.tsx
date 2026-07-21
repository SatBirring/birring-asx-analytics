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
      {/* HERO IMAGE */}
      <img
        src="/hero.png"
        alt="Birring Data Analytics Hero"
        style={{
          width: "100%",
          maxHeight: "250px",
          objectFit: "contain",
          borderRadius: "10px",
          marginBottom: "50px",
          backgroundColor: "#0b1e39",
        }}
      />

      {/* BRAND TITLE */}
      <h1 className="brandTitle">Birring Data Analytics</h1>

      <style jsx>{`
        .brandTitle {
          font-size: 46px;
          margin-bottom: 18px;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-shadow: 0 0 14px rgba(208, 243, 9, 0.28);

          background: linear-gradient(90deg, #07b8e9, #fe8940, #fbdd59);
          background-size: 100%;
          background-repeat: no-repeat;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .buttonGroup {
          margin-top: 40px;
        }

        .buttonGroup a {
          display: inline-block;
          padding: 14px 28px;
          border-radius: 8px;
          font-size: 18px;
          text-decoration: none;
          margin: 0 12px;
          transition: all 0.3s ease;
          font-weight: 600;
        }

        .lookup {
          background-color: #0070f3;
          color: yellow;
        }

        .macroCategories {
          background-color: #fe8940;
          color: black;
        }

        .macroPages {
          background-color: #fbdd59;
          color: #0b1e39;
        }

        .buttonGroup a:hover {
          transform: scale(1.07);
          box-shadow: 0 0 14px rgba(255, 255, 255, 0.35);
        }

        .sectionTitle {
          font-size: 26px;
          margin-top: 60px;
          margin-bottom: 20px;
          font-weight: 700;
          color: #fbdd59;
        }

        .sectionText {
          font-size: 18px;
          color: #c9de25;
          max-width: 850px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.65;
          margin-bottom: 40px;
        }
      `}</style>

      {/* INTRO SECTION */}
      <p className="sectionText">
        We deliver structured, behavioural analytics for ASX‑listed stocks using
        a disciplined, multi‑layer measurement framework. Our model evaluates
        trend direction, price movement quality, volatility regimes, liquidity
        conditions, and macro‑micro alignment — all pivoted to the final
        tradable day of the previous week for consistency across the ASX
        universe.
      </p>

      {/* BEHAVIOURAL MODEL SUMMARY */}
      <h2 className="sectionTitle">Our Behavioural Model</h2>
      <p className="sectionText">
        Every stock is processed through the same rules, the same horizons, and
        the same behavioural filters. These measured signals are converted into
        a single <strong>Final Verdict & Score</strong>, supported by{" "}
        <strong>Market Standing</strong> and <strong>ASX Ranking</strong>.
        <br />
        <br />
        No forecasts. No advice. Only neutral, data‑driven reporting of
        observable market behaviour.
      </p>

      {/* CTA BUTTONS */}
      <div className="buttonGroup">
        <a href="/categories" className="macroCategories">
          Stock Categories
        </a>

        <a href="/macro" className="macroPages">
          Market Macro Snapshot
        </a>

        <a href="/lookup" className="lookup">
          Stock Lookup
        </a>
      </div>

      {/* FOOTER */}
      <footer
        style={{
          marginTop: "70px",
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
