"use client";

import { useEffect } from "react";
import { motion, type Variants } from "motion/react";
import { getCalApi } from "@calcom/embed-react";

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

interface Plan {
  name: string;
  price: string;
  period?: string;
  description: string;
  featuresLead?: string;
  features: string[];
  cta: string;
  featured?: boolean;
}

const plans: Plan[] = [
  {
    name: "Starter",
    price: "$400",
    period: "/month",
    description: "Perfect for founders and small businesses.",
    features: [
      "Workflow automation",
      "Executive support",
      "Calendar management",
      "Inbox support",
      "AI chatbot setup",
      "Social media assistance",
      "4 AI avatar videos/month",
      "Monthly optimization",
    ],
    cta: "Get Started",
  },
  {
    name: "Pro",
    price: "$800",
    period: "/month",
    description: "Built for growing businesses that need systems and scale.",
    featuresLead: "Everything in Starter, plus:",
    features: [
      "Advanced workflow automation",
      "Lead management",
      "Dedicated executive support",
      "Multi-platform social media management",
      "10 business videos/month",
      "Priority support",
      "Process documentation",
    ],
    cta: "Book a Call",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "Pricing",
    description: "For businesses requiring tailored AI operations.",
    features: [
      "Custom AI agents",
      "Internal knowledge bases",
      "Human-in-the-loop review",
      "Dedicated account manager",
      "Custom integrations",
      "Ongoing optimization",
      "Strategy consulting",
    ],
    cta: "Contact Sales",
  },
];

function Check() {
  return (
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 text-[11px] font-bold text-violet-600">
      ✓
    </span>
  );
}

function PricingCard({ plan }: { plan: Plan }) {
  const featured = plan.featured;
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 22 } }}
      className={`relative flex flex-col rounded-[32px] p-8 ${
        featured
          ? "border-2 border-violet-300 bg-white shadow-[0_20px_60px_rgba(139,92,246,0.18)] lg:scale-105 z-10"
          : "border border-zinc-200 bg-gradient-to-br from-white to-zinc-50/80 shadow-sm"
      }`}
    >
      {/* Top accent bar + badge for featured */}
      {featured && (
        <>
          <div className="absolute inset-x-10 top-0 h-1 rounded-b-full bg-gradient-to-r from-violet-500 to-indigo-500" />
          <motion.span
            className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white shadow-[0_0_16px_rgba(139,92,246,0.45)]"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          >
            Most Popular
          </motion.span>
        </>
      )}

      <h3 className="text-lg font-semibold text-zinc-900">{plan.name}</h3>
      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-4xl font-bold tracking-tight text-zinc-900">{plan.price}</span>
        {plan.period && <span className="text-sm font-medium text-zinc-400">{plan.period}</span>}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-zinc-500">{plan.description}</p>

      <div className="mt-7 flex flex-1 flex-col">
        {plan.featuresLead && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-violet-600">
            {plan.featuresLead}
          </p>
        )}
        <ul className="space-y-3">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm text-zinc-600">
              <Check />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>

      <motion.button
        data-cal-namespace="30min"
        data-cal-link="abhik-halder/30min"
        data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className={`mt-8 inline-flex h-12 cursor-pointer items-center justify-center rounded-full px-7 text-sm font-semibold transition-colors ${
          featured
            ? "bg-violet-600 text-white shadow-md hover:bg-violet-700"
            : "border border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50"
        }`}
      >
        {plan.cta}
      </motion.button>
    </motion.div>
  );
}

export function Pricing() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <section id="pricing" className="px-6 py-24 bg-white">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center gsap-reveal">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-violet-600">
            Pricing
          </span>
          <h2 className="mx-auto max-w-[700px] text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            Flexible Plans For Growing Businesses
          </h2>
          <p className="mx-auto mt-5 max-w-[600px] text-lg leading-relaxed text-zinc-500">
            Choose the level of support you need today and scale as your business
            grows.
          </p>
        </div>

        {/* Cards */}
        <motion.div
          className="grid items-start gap-6 lg:grid-cols-3 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {plans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </motion.div>

        {/* Footnote */}
        <motion.p
          className="mx-auto mt-12 max-w-xl text-center text-sm leading-relaxed text-zinc-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Need something custom? We&apos;ll design a solution tailored to your
          workflow and business goals.
        </motion.p>
      </div>
    </section>
  );
}

export default Pricing;
