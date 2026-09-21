import type { NextConfig } from "next";

// Single source of truth for the canonical host, shared with the metadata in
// src/app/layout.tsx and the sitemap. Deriving the redirect from it means the
// 301 can never point away from the host the canonicals name.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.genexecutive.in";
const primaryHost = new URL(siteUrl).host;
const altHost = primaryHost.startsWith("www.")
  ? primaryHost.slice(4)
  : `www.${primaryHost}`;

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  // Fallback host canonicalisation. Prefer an edge redirect in the hosting
  // dashboard (Vercel → Domains, or a Cloudflare redirect rule): that is served
  // without a serverless invocation. This rule is harmless if one exists —
  // the edge redirect fires first and this never runs.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: altHost }],
        destination: `${siteUrl}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
