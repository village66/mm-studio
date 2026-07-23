import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import JsonLd from "@/components/seo/JsonLd";
import BackgroundMusic from "@/components/audio/BackgroundMusic";
import AutoPlayUnlock from "@/components/audio/AutoPlayUnlock";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mmstudio.tw"),

  title: {
    default: "MM Studio | Interior Design",
    template: "%s | MM Studio",
  },

  description:
    "MM Studio is a boutique interior design studio creating timeless residential and commercial spaces through refined design, natural materials and thoughtful craftsmanship.",

  keywords: [
    "MM Studio",
    "Interior Design",
    "Interior Architecture",
    "Residential Design",
    "Commercial Design",
    "Taiwan Interior Design",
    "桃園室內設計",
    "台北室內設計",
    "住宅設計",
    "商業空間設計",
    "精品室內設計",
  ],

  authors: [
    {
      name: "MM Studio",
    },
  ],

  creator: "MM Studio",
  publisher: "MM Studio",

  openGraph: {
    title: "MM Studio | Interior Design",
    description:
      "Creating timeless residential and commercial interiors.",
    url: "https://www.mmstudio.tw",
    siteName: "MM Studio",
    locale: "zh_TW",
    type: "website",

    images: [
      {
        url: "/images/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "MM Studio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "MM Studio | Interior Design",
    description:
      "Creating timeless residential and commercial interiors.",
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
  return (
    /* 加入 scroll-smooth 確保點擊選單時錨點滾動非常平滑 */
    <html lang="zh-Hant" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BackgroundMusic>
          <JsonLd />

          <AutoPlayUnlock />

          {children}
        </BackgroundMusic>

        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);
              t.async=1;
              t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];
              y.parentNode.insertBefore(t,y);
            })(window,document,"clarity","script","${process.env.NEXT_PUBLIC_CLARITY_ID}");
          `}
        </Script>
      </body>
    </html>
  );
}