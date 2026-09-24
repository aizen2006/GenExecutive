import CustomToolsShowcase from "../services/CustomToolsShowcase";
import BackOfficeShiftLog from "../services/BackOfficeShiftLog";
import AutomationPipeline from "../services/AutomationPipeline";

/**
 * Homepage services. Each service gets its own composition built around the
 * thing it produces (a tool, a day of handled work, a workflow) rather than
 * a grid of matching cards. Custom tools lead: it's the focus service.
 */
export function Services() {
  return (
    <section id="services" className="scroll-mt-20 bg-white px-5 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 grid gap-4 sm:mb-16 lg:grid-cols-2 lg:items-end lg:gap-14">
          <h2 className="text-4xl font-bold leading-[1.02] tracking-[-0.03em] text-zinc-900 sm:text-6xl">
            What we take off your plate
          </h2>
          <p className="max-w-lg text-[17px] leading-relaxed text-zinc-500">
            Three services, one team. Most clients start with one and add the
            others once they see what it frees up.
          </p>
        </div>

        <div className="flex flex-col gap-5 sm:gap-6">
          <CustomToolsShowcase />
          <BackOfficeShiftLog />
          <AutomationPipeline />
        </div>
      </div>
    </section>
  );
}

export default Services;
