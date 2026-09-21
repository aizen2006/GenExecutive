import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { services } from "@/lib/services";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.genexecutive.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const servicePages = services.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...servicePages,
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    ...posts,
  ];
}
