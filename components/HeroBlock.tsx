"use client";

import Image from "next/image";

export default function HeroBlock() {
  return (
    <div className="heroBlock">
      <div className="heroImage">
        <Image
          src="/Main Logo.png"
          alt="Birring Data Analytics Hero"
          width={250}
          height={250}
          style={{ borderRadius: "12px", width: "100%", height: "auto" }}
        />
      </div>

      <div className="heroText">
        <h1>Birring Data Analytics</h1>
        <h2>ASX Stocks Behavioural Report</h2>
        <p>
          Lookup any ASX stock or ticker. The system reports the stock’s
          behavioural metrics, trend signals, volatility characteristics,
          liquidity conditions, and macro‑micro alignment.
        </p>
      </div>

      <style jsx>{`
        .heroBlock {
          display: flex;
          flex-direction: column; /* MOBILE DEFAULT */
          align-items: center;
          gap: 30px;
          padding: 40px 20px;
          background-color: #010c1b;
          border-bottom: 1px solid #123;
        }

        .heroImage {
          width: 100%;
          max-width: 250px;
        }

        .heroText {
          text-align: center;
          max-width: 400px;
        }

        .heroText h1 {
          font-size: 42px;
          margin-bottom: 10px;
          color: #e4f71d;
        }

        .heroText h2 {
          font-size: 28px;
          margin-bottom: 20px;
          color: #9cc9ff;
        }

        .heroText p {
          font-size: 20px;
          color: #e7eaef;
        }

        /* DESKTOP ONLY — applies ONLY to .heroBlock */
        @media (min-width: 900px) {
          .heroBlock {
            flex-direction: row;
            text-align: middle;
          }

          .heroText {
            text-align: left;
            max-width: 500px;
          }
        }
      `}</style>
    </div>
  );
}
