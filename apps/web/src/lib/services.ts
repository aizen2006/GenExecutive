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

export interface ServiceStep {
  title: string;
  body: string;
}

export interface ServiceComparison {
  heading: string;
  intro: string;
  /** Column headers after the row-label column; GenExecutive goes first. */
  columns: string[];
  rows: { label: string; values: string[] }[];
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
  /** Who the service is for, shown directly under the intro. */
  whoFor: string[];
  sections: ServiceSection[];
  steps: ServiceStep[];
  comparison: ServiceComparison;
  faq: { q: string; a: string }[];
  /** Blog slugs that should link here, and that this page links back to. */
  relatedPosts: string[];
}

/** Mirrors the tiers in Components/sections/Pricing.tsx. */
export const planSummary = [
  {
    name: "Starter",
    price: "$400/month",
    summary:
      "Workflow automation, executive support, calendar and inbox management, AI chatbot setup and social media assistance, optimized monthly.",
  },
  {
    name: "Pro",
    price: "$800/month",
    summary:
      "Everything in Starter plus advanced automation, lead management, dedicated executive support, priority support and process documentation.",
  },
  {
    name: "Enterprise",
    price: "Custom pricing",
    summary:
      "Custom AI agents, internal knowledge bases, human-in-the-loop review, custom integrations and a dedicated account manager.",
  },
];

export const services: Service[] = [
  {
    slug: "ai-automation",
    name: "AI Automation",
    seoTitle: "AI Automation for Small Business & AI Agents | GenExecutive",
    description:
      "Done-for-you AI automation and custom AI agents for small businesses, built around the tools you already use, then documented and handed over. Book a free call.",
    h1: "AI automation and custom AI agents for small businesses that are out of hours",
    intro:
      "Most operational work is repetitive, rule-based and time-heavy without being judgment-heavy. That is exactly the work an agent should be doing. We map your existing workflows, find the automations worth building, and ship them documented and tested.",
    proofValue: "24/7",
    proofLabel: "automations and AI agents running for our clients",
    whoFor: [
      "Founders and small business owners doing admin their tools could do for them",
      "Coaches and consultants whose lead follow-up and onboarding depend on memory",
      "Scaling teams that need systems before they need another hire",
    ],
    sections: [
      {
        heading: "What does an AI automation agency actually build?",
        body: "An AI automation agency builds the connective layer between the tools you already pay for, so work moves between them without someone copying, pasting or remembering to chase it. For a small business that usually means a handful of automated pipelines rather than one big system: new leads captured, qualified and routed to the right person; CRM records kept clean without manual data entry; inbound email sorted, drafted and escalated; client onboarding sent out the moment a deal closes; and weekly reports assembled from the numbers you already have. On top of those pipelines sit AI agents, which handle the parts that need language and judgment, such as answering a customer question from your knowledge base or summarizing a call into next steps. Everything is built on mainstream platforms like Make, Zapier, ChatGPT, Claude, Gemini, Notion AI and ClickUp, so you own it and are never locked in.",
        items: [
          "Workflow automation across your existing stack",
          "CRM processes and record hygiene",
          "Lead routing and follow-up",
          "Email automation and triage",
        ],
      },
      {
        heading: "How are custom AI agents different from a chatbot?",
        body: "A chatbot answers questions; an agent completes the task. Our agents are trained on your specific workflows, tools and data, so they can research a prospect, update a record, draft the follow-up and log what they did, checking in only where human judgment genuinely matters. Anything sensitive, such as a refund, a contract or a message going out under your name, goes through human-in-the-loop review before it is sent.",
        items: [
          "Customer support and lead qualification",
          "Internal knowledge bases",
          "Human-in-the-loop review on anything sensitive",
          "Custom integrations with the tools you run on",
        ],
      },
      {
        heading: "What should a small business automate first?",
        body: "Start with work that is repetitive, rule-based and time-heavy but not judgment-heavy: inbox and calendar management, lead follow-up and CRM updates, client onboarding, reporting, and internal ops coordination. These return the most hours for the least risk, and they make the case for the next round of automation on their own numbers.",
      },
      {
        heading: "Built, documented, handed over",
        body: "Every automation is tested, documented and handed over with training, so your team can manage and extend it without waiting on us. We keep optimizing as the business changes.",
      },
    ],
    steps: [
      {
        title: "Free discovery call",
        body: "A 30-minute call to walk through where your week goes and which workflows are worth automating. No sales pressure.",
      },
      {
        title: "Workflow map",
        body: "We map the tools you use and the steps between them, and rank the automation opportunities by hours returned.",
      },
      {
        title: "Build and test",
        body: "We build the highest-value automations and agents first, and test them against your real data before anything goes live.",
      },
      {
        title: "Handover and training",
        body: "Every automation ships with documentation and training, so your team knows what runs, when, and how to change it.",
      },
      {
        title: "Monthly optimization",
        body: "Plans are ongoing: we monitor, fix and extend the automations as your business and tools change.",
      },
    ],
    comparison: {
      heading: "GenExecutive vs DIY tools vs hiring",
      intro:
        "There are three common ways to get repetitive work off a small team's plate. Here is how they compare.",
      columns: ["GenExecutive", "DIY with automation tools", "Hiring an in-house ops person"],
      rows: [
        {
          label: "Who builds it",
          values: [
            "We do, around your workflows",
            "You or your team, in spare time",
            "A new hire, once they learn your business",
          ],
        },
        {
          label: "AI agents included",
          values: ["Yes, with human review", "Only if you build them", "Depends on the hire"],
        },
        {
          label: "Documentation and training",
          values: ["Included with every build", "Rarely written down", "Lives in one person's head"],
        },
        {
          label: "Ongoing maintenance",
          values: ["Monthly optimization included", "Breaks when tools change", "Salary plus tools"],
        },
        {
          label: "Human executive support",
          values: ["Included in every plan", "No", "Separate role"],
        },
      ],
    },
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
        q: "Which tools do you work with?",
        a: "We build on mainstream platforms including Make, Zapier, ChatGPT, Claude, Gemini, Notion AI and ClickUp, and integrate with the CRM, inbox and calendar you already use. Custom integrations are available on the Enterprise plan.",
      },
      {
        q: "How much does AI automation cost?",
        a: "Automation is included in every monthly plan: Starter at $400/month, Pro at $800/month with advanced automation and process documentation, and a custom-priced Enterprise tier for custom AI agents and integrations.",
      },
    ],
    relatedPosts: [
      "founders-guide-to-ai-agents",
      "claude-skills-linkedin-outreach",
      "claude-code-skill-gemini-video-analysis",
      "claude-code-3-hacks-seo",
    ],
  },
  {
    slug: "executive-support",
    name: "Virtual Executive Assistant",
    seoTitle: "Virtual Executive Assistant Services | GenExecutive",
    description:
      "Virtual executive assistant services for founders, coaches and small businesses in the US and UK: calendar, inbox, travel, meeting prep and vendors handled. From $400/month.",
    h1: "Virtual executive assistant services that give founders their week back",
    intro:
      "Businesses rarely stall because they run out of customers. They stall because routine operations expand faster than the team does, until the person meant to be growing the company is the one running it. A virtual executive assistant removes that load, and our AI automation makes each hour of their time go further.",
    proofValue: "10+",
    proofLabel: "hours saved per client, per week",
    whoFor: [
      "Founders whose calendar is full but whose priorities have not moved",
      "Coaches and consultants losing billable hours to scheduling and email",
      "Small business owners in the US and UK who need support without a full-time hire",
    ],
    sections: [
      {
        heading: "What does a virtual executive assistant do?",
        body: "A virtual executive assistant takes over the recurring, time-heavy work that keeps a founder busy without moving the business forward. In practice that means owning your calendar, so meetings are scheduled, confirmed and prepared for without the back-and-forth; triaging your inbox, so the messages that need you surface and the rest are answered, filed or drafted for approval; planning travel; preparing briefs before meetings; creating documents; coordinating vendors; and chasing the status of projects so nothing waits on you. The difference from a general virtual assistant is scope and judgment: an executive assistant works at the level of your priorities, not a task list. Think of it as an always-on chief of staff rather than a task queue. The point is not just hours returned, it is decisions that stop waiting on you.",
        items: [
          "Calendar and schedule management",
          "Email triage and drafting",
          "Travel planning and meeting preparation",
          "Document creation and vendor coordination",
          "Research and project coordination",
        ],
      },
      {
        heading: "How do human assistants and AI work together?",
        body: "Every GenExecutive plan pairs human executive support with AI automation. The automation handles the mechanical, high-volume steps: sorting email, logging updates, sending reminders, drafting routine replies. Your assistant handles the parts that need context and judgment, reviews anything that goes out under your name, and tells us which steps to automate next. You get the reliability of a person and the speed of software, without managing either.",
      },
      {
        heading: "When should you hire a virtual executive assistant?",
        body: "Three signals usually show up together: your calendar is full but your priorities have not moved, customers are waiting longer for replies, and decisions stall because the context lives only in your head. Any two of those mean operations, not demand, are the constraint. That is the point where support pays for itself.",
      },
      {
        heading: "Delegate the highest-frequency work first",
        body: "Inbox triage, scheduling, follow-up reminders and status chasing consume the most hours per week and need the least of your specific expertise, so they return time fastest. We start there and widen as trust builds.",
      },
    ],
    steps: [
      {
        title: "Free discovery call",
        body: "A 30-minute call to find out where your week is going and what to hand off first. No sales pressure.",
      },
      {
        title: "Handoff plan",
        body: "We agree which recurring work moves to us first, usually inbox, calendar and follow-ups, and how you want it handled.",
      },
      {
        title: "Onboarding",
        body: "Your assistant gets access to the tools they need and learns your preferences, priorities and tone.",
      },
      {
        title: "Automation layer",
        body: "We automate the mechanical steps around your assistant's work so their hours go to judgment, not busywork.",
      },
      {
        title: "Ongoing support",
        body: "Plans are monthly with no fixed end date: scale up, scale down or pause as your needs change.",
      },
    ],
    comparison: {
      heading: "Virtual executive assistant vs freelance VA vs in-house EA vs AI tools",
      intro:
        "Most founders weigh the same four options. The right one depends on how much judgment the work needs and how much managing you want to do.",
      columns: ["GenExecutive", "Freelance VA", "In-house EA", "AI-only tools"],
      rows: [
        {
          label: "Works at executive level",
          values: ["Yes", "Usually task-level", "Yes", "No"],
        },
        {
          label: "AI automation included",
          values: ["Yes", "Rarely", "Rarely", "Yes, you configure it"],
        },
        {
          label: "Commitment",
          values: ["Monthly plan, pause anytime", "Hourly or retainer", "Full-time salary", "Subscription"],
        },
        {
          label: "Handles judgment calls",
          values: ["Yes, with your approval", "Sometimes", "Yes", "No"],
        },
      ],
    },
    faq: [
      {
        q: "What does Executive Support include?",
        a: "Calendar and schedule management, email triage and drafting, travel planning, meeting preparation, document creation, vendor coordination, and general administrative tasks. Think of us as your always-on chief of staff.",
      },
      {
        q: "How much does a virtual executive assistant cost?",
        a: "Executive support is included in every plan: Starter at $400/month, Pro at $800/month with dedicated executive support and priority support, and a custom-priced Enterprise tier with a dedicated account manager.",
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

/** The service a blog post supports, for the post's call to action. */
export function getServiceForPost(postSlug: string): Service | undefined {
  return services.find((s) => s.relatedPosts.includes(postSlug));
}
