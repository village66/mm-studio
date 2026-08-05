import { SITE_URL, siteConfig } from "@/lib/site";

export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#business`,
        name: siteConfig.brandName,
        legalName: siteConfig.legalName,
        alternateName: siteConfig.aliases,
        url: SITE_URL,
        image: `${SITE_URL}/images/og-cover.jpg`,
        logo: `${SITE_URL}/favicon-512.png`,
        description: siteConfig.description,
        email: siteConfig.email,
        telephone: siteConfig.telephone,
        taxID: siteConfig.taxId,
        identifier: {
          "@type": "PropertyValue",
          name: "室內裝修業登記證字號",
          value: siteConfig.registrationNumber,
        },
        address: {
          "@type": "PostalAddress",
          addressRegion: "台中市",
          addressCountry: "TW",
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: siteConfig.serviceArea,
        },
        knowsAbout: [
          "住宅設計",
          "舊屋改造",
          "老屋翻新",
          "商業空間設計",
          "室內裝修施工",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: siteConfig.brandName,
        alternateName: siteConfig.aliases,
        inLanguage: "zh-Hant-TW",
        publisher: {
          "@id": `${SITE_URL}/#business`,
        },
      },
    ],
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
