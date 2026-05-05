import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — GenExecutive",
  description: "Insights on executive support, AI automation, and business performance.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-white pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-3 block">
            Insights
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 tracking-tight mb-4">
            The GenExecutive Blog
          </h1>
          <p className="text-zinc-500 text-lg">
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
                className="group block rounded-2xl border border-zinc-100 bg-white p-7 shadow-sm hover:border-violet-200 hover:shadow-md transition-all"
              >
                <time className="text-xs text-zinc-400 font-medium uppercase tracking-wide">
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
