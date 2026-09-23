import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Navbar } from "../Components/navbar";
import ScrollAnimations from "../Components/ScrollAnimations";
import MotionProvider from "../Components/MotionProvider";
import { company, siteUrl, team } from "@/lib/company";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const title = "Virtual Executive Assistants + AI Automation | GenExecutive";
const description =
  "Virtual executive assistants and AI automation for small businesses, coaches and consultants in the US and UK. Plans from $400/month. Book a free call.";

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
        alt: "GenExecutive — virtual executive assistants and AI automation",
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // No maximumScale / user-scalable=no — pinch zoom must stay available.
  viewportFit: "cover",
  themeColor: "#ffffff",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: company.name,
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: company.logo,
    width: 256,
    height: 256,
  },
  description,
  email: company.email,
  areaServed: company.areaServed,
  contactPoint: {
    "@type": "ContactPoint",
    email: company.email,
    contactType: "customer service",
    availableLanguage: "English",
  },
  ...(team.length
    ? {
        founder: team.map((m) => ({
          "@type": "Person",
          name: m.name,
          jobTitle: m.role,
          ...(m.linkedin ? { sameAs: [m.linkedin] } : {}),
        })),
      }
    : {}),
  sameAs: company.sameAs,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: company.name,
  url: siteUrl,
  inLanguage: "en",
  publisher: { "@id": `${siteUrl}/#organization` },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <MotionProvider>
          <Navbar />
          {children}
        </MotionProvider>
        <ScrollAnimations />
        <Analytics />
      </body>
    </html>
  );
}
