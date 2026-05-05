"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "motion/react";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

/* ── Icons ─────────────────────────────────────────────────── */
const ExecIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-violet-600">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
  </svg>
);
const AutoIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-indigo-500">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const AgentIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-blue-500">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
    <circle cx="9" cy="10" r="1.5" />
    <circle cx="15" cy="10" r="1.5" />
    <path d="M9 13c0.5 1 2.5 1.5 3 0" />
  </svg>
);
const PagesIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-emerald-500">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="9" y1="21" x2="9" y2="9" />
  </svg>
);
const MvpIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-orange-500">
    <path d="M12 2L4 12h5v9l8-11h-5z" />
  </svg>
);

interface CardProps {
  title: string;
  description: string;
  icon: ReactNode;
  areaClass: string;
  isMain?: boolean;
  tags?: string[];
  gradient: string;
  hoverGlow: string;
  iconDelay?: number;
}

function FeatureCard({
  title,
  description,
  icon,
  areaClass,
  isMain,
  tags,
  gradient,
  hoverGlow,
  iconDelay = 0,
}: CardProps) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -5,
        boxShadow: hoverGlow,
        transition: { type: "spring", stiffness: 320, damping: 22 },
      }}
      className={`relative rounded-2xl border border-zinc-100 shadow-sm p-6 flex flex-col overflow-hidden ${gradient} ${isMain ? "card-pulse" : ""} ${areaClass}`}
    >
      {/* Subtle background orb for main card */}
      {isMain && (
        <motion.div
          className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-violet-300/20 blur-2xl pointer-events-none"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.75, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Floating icon */}
      <motion.div
        className={`mb-4 flex items-center justify-center rounded-xl shrink-0 ${
          isMain ? "w-14 h-14 bg-violet-50" : "w-11 h-11 bg-white/80"
        }`}
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: iconDelay,
        }}
      >
        {icon}
      </motion.div>

      <h3
        className={`font-semibold text-zinc-900 mb-2 ${
          isMain ? "text-2xl" : "text-base"
        }`}
      >
        {title}
      </h3>
      <p
        className={`text-zinc-500 leading-relaxed ${
          isMain ? "text-base" : "text-sm"
        }`}
      >
        {description}
      </p>

      {tags && (
        <div className="mt-auto pt-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <motion.span
              key={tag}
              whileHover={{ scale: 1.06 }}
              className="rounded-full bg-violet-100/70 px-3 py-1 text-xs font-medium text-violet-700 shadow-[0_0_8px_rgba(139,92,246,0.15)] hover:shadow-[0_0_12px_rgba(139,92,246,0.3)] transition-shadow cursor-default"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export function Features() {
  return (
    <section id="services" className="py-24 px-6 bg-zinc-50/50">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-3 block">
            What We Do
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 tracking-tight mb-4">
            Everything your business needs
          </h2>
          <p className="text-zinc-500 text-lg max-w-xl mx-auto">
            From executive support to AI-powered automation — the full stack of modern business operations.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="bento-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <FeatureCard
            areaClass="bento-exec min-h-[300px] lg:min-h-[320px]"
            isMain
            title="Executive Support"
            description="World-class executive and administrative support — calendar management, email triage, travel coordination, vendor relations, and more. Your personal command center, always one step ahead."
            icon={<ExecIcon />}
            tags={["Calendar", "Email", "Travel", "Admin"]}
            gradient="bg-gradient-to-br from-white to-violet-50/70"
            hoverGlow="0 0 0 2px rgba(139,92,246,0.3), 0 20px 60px rgba(139,92,246,0.14)"
            iconDelay={0}
          />
          <FeatureCard
            areaClass="bento-automation"
            title="AI Automation"
            description="Automate repetitive workflows so your team can focus on what matters. We build custom automations that run 24/7, saving hours every single day."
            icon={<AutoIcon />}
            gradient="bg-gradient-to-br from-white to-indigo-50/60"
            hoverGlow="0 0 0 2px rgba(99,102,241,0.28), 0 16px 48px rgba(99,102,241,0.12)"
            iconDelay={0.4}
          />
          <FeatureCard
            areaClass="bento-agents"
            title="AI Agents"
            description="Deploy autonomous AI agents that handle complex multi-step tasks independently, learning and improving as they work."
            icon={<AgentIcon />}
            gradient="bg-gradient-to-br from-white to-blue-50/60"
            hoverGlow="0 0 0 2px rgba(59,130,246,0.28), 0 16px 48px rgba(59,130,246,0.12)"
            iconDelay={0.8}
          />
          <FeatureCard
            areaClass="bento-pages"
            title="Landing Pages"
            description="High-converting, beautiful landing pages that turn visitors into customers."
            icon={<PagesIcon />}
            gradient="bg-gradient-to-br from-white to-emerald-50/60"
            hoverGlow="0 0 0 2px rgba(16,185,129,0.28), 0 16px 48px rgba(16,185,129,0.12)"
            iconDelay={1.2}
          />
          <FeatureCard
            areaClass="bento-mvp"
            title="MVP Development"
            description="From idea to launched product in weeks. We build lean, production-ready MVPs that validate your vision fast — and impress investors from day one."
            icon={<MvpIcon />}
            gradient="bg-gradient-to-br from-white to-orange-50/60"
            hoverGlow="0 0 0 2px rgba(249,115,22,0.28), 0 16px 48px rgba(249,115,22,0.12)"
            iconDelay={0.6}
          />
        </motion.div>
      </div>
    </section>
  );
}

export default Features;
