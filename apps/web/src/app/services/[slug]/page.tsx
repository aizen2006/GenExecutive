import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { services, getService, getRate } from "@/lib/services";
import { getAllPosts } from "@/lib/posts";
import CalButton from "@/Components/caldotcom";
import Footer from "@/Components/sections/footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.genexecutive.in";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const url = `${siteUrl}/services/${slug}`;
  return {
    // Absolute: these titles already carry the brand.
    title: { absolute: service.seoTitle },
    description: service.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title: service.seoTitle,
      description: service.description,
      url,
      siteName: "GenExecutive",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: service.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: service.seoTitle,
      description: service.description,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const url = `${siteUrl}/services/${slug}`;
  const posts = getAllPosts();
  const related = service.relatedPosts
    .map((s) => posts.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const others = services.filter((s) => s.slug !== slug);
  const rate = getRate(slug);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    serviceType: service.name,
    url,
    provider: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "GenExecutive",
      url: siteUrl,
      email: "info@genexecutive.in",
    },
    areaServed: ["US", "GB"],
    ...(rate
      ? {
          offers: {
            "@type": "Offer",
            name: `${rate.name}, ${rate.model.toLowerCase()}`,
            url: `${siteUrl}/#pricing`,
            priceSpecification: {
              "@type": rate.billing ? "UnitPriceSpecification" : "PriceSpecification",
              minPrice: rate.amount,
              priceCurrency: "USD",
              ...(rate.billing ? { unitCode: rate.billing } : {}),
            },
          },
        }
      : {}),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${siteUrl}/#services`,
      },
      { "@type": "ListItem", position: 3, name: service.name, item: url },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <main className="min-h-svh bg-white pt-28 sm:pt-32 pb-20 sm:pb-24 px-5 sm:px-6">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
            <ol className="flex items-center gap-2 text-sm text-zinc-400">
              <li>
                <Link href="/" className="inline-flex min-h-9 items-center hover:text-violet-600 transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link
                  href="/#services"
                  className="inline-flex min-h-9 items-center hover:text-violet-600 transition-colors"
                >
                  Services
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-zinc-600">{service.name}</li>
            </ol>
          </nav>

          <span className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-3 block">
            {service.name}
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-zinc-900 tracking-tight leading-tight mb-5">
            {service.h1}
          </h1>
          <p className="text-zinc-500 text-base sm:text-lg leading-relaxed">
            {service.intro}
          </p>

          {/* Proof stat, carried over from the homepage */}
          <div className="mt-8 inline-flex items-baseline gap-3 rounded-2xl border border-violet-100 bg-violet-50/60 px-5 py-4">
            <span className="text-2xl sm:text-3xl font-bold text-violet-700">
              {service.proofValue}
            </span>
            <span className="text-sm text-zinc-600">{service.proofLabel}</span>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
            <CalButton>Book a Discovery Call</CalButton>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 px-7 text-sm font-medium text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 transition-colors"
            >
              Other ways to reach us
            </Link>
          </div>

          {/* Who it's for */}
          <section className="mt-14 sm:mt-16">
            <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900 tracking-tight mb-5">
              Who it&apos;s for
            </h2>
            <ul className="flex flex-col gap-2.5">
              {service.whoFor.map((item) => (
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

          {/* Sections */}
          {service.sections.map((section) => (
            <section key={section.heading} className="mt-14 sm:mt-16">
              <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900 tracking-tight mb-3">
                {section.heading}
              </h2>
              <p className="text-zinc-500 leading-relaxed">{section.body}</p>
              {section.items && (
                <ul className="mt-5 flex flex-col gap-2.5">
                  {section.items.map((item) => (
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
              )}
            </section>
          ))}

          {/* How it works */}
          <section className="mt-14 sm:mt-16">
            <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900 tracking-tight mb-5">
              How it works
            </h2>
            <ol className="flex flex-col gap-4">
              {service.steps.map((step, i) => (
                <li key={step.title} className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-600 text-sm font-semibold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-zinc-900">{step.title}</h3>
                    <p className="mt-1 text-[15px] text-zinc-500 leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Comparison */}
          <section className="mt-14 sm:mt-16">
            <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900 tracking-tight mb-3">
              {service.comparison.heading}
            </h2>
            <p className="text-zinc-500 leading-relaxed mb-5">
              {service.comparison.intro}
            </p>
            {/* Scrolls inside itself on phones instead of widening the page. */}
            <div className="overflow-x-auto rounded-xl border border-zinc-100">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="bg-zinc-50 text-zinc-900">
                  <tr>
                    <th scope="col" className="p-3 font-semibold">
                      <span className="sr-only">Criteria</span>
                    </th>
                    {service.comparison.columns.map((col, i) => (
                      <th
                        key={col}
                        scope="col"
                        className={`p-3 font-semibold ${i === 0 ? "text-violet-700" : ""}`}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {service.comparison.rows.map((row) => (
                    <tr key={row.label}>
                      <th scope="row" className="p-3 font-medium text-zinc-900">
                        {row.label}
                      </th>
                      {row.values.map((value, i) => (
                        <td
                          key={i}
                          className={`p-3 ${i === 0 ? "bg-violet-50/50 font-medium text-zinc-900" : "text-zinc-500"}`}
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Pricing */}
          {rate && (
            <section className="mt-14 sm:mt-16">
              <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900 tracking-tight mb-5">
                Pricing
              </h2>
              <div className="rounded-xl border border-zinc-200 p-5 sm:p-6">
                <p className="text-sm text-zinc-500">{rate.model}</p>
                <p className="mt-1 tabular-nums">
                  <span className="text-sm text-zinc-400">from </span>
                  <span className="text-3xl font-bold tracking-tight text-zinc-900">{rate.price}</span>
                  <span className="text-zinc-500">
                    {rate.unit.startsWith("/") ? rate.unit : ` ${rate.unit}`}
                  </span>
                </p>
                <ul className="mt-5 grid gap-2 text-[15px] text-zinc-700 sm:grid-cols-2 sm:gap-x-8">
                  {rate.includes.map((item) => (
                    <li key={item} className="border-l-2 border-violet-200 pl-3">
                      {item}
                    </li>
                  ))}
                </ul>
                {rate.addOn && <p className="mt-5 text-sm text-zinc-500">{rate.addOn}</p>}
              </div>
              <p className="mt-4 text-sm text-zinc-500">
                You get a fixed quote after a free call.{" "}
                <Link href="/#pricing" className="font-medium text-violet-600 hover:underline">
                  See all pricing
                </Link>
                .
              </p>
            </section>
          )}

          {/* FAQ */}
          <section className="mt-14 sm:mt-16">
            <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900 tracking-tight mb-5">
              Common questions
            </h2>
            <dl className="flex flex-col divide-y divide-zinc-100 border-y border-zinc-100">
              {service.faq.map((item) => (
                <div key={item.q} className="py-5">
                  <dt className="text-[15px] font-semibold text-zinc-900 mb-2">
                    {item.q}
                  </dt>
                  <dd className="text-[15px] text-zinc-500 leading-relaxed">
                    {item.a}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Closing CTA */}
          <section className="mt-14 sm:mt-16 rounded-2xl border border-violet-100 bg-violet-50/60 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900 tracking-tight mb-2">
              See what you could hand off first
            </h2>
            <p className="text-zinc-500 leading-relaxed mb-5">
              A free 30-minute call, no sales pressure: we&apos;ll map where your
              week goes and which parts of it we can take off your plate.
            </p>
            <CalButton>Book a Discovery Call</CalButton>
          </section>

          {/* Related reading */}
          {related.length > 0 && (
            <section className="mt-14 sm:mt-16">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-violet-600 mb-5">
                Related reading
              </h2>
              <ul className="flex flex-col gap-4">
                {related.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group block rounded-xl border border-zinc-100 p-5 hover:border-violet-200 hover:shadow-sm transition-all"
                    >
                      <span className="block font-semibold text-zinc-900 group-hover:text-violet-700 transition-colors">
                        {post.title}
                      </span>
                      {post.excerpt && (
                        <span className="mt-1 block text-sm text-zinc-500 leading-relaxed line-clamp-2">
                          {post.excerpt}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Other services */}
          {others.length > 0 && (
            <section className="mt-14 sm:mt-16 border-t border-zinc-100 pt-10">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-violet-600 mb-5">
                Other services
              </h2>
              <ul className="flex flex-col gap-4">
                {others.map((other) => (
                  <li key={other.slug}>
                    <Link
                      href={`/services/${other.slug}`}
                      className="group block rounded-xl border border-zinc-100 p-5 hover:border-violet-200 hover:shadow-sm transition-all"
                    >
                      <span className="block font-semibold text-zinc-900 group-hover:text-violet-700 transition-colors">
                        {other.name}
                      </span>
                      <span className="mt-1 block text-sm text-zinc-500 leading-relaxed">
                        {other.description}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
