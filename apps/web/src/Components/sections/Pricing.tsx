import Link from "next/link";
import { rates, services } from "@/lib/services";
import CalButton from "../caldotcom";

/**
 * Rate card rather than feature tiers: each service is billed the way the
 * work is shaped (retainer, fixed project, setup), with a "from" price so a
 * small business can tell whether it's in budget before booking a call.
 * Prices live in lib/services.ts `rates`.
 */
export function Pricing() {
  // Same order as the services section.
  const ordered = services
    .map((s) => rates.find((r) => r.service === s.slug))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  return (
    <section id="pricing" className="scroll-mt-20 bg-white px-5 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 grid gap-4 sm:mb-14 lg:grid-cols-2 lg:items-end lg:gap-14">
          <h2 className="text-4xl font-bold leading-[1.02] tracking-[-0.03em] text-zinc-900 sm:text-6xl">
            How we charge
          </h2>
          <p className="max-w-lg text-[17px] leading-relaxed text-zinc-500">
            Each service is priced the way the work is shaped. Every engagement
            starts with a free 30-minute call, and you get a fixed quote before
            anything starts.
          </p>
        </div>

        <ul className="border-t border-zinc-900">
          {ordered.map((rate, i) => (
            <li key={rate.service} className="border-b border-zinc-200">
              <details className="group" open={i === 0}>
                <summary className="grid cursor-pointer list-none grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 py-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-600 sm:grid-cols-[1.2fr_1fr_15rem_2.25rem] sm:py-8 [&::-webkit-details-marker]:hidden">
                  <span className="text-xl font-semibold tracking-[-0.01em] text-zinc-900 sm:text-2xl">
                    {rate.name}
                  </span>
                  <span className="order-3 col-span-2 flex items-center justify-between text-[15px] text-zinc-500 sm:order-none sm:col-span-1">
                    {rate.model}
                    {/* Phones: the expand cue lives on this line; the round
                        button in the last column is desktop only. */}
                    <span
                      aria-hidden
                      className="text-xl leading-none text-zinc-400 transition-transform group-open:rotate-45 sm:hidden"
                    >
                      +
                    </span>
                  </span>
                  <span className="text-right tabular-nums">
                    <span className="text-[13px] text-zinc-400">from </span>
                    <span className="text-2xl font-bold tracking-[-0.02em] text-zinc-900 sm:text-3xl">
                      {rate.price}
                    </span>
                    <span className="text-[15px] text-zinc-500">
                      {rate.unit.startsWith("/") ? rate.unit : ` ${rate.unit}`}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="hidden h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-lg leading-none text-zinc-500 transition-transform group-open:rotate-45 sm:flex"
                  >
                    +
                  </span>
                </summary>

                <div className="grid gap-6 pb-8 sm:grid-cols-[1.2fr_1fr_15rem_2.25rem] sm:gap-x-6">
                  <ul className="grid gap-2 text-[15px] text-zinc-700 sm:col-span-2 sm:grid-cols-2 sm:gap-x-8">
                    {rate.includes.map((item) => (
                      <li key={item} className="border-l-2 border-violet-200 pl-3">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col gap-3 sm:col-span-2 sm:items-end sm:text-right">
                    {rate.addOn && (
                      <p className="max-w-xs text-[14px] leading-relaxed text-zinc-500">{rate.addOn}</p>
                    )}
                    <Link
                      href={`/services/${rate.service}`}
                      className="text-[14px] font-medium text-violet-700 underline decoration-violet-300 underline-offset-4 hover:decoration-violet-700"
                    >
                      Details for {rate.name.toLowerCase()}
                    </Link>
                  </div>
                </div>
              </details>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-lg text-[15px] leading-relaxed text-zinc-600">
            Most clients combine two, for example back-office support plus a
            custom tool that removes the work at its source. We&apos;ll price
            the combination on the call.
          </p>
          <CalButton className="w-full shrink-0 sm:w-auto">Get a quote on a call</CalButton>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
