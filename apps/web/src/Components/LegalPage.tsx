import Link from "next/link";
import type { ReactNode } from "react";
import { legal, siteUrl } from "@/lib/company";
import Footer from "@/Components/sections/footer";

interface LegalPageProps {
  title: string;
  path: string;
  children: ReactNode;
}

/** Operator line shared by both legal pages; omits details not yet filled in. */
export function OperatorDetails() {
  return (
    <p>
      This website and the GenExecutive services are operated by{" "}
      {legal.proprietorName
        ? `${legal.proprietorName}, trading as GenExecutive`
        : "GenExecutive"}
      , a sole proprietorship based in India
      {legal.address ? `, at ${legal.address}` : ""}. In this document,
      &ldquo;GenExecutive&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; and
      &ldquo;our&rdquo; refer to that business.
    </p>
  );
}

export default function LegalPage({ title, path, children }: LegalPageProps) {
  const url = `${siteUrl}${path}`;
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: title, item: url },
    ],
  };

  return (
    <>
      <main className="min-h-svh bg-white pt-28 sm:pt-32 pb-20 sm:pb-24 px-5 sm:px-6">
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
              <li className="text-zinc-600">{title}</li>
            </ol>
          </nav>
          <h1 className="text-3xl sm:text-5xl font-bold text-zinc-900 tracking-tight leading-tight mb-3">
            {title}
          </h1>
          <p className="text-sm text-zinc-400 mb-10">
            Last updated{" "}
            <time dateTime={legal.lastUpdated}>
              {new Date(legal.lastUpdated).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </p>
          <div className="blog-content">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
