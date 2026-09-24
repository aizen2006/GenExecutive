"use client";

import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { useCalEmbed } from "../../lib/useCalEmbed";
import { rates, services, type Rate } from "@/lib/services";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

/** The focus service gets the featured card. */
const FEATURED = "custom-tools-apps";

/** One-line pitch per service, shown under the price. */
const blurbs: Record<string, string> = {
  "custom-tools-apps": "Dashboards, custom CRMs, portals and AI tools, built around your workflow.",
  "back-office-support": "Your inbox, calendar, invoicing and admin, handled every week.",
  "ai-automation": "Agents and automations on the tools you already use.",
};

function Check() {
  return (
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 text-[11px] font-bold text-violet-600">
      ✓
    </span>
  );
}

function PricingCard({ rate }: { rate: Rate }) {
  const featured = rate.service === FEATURED;
  const unit = rate.unit.startsWith("/") ? rate.unit : ` ${rate.unit}`;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 22 } }}
      className={`relative flex flex-col rounded-[28px] p-6 sm:rounded-[32px] sm:p-8 ${
        featured
          ? "z-10 border-2 border-violet-300 bg-white shadow-[0_20px_60px_rgba(139,92,246,0.18)] lg:scale-105"
          : "border border-zinc-200 bg-gradient-to-br from-white to-zinc-50/80 shadow-sm"
      }`}
    >
      {featured && (
        <>
          <div className="absolute inset-x-10 top-0 h-1 rounded-b-full bg-gradient-to-r from-violet-500 to-indigo-500" />
          <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white shadow-[0_0_16px_rgba(139,92,246,0.45)]">
            Our specialty
          </span>
        </>
      )}

      <h3 className="text-lg font-semibold text-zinc-900">{rate.name}</h3>
      <p className="mt-1 text-sm text-zinc-400">{rate.model}</p>
      <div className="mt-4 flex items-baseline gap-1.5">
        <span className="text-sm font-medium text-zinc-400">from</span>
        <span className="text-4xl font-bold tracking-tight text-zinc-900">{rate.price}</span>
        <span className="text-sm font-medium text-zinc-400">{unit}</span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-zinc-500">{blurbs[rate.service]}</p>

      <ul className="mt-7 flex-1 space-y-3">
        {rate.includes.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-600">
            <Check />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {rate.addOn && (
        <p className="mt-6 rounded-2xl bg-zinc-50 px-4 py-3 text-[13px] leading-relaxed text-zinc-500">
          {rate.addOn}
        </p>
      )}

      <motion.button
        data-cal-namespace="30min"
        data-cal-link="abhik-halder/30min"
        data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className={`mt-6 inline-flex h-12 cursor-pointer items-center justify-center rounded-full px-7 text-sm font-semibold transition-colors ${
          featured
            ? "bg-violet-600 text-white shadow-md hover:bg-violet-700"
            : "border border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50"
        }`}
      >
        Get a quote
      </motion.button>
      <Link
        href={`/services/${rate.service}`}
        className="mt-2 inline-flex min-h-11 items-center justify-center text-sm font-medium text-zinc-500 transition-colors hover:text-violet-600"
      >
        What&apos;s included in detail
      </Link>
    </motion.div>
  );
}

export function Pricing() {
  useCalEmbed();

  // Featured card in the middle on desktop, services order otherwise.
  const ordered = services
    .map((s) => rates.find((r) => r.service === s.slug))
    .filter((r): r is Rate => Boolean(r));
  const featured = ordered.find((r) => r.service === FEATURED);
  const rest = ordered.filter((r) => r.service !== FEATURED);
  const cards = featured ? [rest[0], featured, ...rest.slice(1)] : ordered;

  return (
    <section id="pricing" className="scroll-mt-20 bg-white px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center gsap-reveal sm:mb-16">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-violet-600">
            Pricing
          </span>
          <h2 className="mx-auto max-w-[700px] text-3xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            Clear Starting Prices
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-base leading-relaxed text-zinc-500 sm:mt-5 sm:text-lg">
            Every engagement starts with a free 30-minute call, and you get a
            fixed quote before any work begins.
          </p>
        </div>

        <motion.div
          className="grid items-start gap-6 lg:grid-cols-3 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {cards.map((rate) => (
            <PricingCard key={rate.service} rate={rate} />
          ))}
        </motion.div>

        <p className="mx-auto mt-12 max-w-xl text-center text-sm leading-relaxed text-zinc-500">
          Most clients combine two, for example back-office support plus a
          custom tool that removes the work at its source. We&apos;ll price the
          combination on the call.
        </p>
      </div>
    </section>
  );
}

export default Pricing;
