import Link from "next/link";
import { getRate } from "@/lib/services";

type Status = "done" | "you";

/* A realistic day of handled work: shows the job instead of naming it. */
const log: { time: string; task: string; status: Status }[] = [
  { time: "08:12", task: "Inbox triaged: 41 emails in, 3 need your answer", status: "you" },
  { time: "09:05", task: "Tomorrow's meetings confirmed, briefs attached", status: "done" },
  { time: "10:30", task: "Invoice #218 chased, paid by 14:02", status: "done" },
  { time: "11:45", task: "Three supplier quotes compared in one sheet", status: "done" },
  { time: "14:05", task: "Travel booked for the Leeds client visit", status: "done" },
  { time: "16:40", task: "Weekly client report drafted for your sign-off", status: "you" },
];

const covered = [
  "Inbox and email drafting",
  "Calendar and meeting prep",
  "Invoicing and payment chasing",
  "Supplier and vendor follow-ups",
  "Travel and logistics",
  "Research and documents",
];

export default function BackOfficeShiftLog() {
  const rate = getRate("back-office-support");
  const waiting = log.filter((l) => l.status === "you").length;

  return (
    <article className="grid gap-10 rounded-[20px] bg-zinc-100 p-6 sm:p-10 lg:grid-cols-2 lg:gap-14 lg:p-14">
      <div className="flex flex-col">
        <h3 className="text-3xl font-bold leading-[1.05] tracking-[-0.02em] text-zinc-900 sm:text-[40px]">
          Back-office support
        </h3>
        <p className="mt-4 max-w-md text-[17px] leading-relaxed text-zinc-600">
          Experienced people take over the admin that fills your week, with AI
          handling the repetitive steps around them. You get the answers and
          the decisions; we handle the rest.
        </p>
        <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-2.5 text-[15px] text-zinc-700 sm:grid-cols-2">
          {covered.map((item) => (
            <li key={item} className="border-l-2 border-zinc-300 pl-3">
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-[15px] text-zinc-600">
          From <span className="font-semibold text-zinc-900">{rate?.price}{rate?.unit}</span>.
          Scale up, down or pause any month.
        </p>
        <Link
          href="/services/back-office-support"
          className="mt-6 inline-flex h-12 w-fit items-center rounded-full bg-zinc-900 px-6 text-sm font-semibold text-white transition-colors hover:bg-zinc-700"
        >
          What back-office support covers
        </Link>
      </div>

      <figure className="self-start rounded-xl bg-white shadow-[0_1px_0_rgba(0,0,0,0.04),0_12px_32px_-12px_rgba(24,24,27,0.18)]">
        <figcaption className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-dashed border-zinc-200 px-5 py-4">
          <span className="font-semibold text-zinc-900">Handled for you on Tuesday</span>
          <span className="text-[13px] text-zinc-400">A typical day</span>
        </figcaption>
        <ol className="px-5">
          {log.map((entry) => (
            <li
              key={entry.time}
              className="grid grid-cols-[3.25rem_1fr] items-baseline gap-x-3 gap-y-1 border-b sm:grid-cols-[3.25rem_1fr_auto] border-zinc-100 py-3 text-[14px] last:border-0"
            >
              <time className="tabular-nums text-zinc-400">{entry.time}</time>
              <span className="text-zinc-800">{entry.task}</span>
              {entry.status === "done" ? (
                <span className="col-start-2 text-[13px] font-medium text-emerald-600 sm:col-start-auto">Done</span>
              ) : (
                <span className="col-start-2 text-[13px] font-medium text-amber-600 sm:col-start-auto">Needs you</span>
              )}
            </li>
          ))}
        </ol>
        <p className="border-t border-dashed border-zinc-200 px-5 py-4 text-[13px] text-zinc-500">
          {log.length - waiting} tasks closed. {waiting} waiting on a decision
          only you can make.
        </p>
      </figure>
    </article>
  );
}
