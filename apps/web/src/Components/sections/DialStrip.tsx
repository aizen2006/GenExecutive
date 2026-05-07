"use client";

import { useRef, useState } from "react";
import {
  useScroll,
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
const N = 14;           // total tools
const SPACING = 92;     // px between item centres (horizontal)
const ARC = 4.8;        // y = offset² × ARC  — controls how steeply ends dip
const FADE_RADIUS = 3.6;// opacity hits 0 beyond this offset distance
const SCALE_FLOOR = 0.6;// minimum scale for edge items

// ─── Data ─────────────────────────────────────────────────────
interface Tool { id: string; name: string }

const TOOLS: Tool[] = [
  { id: "chatgpt",          name: "ChatGPT"          },
  { id: "claude",           name: "Claude"            },
  { id: "gemini",           name: "Gemini"            },
  { id: "copilot",          name: "Copilot"           },
  { id: "perplexity",       name: "Perplexity"        },
  { id: "midjourney",       name: "Midjourney"        },
  { id: "elevenlabs",       name: "ElevenLabs"        },
  { id: "runway",           name: "Runway"            },
  { id: "cursor",           name: "Cursor"            },
  { id: "notion-ai",        name: "Notion AI"         },
  { id: "jasper",           name: "Jasper"            },
  { id: "make",             name: "Make"              },
  { id: "stable-diffusion", name: "Stable Diffusion"  },
  { id: "huggingface",      name: "HuggingFace"       },
];

// ─── Helpers ──────────────────────────────────────────────────
// Signed offset (wrapped to [-N/2, N/2]) from current scroll position
function offset(index: number, pos: number): number {
  let d = index - pos;
  if (d > N / 2) d -= N;
  if (d < -N / 2) d += N;
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredTool, setHoveredTool] = useState<Tool | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // pos: 0 → N as user scrolls through (one full pass through all tools)
  const pos = useTransform(scrollYProgress, [0, 1], [0, N]);

  // Hint fades out as soon as scrolling begins
  const hintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    // Tall outer div gives the scroll "room" the sticky section consumes
    <div ref={containerRef} style={{ height: "240vh" }}>
      <section
        className="sticky top-0 w-full flex flex-col items-center overflow-hidden py-14"
        style={{ background: BG }}
      >
        {/* ── Header ── */}
        <div className="text-center mb-6 select-none">
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9b9186] mb-1.5"
            style={{ fontFamily: FONT_DM }}
          >
            Powered by
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
          <div
            style={{ position: "relative", height: 142, overflow: "hidden" }}
          >
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

        {/* ── Scroll hint ── */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="mt-6 flex flex-col items-center gap-2 pointer-events-none select-none"
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
              <rect
                x="1" y="1" width="18" height="26" rx="9"
                stroke="#b8b0a8" strokeWidth="1.5"
              />
              <rect
                x="9" y="5" width="2" height="5" rx="1"
                fill="#b8b0a8"
              />
            </svg>
          </motion.div>
          <p
            className="text-[11px] text-[#b8b0a8] tracking-wide"
            style={{ fontFamily: FONT_DM }}
          >
            Scroll to explore
          </p>
        </motion.div>
      </section>
    </div>
  );
}
