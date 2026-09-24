import type { ReactNode } from "react";
import Link from "next/link";

interface BentoCardProps {
  title: string;
  description: string;
  /** Mini preview of the thing this service produces. */
  visual: ReactNode;
  /** e.g. "from $400/month". Omitted on supporting cards. */
  price?: string;
  href: string;
  linkLabel: string;
  /** Tailwind gradient stops for the card surface. */
  surface?: string;
  className?: string;
}

/** Shared shell for the homepage services bento; each service supplies its own visual. */
export default function BentoCard({
  title,
  description,
  visual,
  price,
  href,
  linkLabel,
  surface = "from-white to-zinc-50",
  className = "",
}: BentoCardProps) {
  return (
    <article
      className={`relative flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-br ${surface} p-6 shadow-sm transition-colors hover:border-violet-200 sm:p-7 ${className}`}
    >
      <h3 className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-zinc-500">{description}</p>

      <div className="mt-5 flex flex-1 flex-col">{visual}</div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        {price && <span className="text-sm text-zinc-500">{price}</span>}
        <Link
          href={href}
          className="inline-flex min-h-11 items-center text-sm font-semibold text-violet-600 transition-colors hover:text-violet-700"
        >
          {linkLabel}
        </Link>
      </div>
    </article>
  );
}
