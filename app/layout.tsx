import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import JsonLd from "@/components/seo/JsonLd";
import BackgroundMusic from "@/components/audio/BackgroundMusic";
import { SITE_URL, siteConfig } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "工厘設計 MM Studio｜台中室內設計・住宅設計・舊屋改造",
    template: "%s｜工厘設計 MM Studio",
  },

  description: siteConfig.description,

  keywords: [
    "工厘設計",
    "工厘室內設計",
    "工厘室內裝修設計",
    "MM Studio",
    "MM Design",
    "MM Interior Design",
    "台中室內設計",
    "台中室內裝修",
    "住宅設計",
    "舊屋改造",
    "老屋翻新",
    "商業空間設計",
  ],

  authors: [
    {
      name: siteConfig.legalName,
    },
  ],

  creator: siteConfig.brandName,
  publisher: siteConfig.legalName,

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "工厘設計 MM Studio｜台中室內設計",
    description: siteConfig.description,
    url: "/",
    siteName: siteConfig.brandName,
    locale: "zh_TW",
    type: "website",

    images: [
      {
        url: "/images/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "工厘設計 MM Studio 室內設計作品",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "工厘設計 MM Studio｜台中室內設計",
    description: siteConfig.description,
    images: ["/images/og-cover.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

  return (
    <html
      lang="zh-Hant"
      className="scroll-smooth"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 每次開啟首頁時，清除舊錨點並回到 Hero 最上方 */}
        <Script id="home-entry-reset" strategy="beforeInteractive">
          {`
            (function () {
              if (window.location.pathname !== "/") return;

              if ("scrollRestoration" in window.history) {
                window.history.scrollRestoration = "manual";
              }

              if (window.location.hash) {
                var cleanUrl =
                  window.location.pathname +
                  window.location.search;

                window.history.replaceState(
                  null,
                  "",
                  cleanUrl
                );
              }

              function resetHomePosition() {
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: "auto"
                });
              }

              resetHomePosition();

              window.addEventListener(
                "pageshow",
                resetHomePosition,
                { once: true }
              );
            })();
          `}
        </Script>

        <BackgroundMusic>
          <JsonLd />

          {children}
        </BackgroundMusic>

        {/* Google Analytics */}
        {googleAnalyticsId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
              strategy="afterInteractive"
            />

            <Script
              id="google-analytics"
              strategy="afterInteractive"
            >
              {`
                window.dataLayer = window.dataLayer || [];

                function gtag() {
                  window.dataLayer.push(arguments);
                }

                gtag("js", new Date());

                gtag(
                  "config",
                  "${googleAnalyticsId}"
                );
              `}
            </Script>
          </>
        )}

        {/* Microsoft Clarity */}
        {clarityId && (
          <Script
            id="clarity"
            strategy="afterInteractive"
          >
            {`
              (function(c,l,a,r,i,t,y){
                c[a] =
                  c[a] ||
                  function(){
                    (c[a].q = c[a].q || []).push(arguments);
                  };

                t = l.createElement(r);
                t.async = 1;
                t.src = "https://www.clarity.ms/tag/" + i;

                y = l.getElementsByTagName(r)[0];
                y.parentNode.insertBefore(t,y);
              })(
                window,
                document,
                "clarity",
                "script",
                "${clarityId}"
              );
            `}
          </Script>
        )}
      </body>
    </html>
  );
}
