"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { getRate } from "@/lib/services";

type View = "sheet" | "tool";

const examples = [
  { name: "Custom CRMs", detail: "your pipeline, the way you actually sell" },
  { name: "Dashboards", detail: "every number from every tool on one screen" },
  { name: "Client portals", detail: "status, files and invoices without the emails" },
  { name: "RAG chatbots", detail: "answers from your own documents" },
  { name: "A company brain", detail: "ask it anything your team has ever written down" },
];

/* The "before": a pipeline kept in a spreadsheet, with the usual damage. */
const sheetRows = [
  { client: "Northwind Co", stage: "proposal sent??", value: "6,400", owner: "AH", note: "chase", flag: true },
  { client: "Brightline", stage: "Proposal", value: "#REF!", owner: "", note: "see email", err: true },
  { client: "Northwind Co", stage: "follow up", value: "6400", owner: "AH", note: "DUPLICATE?", flag: true },
  { client: "Harbour & Co", stage: "won", value: "3,150", owner: "SK", note: "" },
  { client: "Maple Studio", stage: "call booked", value: "tbc", owner: "", note: "ask Sam" },
];

/* The "after": the same data in a tool built for it. */
const deals = [
  { client: "Northwind Co", stage: "Proposal", value: "$6,400", due: "Follow-up due today" },
  { client: "Maple Studio", stage: "Discovery", value: "$2,800", due: "Call Thu 10:00" },
  { client: "Brightline", stage: "Proposal", value: "$4,900", due: "Sent 2 days ago" },
  { client: "Harbour & Co", stage: "Won", value: "$3,150", due: "Onboarding" },
];

const stageTone: Record<string, string> = {
  Discovery: "bg-sky-50 text-sky-700 ring-sky-200",
  Proposal: "bg-violet-50 text-violet-700 ring-violet-200",
  Won: "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

function SheetView() {
  return (
    <div className="bg-white text-[12px] text-zinc-700">
      <div className="flex items-center gap-2 border-b border-zinc-200 bg-[#f3f6f4] px-3 py-2">
        <span className="h-3.5 w-3.5 rounded-[3px] bg-emerald-600" aria-hidden />
        <span className="truncate font-medium text-zinc-600">pipeline_FINAL_v3 (2).xlsx</span>
      </div>
      <table className="w-full border-collapse tabular-nums">
        <thead>
          <tr className="bg-zinc-50 text-left text-[11px] text-zinc-500">
            <th className="border border-zinc-200 px-2 py-1.5 font-medium">Client</th>
            <th className="border border-zinc-200 px-2 py-1.5 font-medium">Stage</th>
            <th className="border border-zinc-200 px-2 py-1.5 font-medium">Value</th>
            <th className="hidden border border-zinc-200 px-2 py-1.5 font-medium sm:table-cell">Owner</th>
            <th className="hidden border border-zinc-200 px-2 py-1.5 font-medium sm:table-cell">Notes</th>
          </tr>
        </thead>
        <tbody>
          {sheetRows.map((row, i) => (
            <tr key={i} className={row.flag ? "bg-yellow-100/80" : ""}>
              <td className="border border-zinc-200 px-2 py-1.5">{row.client}</td>
              <td className="border border-zinc-200 px-2 py-1.5">{row.stage}</td>
              <td className={`border border-zinc-200 px-2 py-1.5 ${row.err ? "font-medium text-red-600" : ""}`}>
                {row.value}
              </td>
              <td className="hidden border border-zinc-200 px-2 py-1.5 sm:table-cell">{row.owner}</td>
              <td className="hidden border border-zinc-200 px-2 py-1.5 sm:table-cell">{row.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="px-3 py-3 text-[11px] text-zinc-400">
        Last edited by 4 people. Nobody is sure which row is current.
      </p>
    </div>
  );
}

function ToolView() {
  return (
    <div className="bg-white text-[12px] text-zinc-700">
      <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-2.5">
        <span className="font-semibold text-zinc-900">Pipeline</span>
        <span className="text-[11px] text-zinc-400">Updated just now</span>
      </div>
      <dl className="grid grid-cols-3 border-b border-zinc-100 tabular-nums">
        {[
          ["Open deals", "12"],
          ["Pipeline", "$48.2k"],
          ["Due today", "3"],
        ].map(([label, value]) => (
          <div key={label} className="px-4 py-2.5">
            <dt className="text-[11px] text-zinc-400">{label}</dt>
            <dd className="text-base font-semibold text-zinc-900">{value}</dd>
          </div>
        ))}
      </dl>
      <ul className="divide-y divide-zinc-100">
        {deals.map((deal, i) => (
          <li key={deal.client} className="flex items-center gap-3 px-4 py-2">
            <span className="min-w-0 flex-1 truncate font-medium text-zinc-900">{deal.client}</span>
            <span className={`rounded-md px-1.5 py-0.5 text-[11px] ring-1 ${stageTone[deal.stage]}`}>
              {deal.stage}
            </span>
            <span className="w-14 text-right tabular-nums text-zinc-600">{deal.value}</span>
            {i === 0 ? (
              <span className="hidden rounded-md bg-zinc-900 px-2 py-1 text-[11px] font-medium text-white sm:inline">
                Send follow-up
              </span>
            ) : (
              <span className="hidden w-[92px] truncate text-[11px] text-zinc-400 sm:inline">{deal.due}</span>
            )}
          </li>
        ))}
      </ul>
      <div className="m-3 rounded-lg bg-zinc-50 p-3 ring-1 ring-zinc-100">
        <p className="text-[11px] text-zinc-400">Ask the company brain</p>
        <p className="mt-1 font-medium text-zinc-900">What did we quote Northwind last year?</p>
        <p className="mt-1.5 text-zinc-600">
          $6,400 for the Q3 retainer, accepted in September.{" "}
          <span className="text-violet-700 underline decoration-violet-300 underline-offset-2">
            proposal-northwind.pdf
          </span>
        </p>
      </div>
    </div>
  );
}

export default function CustomToolsShowcase() {
  const [view, setView] = useState<View>("sheet");
  const rate = getRate("custom-tools-apps");

  return (
    <article className="overflow-hidden rounded-[28px] bg-[#1E1B4B] text-white">
      <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[5fr_7fr] lg:gap-12 lg:p-14">
        <div className="flex flex-col">
          <h3 className="text-3xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-[40px]">
            Custom tools &amp; apps
          </h3>
          <p className="mt-4 max-w-md text-[17px] leading-relaxed text-indigo-100/80">
            When the spreadsheet stops working, we build the tool that replaces
            it: full-stack apps with AI built in where it helps, shaped around
            how your business actually runs.
          </p>

          <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {examples.map((ex) => (
              <li key={ex.name} className="py-3 text-[15px]">
                <span className="font-semibold text-white">{ex.name}</span>
                <span className="text-indigo-200/70">, {ex.detail}</span>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-[15px] leading-relaxed text-indigo-100/80">
            Fixed-price projects from{" "}
            <span className="font-semibold text-white">{rate?.price}</span>.
            Built with AI in the loop, so you see a working version far sooner
            than a traditional agency would show you a mockup.
          </p>
          <Link
            href="/services/custom-tools-apps"
            className="mt-6 inline-flex h-12 w-fit items-center rounded-full bg-white px-6 text-sm font-semibold text-[#1E1B4B] transition-colors hover:bg-indigo-50"
          >
            How we build custom tools
          </Link>
        </div>

        <div>
          <div
            role="group"
            aria-label="Compare a spreadsheet with a custom tool"
            className="mb-4 inline-flex rounded-full bg-white/10 p-1 text-sm"
          >
            {(
              [
                ["sheet", "Your spreadsheet"],
                ["tool", "Your tool"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setView(key)}
                aria-pressed={view === key}
                className={`min-h-11 rounded-full px-4 font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                  view === key ? "bg-white text-[#1E1B4B]" : "text-indigo-100 hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Fixed min-height so switching views never shifts the page. */}
          <div
            aria-live="polite"
            className="relative min-h-[372px] overflow-hidden sm:min-h-[392px] rounded-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/10"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={view}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="absolute inset-0 bg-white"
              >
                {view === "sheet" ? <SheetView /> : <ToolView />}
              </motion.div>
            </AnimatePresence>
          </div>
          <p className="mt-3 text-[12px] text-indigo-200/60">
            Illustrative example with sample data.
          </p>
        </div>
      </div>
    </article>
  );
}
