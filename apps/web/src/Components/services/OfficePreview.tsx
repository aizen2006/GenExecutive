"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";

type Status = "pending" | "in-progress" | "completed";

/* A day's back office, worked through in order. */
const tasks = [
  { title: "Triage inbox", detail: "41 → 3" },
  { title: "Chase invoice #218", detail: "$1,240 paid" },
  { title: "Compare supplier quotes", detail: "3 quotes" },
  { title: "Book Leeds client visit", detail: "Tue, 2 nights" },
  { title: "Draft weekly client report", detail: "sent for sign-off" },
];

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const SPRING = { type: "spring", stiffness: 420, damping: 30 } as const;
const STEP_MS = 520;

function StatusIcon({ status }: { status: Status }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={`size-5 shrink-0 overflow-visible ${
        status === "completed" ? "text-emerald-500" : status === "in-progress" ? "text-violet-600" : "text-zinc-300"
      }`}
    >
      {/* Pending: dashed ring. */}
      <motion.circle
        cx="12"
        cy="12"
        r="9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="2 3"
        initial={false}
        animate={{ opacity: status === "pending" ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      />
      {/* In progress: a spinning arc. */}
      <motion.circle
        cx="12"
        cy="12"
        r="9"
        pathLength="1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={false}
        animate={{
          pathLength: status === "in-progress" ? 0.68 : 0,
          opacity: status === "in-progress" ? 1 : 0,
          rotate: status === "in-progress" ? 360 : -90,
        }}
        transition={
          status === "in-progress"
            ? { rotate: { duration: 1.1, repeat: Infinity, ease: "linear" }, default: SPRING }
            : SPRING
        }
        style={{ transformOrigin: "12px 12px" }}
      />
      {/* Completed: filled disc with a drawn tick. */}
      <motion.circle
        cx="12"
        cy="12"
        r="9"
        fill="currentColor"
        initial={false}
        animate={{ scale: status === "completed" ? 1 : 0 }}
        transition={SPRING}
        style={{ transformOrigin: "12px 12px" }}
      />
      <motion.path
        d="M7.5 12.25 10.5 15.25 16.75 8.75"
        fill="none"
        stroke="white"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={false}
        animate={{ pathLength: status === "completed" ? 1 : 0 }}
        transition={{ duration: 0.24, ease: EASE_OUT, delay: 0.08 }}
      />
    </svg>
  );
}

/** Rolls the digit up when the completed count changes. */
function RollNumber({ value }: { value: number }) {
  return (
    <span className="relative inline-flex h-4 overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={SPRING}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/**
 * The day's back office as an agent-style to-do list: each task goes from
 * pending to in progress to done, in order, once it scrolls into view.
 */
export default function OfficePreview() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  // Timeline tick: task i is in progress at 2i+1 and done from 2i+2.
  const [tick, setTick] = useState(0);
  const last = tasks.length * 2;

  useEffect(() => {
    if (!inView || tick >= last) return;
    const id = setTimeout(() => setTick((t) => (reduce ? last : t + 1)), reduce ? 0 : tick === 0 ? 250 : STEP_MS);
    return () => clearTimeout(id);
  }, [inView, tick, last, reduce]);

  const statusOf = (i: number): Status => (tick >= 2 * i + 2 ? "completed" : tick === 2 * i + 1 ? "in-progress" : "pending");
  const completed = tasks.filter((_, i) => statusOf(i) === "completed").length;
  const allDone = completed === tasks.length;

  return (
    <section ref={ref} aria-label="Back-office task list" className="rounded-2xl bg-white ring-1 ring-zinc-200">
      <div className="flex h-11 items-center gap-2.5 border-b border-zinc-100 px-3.5">
        <span
          aria-hidden
          className={`grid size-6 place-items-center rounded-full transition-colors ${
            allDone ? "bg-emerald-500 text-white" : "bg-zinc-100 text-zinc-500"
          }`}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            {allDone ? <path d="M6 12.5l4 4 8-9" /> : <path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" />}
          </svg>
        </span>
        <h4 className="min-w-0 flex-1 truncate text-[13px] font-semibold text-zinc-900">Today&apos;s back office</h4>
        <span className={`inline-flex text-xs font-medium tabular-nums ${allDone ? "text-emerald-600" : "text-zinc-500"}`}>
          <span className="sr-only">
            {completed} of {tasks.length} tasks completed
          </span>
          <span aria-hidden className="inline-flex">
            <RollNumber value={completed} />/{tasks.length}
          </span>
        </span>
      </div>

      <ol className="p-2">
        {tasks.map((task, i) => {
          const status = statusOf(i);
          return (
            <li key={task.title} className="flex min-h-9 items-center gap-2.5 rounded-xl px-1.5 py-1">
              <StatusIcon status={status} />
              <span
                className={`min-w-0 flex-1 truncate text-[13px] transition-colors ${
                  status === "pending" ? "text-zinc-400" : status === "in-progress" ? "text-zinc-900" : "text-zinc-400"
                }`}
              >
                <span className="relative inline-block max-w-full">
                  {task.title}
                  <motion.span
                    aria-hidden
                    initial={false}
                    animate={{ scaleX: status === "completed" ? 1 : 0 }}
                    transition={{ duration: 0.28, ease: EASE_OUT, delay: 0.06 }}
                    className="absolute inset-x-0 top-1/2 h-px origin-left bg-current"
                  />
                </span>
              </span>
              <motion.span
                initial={false}
                animate={{ opacity: status === "completed" ? 1 : 0 }}
                className="shrink-0 text-[12px] tabular-nums text-zinc-500"
              >
                {task.detail}
              </motion.span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
