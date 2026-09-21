import Link from "next/link";
import type { Metadata } from "next";
import { services } from "@/lib/services";
import CalButton from "@/Components/caldotcom";
import Footer from "@/Components/sections/footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.genexecutive.in";

const description =
  "Book a free 30-minute discovery call with GenExecutive, or email info@genexecutive.in. No sales pressure — just a clear plan for your operations.";

export const metadata: Metadata = {
  // Absolute: this title already carries the brand.
  title: { absolute: "Contact GenExecutive — Book a Discovery Call" },
  description,
  alternates: { canonical: `${siteUrl}/contact` },
  openGraph: {
    type: "website",
    title: "Contact GenExecutive — Book a Discovery Call",
    description,
    url: `${siteUrl}/contact`,
    siteName: "GenExecutive",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Contact GenExecutive",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact GenExecutive — Book a Discovery Call",
    description,
  },
};

const expectations = [
  "A free 30-minute call, with no sales pressure.",
  "A clear picture of what working together would look like.",
  "An honest read on the outcomes you can realistically expect.",
];

export default function ContactPage() {
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact GenExecutive",
    description,
    url: `${siteUrl}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: "GenExecutive",
      url: siteUrl,
      email: "info@genexecutive.in",
      contactPoint: {
        "@type": "ContactPoint",
        email: "info@genexecutive.in",
        contactType: "sales",
        availableLanguage: "English",
      },
      areaServed: ["US", "GB"],
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact",
        item: `${siteUrl}/contact`,
      },
    ],
  };

  return (
    <>
      <main className="min-h-svh bg-white pt-28 sm:pt-32 pb-20 sm:pb-24 px-5 sm:px-6">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        <div className="max-w-3xl mx-auto">
          <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
            <ol className="flex items-center gap-2 text-sm text-zinc-400">
              <li>
                <Link href="/" className="inline-flex min-h-9 items-center hover:text-violet-600 transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-zinc-600">Contact</li>
            </ol>
          </nav>

          <span className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-3 block">
            Contact
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-zinc-900 tracking-tight leading-tight mb-5">
            Let&apos;s map out what to hand off first
          </h1>
          <p className="text-zinc-500 text-base sm:text-lg leading-relaxed">
            Book a free 30-minute discovery call and we&apos;ll walk through where
            your week is actually going, and which parts of it we can take off
            your plate. We work with small businesses, coaches, consultants and
            scaling teams in the US and UK.
          </p>

          <div className="mt-8">
            <CalButton>Book a Discovery Call</CalButton>
          </div>

          {/* What to expect */}
          <section className="mt-14 sm:mt-16">
            <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900 tracking-tight mb-5">
              What to expect on the call
            </h2>
            <ul className="flex flex-col gap-2.5">
              {expectations.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[15px] text-zinc-600"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 text-[11px] font-bold text-violet-600">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Email */}
          <section className="mt-14 sm:mt-16">
            <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900 tracking-tight mb-3">
              Prefer email?
            </h2>
            <p className="text-zinc-500 leading-relaxed">
              Write to{" "}
              <a
                href="mailto:info@genexecutive.in"
                className="font-medium text-violet-600 hover:underline"
              >
                info@genexecutive.in
              </a>{" "}
              with a line about what is eating your week, and we&apos;ll come back
              with where we would start.
            </p>
          </section>

          {/* Services */}
          <section className="mt-14 sm:mt-16 border-t border-zinc-100 pt-10">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-violet-600 mb-5">
              Read up first
            </h2>
            <ul className="flex flex-col gap-4">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group block rounded-xl border border-zinc-100 p-5 hover:border-violet-200 hover:shadow-sm transition-all"
                  >
                    <span className="block font-semibold text-zinc-900 group-hover:text-violet-700 transition-colors">
                      {service.name}
                    </span>
                    <span className="mt-1 block text-sm text-zinc-500 leading-relaxed">
                      {service.description}
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/#pricing"
                  className="group block rounded-xl border border-zinc-100 p-5 hover:border-violet-200 hover:shadow-sm transition-all"
                >
                  <span className="block font-semibold text-zinc-900 group-hover:text-violet-700 transition-colors">
                    Pricing
                  </span>
                  <span className="mt-1 block text-sm text-zinc-500 leading-relaxed">
                    Starter, Pro and a custom Enterprise tier — scale up or down
                    as your needs change.
                  </span>
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
