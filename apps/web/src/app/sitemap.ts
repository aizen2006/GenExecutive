import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { services } from "@/lib/services";
import { legal, siteUrl } from "@/lib/company";

/**
 * Date of the last meaningful content change for pages that aren't driven by
 * post frontmatter. Bump by hand when a page's content changes. Using the
 * build time instead would tell crawlers every page changed on every deploy.
 */
const staticUpdated = {
  home: "2026-09-24",
  blog: "2026-09-23",
  services: "2026-09-24",
  about: "2026-09-24",
  contact: "2026-09-21",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  // The blog index changes whenever a post does.
  const latestPost = posts.reduce(
    (latest, post) => (post.updated > latest ? post.updated : latest),
    staticUpdated.blog,
  );

  return [
    { url: siteUrl, lastModified: new Date(staticUpdated.home) },
    { url: `${siteUrl}/blog`, lastModified: new Date(latestPost) },
    ...services.map((service) => ({
      url: `${siteUrl}/services/${service.slug}`,
      lastModified: new Date(staticUpdated.services),
    })),
    { url: `${siteUrl}/about`, lastModified: new Date(staticUpdated.about) },
    { url: `${siteUrl}/contact`, lastModified: new Date(staticUpdated.contact) },
    { url: `${siteUrl}/privacy`, lastModified: new Date(legal.lastUpdated) },
    { url: `${siteUrl}/terms`, lastModified: new Date(legal.lastUpdated) },
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updated),
    })),
  ];
}
