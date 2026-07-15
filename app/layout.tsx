import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MM Studio | Interior Architecture",
    template: "%s | MM Studio",
  },

  description:
    "MM Studio is an interior architecture and design studio creating timeless residential and commercial spaces.",

  keywords: [
    "Interior Design",
    "Interior Architecture",
    "Taiwan",
    "Modern House",
    "Minimal Design",
    "Residential",
    "Commercial Space",
  ],

  authors: [
    {
      name: "MM Studio",
    },
  ],

  creator: "MM Studio",

  openGraph: {
    title: "MM Studio",
    description:
      "Timeless Interior Architecture & Design Studio.",
    siteName: "MM Studio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-Hant"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f8f8f5] text-[#111111]">
        {children}
      </body>
    </html>
  );
}