import { getRate } from "@/lib/services";
import BentoCard from "../services/BentoCard";
import ToolsPreview from "../services/ToolsPreview";
import OfficePreview from "../services/OfficePreview";
import BrainPreview from "../services/BrainPreview";
import FlowPreview from "../services/FlowPreview";

function fromPrice(slug: string) {
  const rate = getRate(slug);
  return rate ? `from ${rate.price}${rate.unit.startsWith("/") ? rate.unit : ` ${rate.unit}`}` : undefined;
}

/**
 * Asymmetric bento: custom tools (the focus service) is the dominant tile,
 * the other services sit around it, each with a small preview of the thing
 * it produces.
 *
 *   lg:  tools  tools  tools  tools  office office
 *        tools  tools  tools  tools  office office
 *        brain  brain  ai     ai     ai     ai
 */
export function Services() {
  return (
    <section id="services" className="scroll-mt-20 bg-zinc-50/50 px-5 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center gsap-reveal sm:mb-16">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-violet-600">
            Services
          </span>
          <h2 className="mx-auto max-w-[700px] text-3xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            What we take off your plate
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-base leading-relaxed text-zinc-500 sm:mt-5 sm:text-lg">
            Three services, one team. Most clients start with one and add the
            others once they see what it frees up.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-6 lg:gap-6">
          <BentoCard
            className="md:col-span-2 lg:col-span-4 lg:row-span-2"
            surface="from-white to-violet-50/70"
            title="Custom tools & apps"
            description="When the spreadsheet stops working, we build the tool that replaces it: dashboards, custom CRMs and client portals, with AI built in where it helps."
            visual={<ToolsPreview />}
            price={fromPrice("custom-tools-apps")}
            href="/services/custom-tools-apps"
            linkLabel="How we build tools"
          />
          <BentoCard
            className="lg:col-span-2 lg:row-span-2"
            title="Back-office support"
            description="Inbox, calendar, invoicing and suppliers handled by people, sped up by AI."
            visual={<OfficePreview />}
            price={fromPrice("back-office-support")}
            href="/services/back-office-support"
            linkLabel="What it covers"
          />
          <BentoCard
            className="lg:col-span-2"
            surface="from-white to-violet-50/40"
            title="Company brain"
            description="A private AI assistant that answers from your own documents."
            visual={<BrainPreview />}
            href="/services/custom-tools-apps"
            linkLabel="See RAG tools"
          />
          <BentoCard
            className="md:col-span-2 lg:col-span-4"
            title="AI agents & automations"
            description="Agents that do the legwork across the tools you already use, then stop and wait for you before anything goes out."
            visual={<FlowPreview />}
            price={fromPrice("ai-automation")}
            href="/services/ai-automation"
            linkLabel="What we automate"
          />
        </div>
      </div>
    </section>
  );
}

export default Services;
