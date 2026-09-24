"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import DocFolder from "./DocFolder";

/* Questions a team actually asks, answered from their own documents. */
const exchanges = [
  {
    q: "What did we quote Northwind last year?",
    a: "$6,400 for the Q3 retainer, accepted in September.",
    sources: ["proposal-northwind.pdf"],
    searched: "1,240",
  },
  {
    q: "Who ran the Brightline onboarding?",
    a: "Sam did, in March. The checklist he used is in Notion.",
    sources: ["Notion: Onboarding", "Slack #clients"],
    searched: "1,240",
  },
  {
    q: "Do we refund annual plans?",
    a: "Pro-rated within 30 days of renewal. After that, account credit only.",
    sources: ["policies/refunds.md"],
    searched: "1,240",
  },
];

// A new row rises from the live edge, like a real chat.
const POP = { type: "spring", stiffness: 480, damping: 32, mass: 0.62 } as const;

type Stage = "idle" | "asked" | "thinking" | "answered";

function Row({ from, children }: { from: "user" | "brain"; children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={reduce ? { duration: 0.12 } : POP}
      style={{ transformOrigin: from === "user" ? "100% 100%" : "0% 100%" }}
      className={`flex items-end gap-2 ${from === "user" ? "flex-row-reverse" : ""}`}
    >
      <span
        aria-hidden
        className={`grid size-6 shrink-0 place-items-center rounded-full text-[10px] font-semibold ${
          from === "user" ? "bg-zinc-200 text-zinc-600" : "bg-gradient-to-br from-violet-600 to-indigo-500 text-white"
        }`}
      >
        {from === "user" ? "SK" : "AI"}
      </span>
      {children}
    </motion.div>
  );
}

function Typing() {
  return (
    <span className="inline-flex h-5 items-center gap-1 text-violet-500" aria-label="Searching">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          aria-hidden
          className="size-1 rounded-full bg-current"
          animate={{ opacity: [0.28, 0.9, 0.28], y: [0, -2, 0] }}
          transition={{ duration: 1.05, repeat: Infinity, delay: i * 0.14 }}
        />
      ))}
    </span>
  );
}

/**
 * A company brain answering a teammate from the business's own documents,
 * with sources. Plays the first question when scrolled into view; "Ask
 * another" plays the next.
 */
export default function BrainPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [turn, setTurn] = useState(0);
  const [stage, setStage] = useState<Stage>("idle");
  const ex = exchanges[turn];

  useEffect(() => {
    if (stage === "idle" && inView) {
      const t = setTimeout(() => setStage("asked"), 300);
      return () => clearTimeout(t);
    }
    if (stage === "asked") {
      const t = setTimeout(() => setStage("thinking"), 450);
      return () => clearTimeout(t);
    }
    if (stage === "thinking") {
      const t = setTimeout(() => setStage("answered"), 1300);
      return () => clearTimeout(t);
    }
  }, [stage, inView]);

  const next = () => {
    setTurn((t) => (t + 1) % exchanges.length);
    setStage("asked");
  };

  return (
    <div ref={ref} className="flex flex-col">
      <DocFolder searching={stage === "thinking"} cited={stage === "answered" ? ex.sources : []} />
      <div className="mt-3 flex h-[200px] flex-col justify-end gap-2 overflow-hidden text-[13px]" aria-live="polite">
        <AnimatePresence mode="popLayout" initial={false}>
          {stage !== "idle" && (
            <motion.div
              key={turn}
              className="flex flex-col gap-2"
              exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
            >
              <Row from="user">
                <p className="max-w-[80%] rounded-2xl rounded-br-sm bg-zinc-900 px-3 py-2 text-white">{ex.q}</p>
              </Row>

              {stage !== "asked" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mx-auto w-fit rounded-full bg-violet-50 px-2.5 py-0.5 text-[11px] text-violet-700"
                >
                  Searched {ex.searched} docs
                </motion.p>
              )}

              {stage === "thinking" && (
                <Row from="brain">
                  <span className="rounded-2xl rounded-bl-sm bg-white px-3 py-1.5 ring-1 ring-zinc-200">
                    <Typing />
                  </span>
                </Row>
              )}

              {stage === "answered" && (
                <Row from="brain">
                  <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-white px-3 py-2 text-zinc-700 ring-1 ring-zinc-200">
                    {ex.a}
                    <span className="mt-1.5 flex flex-wrap gap-1">
                      {ex.sources.map((s) => (
                        <span
                          key={s}
                          className="inline-flex items-center gap-1 rounded-md bg-violet-50 px-1.5 py-0.5 text-[11px] font-medium text-violet-700"
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <path d="M14 2v6h6" />
                          </svg>
                          {s}
                        </span>
                      ))}
                    </span>
                  </div>
                </Row>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={next}
        disabled={stage !== "answered"}
        className="mt-3 flex min-h-10 w-full items-center justify-between rounded-full bg-white px-4 text-left text-[13px] text-zinc-400 ring-1 ring-zinc-200 transition hover:ring-violet-300 disabled:opacity-60"
      >
        <span className="truncate">Ask: {exchanges[(turn + 1) % exchanges.length].q}</span>
        <span className="ml-2 grid size-6 shrink-0 place-items-center rounded-full bg-violet-600 text-white" aria-hidden>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </span>
      </button>
    </div>
  );
}
