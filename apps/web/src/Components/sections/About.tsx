"use client";

import { motion } from "motion/react";
import Typewriter from "./Typewriter";

const stats = [
  { value: "200+", label: "Hours saved per client / month" },
  { value: "50+", label: "Businesses supported" },
  { value: "24/7", label: "AI systems running" },
  { value: "4.9★", label: "Average client rating" },
];

export function About() {
  return (
    <section id="about" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: Text */}
        <div className="gsap-reveal">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-3 block">
            About Us
          </span>
          <h2
            className="text-4xl sm:text-5xl font-bold text-zinc-900 tracking-tight mb-6 leading-tight"
            aria-label="Built for leaders who refuse to slow down"
          >
            <span className="block">Built for leaders who</span>
            <span className="mt-1 block min-h-[1.15em]">
              <Typewriter
                words={[
                  "move fast.",
                  "scale smarter.",
                  "stay ahead.",
                  "never settle.",
                ]}
              />
            </span>
          </h2>
          <p className="text-zinc-500 text-lg leading-relaxed mb-4">
            GenExecutive was founded on one belief: the best executives shouldn&apos;t be buried in logistics. We combine world-class human support with AI systems to give you the leverage you need to lead at your best.
          </p>
          <p className="text-zinc-500 text-lg leading-relaxed mb-4">
            We work with small businesses, coaches, consultants, and scaling teams in the US and UK.
          </p>
          <p className="text-zinc-500 text-lg leading-relaxed">
            From inbox zero to custom AI agents, every service we offer is designed to multiply your impact — not just save you time.
          </p>
        </div>

        {/* Right: Stats grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 + i * 0.08 }}
              whileHover={{ y: -3, transition: { type: "spring", stiffness: 340, damping: 22 } }}
              className="rounded-2xl border border-zinc-100 bg-zinc-50/60 p-6 hover:border-violet-100 hover:bg-violet-50/30 transition-colors"
            >
              <div className="text-3xl font-bold text-zinc-900 mb-1">{stat.value}</div>
              <div className="text-sm text-zinc-500 leading-snug">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
