"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type View = "sheet" | "tool";

/* The "before": a pipeline kept in a spreadsheet, with the usual damage. */
const sheetRows = [
  { client: "Northwind Co", stage: "proposal sent??", value: "6,400", flag: true },
  { client: "Brightline", stage: "Proposal", value: "#REF!", err: true },
  { client: "Northwind Co", stage: "follow up", value: "6400", flag: true },
  { client: "Maple Studio", stage: "call booked", value: "tbc" },
];

/* The "after": the same data in a tool built for it. */
const deals = [
  { client: "Northwind Co", stage: "Proposal", value: "$6,400", action: true },
  { client: "Maple Studio", stage: "Discovery", value: "$2,800" },
  { client: "Brightline", stage: "Proposal", value: "$4,900" },
];

const stageTone: Record<string, string> = {
  Discovery: "bg-sky-50 text-sky-700 ring-sky-200",
  Proposal: "bg-violet-50 text-violet-700 ring-violet-200",
};

function SheetView() {
  return (
    <div className="text-[12px] text-zinc-700">
      <div className="flex items-center gap-2 border-b border-zinc-200 bg-zinc-50 px-3 py-2">
        <span className="h-3 w-3 rounded-[3px] bg-emerald-600" aria-hidden />
        <span className="truncate text-zinc-500">pipeline_FINAL_v3 (2).xlsx</span>
      </div>
      <table className="w-full border-collapse tabular-nums">
        <tbody>
          {sheetRows.map((row, i) => (
            <tr key={i} className={row.flag ? "bg-yellow-100/80" : ""}>
              <td className="border-b border-r border-zinc-200 px-3 py-2">{row.client}</td>
              <td className="border-b border-r border-zinc-200 px-3 py-2">{row.stage}</td>
              <td className={`border-b border-zinc-200 px-3 py-2 ${row.err ? "font-medium text-red-600" : ""}`}>
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="px-3 py-2.5 text-[11px] text-zinc-400">Edited by 4 people. Which row is current?</p>
    </div>
  );
}

function ToolView() {
  return (
    <div className="text-[12px] text-zinc-700">
      <div className="flex items-center justify-between border-b border-zinc-100 px-3 py-2">
        <span className="font-semibold text-zinc-900">Pipeline</span>
        <span className="tabular-nums text-zinc-400">$48.2k open</span>
      </div>
      <ul className="divide-y divide-zinc-100">
        {deals.map((deal) => (
          <li key={deal.client} className="flex items-center gap-2 px-3 py-2">
            <span className="min-w-0 flex-1 truncate font-medium text-zinc-900">{deal.client}</span>
            <span className={`rounded-md px-1.5 py-0.5 text-[11px] ring-1 ${stageTone[deal.stage]}`}>
              {deal.stage}
            </span>
            <span className="w-12 text-right tabular-nums text-zinc-600">{deal.value}</span>
            {deal.action && (
              <span className="hidden rounded-md bg-violet-600 px-2 py-0.5 text-[11px] font-medium text-white sm:inline">
                Follow up
              </span>
            )}
          </li>
        ))}
      </ul>
      <p className="px-3 py-2.5 text-[11px] text-emerald-600">1 follow-up due today, reminder sent</p>
    </div>
  );
}

/** Compact before/after toggle: the spreadsheet a business runs on vs the tool we'd build. */
export default function ToolsPreview() {
  const [view, setView] = useState<View>("sheet");

  return (
    <div>
      <div role="group" aria-label="Compare a spreadsheet with a custom tool" className="mb-3 inline-flex rounded-full bg-zinc-100 p-1 text-[13px]">
        {(
          [
            ["sheet", "Before"],
            ["tool", "After"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setView(key)}
            aria-pressed={view === key}
            className={`min-h-9 rounded-full px-4 font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 ${
              view === key ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-800"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      {/* Fixed height so toggling never shifts the grid. */}
      <div aria-live="polite" className="relative h-[218px] overflow-hidden rounded-2xl bg-white ring-1 ring-zinc-200">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            {view === "sheet" ? <SheetView /> : <ToolView />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
