export default function Home() {
  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Birring ASX Analytics</h1>
      <p>Welcome to your ASX stock lookup tool.</p>

      <a
        href="/lookup"
        style={{
          display: "inline-block",
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#0070f3",
          color: "white",
          textDecoration: "none",
          borderRadius: "5px",
          fontSize: "16px",
        }}
      >
        Go to Lookup
      </a>
    </div>
  );
}