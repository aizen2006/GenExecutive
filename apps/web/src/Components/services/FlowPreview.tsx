"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";

interface Step {
  /** Logo id in /public/logos. */
  tool: string;
  toolName: string;
  text: string;
}

interface Agent {
  id: string;
  name: string;
  /** Tab label on phones. */
  short: string;
  run: string;
  steps: Step[];
  draftTitle: string;
  draft: string;
  after: string[];
}

/* Three agents a small business actually runs; each step names the tool it used. */
const agents: Agent[] = [
  {
    id: "lead",
    name: "Lead desk",
    short: "Leads",
    run: "#1,284",
    steps: [
      { tool: "zapier", toolName: "Zapier", text: "Caught a new enquiry from Priya Shah, Harbour & Co" },
      { tool: "perplexity", toolName: "Perplexity", text: "Researched harbourco.com: 12 staff, invoices in Xero" },
      { tool: "claude", toolName: "Claude", text: "Scored fit 82/100, matches back-office support" },
      { tool: "notion-ai", toolName: "Notion AI", text: "Drafted a reply with two call slots" },
    ],
    draftTitle: "Reply to Priya Shah",
    draft:
      "Hi Priya, thanks for getting in touch. Chasing invoices in Xero is exactly the kind of work we take off a team's plate. Would Tue 11:00 or Thu 15:30 suit you for a quick call?",
    after: ["CRM updated", "Follow-up set for Friday"],
  },
  {
    id: "invoice",
    name: "Invoice chaser",
    short: "Invoices",
    run: "#412",
    steps: [
      { tool: "make", toolName: "Make", text: "Found 3 invoices more than 14 days overdue" },
      { tool: "clickup", toolName: "ClickUp", text: "Matched #218 to the Brightline project" },
      { tool: "claude", toolName: "Claude", text: "Wrote a friendly second reminder" },
      { tool: "zapier", toolName: "Zapier", text: "Queued it for 9:00 in their time zone" },
    ],
    draftTitle: "Reminder to Brightline",
    draft:
      "Hi Jo, a gentle nudge on invoice #218 ($1,240), which was due on the 3rd. Is there anything we can do to help get it settled this week?",
    after: ["Reminder logged", "Chase again in 7 days"],
  },
  {
    id: "inbox",
    name: "Inbox triage",
    short: "Inbox",
    run: "#3,907",
    steps: [
      { tool: "zapier", toolName: "Zapier", text: "Pulled 41 new emails from the shared inbox" },
      { tool: "claude", toolName: "Claude", text: "Answered, filed or archived 38 of them" },
      { tool: "notion-ai", toolName: "Notion AI", text: "Saved 6 receipts to the Finance folder" },
      { tool: "clickup", toolName: "ClickUp", text: "Drafted replies to the 3 that need you" },
    ],
    draftTitle: "Reply to Maple Studio",
    draft:
      "Thanks Sam, Thursday works for us. I've attached the signed NDA, so we can go straight into the kickoff agenda on the call.",
    after: ["Thread archived", "Inbox down to 3"],
  },
];

const STEP_MS = 520;

function Tick() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

/**
 * An agent switchboard: pick an agent, watch its run tick through the tools
 * it uses, then approve the draft it stops on. The human step is the point.
 */
export default function FlowPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const [agentIndex, setAgentIndex] = useState(0);
  // Steps finished so far in the current run; the run pauses at steps.length.
  const [tick, setTick] = useState(0);
  const [sent, setSent] = useState(false);
  const agent = agents[agentIndex];
  const total = agent.steps.length;
  const ready = tick >= total;

  useEffect(() => {
    if (!inView || tick >= total) return;
    const id = setTimeout(() => setTick((t) => (reduce ? total : t + 1)), reduce ? 0 : tick === 0 ? 300 : STEP_MS);
    return () => clearTimeout(id);
  }, [inView, tick, total, reduce]);

  const choose = (i: number) => {
    if (i === agentIndex) return;
    setAgentIndex(i);
    setTick(0);
    setSent(false);
  };

  // The tool currently working, or the last one used once the run pauses.
  const activeTool = Math.min(tick, total - 1);

  return (
    <div ref={ref} className="flex flex-1 flex-col gap-3">
      {/* Agent switcher. */}
      <div role="tablist" aria-label="Agents" className="flex gap-1 rounded-full bg-zinc-100 p-1 text-[13px]">
        {agents.map((a, i) => (
          <button
            key={a.id}
            type="button"
            role="tab"
            aria-selected={i === agentIndex}
            onClick={() => choose(i)}
            className={`flex min-h-9 flex-1 items-center justify-center gap-2 rounded-full px-2 font-medium sm:flex-none sm:px-3.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 ${
              i === agentIndex ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-800"
            }`}
          >
            <span
              aria-hidden
              className={`size-1.5 rounded-full ${
                i === agentIndex ? (sent ? "bg-emerald-500" : ready ? "bg-violet-500" : "animate-pulse bg-amber-400") : "bg-zinc-300"
              }`}
            />
            <span className="sm:hidden">{a.short}</span>
            <span className="hidden sm:inline">{a.name}</span>
          </button>
        ))}
      </div>

      <div role="tabpanel" aria-label={`${agent.name} agent`} className="grid gap-3 lg:grid-cols-[1fr_1.05fr]">
        {/* Run log. */}
        <ol className="rounded-2xl bg-zinc-900 p-4 text-[12.5px] text-zinc-300">
          <li className="mb-2 flex items-center justify-between text-[11px] text-zinc-500">
            <span>{agent.name} agent</span>
            <span className="tabular-nums">run {agent.run}</span>
          </li>
          {agent.steps.map((step, i) => {
            const done = i < tick;
            const working = i === tick && !ready;
            return (
              <motion.li
                key={`${agent.id}-${i}`}
                initial={false}
                animate={{ opacity: done || working ? 1 : 0.3, x: done || working ? 0 : -4 }}
                transition={{ duration: 0.25 }}
                className="flex items-start gap-2.5 py-1.5"
              >
                <span className={`mt-0.5 ${done ? "text-emerald-400" : "text-zinc-600"}`}>
                  {working ? (
                    <motion.span
                      className="block size-3.5 rounded-full border-2 border-violet-400 border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    />
                  ) : (
                    <Tick />
                  )}
                </span>
                <span className="min-w-0 flex-1 leading-snug text-zinc-200">{step.text}</span>
              </motion.li>
            );
          })}
          <li
            className={`mt-2 flex items-center gap-2.5 border-t border-white/10 pt-3 ${
              sent ? "text-emerald-300" : ready ? "text-violet-300" : "text-zinc-500"
            }`}
          >
            <span className={`size-2 rounded-full ${sent ? "bg-emerald-400" : ready ? "animate-pulse bg-violet-400" : "bg-zinc-600"}`} />
            {sent ? "Finished. Nothing left for you." : ready ? "Paused. Waiting for your approval." : "Working…"}
          </li>
        </ol>

        {/* The human step. */}
        <div className="flex flex-col rounded-2xl bg-white p-4 ring-1 ring-zinc-200">
          <div className="flex items-baseline justify-between text-[12px]">
            <span className="font-semibold text-zinc-900">{agent.draftTitle}</span>
            <span className={sent ? "font-medium text-emerald-600" : "text-zinc-400"}>
              {sent ? "Sent" : ready ? "Draft" : "Writing…"}
            </span>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            {ready ? (
              <motion.p
                key={agent.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-2 border-l-2 border-zinc-200 pl-3 text-[13px] leading-relaxed text-zinc-600"
              >
                {agent.draft}
              </motion.p>
            ) : (
              <motion.div key="skeleton" exit={{ opacity: 0 }} className="mt-3 space-y-2 border-l-2 border-zinc-100 pl-3" aria-hidden>
                {[92, 100, 76].map((w) => (
                  <span key={w} className="block h-2.5 animate-pulse rounded-full bg-zinc-100" style={{ width: `${w}%` }} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-auto min-h-11 pt-4" aria-live="polite">
            {sent ? (
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px]">
                <span className="inline-flex items-center gap-1.5 font-medium text-emerald-600">
                  <Tick /> Sent
                </span>
                {agent.after.map((a) => (
                  <span key={a} className="text-zinc-500">
                    {a}
                  </span>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setTick(0);
                  }}
                  className="ml-auto min-h-11 text-[12px] font-medium text-zinc-400 underline underline-offset-2 hover:text-zinc-700"
                >
                  Replay
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSent(true)}
                  disabled={!ready}
                  className="inline-flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-full bg-violet-600 px-5 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-violet-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 disabled:bg-zinc-200 disabled:text-zinc-400 disabled:shadow-none"
                >
                  Approve &amp; send
                </button>
                <span className="text-[12px] text-zinc-400">
                  {ready ? "Try it. You always get the last word." : "Nothing goes out until you approve."}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tool rail: lights up each tool as the run reaches it. */}
      <div className="mt-auto rounded-2xl bg-zinc-50 px-4 py-3.5 ring-1 ring-zinc-100">
        <p className="mb-3 text-[11px] text-zinc-400">Tools this run used</p>
        <div className="relative">
          <div aria-hidden className="absolute inset-x-5 top-5 h-0.5 rounded-full bg-zinc-200">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500"
              initial={false}
              animate={{ width: `${(activeTool / (total - 1)) * 100}%` }}
              transition={{ type: "spring", stiffness: 200, damping: 28 }}
            />
            <motion.span
              className="absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600 ring-4 ring-violet-100"
              initial={false}
              animate={{ left: `${(activeTool / (total - 1)) * 100}%` }}
              transition={{ type: "spring", stiffness: 200, damping: 28 }}
            />
          </div>
          <ol className="relative flex justify-between">
            {agent.steps.map((step, i) => {
              const lit = i <= activeTool && (tick > 0 || ready);
              return (
                <li key={`${agent.id}-tool-${i}`} className="flex w-16 flex-col items-center gap-1.5">
                  <motion.span
                    initial={false}
                    animate={{ scale: i === activeTool && !ready ? 1.12 : 1 }}
                    className={`grid size-10 place-items-center rounded-full bg-white ring-1 transition-[box-shadow,filter] ${
                      lit ? "shadow-[0_0_0_4px_rgba(139,92,246,0.12)] ring-violet-300" : "ring-zinc-200 grayscale"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/logos/${step.tool}.svg`} alt="" width={20} height={20} className={`size-5 ${lit ? "" : "opacity-40"}`} />
                  </motion.span>
                  <span className={`text-[11px] ${lit ? "text-zinc-700" : "text-zinc-400"}`}>{step.toolName}</span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
