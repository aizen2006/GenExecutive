"use client";

import type { CSSProperties } from "react";
import { motion, type Variants } from "motion/react";
import CalButton from "../caldotcom";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.13, delayChildren: 0.25 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Gradient orbs */}
      <div
        className="absolute top-[-100px] left-[-140px] w-[640px] h-[640px] rounded-full bg-violet-300/35 blur-3xl animate-blob pointer-events-none"
        style={{ "--blob-dur": "12s" } as CSSProperties}
      />
      <div
        className="absolute bottom-[-120px] right-[-100px] w-[520px] h-[520px] rounded-full bg-indigo-300/25 blur-3xl animate-blob blob-delay-2 pointer-events-none"
        style={{ "--blob-dur": "15s" } as CSSProperties}
      />
      <div
        className="absolute top-1/2 right-[15%] w-[380px] h-[380px] rounded-full bg-pink-200/25 blur-3xl animate-blob blob-delay-4 pointer-events-none"
        style={{ "--blob-dur": "10s" } as CSSProperties}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-7 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-sm font-medium text-violet-700">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-500 animate-pulse" />
            Executive Intelligence &amp; AI Automation
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 leading-[1.08] mb-5"
        >
          AI-Skilled Assistants for Small Businesses —{" "}
          <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
            at a Fraction of the Cost
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed mb-9"
        >
          We run your operations, inbox, automations, and admin using AI — so
          you can focus on growing your business.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <CalButton>Book a Call</CalButton>
          <motion.a
            href="#services"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 bg-white px-7 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-50 hover:border-zinc-300 transition-colors"
          >
            Explore Services →
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <div className="h-10 w-5 rounded-full border-2 border-zinc-300 flex items-start justify-center p-1">
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
