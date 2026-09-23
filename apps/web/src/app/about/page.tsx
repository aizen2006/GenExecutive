import Link from "next/link";
import type { Metadata } from "next";
import { services } from "@/lib/services";
import { company, siteUrl, team } from "@/lib/company";
import CalButton from "@/Components/caldotcom";
import Footer from "@/Components/sections/footer";

const title = "About GenExecutive — Virtual Executive Assistants + AI Automation";
const description =
  "GenExecutive pairs experienced executive assistants with AI automation to run the back office for small businesses, coaches and consultants in the US and UK.";

export const metadata: Metadata = {
  // Absolute: this title already carries the brand.
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/about` },
  openGraph: {
    type: "website",
    title,
    description,
    url: `${siteUrl}/about`,
    siteName: "GenExecutive",
    images: [
      { url: "/opengraph-image", width: 1200, height: 630, alt: "About GenExecutive" },
    ],
  },
  twitter: { card: "summary_large_image", title, description },
};

// Same figures as the homepage About section.
const stats = [
  { value: "50+", label: "Businesses supported" },
  { value: "10+", label: "Hours saved per client / week" },
  { value: "24/7", label: "AI systems running" },
  { value: "4.9★", label: "Average client rating" },
];

const principles = [
  {
    heading: "Humans for judgment, AI for volume",
    body: "Software is fast and never forgets; people understand context and can be trusted with your name on a message. Every plan uses both: automation takes the mechanical steps, and an experienced assistant handles, reviews and approves the rest.",
  },
  {
    heading: "Nothing sensitive goes out unreviewed",
    body: "Refunds, contracts and anything sent under your name go through human-in-the-loop review. Automation speeds the work up; it doesn't make your decisions.",
  },
  {
    heading: "You own what we build",
    body: "Automations are built on mainstream tools you can see and control, then tested, documented and handed over with training, so your team is never dependent on us to understand them.",
  },
  {
    heading: "Monthly, not locked in",
    body: "Plans are monthly with no fixed end date. Scale up, scale down or pause whenever your needs change.",
  },
];

export default function AboutPage() {
  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: title,
    description,
    url: `${siteUrl}/about`,
    mainEntity: { "@id": `${siteUrl}/#organization` },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "About", item: `${siteUrl}/about` },
    ],
  };

  return (
    <>
      <main className="min-h-svh bg-white pt-28 sm:pt-32 pb-20 sm:pb-24 px-5 sm:px-6">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
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
              <li className="text-zinc-600">About</li>
            </ol>
          </nav>

          <span className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-3 block">
            About us
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-zinc-900 tracking-tight leading-tight mb-5">
            The back office behind growing businesses
          </h1>
          <p className="text-zinc-500 text-base sm:text-lg leading-relaxed">
            GenExecutive was founded on one belief: the best founders and
            executives shouldn&apos;t be buried in logistics. We pair
            experienced executive assistants with AI automation and custom AI
            agents, so the admin, operations, customer support and content that
            fill a week get handled, and the person meant to be growing the
            business gets to do that instead.
          </p>
          <p className="mt-4 text-zinc-500 text-base sm:text-lg leading-relaxed">
            We work with small businesses, coaches, consultants and scaling
            teams in the US and UK.
          </p>

          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {stats.map((stat) => (
              <li key={stat.label} className="rounded-2xl border border-zinc-100 bg-zinc-50/60 p-5">
                <div className="text-2xl font-bold text-zinc-900 mb-1">{stat.value}</div>
                <div className="text-[13px] text-zinc-500 leading-snug">{stat.label}</div>
              </li>
            ))}
          </ul>

          <section className="mt-14 sm:mt-16">
            <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900 tracking-tight mb-3">
              What we do
            </h2>
            <p className="text-zinc-500 leading-relaxed">
              We run two services that work best together. Our{" "}
              <Link href="/services/executive-support" className="font-medium text-violet-600 hover:underline">
                virtual executive assistant service
              </Link>{" "}
              takes over calendar, inbox, travel, meeting preparation, documents
              and vendor coordination. Our{" "}
              <Link href="/services/ai-automation" className="font-medium text-violet-600 hover:underline">
                AI automation service
              </Link>{" "}
              builds the workflows and AI agents that remove repetitive steps
              around that work: lead routing, CRM updates, email triage,
              onboarding and reporting. Every plan includes both, plus content
              support such as AI avatar videos and social media assistance.
            </p>
          </section>

          <section className="mt-14 sm:mt-16">
            <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900 tracking-tight mb-6">
              How we work
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {principles.map((p) => (
                <div key={p.heading}>
                  <h3 className="font-semibold text-zinc-900 mb-2">{p.heading}</h3>
                  <p className="text-[15px] text-zinc-500 leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </section>

          {team.length > 0 && (
            <section className="mt-14 sm:mt-16">
              <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900 tracking-tight mb-6">
                The team
              </h2>
              <ul className="grid gap-6 sm:grid-cols-2">
                {team.map((m) => (
                  <li key={m.id} className="rounded-2xl border border-zinc-100 p-5">
                    <h3 className="font-semibold text-zinc-900">{m.name}</h3>
                    <p className="text-sm text-violet-700">{m.role}</p>
                    <p className="mt-2 text-[15px] text-zinc-500 leading-relaxed">{m.bio}</p>
                    {m.linkedin && (
                      <a
                        href={m.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-violet-600 hover:underline"
                      >
                        LinkedIn
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="mt-14 sm:mt-16 rounded-2xl border border-violet-100 bg-violet-50/60 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900 tracking-tight mb-2">
              Talk to us
            </h2>
            <p className="text-zinc-500 leading-relaxed mb-5">
              Book a free 30-minute call, or email{" "}
              <a href={`mailto:${company.email}`} className="font-medium text-violet-600 hover:underline">
                {company.email}
              </a>
              . You can also find us on{" "}
              <a href={company.sameAs[1]} target="_blank" rel="noopener noreferrer" className="font-medium text-violet-600 hover:underline">
                LinkedIn
              </a>{" "}
              and{" "}
              <a href={company.sameAs[0]} target="_blank" rel="noopener noreferrer" className="font-medium text-violet-600 hover:underline">
                X
              </a>
              .
            </p>
            <CalButton>Book a Discovery Call</CalButton>
          </section>

          <section className="mt-14 sm:mt-16 border-t border-zinc-100 pt-10">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-violet-600 mb-5">
              Our services
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
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
