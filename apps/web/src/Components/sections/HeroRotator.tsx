"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/**
 * The hero's second line. Each phrase is one of the jobs a founder stops
 * doing: the back office (support), the IT team (custom tools), the inbox and
 * the CRM (agents and automations). "back office." is what's server-rendered,
 * so crawlers and the LCP paint get the real headline.
 */
const phrases = ["back office.", "IT team.", "inbox.", "CRM."];
const longest = phrases.reduce((a, b) => (b.length > a.length ? b : a));

const FIRST_HOLD_MS = 2800;
const HOLD_MS = 2200;

export default function HeroRotator() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = setTimeout(
      () => setIndex((i) => (i + 1) % phrases.length),
      index === 0 ? FIRST_HOLD_MS : HOLD_MS,
    );
    return () => clearTimeout(id);
  }, [index, reduce]);

  return (
    // The line is sized by an invisible ::before holding the longest phrase,
    // so it never reflows as phrases change. A pseudo-element rather than a
    // hidden span keeps the H1's text content to the one real headline.
    <span
      data-sizer={longest}
      className="relative inline-grid pb-[0.14em] align-top before:invisible before:col-start-1 before:row-start-1 before:content-[attr(data-sizer)]"
    >
      <AnimatePresence initial={false}>
        <motion.span
          key={phrases[index]}
          className="relative col-start-1 row-start-1 justify-self-center"
          initial={{ y: "0.35em", opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-0.35em", opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">
            {phrases[index]}
          </span>
          {/* Hand-drawn underline, sized to the phrase and redrawn on each one. */}
          <svg
            aria-hidden
            viewBox="0 0 300 16"
            preserveAspectRatio="none"
            className="pointer-events-none absolute -bottom-[0.12em] left-[4%] h-[0.16em] w-[92%] overflow-visible"
          >
            <motion.path
              d="M3 11 C 60 3, 120 3, 170 8 S 260 14, 297 5"
              fill="none"
              stroke="url(#hero-underline)"
              strokeWidth="5"
              strokeLinecap="round"
              initial={{ pathLength: reduce ? 1 : 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, ease: "easeInOut", delay: index === 0 ? 0.5 : 0.2 }}
            />
          </svg>
        </motion.span>
      </AnimatePresence>

      {/* Gradient shared by every underline. */}
      <svg aria-hidden width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="hero-underline" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="55%" stopColor="#d946ef" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  );
}
