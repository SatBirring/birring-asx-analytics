import HeroBlock from "@/components/HeroBlock";
import DynamicLookup from "@/components/DynamicLookup";

interface PageProps {
  params: {
    code: string;
  };
}

/* ⭐ Dynamic SEO metadata + JSON‑LD schema */
export async function generateMetadata({ params }: PageProps) {
  const raw = params?.code;
  const code = raw ? raw.toUpperCase() : "ASX Stock";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": code,
    "tickerSymbol": `ASX:${code}`,
    "url": `https://birringanalytics.com/${code}`,
    "description": `Behavioural, trend, momentum, risk and liquidity analytics for ${code} from Birring Analytics.`,
    "provider": {
      "@type": "Organization",
      "name": "Birring Analytics",
      "url": "https://birringanalytics.com"
    }
  };

  return {
    title: `${code} — Birring Analytics`,
    description: `Behavioural, trend, momentum, risk and liquidity analytics for ${code} from Birring Analytics.`,
    openGraph: {
      title: `${code} — Birring Analytics`,
      description: `Behavioural, trend, momentum, risk and liquidity analytics for ${code}.`,
      url: `https://birringanalytics.com/${code}`,
      siteName: "Birring Analytics",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: `${code} — Birring Analytics`,
      description: `Behavioural analytics for ${code}.`
    },
    other: {
      /* Inject JSON‑LD into <head> */
      "script:ld+json": JSON.stringify(jsonLd)
    }
  };
}

export default function LookupCodePage({ params }: PageProps) {
  const code = params.code;

  return (
    <div
      style={{
        fontFamily: "Arial",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <HeroBlock />

      <div style={{ padding: "30px", flex: 1 }}>
        <h1
          style={{
            padding: "10px",
            textAlign: "left",
            fontSize: "24px",
            color: "#0019a5"
          }}
        >
          {code?.toUpperCase() || ""} Type ASX Stock Code to Search
        </h1>

        <DynamicLookup />
      </div>

      <footer
        style={{
          padding: "20px",
          textAlign: "center",
          borderTop: "1px solid #123",
          color: "#9cc9ff",
          backgroundColor: "#0b1e39"
        }}
      >
        © 2026 Birring Data Analytics — Behavioural, non‑advisory ASX analytics.
      </footer>
    </div>
  );
}
