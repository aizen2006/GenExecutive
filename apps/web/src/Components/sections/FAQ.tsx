"use client";

import { useState } from "react";
import { motion } from "motion/react";

const faqs = [
  {
    q: "What does back-office support include?",
    a: "Inbox triage and drafting, calendar and schedule management, meeting preparation, invoicing and payment follow-up, supplier and vendor coordination, travel, research and documents. It covers what an executive assistant and an operations coordinator would do, without hiring either.",
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
    q: "What kind of custom tools do you build?",
    a: "Full-stack web apps with AI built in where it helps: internal dashboards, custom CRMs, client portals, quoting and booking tools, RAG chatbots that answer from your own documents, and a company brain your team can ask anything. Because we build with AI in the loop, we deliver much faster than a traditional development agency, and you own the code.",
  },
  {
    q: "How does pricing work?",
    a: "Each service is priced the way the work is shaped: back-office support is a monthly retainer from $400/month, custom tools are fixed-price projects from $2,500, and AI agents and automations start from $1,000 for setup. Every engagement starts with a free call and a fixed quote.",
  },
  {
    q: "How does ongoing support work?",
    a: "Back-office support is monthly with no fixed end date: scale up, scale down or pause whenever your needs change. Custom tools and automations come with optional care and monitoring plans, so someone keeps them running after launch.",
  },
  {
    q: "How do I get started?",
    a: "Book a free 30-minute discovery call and we'll map out exactly how we can help. No sales pressure — just a clear picture of what working together would look like and what outcomes you can realistically expect.",
  },
];

function FAQItem({ q, a, id }: { q: string; a: string; id: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-zinc-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full min-h-[56px] items-center justify-between py-5 text-left gap-4"
      >
        <span className="text-[15px] sm:text-base font-semibold text-zinc-900">{q}</span>
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
      {/* The answer is always in the server HTML (crawlers and AI answer
          engines read it, and it carries the only text pricing); closed
          answers are collapsed with a grid-rows transition and made inert. */}
      <div
        id={id}
        inert={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-5 text-sm text-zinc-500 leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  return (
    <section className="py-20 sm:py-24 bg-white px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10 sm:mb-14 gsap-reveal">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-3 block">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-zinc-500 text-base">
            Everything you need to know before we get started.
          </p>
        </div>

        <div className="rounded-2xl bg-zinc-50 border border-zinc-100 px-5 sm:px-8 py-2 gsap-reveal">
          {faqs.map((faq, i) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} id={`faq-answer-${i}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
