import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const postsDirectory = path.join(process.cwd(), "src/posts");

export interface FaqItem {
  q: string;
  a: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  /** Title tag override. Lets the SERP title stay short while the H1 stays descriptive. */
  seoTitle: string;
  date: string;
  /** ISO date of the last meaningful edit. Falls back to `date`. */
  updated: string;
  excerpt: string;
  keywords: string[];
}

export interface Post extends PostMeta {
  content: string;
  faq: FaqItem[];
}

interface HeadingNode {
  type: string;
  depth?: number;
  children?: HeadingNode[];
}

/**
 * The post layout already renders the frontmatter title as the page's only h1,
 * so a stray `# ` in a body can never be allowed to render as a second one.
 */
function remarkNoBodyH1() {
  return (tree: HeadingNode) => {
    const walk = (node: HeadingNode) => {
      if (node.type === "heading" && node.depth === 1) node.depth = 2;
      node.children?.forEach(walk);
    };
    walk(tree);
  };
}

function toMeta(slug: string, data: Record<string, unknown>): PostMeta {
  const date = (data.date as string) ?? "";
  const title = (data.title as string) ?? slug;
  return {
    slug,
    title,
    seoTitle: (data.seoTitle as string) ?? title,
    date,
    updated: (data.updated as string) ?? date,
    excerpt: (data.excerpt as string) ?? "",
    keywords: Array.isArray(data.keywords) ? (data.keywords as string[]) : [],
  };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];
  const posts = fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const { data } = matter(fs.readFileSync(fullPath, "utf8"));
      return toMeta(slug, data);
    });
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const { data, content } = matter(fs.readFileSync(fullPath, "utf8"));
  const processed = await remark()
    .use(remarkNoBodyH1)
    .use(remarkHtml)
    .process(content);
  return {
    ...toMeta(slug, data),
    faq: Array.isArray(data.faq) ? (data.faq as FaqItem[]) : [],
    content: processed.toString(),
  };
}
