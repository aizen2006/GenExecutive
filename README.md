# GenExecutive

**Executive Intelligence & AI Automation** — world-class executive support combined with AI-powered workflows, custom agents, landing pages, and MVP development.

## Overview

GenExecutive is a Next.js marketing site and service platform offering:

- **Executive Support** — calendar management, email triage, travel coordination, vendor relations
- **AI Automation** — custom automations that run 24/7 across your business workflows
- **AI Agents** — autonomous agents handling complex multi-step tasks
- **Landing Pages** — high-converting pages built for your campaigns
- **MVP Development** — lean, production-ready products launched in weeks

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| UI | React 19 |
| Styling | Tailwind CSS v4 |
| Animations | Motion (Framer Motion v12) |
| Scheduling | Cal.com Embed |
| Monorepo | Turborepo |
| Package Manager | Bun |

## Project Structure

```
gen_executive_V2.0/
├── apps/
│   └── web/                        # Main Next.js site
│       ├── src/
│       │   ├── app/                # Next.js App Router pages
│       │   │   ├── blog/           # Blog list + [slug] post pages
│       │   │   ├── sitemap.ts      # Auto-generated sitemap
│       │   │   ├── robots.ts       # Robots.txt
│       │   │   ├── opengraph-image.tsx  # Dynamic OG image
│       │   │   ├── layout.tsx      # Root layout + metadata
│       │   │   └── page.tsx        # Homepage
│       │   ├── Components/
│       │   │   ├── sections/       # Page sections (Hero, About, Features, …)
│       │   │   ├── ui/             # Shared UI primitives (Button)
│       │   │   ├── navbar.tsx
│       │   │   ├── testimonials.tsx
│       │   │   └── caldotcom.tsx   # Cal.com booking button
│       │   ├── lib/
│       │   │   └── posts.ts        # Blog markdown reader (gray-matter + remark)
│       │   └── posts/              # Blog post .md files (drop here to publish)
│       └── next.config.ts
├── packages/                       # Shared ESLint + TypeScript configs
├── turbo.json
└── package.json
```

## Getting Started

**Prerequisites:** Node.js 18+, [Bun](https://bun.sh)

```sh
# Install dependencies (from repo root)
bun install

# Start the web app in dev mode
bun dev --filter=web

# Or from apps/web directly
cd apps/web && bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

Run from the repo root:

```sh
bun run dev        # Dev all apps
bun run build      # Production build all apps
bun run lint       # Lint all apps
bun run format     # Prettier format
```

Or scoped to the web app:

```sh
bun run dev --filter=web
bun run build --filter=web
```

## Blog — Publishing a Post

The blog is file-system driven — no CMS or database. To publish:

1. Create a new file in `apps/web/src/posts/`:
   ```
   apps/web/src/posts/my-post-title.md
   ```

2. Add frontmatter at the top:
   ```md
   ---
   title: "Your Post Title"
   date: "2026-05-10"
   excerpt: "A short summary shown on the blog list page."
   ---

   Your content here...
   ```

3. Push to your deployment branch — the post goes live automatically.

The filename becomes the URL slug: `my-post-title.md` → `/blog/my-post-title`.

## Environment Variables

Create `apps/web/.env.local` for local overrides:

```env
# Production site URL — used for sitemap and OG metadata
NEXT_PUBLIC_SITE_URL=https://genexecutive.com
```

## Deployment

Recommended: **Vercel** (zero-config for Next.js)

1. Push to GitHub
2. Import repo at [vercel.com/new](https://vercel.com/new)
3. Set root directory to `apps/web`
4. Add `NEXT_PUBLIC_SITE_URL` environment variable
5. Deploy

Alternatively deploy via CLI:
```sh
cd apps/web
npx vercel --prod
```
