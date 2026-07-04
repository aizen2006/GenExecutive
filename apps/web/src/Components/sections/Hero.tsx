"use client";

import type { CSSProperties } from "react";
import { useRef } from "react";
import { motion } from "motion/react";
import { gsap, useGSAP } from "../../lib/gsap";
import CalButton from "../caldotcom";
import HeroTrail from "./HeroTrail";

export function Hero() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Entrance timeline — GSAP owns the hero copy (no motion/react here).
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.1,
      });
      tl.from(".hero-line", {
        y: 42,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.12,
      });
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-white"
    >
      {/* Gradient orbs (parallax on scroll) */}
      <div
        data-parallax="-14"
        className="pointer-events-none absolute left-[-140px] top-[-100px] h-[640px] w-[640px] animate-blob rounded-full bg-violet-300/35 blur-3xl"
        style={{ "--blob-dur": "12s" } as CSSProperties}
      />
      <div
        data-parallax="18"
        className="blob-delay-2 pointer-events-none absolute bottom-[-120px] right-[-100px] h-[520px] w-[520px] animate-blob rounded-full bg-indigo-300/25 blur-3xl"
        style={{ "--blob-dur": "15s" } as CSSProperties}
      />
      <div
        data-parallax="10"
        className="blob-delay-4 pointer-events-none absolute right-[30%] top-1/2 h-[380px] w-[380px] animate-blob rounded-full bg-pink-200/25 blur-3xl"
        style={{ "--blob-dur": "10s" } as CSSProperties}
      />

      {/* Inertia trail burst (behind the copy) */}
      <HeroTrail />

      {/* Centered copy */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center">
        <div className="hero-line mb-7 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-sm font-medium text-violet-700">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-500" />
            AI-Powered Back Office
          </span>
        </div>

        <h1 className="mb-5 text-4xl font-bold leading-[1.08] tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
          <span className="hero-line block">
            Behind Every Growing Business Is a
          </span>
          <span className="hero-line mt-2 block bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
            Great Back Office
          </span>
        </h1>

        <p className="hero-line mx-auto mb-9 max-w-xl text-base leading-relaxed text-zinc-500 sm:text-lg">
        We combine AI with experienced operators to handle your admin, operations, customer support, content, and more.
        </p>

        <div className="hero-line flex flex-col items-center justify-center gap-4 sm:flex-row">
          <CalButton>Book a Call</CalButton>
          <motion.a
            href="#services"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 bg-white px-7 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:border-zinc-300 hover:bg-zinc-50"
          >
            Explore Services →
          </motion.a>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center"
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
