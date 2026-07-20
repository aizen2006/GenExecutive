import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Navbar } from "../Components/navbar";
import ScrollAnimations from "../Components/ScrollAnimations";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.genexecutive.in";
const title = "GenExecutive — Executive Intelligence & AI Automation";
const description =
  "Executive support, AI automation, and custom agents — all working together to elevate your business performance.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s — GenExecutive",
  },
  description,
  icons: {
    icon: "/genexe-icon.png",
    shortcut: "/genexe-icon.png",
    apple: "/genexe-icon.png",
  },
  keywords: [
    "executive support",
    "AI automation",
    "AI agents",
    "virtual executive assistant",
    "MVP development",
    "landing pages",
    "business operations",
    "workflow automation",
  ],
  authors: [{ name: "GenExecutive", url: siteUrl }],
  openGraph: {
    type: "website",
    siteName: "GenExecutive",
    title,
    description,
    url: "/",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "GenExecutive — Executive Intelligence & AI Automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: "/",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "GenExecutive",
  url: siteUrl,
  description,
  contactPoint: {
    "@type": "ContactPoint",
    email: "info@genexecutive.in",
    contactType: "customer service",
  },
  sameAs: [
    "https://x.com/genexecutive",
    "https://linkedin.com/company/genexecutive",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${dmSans.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <head>
        {/* If JS is unavailable, never leave reveal content hidden. */}
        <noscript>
          <style>{`.gsap-reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Navbar />
        {children}
        <ScrollAnimations />
        <Analytics />
      </body>
    </html>
  );
}
