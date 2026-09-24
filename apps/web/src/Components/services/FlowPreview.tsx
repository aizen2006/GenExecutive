"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

/* What the agent did with one inbound lead, in the order it did it. */
const run = [
  { time: "10:41:02", text: "Read new enquiry from Priya Shah, Harbour & Co" },
  { time: "10:41:09", text: "Checked harbourco.com: 12 staff, invoices in Xero" },
  { time: "10:41:15", text: "Scored fit 82/100, matches back-office support" },
  { time: "10:41:21", text: "Drafted a reply with two call slots" },
];

function Tick() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

/**
 * An agent's run log for one lead, ending at the human step: the draft waits
 * for approval, and the visitor can press Approve to see what happens next.
 */
export default function FlowPreview() {
  const [sent, setSent] = useState(false);

  return (
    <div className="grid gap-3 lg:grid-cols-[1fr_1.05fr]">
      {/* Run log: lines tick in once, in sequence, when scrolled into view. */}
      <motion.ol
        className="rounded-2xl bg-zinc-900 p-4 text-[12.5px] text-zinc-300"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        variants={{ visible: { transition: { staggerChildren: 0.45, delayChildren: 0.2 } } }}
        aria-label="What the agent did"
      >
        <li className="mb-3 flex items-center justify-between text-[11px] text-zinc-500">
          <span>Lead desk agent</span>
          <span className="tabular-nums">run #1,284</span>
        </li>
        {run.map((step) => (
          <motion.li
            key={step.time}
            className="flex items-start gap-2.5 py-1.5"
            variants={{
              hidden: { opacity: 0, x: -6 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
            }}
          >
            <span className="mt-0.5 text-emerald-400">
              <Tick />
            </span>
            <span className="min-w-0 flex-1 leading-snug text-zinc-200">{step.text}</span>
            <time className="hidden shrink-0 tabular-nums text-zinc-600 sm:inline">{step.time}</time>
          </motion.li>
        ))}
        <motion.li
          className={`mt-2 flex items-center gap-2.5 border-t border-white/10 pt-3 ${sent ? "text-emerald-300" : "text-violet-300"}`}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.3 } },
          }}
        >
          <span className={`h-2 w-2 rounded-full ${sent ? "bg-emerald-400" : "animate-pulse bg-violet-400"}`} />
          {sent ? "Finished. Nothing left for you." : "Paused. Waiting for your approval."}
        </motion.li>
      </motion.ol>

      {/* The human step. */}
      <div className="flex flex-col rounded-2xl bg-white p-4 ring-1 ring-zinc-200">
        <div className="flex items-baseline justify-between text-[12px]">
          <span className="font-semibold text-zinc-900">Reply to Priya Shah</span>
          <span className={sent ? "font-medium text-emerald-600" : "text-zinc-400"}>{sent ? "Sent" : "Draft"}</span>
        </div>
        <p className="mt-2 border-l-2 border-zinc-200 pl-3 text-[13px] leading-relaxed text-zinc-600">
          Hi Priya, thanks for getting in touch. Chasing invoices in Xero is
          exactly the kind of work we take off a team&apos;s plate. Would Tue
          11:00 or Thu 15:30 suit you for a quick call?
        </p>

        <div className="mt-auto min-h-11 pt-4" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            {sent ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px]"
              >
                <span className="inline-flex items-center gap-1.5 font-medium text-emerald-600">
                  <Tick /> Sent
                </span>
                <span className="text-zinc-500">CRM updated</span>
                <span className="text-zinc-500">Follow-up set for Friday</span>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="ml-auto min-h-11 text-[12px] font-medium text-zinc-400 underline underline-offset-2 hover:text-zinc-700"
                >
                  Replay
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="approve"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <button
                  type="button"
                  onClick={() => setSent(true)}
                  className="inline-flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-full bg-violet-600 px-5 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-violet-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
                >
                  Approve &amp; send
                </button>
                <span className="text-[12px] text-zinc-400">Try it. You always get the last word.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
