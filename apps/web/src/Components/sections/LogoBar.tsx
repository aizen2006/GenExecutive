"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const logoSlots: { name: string; abbr: string }[][] = [
  [
    { name: "Acme Corp", abbr: "AC" },
    { name: "Apex Digital", abbr: "AD" },
  ],
  [
    { name: "NovaTech", abbr: "NT" },
    { name: "Crestview", abbr: "CV" },
  ],
  [
    { name: "Stride", abbr: "ST" },
    { name: "PeakFlow", abbr: "PF" },
  ],
  [
    { name: "Luminary", abbr: "LM" },
    { name: "Zenith AI", abbr: "ZA" },
  ],
];

function LogoSlot({
  logos,
  delay,
}: {
  logos: { name: string; abbr: string }[];
  delay: number;
}) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const interval = setInterval(
        () => setIdx((i) => (i + 1) % logos.length),
        3600,
      );
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [logos.length, delay]);

  const logo = logos[idx];

  return (
    <div className="relative h-12 w-44 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={logo.name}
          initial={{ rotateY: -90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: 90, opacity: 0 }}
          transition={{ duration: 0.38, ease: "easeOut" }}
          style={{ transformPerspective: 700 }}
          className="absolute flex items-center gap-3"
        >
          <div className="h-9 w-9 rounded-xl bg-zinc-100 border border-zinc-200/60 flex items-center justify-center text-[11px] font-bold text-zinc-500 shrink-0">
            {logo.abbr}
          </div>
          <span className="text-sm font-semibold text-zinc-400 whitespace-nowrap">
            {logo.name}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function LogoBar() {
  return (
    <section className="border-y border-zinc-100 bg-zinc-50/70 py-12 px-6">
      <p className="text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-400 mb-10">
        Trusted by forward-thinking businesses
      </p>
      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-14">
        {logoSlots.map((logos, i) => (
          <LogoSlot key={i} logos={logos} delay={i * 750} />
        ))}
      </div>
    </section>
  );
}

export default LogoBar;
