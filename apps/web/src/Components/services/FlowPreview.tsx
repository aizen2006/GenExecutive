"use client";

import { motion } from "motion/react";

/* One lead, end to end. The third step is a person, on purpose. */
const steps = [
  { label: "New lead", note: "form, inbox, DM" },
  { label: "Agent qualifies", note: "researches, drafts reply" },
  { label: "You approve", note: "one tap", human: true },
  { label: "Done", note: "sent, CRM updated" },
];

export default function FlowPreview() {
  return (
    <div className="rounded-2xl bg-white p-4 ring-1 ring-zinc-200 sm:p-5">
      <ol className="relative grid grid-cols-2 gap-3 sm:grid-cols-4">
        {/* Connector with a marker that runs once when scrolled into view. */}
        <div aria-hidden className="absolute inset-x-[12%] top-[18px] hidden h-px bg-zinc-200 sm:block">
          <motion.span
            className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600 ring-4 ring-violet-100"
            initial={{ left: "0%" }}
            whileInView={{ left: "100%" }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 2.2, ease: [0.45, 0, 0.2, 1], delay: 0.2 }}
          />
        </div>
        {steps.map((step, i) => (
          <li key={step.label} className="relative flex flex-col items-center text-center">
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-semibold ${
                step.human
                  ? "border-2 border-dashed border-violet-500 bg-violet-50 text-violet-700"
                  : "border border-zinc-200 bg-white text-zinc-600"
              }`}
            >
              {i + 1}
            </span>
            <span className={`mt-2 text-[13px] font-semibold ${step.human ? "text-violet-700" : "text-zinc-900"}`}>
              {step.label}
            </span>
            <span className="text-[12px] text-zinc-500">{step.note}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
