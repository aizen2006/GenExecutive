"use client";

import type { CSSProperties } from "react";
import { motion } from "motion/react";
import CalButton from "../caldotcom";
import HeroTrail from "./HeroTrail";
import HeroRotator from "./HeroRotator";

/**
 * The hero entrance is CSS (`.hero-line` in globals.css), not GSAP — it has to
 * run at first paint rather than at hydration. See the comment there.
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-svh items-center overflow-hidden bg-white"
    >
      {/* Gradient orbs (parallax on scroll). Smaller on phones — a 640px
          blur-3xl layer is a real GPU cost on mobile. */}
      <div
        data-parallax="-14"
        className="pointer-events-none absolute left-[-140px] top-[-100px] h-[380px] w-[380px] animate-blob rounded-full bg-violet-300/35 blur-3xl sm:h-[640px] sm:w-[640px]"
        style={{ "--blob-dur": "12s" } as CSSProperties}
      />
      <div
        data-parallax="18"
        className="blob-delay-2 pointer-events-none absolute bottom-[-120px] right-[-100px] h-[320px] w-[320px] animate-blob rounded-full bg-indigo-300/25 blur-3xl sm:h-[520px] sm:w-[520px]"
        style={{ "--blob-dur": "15s" } as CSSProperties}
      />
      <div
        data-parallax="10"
        className="blob-delay-4 pointer-events-none absolute right-[30%] top-1/2 hidden h-[380px] w-[380px] animate-blob rounded-full bg-pink-200/25 blur-3xl sm:block"
        style={{ "--blob-dur": "10s" } as CSSProperties}
      />

      {/* Inertia trail burst (behind the copy) */}
      <HeroTrail />

      {/* Centered copy */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-20 text-center sm:py-24">
        {/* `hero-rise`, not `hero-line`: the H1 is the LCP element, and an
            element that starts at opacity 0 doesn't count as painted until
            the fade finishes. It slides in but is visible from first paint. */}
        <h1
          className="hero-rise mx-auto mb-6 text-[44px] font-bold leading-[0.98] tracking-[-0.035em] text-zinc-900 sm:text-7xl lg:text-[88px]"
          style={{ "--hero-delay": "0.05s" } as CSSProperties}
        >
          <span className="block text-balance">Stop being your own</span>{" "}
          <HeroRotator />
        </h1>

        <p
          className="hero-line mx-auto mb-9 max-w-xl text-pretty text-base leading-relaxed text-zinc-500 sm:text-lg"
          style={{ "--hero-delay": "0.15s" } as CSSProperties}
        >
          We run your admin, build the custom tools your team actually needs,
          and put AI agents on the repetitive work, so you can get back to
          growing the business.
        </p>

        <div
          className="hero-line mx-auto flex w-full max-w-xs flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center sm:gap-4"
          style={{ "--hero-delay": "0.2s" } as CSSProperties}
        >
          <CalButton className="w-full sm:w-auto">Book a free call</CalButton>
          <motion.a
            href="#services"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="inline-flex h-12 w-full items-center justify-center rounded-full border border-zinc-200 bg-white px-7 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:border-zinc-300 hover:bg-zinc-50 sm:w-auto"
          >
            See what we build
          </motion.a>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center sm:bottom-10 [@media(max-height:720px)]:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <div className="flex h-10 w-5 items-start justify-center rounded-full border-2 border-zinc-300 p-1">
          <motion.div
            className="h-2 w-1 rounded-full bg-zinc-400"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
