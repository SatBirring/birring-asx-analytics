export const metadata = {
  title: "Birring Analytics — ASX Behavioural Analytics",
  description:
    "Structured, quantitative behavioural analytics for all ASX‑listed tickers.",
  alternates: {
    canonical: "https://birringanalytics.com/"
  },
  openGraph: {
    title: "Birring Analytics — ASX Behavioural Analytics",
    description:
      "Behavioural, trend, momentum, risk and liquidity analytics for ASX stocks.",
    url: "https://birringanalytics.com/",
    siteName: "Birring Analytics",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Birring Analytics",
    description: "Behavioural analytics for ASX stocks."
  },
  other: {
    "script:ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Birring Analytics",
      "url": "https://birringanalytics.com/",
      "description":
        "Behavioural, trend, momentum, risk and liquidity analytics for ASX stocks."
    })
  }
};

import HomeClient from "./HomeClient";

export default function Page() {
  return <HomeClient />;
}
