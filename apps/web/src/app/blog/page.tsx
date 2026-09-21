import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.genexecutive.in";
const description =
  "Insights on executive support, AI automation, and business operations — practical thinking on removing bottlenecks and growing faster.";

export const metadata: Metadata = {
  // Absolute: this title carries its own brand, so skip the layout template.
  title: { absolute: "AI Automation & Executive Ops Insights | GenExecutive" },
  description,
  alternates: { canonical: `${siteUrl}/blog` },
  openGraph: {
    type: "website",
    title: "Blog — GenExecutive",
    description,
    url: `${siteUrl}/blog`,
    siteName: "GenExecutive",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "The GenExecutive Blog",
      },
    ],
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "The GenExecutive Blog",
    description,
    url: `${siteUrl}/blog`,
    publisher: { "@type": "Organization", name: "GenExecutive", url: siteUrl },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: new Date(post.date).toISOString(),
      dateModified: new Date(post.updated).toISOString(),
      url: `${siteUrl}/blog/${post.slug}`,
    })),
  };

  return (
    <main className="min-h-svh bg-white pt-28 sm:pt-32 pb-20 sm:pb-24 px-5 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <div className="max-w-3xl mx-auto">
        <div className="mb-10 sm:mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-3 block">
            Insights
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-zinc-900 tracking-tight mb-4">
            The GenExecutive Blog
          </h1>
          <p className="text-zinc-500 text-base sm:text-lg">
            Thoughts on executive support, AI, and building better businesses.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-zinc-400 text-sm">No posts yet — check back soon.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block rounded-2xl border border-zinc-100 bg-white p-5 sm:p-7 shadow-sm hover:border-violet-200 hover:shadow-md transition-all"
              >
                <time
                  dateTime={new Date(post.date).toISOString()}
                  className="text-xs text-zinc-400 font-medium uppercase tracking-wide"
                >
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <h2 className="mt-2 text-xl font-semibold text-zinc-900 group-hover:text-violet-700 transition-colors">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="mt-2 text-zinc-500 text-sm leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-violet-600">
                  Read more →
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
