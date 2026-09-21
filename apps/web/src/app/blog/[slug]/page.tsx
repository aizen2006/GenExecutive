import { getPostBySlug, getAllPosts } from "@/lib/posts";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.genexecutive.in";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  const url = `${siteUrl}/blog/${slug}`;
  return {
    title: { absolute: post.seoTitle },
    description: post.excerpt,
    keywords: post.keywords.length ? post.keywords : undefined,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      siteName: "GenExecutive",
      publishedTime: new Date(post.date).toISOString(),
      modifiedTime: new Date(post.updated).toISOString(),
      authors: ["GenExecutive"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const url = `${siteUrl}/blog/${slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.updated).toISOString(),
    author: { "@type": "Organization", name: "GenExecutive", url: siteUrl },
    publisher: {
      "@type": "Organization",
      name: "GenExecutive",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/genexe-icon.png`,
      },
    },
    image: [`${url}/opengraph-image`],
    inLanguage: "en",
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    ...(post.keywords.length ? { keywords: post.keywords.join(", ") } : {}),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  const faqJsonLd = post.faq.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }
    : null;

  const related = getAllPosts()
    .filter((p) => p.slug !== slug)
    .slice(0, 2);

  return (
    <main className="min-h-svh bg-white pt-28 sm:pt-32 pb-20 sm:pb-24 px-5 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <div className="max-w-2xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex min-h-11 items-center gap-1 text-sm text-zinc-400 hover:text-violet-600 transition-colors mb-6 sm:mb-10"
        >
          ← Back to Blog
        </Link>
        <time
          dateTime={new Date(post.date).toISOString()}
          className="text-xs text-zinc-400 font-medium uppercase tracking-wide block"
        >
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <h1 className="mt-3 text-[28px] sm:text-4xl font-bold text-zinc-900 tracking-tight leading-tight mb-8 sm:mb-10">
          {post.title}
        </h1>
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {related.length > 0 && (
          <section className="mt-16 border-t border-zinc-100 pt-10">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-violet-600 mb-5">
              Continue reading
            </h2>
            <ul className="flex flex-col gap-4">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/blog/${item.slug}`}
                    className="group block rounded-xl border border-zinc-100 p-5 hover:border-violet-200 hover:shadow-sm transition-all"
                  >
                    <span className="block font-semibold text-zinc-900 group-hover:text-violet-700 transition-colors">
                      {item.title}
                    </span>
                    {item.excerpt && (
                      <span className="mt-1 block text-sm text-zinc-500 leading-relaxed line-clamp-2">
                        {item.excerpt}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
