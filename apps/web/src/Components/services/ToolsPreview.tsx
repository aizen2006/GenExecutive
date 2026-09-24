"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

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

const BUILD_STEPS = ["Reading pipeline_FINAL_v3.xlsx", "Deduplicating 2 rows", "Building pipeline view", "Wiring follow-up reminders"];

function SheetView() {
  return (
    <div className="h-full bg-white text-[12px] text-zinc-700">
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
    </div>
  );
}

function ToolView() {
  return (
    <div className="h-full bg-white text-[12px] text-zinc-700">
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
      <p className="px-3 py-2 text-[11px] text-emerald-600">1 follow-up due today, reminder sent</p>
    </div>
  );
}

/**
 * A build scan: a scan line sweeps across the spreadsheet, a pixel grid
 * dissolves the cells at its edge, and the finished tool is revealed behind
 * it. Plays once when scrolled into view; "Run again" replays it.
 */
export default function ToolsPreview() {
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const toolRef = useRef<HTMLDivElement>(null);
  const inView = useInView(frameRef, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const controlsRef = useRef<ReturnType<typeof animate> | null>(null);

  /** Paints one frame: tool clip, pixel grid around the scan edge, scan line. */
  const paint = useCallback((p: number) => {
    const frame = frameRef.current;
    const canvas = canvasRef.current;
    const tool = toolRef.current;
    if (!frame || !canvas || !tool) return;

    const w = frame.clientWidth;
    const h = frame.clientHeight;
    const x = p * w;
    tool.style.clipPath = `inset(0 ${Math.max(0, w - x)}px 0 0)`;

    const dpr = window.devicePixelRatio || 1;
    if (canvas.width !== Math.round(w * dpr)) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    if (p <= 0 || p >= 1) return;

    // Pixel band: dense just ahead of the line, thinning out as it goes.
    const cell = 9;
    const band = 84;
    for (let cx = Math.floor((x - 12) / cell) * cell; cx < x + band; cx += cell) {
      const falloff = 1 - Math.max(0, cx - x) / band;
      for (let cy = 0; cy < h; cy += cell) {
        if (Math.random() > falloff * 0.55) continue;
        ctx.fillStyle = Math.random() > 0.7 ? "rgba(99,102,241," : "rgba(124,58,237,";
        ctx.fillStyle += `${(0.15 + Math.random() * 0.55) * falloff})`;
        ctx.fillRect(cx + 1, cy + 1, cell - 2, cell - 2);
      }
    }

    // Scan line with a soft glow trailing behind it.
    const glow = ctx.createLinearGradient(x - 40, 0, x, 0);
    glow.addColorStop(0, "rgba(124,58,237,0)");
    glow.addColorStop(1, "rgba(124,58,237,0.18)");
    ctx.fillStyle = glow;
    ctx.fillRect(x - 40, 0, 40, h);
    ctx.fillStyle = "#7c3aed";
    ctx.fillRect(x - 1, 0, 2, h);
  }, []);

  const run = useCallback(() => {
    if (reduce) {
      setProgress(1);
      paint(1);
      return;
    }
    setRunning(true);
    controlsRef.current?.stop();
    controlsRef.current = animate(0, 1, {
      duration: 3.4,
      ease: [0.45, 0.05, 0.25, 1],
      onUpdate: (p) => {
        paint(p);
        setProgress(p);
      },
      onComplete: () => setRunning(false),
    });
  }, [paint, reduce]);

  // Stop a scan in flight if the card unmounts.
  useEffect(() => () => controlsRef.current?.stop(), []);

  useEffect(() => {
    paint(0);
  }, [paint]);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(run, 350);
    return () => clearTimeout(t);
  }, [inView, run]);

  const done = progress >= 1;
  const pct = Math.round(progress * 100);
  const step = BUILD_STEPS[Math.min(BUILD_STEPS.length - 1, Math.floor(progress * BUILD_STEPS.length))];

  return (
    <div>
      <div
        ref={frameRef}
        className="relative h-[206px] overflow-hidden rounded-2xl bg-white ring-1 ring-zinc-200"
        role="img"
        aria-label="A messy pipeline spreadsheet being rebuilt as a clean custom pipeline tool"
      >
        <div className="absolute inset-0">
          <SheetView />
        </div>
        <div ref={toolRef} className="absolute inset-0" style={{ clipPath: "inset(0 100% 0 0)" }}>
          <ToolView />
        </div>
        <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden />
      </div>

      {/* Progress overlay, below the frame so it never covers the data. */}
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-zinc-100">
        <div
          className={`h-full rounded-full ${done ? "bg-emerald-500" : "bg-gradient-to-r from-violet-600 to-indigo-500"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-1 flex items-center gap-3 text-[12px]">
        <span className={`min-w-0 flex-1 truncate tabular-nums ${done ? "font-medium text-emerald-600" : "text-zinc-500"}`}>
          {done ? "Ready. Spreadsheet retired." : progress > 0 ? `${step}… ${pct}%` : "Queued"}
        </span>
        {/* Announce only the result, not every frame of progress. */}
        <span className="sr-only" aria-live="polite">
          {done ? "Build finished: the spreadsheet is now a pipeline tool." : ""}
        </span>
        <button
          type="button"
          onClick={() => {
            setProgress(0);
            paint(0);
            run();
          }}
          disabled={running}
          className="min-h-9 shrink-0 rounded-full px-3 font-medium text-violet-600 transition-colors hover:bg-violet-50 disabled:opacity-40"
        >
          Run again
        </button>
      </div>
    </div>
  );
}
