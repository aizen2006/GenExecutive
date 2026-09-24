"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { getRate } from "@/lib/services";

/* One real workflow, end to end. The third step is a person, on purpose. */
const steps = [
  {
    title: "A new lead arrives",
    body: "From your site form, inbox or LinkedIn.",
    human: false,
  },
  {
    title: "An agent does the legwork",
    body: "Researches the company, checks fit, drafts a reply.",
    human: false,
  },
  {
    title: "You approve it",
    body: "One tap. Nothing goes out under your name unseen.",
    human: true,
  },
  {
    title: "Everything updates",
    body: "Reply sent, CRM updated, follow-up scheduled.",
    human: false,
  },
];

const tools = ["Make", "Zapier", "ChatGPT", "Claude", "Gemini", "Notion AI", "ClickUp"];

/** A single marker travels the path once when it scrolls into view. */
function Traveller({ axis }: { axis: "x" | "y" }) {
  const from = axis === "x" ? { left: "0%" } : { top: "0%" };
  const to = axis === "x" ? { left: "100%" } : { top: "100%" };
  return (
    <motion.span
      aria-hidden
      className={`absolute h-3 w-3 rounded-full bg-violet-600 ring-4 ring-violet-100 ${
        axis === "x" ? "top-1/2 -translate-x-1/2 -translate-y-1/2" : "left-1/2 -translate-x-1/2 -translate-y-1/2"
      }`}
      initial={from}
      whileInView={to}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 2.4, ease: [0.45, 0, 0.2, 1], delay: 0.2 }}
    />
  );
}

export default function AutomationPipeline() {
  const rate = getRate("ai-automation");

  return (
    <article className="rounded-[20px] border border-zinc-200 bg-white p-6 sm:p-10 lg:p-14">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-14">
        <h3 className="text-3xl font-bold leading-[1.05] tracking-[-0.02em] text-zinc-900 sm:text-[40px]">
          AI agents &amp; automations
        </h3>
        <p className="max-w-lg text-[17px] leading-relaxed text-zinc-600">
          Agents and automations that move work between the tools you already
          use, and ask before they do anything that matters. Here is one lead,
          start to finish:
        </p>
      </div>

      <div className="relative mt-12">
        {/* Track: horizontal on large screens, vertical on phones. */}
        <div className="absolute inset-x-[12.5%] top-5 hidden h-px bg-zinc-200 lg:block">
          <Traveller axis="x" />
        </div>
        <div className="absolute bottom-5 left-5 top-5 w-px bg-zinc-200 lg:hidden">
          <Traveller axis="y" />
        </div>

        <ol className="relative grid gap-8 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, i) => (
            <li key={step.title} className="flex gap-4 lg:flex-col lg:items-center lg:text-center">
              <span
                className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                  step.human
                    ? "border-2 border-dashed border-violet-500 bg-violet-50 text-violet-700"
                    : "border border-zinc-300 bg-white text-zinc-700"
                }`}
              >
                {i + 1}
              </span>
              <div>
                <p className="font-semibold text-zinc-900">
                  {step.title}
                  {step.human && (
                    <span className="ml-2 rounded bg-violet-50 px-1.5 py-0.5 align-middle text-[12px] font-medium text-violet-700">
                      human step
                    </span>
                  )}
                </p>
                <p className="mt-1 text-[15px] leading-relaxed text-zinc-500 lg:mx-auto lg:max-w-[22ch]">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-12 flex flex-col gap-6 border-t border-zinc-100 pt-8 lg:flex-row lg:items-center lg:justify-between">
        <p className="max-w-xl text-[15px] leading-relaxed text-zinc-600">
          Built on {tools.slice(0, -1).join(", ")} and {tools.at(-1)}, so you
          own it and aren&apos;t locked in. Setup from{" "}
          <span className="font-semibold text-zinc-900">{rate?.price}</span>.
        </p>
        <Link
          href="/services/ai-automation"
          className="inline-flex h-12 w-fit shrink-0 items-center rounded-full border border-zinc-300 px-6 text-sm font-semibold text-zinc-900 transition-colors hover:border-zinc-900"
        >
          What we can automate
        </Link>
      </div>
    </article>
  );
}
