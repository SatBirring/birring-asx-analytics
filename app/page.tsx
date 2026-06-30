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

      <h1 style={{ fontSize: "42px", marginBottom: "10px" }}>
        Birring Data Analytics
      </h1>

      <p style={{ fontSize: "18px", color: "#c9d6e8", marginBottom: "40px" }}>
        Behavioural, non‑advisory analytics for ASX stocks.
      </p>

      <a
        href="/lookup"
        style={{
          display: "inline-block",
          padding: "12px 24px",
          backgroundColor: "#0070f3",
          color: "white",
          textDecoration: "none",
          borderRadius: "6px",
          fontSize: "18px",
        }}
      >
        Go to Lookup
      </a>

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
        Data sourced from MarketIndex.com.au.
      </footer>
    </div>
  );
}