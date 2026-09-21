/**
 * Commercial landing pages, one per service line.
 *
 * Every claim here is carried over from copy that already exists on the site
 * (the Features bento, the pricing tiers, and the homepage FAQ) so the service
 * pages and the homepage cannot drift apart.
 */

export interface ServiceSection {
  heading: string;
  body: string;
  items?: string[];
}

export interface Service {
  slug: string;
  /** Nav and card label. */
  name: string;
  /** Title tag. Absolute — it carries its own brand. */
  seoTitle: string;
  description: string;
  h1: string;
  intro: string;
  proofValue: string;
  proofLabel: string;
  sections: ServiceSection[];
  faq: { q: string; a: string }[];
  /** Blog slugs that should link here, and that this page links back to. */
  relatedPosts: string[];
}

export const services: Service[] = [
  {
    slug: "ai-automation",
    name: "AI Automation",
    seoTitle: "AI Automation & Custom AI Agents | GenExecutive",
    description:
      "Custom AI agents and workflow automation built around the tools you already use, cutting repetitive work by around 80%. Book a discovery call.",
    h1: "AI automation and custom agents for teams that are out of hours",
    intro:
      "Most operational work is repetitive, rule-based and time-heavy without being judgment-heavy. That is exactly the work an agent should be doing. We map your existing workflows, find the automations worth building, and ship them documented and tested.",
    proofValue: "~80%",
    proofLabel: "less busywork on automated workflows",
    sections: [
      {
        heading: "Workflow automation",
        body: "Automated pipelines that remove the repetitive steps between your tools, so nothing waits on someone remembering to move it along.",
        items: [
          "Workflow automation across your existing stack",
          "CRM processes and record hygiene",
          "Lead routing and follow-up",
          "Email automation and triage",
        ],
      },
      {
        heading: "Custom AI agents",
        body: "Agents trained on your specific workflows, tools and data. They complete the task rather than drafting it, and check in only where human judgment genuinely matters.",
        items: [
          "Customer support and lead qualification",
          "Internal knowledge bases",
          "Human-in-the-loop review on anything sensitive",
          "Custom integrations with the tools you run on",
        ],
      },
      {
        heading: "Built, documented, handed over",
        body: "Every automation is tested, documented and handed over with training, so your team can manage and extend it without waiting on us. We keep optimizing as the business changes.",
      },
    ],
    faq: [
      {
        q: "Can you build a custom AI automation for my business?",
        a: "Yes. We analyze your existing workflows, identify the high-value automation opportunities, and build custom pipelines using modern AI tools. Every automation is tested, documented, and handed over with training so your team can manage it confidently.",
      },
      {
        q: "How do your AI agents work?",
        a: "We design and deploy custom AI agents trained on your specific workflows, tools, and data. These agents operate autonomously to complete tasks — from research and data entry to customer follow-ups — and only check in when human judgment is genuinely required.",
      },
      {
        q: "What should we automate first?",
        a: "Start with work that is repetitive, rule-based and time-heavy but not judgment-heavy: inbox and calendar management, lead follow-up and CRM updates, client onboarding, reporting, and internal ops coordination.",
      },
    ],
    relatedPosts: [
      "founders-guide-to-ai-agents",
      "claude-skills-linkedin-outreach",
      "claude-code-skill-gemini-video-analysis",
    ],
  },
  {
    slug: "executive-support",
    name: "Executive Support",
    seoTitle: "Executive Support & Chief of Staff | GenExecutive",
    description:
      "Always-on executive support: calendar, inbox, travel, meeting prep and vendor coordination handled, so you can lead. Book a discovery call today.",
    h1: "Executive support that gives you your week back",
    intro:
      "Businesses rarely stall because they run out of customers. They stall because routine operations expand faster than the team does, until the person meant to be growing the company is the one running it. Executive support removes that load.",
    proofValue: "200+",
    proofLabel: "hours saved per client, per month",
    sections: [
      {
        heading: "What executive support covers",
        body: "Think of it as an always-on chief of staff rather than a task queue. The point is not just hours returned, it is decisions that stop waiting on you.",
        items: [
          "Calendar and schedule management",
          "Email triage and drafting",
          "Travel planning and meeting preparation",
          "Document creation and vendor coordination",
          "Research and project coordination",
        ],
      },
      {
        heading: "How to tell it is what you need",
        body: "Three signals usually show up together: your calendar is full but your priorities have not moved, response times to customers are getting longer, and decisions wait on you because the context lives only in your head. Any two of those mean operations are the constraint, not demand.",
      },
      {
        heading: "Delegate the highest-frequency work first",
        body: "Inbox triage, scheduling, follow-up reminders and status chasing consume the most hours per week and need the least of your specific expertise, so they return time fastest. We start there and widen as trust builds.",
      },
    ],
    faq: [
      {
        q: "What does Executive Support include?",
        a: "Calendar and schedule management, email triage and drafting, travel planning, meeting preparation, document creation, vendor coordination, and general administrative tasks. Think of us as your always-on chief of staff.",
      },
      {
        q: "How does ongoing support work?",
        a: "Our plans are monthly and continuous — we keep managing your operations, automations, support, and content, optimizing as your business grows. There's no fixed end date: scale up, scale down, or pause whenever your needs change.",
      },
      {
        q: "What should a business owner delegate first?",
        a: "Delegate the highest-frequency, lowest-judgment work first — inbox triage, scheduling, follow-up reminders, and status chasing on projects. These consume the most hours per week and need the least of your specific expertise.",
      },
    ],
    relatedPosts: [
      "why-executive-support-is-the-new-competitive-advantage",
      "why-businesses-stop-growing-hidden-operational-challenges",
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
