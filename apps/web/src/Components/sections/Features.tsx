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

/* ── Accent system ─────────────────────────────────────────── */
type AccentKey = "violet-blue" | "blue" | "violet" | "rose";

const accents: Record<
  AccentKey,
  { surface: string; node: string; glow: string; pill: string; dot: string }
> = {
  "violet-blue": {
    surface: "from-white to-violet-50/70",
    node: "from-violet-500 to-blue-500",
    glow: "0 0 0 2px rgba(139,92,246,0.3), 0 24px 70px rgba(139,92,246,0.16)",
    pill: "bg-violet-100/70 text-violet-700 shadow-[0_0_8px_rgba(139,92,246,0.15)] hover:shadow-[0_0_12px_rgba(139,92,246,0.3)]",
    dot: "from-violet-500 to-blue-400",
  },
  blue: {
    surface: "from-white to-blue-50/60",
    node: "from-blue-500 to-indigo-400",
    glow: "0 0 0 2px rgba(59,130,246,0.28), 0 16px 48px rgba(59,130,246,0.12)",
    pill: "bg-blue-100/70 text-blue-700 shadow-[0_0_8px_rgba(59,130,246,0.15)] hover:shadow-[0_0_12px_rgba(59,130,246,0.3)]",
    dot: "from-blue-500 to-indigo-400",
  },
  violet: {
    surface: "from-white to-violet-50/60",
    node: "from-violet-500 to-fuchsia-400",
    glow: "0 0 0 2px rgba(139,92,246,0.28), 0 16px 48px rgba(139,92,246,0.12)",
    pill: "bg-violet-100/70 text-violet-700 shadow-[0_0_8px_rgba(139,92,246,0.15)] hover:shadow-[0_0_12px_rgba(139,92,246,0.3)]",
    dot: "from-violet-500 to-fuchsia-400",
  },
  rose: {
    surface: "from-white to-rose-50/60",
    node: "from-rose-500 to-orange-400",
    glow: "0 0 0 2px rgba(244,63,94,0.26), 0 16px 48px rgba(244,63,94,0.12)",
    pill: "bg-rose-100/70 text-rose-700 shadow-[0_0_8px_rgba(244,63,94,0.15)] hover:shadow-[0_0_12px_rgba(244,63,94,0.3)]",
    dot: "from-rose-500 to-orange-400",
  },
};

function Pill({ children, accent }: { children: ReactNode; accent: AccentKey }) {
  return (
    <motion.span
      whileHover={{ scale: 1.06 }}
      className={`rounded-full px-3 py-1 text-[13px] font-medium transition-shadow cursor-default ${accents[accent].pill}`}
    >
      {children}
    </motion.span>
  );
}

/* ── Reduce Manual Work visual: before/after time bars ─────── */
function TimeBar({
  label,
  hours,
  width,
  fill,
  delay,
}: {
  label: string;
  hours: string;
  width: string;
  fill: string;
  delay: number;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[11px]">
        <span className="font-medium text-zinc-500">{label}</span>
        <span className="font-semibold text-zinc-700">{hours}</span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-zinc-100">
        <motion.div
          className={`h-full rounded-full ${fill}`}
          initial={{ width: 0 }}
          whileInView={{ width }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut", delay }}
        />
      </div>
    </div>
  );
}

function TimeSavedVisual() {
  return (
    <div className="flex w-full flex-col justify-center gap-4 rounded-2xl bg-white/80 p-5 shadow-[0_4px_20px_rgba(24,24,27,0.06)] ring-1 ring-zinc-100">
      <TimeBar
        label="Manual"
        hours="15 hrs/wk"
        width="100%"
        fill="bg-zinc-300"
        delay={0.1}
      />
      <TimeBar
        label="Automated"
        hours="3 hrs/wk"
        width="20%"
        fill="bg-gradient-to-r from-violet-500 to-blue-500"
        delay={0.35}
      />
      <motion.span
        className="w-fit rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-600"
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.7 }}
      >
        ↓ ~80% less busywork
      </motion.span>
    </div>
  );
}

/* ── Integrations card: tool logo row ──────────────────────── */
const integrationLogos = [
  "make",
  "zapier",
  "chatgpt",
  "claude",
  "gemini",
  "notion-ai",
  "clickup",
  "framer",
];

function IntegrationsVisual() {
  return (
    <div className="mt-5 flex flex-wrap gap-3">
      {integrationLogos.map((id, i) => (
        <motion.div
          key={id}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-[0_4px_16px_rgba(24,24,27,0.05)]"
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.22,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/logos/${id}.svg`}
            alt={id}
            width={26}
            height={26}
            className="h-[26px] w-[26px] object-contain"
            draggable={false}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

/* ── Small card mini-visuals ───────────────────────────────── */
function OrganizeVisual() {
  return (
    <div className="mt-4 grid grid-cols-2 gap-2.5">
      <motion.div
        className="rounded-xl bg-white/90 p-2.5 shadow-[0_4px_16px_rgba(24,24,27,0.05)]"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="mb-1.5 text-[10px] font-semibold text-blue-600">JUN</div>
        <div className="grid grid-cols-4 gap-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={`h-3 rounded ${i === 2 || i === 5 ? "bg-blue-300" : "bg-zinc-100"}`}
            />
          ))}
        </div>
      </motion.div>
      <div className="space-y-1.5">
        {["Reply to client", "Review proposal"].map((t) => (
          <div
            key={t}
            className="flex items-center gap-1.5 rounded-xl bg-white/90 px-2 py-1.5 text-[11px] text-zinc-600 shadow-[0_4px_16px_rgba(24,24,27,0.05)]"
          >
            <span className="h-2.5 w-2.5 rounded-[4px] bg-blue-200" />
            <span className="truncate">{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AIVisual() {
  return (
    <div className="mt-4 space-y-2">
      <motion.div
        className="max-w-[80%] rounded-2xl rounded-tl-sm bg-white/90 px-3 py-2 text-[11px] text-zinc-600 shadow-[0_4px_16px_rgba(24,24,27,0.05)]"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        How do I reset my plan?
      </motion.div>
      <div className="ml-auto flex max-w-[85%] items-end gap-2">
        <div className="rounded-2xl rounded-tr-sm bg-gradient-to-br from-violet-500 to-fuchsia-500 px-3 py-2 text-[11px] text-white shadow-[0_0_14px_rgba(139,92,246,0.35)]">
          Sure — I can do that for you now.
        </div>
        <motion.span
          className="mb-1 h-6 w-6 shrink-0 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-400 shadow-[0_0_12px_rgba(139,92,246,0.5)]"
          animate={{ scale: [1, 1.12, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      {/* Typing indicator */}
      <div className="flex w-fit items-center gap-1 rounded-full bg-white/90 px-2.5 py-1.5 shadow-[0_4px_16px_rgba(24,24,27,0.05)]">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-violet-400"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.18,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function ContentVisual() {
  return (
    <div className="mt-4 space-y-2">
      {/* Video thumbnail tiles */}
      <div className="grid grid-cols-2 gap-2">
        {[0, 1].map((i) => (
          <motion.div
            key={i}
            className="relative flex h-12 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-rose-400 to-orange-300 shadow-[0_4px_16px_rgba(244,63,94,0.18)]"
            animate={{ y: [0, i === 0 ? -3 : -2, 0] }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-[10px] text-rose-600 shadow-sm">
              ▶
            </span>
          </motion.div>
        ))}
      </div>
      {/* Publishing card */}
      <div className="flex items-center gap-2 rounded-xl bg-white/90 px-2.5 py-1.5 shadow-[0_4px_16px_rgba(24,24,27,0.05)]">
        <span className="h-2 w-2 shrink-0 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
        <span className="truncate text-[11px] text-zinc-600">Scheduled · YouTube</span>
        <span className="ml-auto text-[10px] font-medium text-rose-500">Auto</span>
      </div>
    </div>
  );
}

/* ── Small card ────────────────────────────────────────────── */
interface SmallCardProps {
  areaClass: string;
  title: string;
  description: string;
  pills: string[];
  visual: ReactNode;
  accent: AccentKey;
}

function SmallCard({ areaClass, title, description, pills, visual, accent }: SmallCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -5,
        boxShadow: accents[accent].glow,
        transition: { type: "spring", stiffness: 320, damping: 22 },
      }}
      className={`relative flex min-h-[180px] flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-br ${accents[accent].surface} p-6 shadow-sm ${areaClass}`}
    >
      <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-zinc-500">{description}</p>
      {visual}
      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        {pills.map((p) => (
          <Pill key={p} accent={accent}>
            {p}
          </Pill>
        ))}
      </div>
    </motion.div>
  );
}

export function Features() {
  return (
    <section id="services" className="px-6 py-24 bg-zinc-50/50">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-16 text-center gsap-reveal">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-violet-600">
            Services
          </span>
          <h2 className="mx-auto max-w-[700px] text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            Everything You Need
            <br className="hidden sm:block" /> To Run Efficiently
          </h2>
          <p className="mx-auto mt-5 max-w-[600px] text-lg leading-relaxed text-zinc-500">
            GenExecutive combines automation, AI, and operational support to help
            founders spend less time managing tasks and more time growing their
            business.
          </p>
        </div>

        {/* Bento Grid */}
        <motion.div
          className="bento-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Reduce Manual Work card (wide, with time-saved bars) */}
          <motion.div
            variants={cardVariants}
            whileHover={{
              y: -5,
              boxShadow: accents["violet-blue"].glow,
              transition: { type: "spring", stiffness: 320, damping: 22 },
            }}
            className={`bento-work card-pulse relative flex flex-col gap-6 overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-br ${accents["violet-blue"].surface} p-8 shadow-sm lg:flex-row lg:items-center`}
          >
            <motion.div
              className="pointer-events-none absolute -left-16 -top-16 h-44 w-44 rounded-full bg-violet-300/20 blur-3xl"
              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.75, 0.5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Left: copy + pills */}
            <div className="flex flex-1 flex-col">
              <span className="mb-4 w-fit rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700 shadow-[0_0_12px_rgba(139,92,246,0.18)]">
                10+ Hours Saved Weekly
              </span>
              <h3 className="text-[28px] font-semibold leading-tight text-zinc-900">
                Reduce Manual Work
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-zinc-500">
                Automated workflows that eliminate repetitive tasks so your team
                stays focused.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Workflow Automation", "CRM Processes", "Lead Routing", "Email Automation"].map(
                  (p) => (
                    <Pill key={p} accent="violet-blue">
                      {p}
                    </Pill>
                  ),
                )}
              </div>
            </div>
            {/* Right: time-saved bars */}
            <div className="lg:w-[44%]">
              <TimeSavedVisual />
            </div>
          </motion.div>

          {/* Small cards */}
          <SmallCard
            areaClass="bento-org"
            title="Stay Organized"
            description="Executive support that keeps your schedule, inbox, and priorities under control."
            pills={["Calendar Management", "Inbox Support", "Research", "Coordination"]}
            visual={<OrganizeVisual />}
            accent="blue"
          />
          <SmallCard
            areaClass="bento-ai"
            title="Scale With AI"
            description="AI agents and chatbots that handle conversations and support around the clock."
            pills={["Customer Support", "AI Assistants", "Lead Qualification", "Knowledge Base"]}
            visual={<AIVisual />}
            accent="violet"
          />
          <SmallCard
            areaClass="bento-content"
            title="Content At Scale"
            description="Produce content consistently without increasing workload."
            pills={["AI Avatar Videos", "Social Media Content", "Repurposing", "Short-form Clips"]}
            visual={<ContentVisual />}
            accent="rose"
          />

          {/* Integrations card (wide) */}
          <motion.div
            variants={cardVariants}
            whileHover={{
              y: -5,
              boxShadow: accents["blue"].glow,
              transition: { type: "spring", stiffness: 320, damping: 22 },
            }}
            className={`bento-integ relative flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-br ${accents["blue"].surface} p-6 shadow-sm`}
          >
            <h3 className="text-lg font-semibold text-zinc-900">Seamless Integrations</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-zinc-500">
              Plugs into the AI tools and apps you already use.
            </p>
            <IntegrationsVisual />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Features;
