/* A slice of a handled day: shows the job instead of naming it. */
const log = [
  { time: "08:12", task: "Inbox triaged, 3 need you", done: false },
  { time: "10:30", task: "Invoice #218 chased and paid", done: true },
  { time: "11:45", task: "Supplier quotes compared", done: true },
  { time: "14:05", task: "Leeds trip booked", done: true },
  { time: "16:40", task: "Client report ready to sign", done: false },
];

export default function OfficePreview() {
  return (
    <figure className="rounded-2xl bg-white ring-1 ring-zinc-200">
      <figcaption className="flex items-center justify-between border-b border-zinc-100 px-4 py-2.5 text-[12px]">
        <span className="font-semibold text-zinc-900">Today, handled</span>
        <span className="text-zinc-400">A typical day</span>
      </figcaption>
      <ol className="px-4 py-1">
        {log.map((entry) => (
          <li key={entry.time} className="flex items-center gap-3 py-2 text-[13px]">
            <time className="w-10 shrink-0 tabular-nums text-zinc-400">{entry.time}</time>
            <span className="min-w-0 flex-1 truncate text-zinc-700">{entry.task}</span>
            <span
              className={`h-2 w-2 shrink-0 rounded-full ${entry.done ? "bg-emerald-500" : "bg-amber-400"}`}
              aria-label={entry.done ? "Done" : "Needs you"}
              role="img"
            />
          </li>
        ))}
      </ol>
      <p className="flex gap-4 border-t border-zinc-100 px-4 py-2.5 text-[11px] text-zinc-500">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden /> Done
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" aria-hidden /> Needs you
        </span>
      </p>
    </figure>
  );
}
