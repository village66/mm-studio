export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "InteriorDesignBusiness",
    name: "MM Studio",
    image: "https://www.mmstudio.tw/images/og-cover.jpg",
    url: "https://www.mmstudio.tw",
    logo: "https://www.mmstudio.tw/favicon-512.png",
    description:
      "MM Studio is a boutique interior design studio specializing in residential and commercial interior design.",
    telephone: "",
    address: {
      "@type": "PostalAddress",
      addressCountry: "TW",
    },
    areaServed: "Taiwan",
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}