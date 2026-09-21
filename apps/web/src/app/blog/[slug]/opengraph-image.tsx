import { ImageResponse } from "next/og";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

// Node runtime: the card is rendered from the markdown source at build time.
export const alt = "GenExecutive blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

// Prerender one card per post instead of rendering on demand.
export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

/** Long headlines get a smaller face so the card never overflows. */
function titleSize(title: string) {
  if (title.length > 70) return 50;
  if (title.length > 50) return 58;
  return 68;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const title = post?.title ?? "GenExecutive";

  return new ImageResponse(
    (
      <div
        style={{
          // Satori has no blur filter, so the glow is baked into the gradients.
          backgroundColor: "#3730a3",
          backgroundImage: [
            "radial-gradient(circle at 78% 12%, rgba(167,139,250,0.45) 0%, rgba(167,139,250,0) 55%)",
            "radial-gradient(circle at 8% 92%, rgba(129,140,248,0.35) 0%, rgba(129,140,248,0) 50%)",
            "linear-gradient(135deg, #4c1d95 0%, #3730a3 100%)",
          ].join(","),
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px 22px",
            borderRadius: 9999,
            background: "rgba(255,255,255,0.14)",
            border: "1px solid rgba(255,255,255,0.24)",
            fontSize: 18,
            color: "rgba(233,228,255,0.95)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontWeight: 600,
            alignSelf: "flex-start",
          }}
        >
          Insights
        </div>

        <div
          style={{
            display: "flex",
            fontSize: titleSize(title),
            fontWeight: 800,
            color: "white",
            letterSpacing: "-2px",
            lineHeight: 1.15,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.18)",
            paddingTop: 28,
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "white",
              letterSpacing: "-1px",
            }}
          >
            GenExecutive
          </div>
          <div style={{ fontSize: 22, color: "rgba(221,214,254,0.85)" }}>
            genexecutive.in
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
