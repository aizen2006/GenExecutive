"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const faqs = [
  {
    q: "What does Executive Support include?",
    a: "Our Executive Support covers calendar and schedule management, email triage and drafting, travel planning, meeting preparation, document creation, vendor coordination, and general administrative tasks. Think of us as your always-on chief of staff.",
  },
  {
    q: "How do your AI agents work?",
    a: "We design and deploy custom AI agents trained on your specific workflows, tools, and data. These agents operate autonomously to complete tasks — from research and data entry to customer follow-ups — and only check in when human judgment is genuinely required.",
  },
  {
    q: "Can you build a custom AI automation for my business?",
    a: "Absolutely. We analyze your existing workflows, identify high-value automation opportunities, and build custom pipelines using modern AI tools. Every automation is tested, documented, and handed over with training so your team can manage it confidently.",
  },
  {
    q: "How long does an MVP take to deliver?",
    a: "Typical MVPs are delivered in 3–6 weeks depending on complexity. We use a lean approach: define the core user journey, build only what validates your hypothesis, and ship. You get something real to show users and investors — fast.",
  },
  {
    q: "Do you offer ongoing support after launch?",
    a: "Yes. All our services include a 30-day post-launch support window, and we offer flexible retainer plans for ongoing executive support, automation maintenance, and continuous improvements as your business scales.",
  },
  {
    q: "How do I get started?",
    a: "Book a free 30-minute discovery call and we'll map out exactly how we can help. No sales pressure — just a clear picture of what working together would look like and what outcomes you can realistically expect.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-zinc-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left gap-4"
      >
        <span className="text-base font-semibold text-zinc-900">{q}</span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
          className="h-5 w-5 shrink-0 text-zinc-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-zinc-500 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  return (
    <section className="py-24 bg-white px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-3 block">
            FAQ
          </span>
          <h2 className="text-4xl font-bold text-zinc-900 tracking-tight mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-zinc-500 text-base">
            Everything you need to know before we get started.
          </p>
        </motion.div>

        <motion.div
          className="rounded-2xl bg-zinc-50 border border-zinc-100 px-8 py-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
        >
          {faqs.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default FAQ;
