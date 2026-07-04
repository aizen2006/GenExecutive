"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";

/**
 * Typewriter that cycles a list of phrases: types a word out char-by-char,
 * holds, deletes it, then moves to the next — looping forever. The typed text
 * carries the violet→indigo gradient; a caret blinks beside it (CSS).
 * GSAP-driven (updates textContent, no per-frame React re-render); the caret
 * animation and reduced-motion fallback are handled in CSS / a guard.
 */
export default function Typewriter({ words }: { words: string[] }) {
  const typed = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = typed.current;
    if (!el || words.length === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = words[0];
      return;
    }

    const tl = gsap.timeline({ repeat: -1 });
    words.forEach((word) => {
      const o = { n: 0 };
      const render = () => {
        el.textContent = word.slice(0, Math.round(o.n));
      };
      tl.to(o, {
        n: word.length,
        duration: Math.max(0.4, word.length * 0.07),
        ease: `steps(${word.length})`,
        onUpdate: render,
      });
      tl.to({}, { duration: 1.3 }); // hold on the full word
      tl.to(o, {
        n: 0,
        duration: Math.max(0.3, word.length * 0.035),
        ease: `steps(${word.length})`,
        onUpdate: render,
      });
      tl.to({}, { duration: 0.25 }); // brief pause before next word
    });
  }, { scope: typed });

  return (
    <span className="inline-flex items-baseline" aria-hidden="true">
      <span
        ref={typed}
        className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent"
      />
      <span className="tw-caret ml-1 inline-block h-[0.82em] w-[3px] translate-y-[0.06em] rounded-full bg-gradient-to-b from-violet-500 to-indigo-500" />
    </span>
  );
}
