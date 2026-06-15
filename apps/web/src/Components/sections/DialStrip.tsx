"use client";

import { useEffect, useState } from "react";
import {
  animate,
  useMotionValue,
  useTransform,
  motion,
  AnimatePresence,
} from "motion/react";
import type { MotionValue } from "motion/react";

// ─── Tokens ───────────────────────────────────────────────────
const BG = "#f8f7f4";
const FONT_DM = "var(--font-dm-sans), 'DM Sans', system-ui, sans-serif";
const FONT_SERIF =
  "var(--font-instrument-serif), 'Instrument Serif', Georgia, serif";

// ─── Wheel geometry ───────────────────────────────────────────
const N = 6;            // total tools
const SPACING = 92;     // px between item centres (horizontal)
const ARC = 4.8;        // y = offset² × ARC  — controls how steeply ends dip
const FADE_RADIUS = 3.6;// opacity hits 0 beyond this offset distance
const SCALE_FLOOR = 0.6;// minimum scale for edge items

// ─── Data ─────────────────────────────────────────────────────
interface Tool { id: string; name: string }

const TOOLS: Tool[] = [
  { id: "chatgpt",    name: "ChatGPT"    },
  { id: "claude",     name: "Claude"     },
  { id: "gemini",     name: "Gemini"     },
  { id: "make",       name: "Make"       },
  { id: "notion-ai",  name: "Notion AI"  },
  { id: "perplexity", name: "Perplexity" },
];

// ─── Helpers ──────────────────────────────────────────────────
// Signed offset (wrapped to (-N/2, N/2]) from the current wheel position.
// Modulo-based so it stays correct even as `pos` grows unbounded over time.
function offset(index: number, pos: number): number {
  let d = (((index - pos) % N) + N) % N; // [0, N)
  if (d > N / 2) d -= N; // (-N/2, N/2]
  return d;
}

// ─── Per-item component (owns its own useTransform hooks) ─────
interface ItemProps {
  tool: Tool;
  index: number;
  pos: MotionValue<number>;
  hovered: boolean;
  onHover: (t: Tool | null) => void;
}

function WheelItem({ tool, index, pos, hovered, onHover }: ItemProps) {
  // Horizontal position: linear from centre
  const x = useTransform(pos, (p) => offset(index, p) * SPACING);

  // Vertical arc: parabolic — ends dip downward
  const y = useTransform(pos, (p) => {
    const d = offset(index, p);
    return d * d * ARC;
  });

  // Opacity: fades toward edge
  const opacity = useTransform(pos, (p) => {
    const d = Math.abs(offset(index, p));
    return Math.max(0, 1 - d / FADE_RADIUS);
  });

  // Scale: shrinks toward edge
  const scale = useTransform(pos, (p) => {
    const d = Math.abs(offset(index, p));
    return Math.max(SCALE_FLOOR, 1 - d * ((1 - SCALE_FLOOR) / FADE_RADIUS));
  });

  return (
    <motion.div
      style={{
        position: "absolute",
        left: "50%",
        top: 0,
        x,
        y,
        scale,
        opacity,
        translateX: "-50%",
      }}
      onMouseEnter={() => onHover(tool)}
      onMouseLeave={() => onHover(null)}
      className="cursor-pointer"
    >
      <div
        className={[
          "w-[72px] h-[72px] rounded-full bg-white",
          "flex items-center justify-center",
          "border-2 transition-colors duration-150 select-none",
          hovered ? "border-violet-400" : "border-[#dbd5ce]",
        ].join(" ")}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/logos/${tool.id}.svg`}
          alt={tool.name}
          width={40}
          height={40}
          className="w-10 h-10 object-contain pointer-events-none"
          draggable={false}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      </div>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────
export default function DialStrip() {
  const [hoveredTool, setHoveredTool] = useState<Tool | null>(null);

  // pos auto-advances over time (one full pass every ~13s). No scroll-jacking,
  // so the page scrolls smoothly past this section. Pausing on hover keeps the
  // tool label readable. offset() wraps pos so the 0→N loop is seamless.
  const pos = useMotionValue(0);
  const paused = hoveredTool !== null;

  useEffect(() => {
    if (paused) return;
    // Loop [start, start+N]; offset() wraps mod N so the restart jump is invisible.
    const start = pos.get();
    const controls = animate(pos, start + N, {
      duration: 13,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });
    return () => controls.stop();
  }, [paused, pos]);

  return (
    <section
      className="w-full flex flex-col items-center overflow-hidden py-16"
      style={{ background: BG }}
    >
      {/* ── Header ── */}
      <div className="text-center mb-6 select-none">
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9b9186] mb-1.5"
          style={{ fontFamily: FONT_DM }}
        >
          Trusted Tools
        </p>
        <p
          className="text-3xl sm:text-4xl leading-tight bg-gradient-to-r from-violet-600 via-purple-500 to-violet-400 bg-clip-text text-transparent"
          style={{ fontFamily: FONT_SERIF, fontStyle: "italic" }}
        >
          genAI tools
        </p>
      </div>

      {/* ── Horizontal arc strip ── */}
      <div className="relative w-full" style={{ maxWidth: 860 }}>
        {/* Left/right fog: same BG colour, linear gradient */}
        <div
          className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(to right, ${BG} 0%, transparent 100%)`,
          }}
        />
        <div
          className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(to left, ${BG} 0%, transparent 100%)`,
          }}
        />

        {/*
          Item canvas.
          Height = item_size(72) + max arc drop at FADE_RADIUS(≈62px) + 8px pad = ~142px
          overflow:hidden clips any stragglers outside this box.
        */}
        <div style={{ position: "relative", height: 142, overflow: "hidden" }}>
          {TOOLS.map((tool, i) => (
            <WheelItem
              key={tool.id}
              tool={tool}
              index={i}
              pos={pos}
              hovered={hoveredTool?.id === tool.id}
              onHover={setHoveredTool}
            />
          ))}
        </div>
      </div>

      {/* ── Hovered tool label ── */}
      <div
        className="mt-4 h-6 flex items-center justify-center"
        style={{ fontFamily: FONT_DM }}
      >
        <AnimatePresence mode="wait">
          {hoveredTool && (
            <motion.span
              key={hoveredTool.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.14 }}
              className="text-sm font-medium text-[#3d3730]"
            >
              {hoveredTool.name}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
