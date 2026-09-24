"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

/* The documents the company brain reads from. Names match the chat's sources. */
export const docs = [
  { id: "pricing-2026.xlsx", tone: "bg-emerald-500" },
  { id: "Slack #clients", tone: "bg-fuchsia-500" },
  { id: "proposal-northwind.pdf", tone: "bg-rose-500" },
  { id: "Notion: Onboarding", tone: "bg-zinc-800" },
  { id: "policies/refunds.md", tone: "bg-sky-500" },
];

const SPRING = { type: "spring", stiffness: 380, damping: 30 } as const;

/** Fan position for card `index` of `count`: centre card highest and largest. */
function fan(index: number, count: number) {
  const offset = index - (count - 1) / 2;
  const distance = Math.abs(offset);
  return {
    x: offset * 26,
    y: 6 - Math.max(0, 2 - distance) * 5,
    rotate: offset * 6,
    scale: distance === 0 ? 1.04 : distance === 1 ? 0.95 : 0.88,
    zIndex: 10 - distance,
  };
}

function MiniDoc({ tone, label }: { tone: string; label: string }) {
  return (
    <span className="flex h-full flex-col gap-1 p-1.5">
      <span className={`h-1.5 w-5 rounded-full ${tone}`} />
      <span className="h-1 w-full rounded-full bg-zinc-200" />
      <span className="h-1 w-4/5 rounded-full bg-zinc-200" />
      <span className="h-1 w-full rounded-full bg-zinc-200" />
      <span className="mt-auto truncate text-[7px] leading-none text-zinc-500">{label}</span>
    </span>
  );
}

interface DocFolderProps {
  /** Opens the folder regardless of hover, e.g. while the brain is searching. */
  searching?: boolean;
  /** Document ids to lift out and highlight, e.g. an answer's sources. */
  cited?: string[];
}

/**
 * A folder of company documents. Hover, focus or tap fans the files out; the
 * documents an answer cites lift out and glow.
 */
export default function DocFolder({ searching = false, cited = [] }: DocFolderProps) {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState(false);
  const [pinned, setPinned] = useState(false);
  const open = (hover || pinned || searching) && !reduce;

  return (
    <button
      type="button"
      aria-pressed={pinned}
      aria-label={`Company docs, 1,240 files. ${pinned ? "Close" : "Open"} the folder`}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      onClick={() => setPinned((v) => !v)}
      className="relative mx-auto block h-[104px] w-full max-w-[230px] rounded-2xl [perspective:900px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-600"
    >
      {/* Back panel. */}
      <motion.span
        aria-hidden
        animate={{ rotateX: open ? 12 : 0 }}
        transition={SPRING}
        className="absolute inset-x-0 bottom-0 top-3 rounded-2xl bg-violet-100/80 ring-1 ring-violet-200 [transform-origin:center_bottom]"
      />

      {/* Files. */}
      <span aria-hidden className="pointer-events-none absolute left-1/2 top-1 block h-0 w-0">
        {docs.map((doc, i) => {
          const f = fan(i, docs.length);
          const isCited = cited.includes(doc.id);
          const spread = open ? 1.45 : 1;
          return (
            <motion.span
              key={doc.id}
              initial={false}
              animate={{
                x: f.x * spread,
                y: f.y + (open ? -10 : 0) + (isCited ? -16 : 0),
                rotate: f.rotate * (open ? 1.3 : 1),
                scale: f.scale * (isCited ? 1.08 : 1),
              }}
              transition={SPRING}
              className={`absolute -ml-6 block h-16 w-12 overflow-hidden rounded-md bg-white shadow-sm ring-1 transition-shadow ${
                isCited ? "shadow-[0_6px_18px_rgba(124,58,237,0.35)] ring-violet-400" : "ring-zinc-200"
              }`}
              style={{ zIndex: isCited ? 20 : f.zIndex }}
            >
              <MiniDoc tone={doc.tone} label={doc.id} />
            </motion.span>
          );
        })}
      </span>

      {/* Front flap. */}
      <motion.span
        aria-hidden
        animate={{ rotateX: open ? -24 : 0 }}
        transition={SPRING}
        className="absolute inset-x-0 bottom-0 z-30 flex h-12 items-center justify-between rounded-2xl bg-white/80 px-3.5 ring-1 ring-zinc-200 backdrop-blur-md [backface-visibility:hidden] [transform-origin:center_bottom]"
      >
        <span className="text-[13px] font-semibold text-zinc-900">Company docs</span>
        <span className="text-[11px] tabular-nums text-zinc-500">1,240 files</span>
      </motion.span>
    </button>
  );
}
