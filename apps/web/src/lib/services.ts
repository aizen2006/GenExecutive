/**
 * Commercial landing pages, one per service line, plus the rate card that the
 * homepage pricing section, the service pages and the structured data share.
 * Change prices in `rates` only.
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

export interface Rate {
  /** Slug of the service this rate belongs to. */
  service: string;
  name: string;
  /** How the engagement is billed. */
  model: string;
  /** Display price, e.g. "$400". */
  price: string;
  /** Shown after the price, e.g. "/month" or "per project". */
  unit: string;
  /** Machine-readable price for structured data. */
  amount: number;
  /** "MON" for monthly retainers; omitted for one-off prices. */
  billing?: "MON";
  includes: string[];
  /** Optional add-on shown under the includes. */
  addOn?: string;
}

export const rates: Rate[] = [
  {
    service: "back-office-support",
    name: "Back-office support",
    model: "Monthly retainer",
    price: "$400",
    unit: "/month",
    amount: 400,
    billing: "MON",
    includes: [
      "Inbox triage and drafting",
      "Calendar, scheduling and meeting prep",
      "Invoicing, payment chasing and bookkeeping admin",
      "Vendor, supplier and customer follow-ups",
      "Research, documents and project coordination",
    ],
    addOn: "Scale hours up or down month to month. Pause anytime.",
  },
  {
    service: "custom-tools-apps",
    name: "Custom tools & apps",
    model: "Fixed-price project",
    price: "$2,500",
    unit: "per project",
    amount: 2500,
    includes: [
      "Scoping call and a written spec before we start",
      "Design, build and testing on your real data",
      "Deployment, documentation and team training",
      "You own the code and the accounts",
    ],
    addOn: "Optional care plan from $300/month for hosting, fixes and new features.",
  },
  {
    service: "ai-automation",
    name: "AI agents & automations",
    model: "One-time setup",
    price: "$1,000",
    unit: "setup",
    amount: 1000,
    includes: [
      "Workflow audit to find what's worth automating",
      "Agents and automations built on the tools you already use",
      "Human approval on anything sensitive",
      "Documentation and handover",
    ],
    addOn: "Optional monitoring from $200/month so nothing breaks silently.",
  },
];

export function getRate(serviceSlug: string): Rate | undefined {
  return rates.find((r) => r.service === serviceSlug);
}

export const services: Service[] = [
  {
    slug: "custom-tools-apps",
    name: "Custom Tools & Apps",
    seoTitle: "Custom Business Software, AI Apps & Dashboards | GenExecutive",
    description:
      "Custom AI-powered tools for small businesses: dashboards, custom CRMs, RAG chatbots and a company brain your team can ask anything. Fixed-price projects from $2,500.",
    h1: "Custom tools and AI apps built around how your business actually works",
    intro:
      "Most small businesses run on a patchwork of spreadsheets, shared inboxes and SaaS subscriptions that each do 70% of the job. We build the missing piece: full-stack apps, with AI where it helps, shaped around your workflow instead of forcing your workflow around someone else's product.",
    proofValue: "Fixed",
    proofLabel: "price, agreed before we write a line of code",
    whoFor: [
      "Teams running the business out of spreadsheets that have outgrown them",
      "Founders paying for several SaaS tools that each almost fit",
      "Businesses sitting on documents and know-how nobody can find when they need it",
    ],
    sections: [
      {
        heading: "What kind of tools do you build?",
        body: "Full-stack web apps, built to be used every day by your team or your clients. The most common are internal dashboards that pull numbers from the tools you already use into one screen; custom CRMs that track the pipeline the way you actually sell rather than the way a generic CRM assumes; client portals where customers see status, documents and invoices without emailing you; and quoting, booking and approval tools that replace a chain of messages and spreadsheets. Where AI earns its place, we build it in: RAG chatbots that answer from your own documents, and a company brain, an internal assistant your team can ask about policies, past projects, pricing or processes and get an answer with the source attached.",
        items: [
          "Dashboards and reporting",
          "Custom CRMs and pipelines",
          "Client portals",
          "Quoting, booking and approval tools",
          "RAG chatbots trained on your documents",
          "A company brain for internal knowledge",
        ],
      },
      {
        heading: "Why build instead of buying another SaaS tool?",
        body: "Off-the-shelf software is the right answer when your process is standard. It stops being the right answer when your team keeps a spreadsheet next to the tool to make it work, or pays for three subscriptions to cover one workflow. A tool built for your process removes the workarounds, keeps your data in one place you own, and grows with the business instead of charging per seat for features you don't use.",
      },
      {
        heading: "How are you faster than a traditional development agency?",
        body: "We build with AI in the loop at every stage, from turning your requirements into a spec to writing, reviewing and testing the code. That removes most of the slow, repetitive parts of software development, so a small team ships in a fraction of the time a traditional agency quotes, and you see a working version early instead of a slide deck.",
      },
      {
        heading: "What is a company brain?",
        body: "A company brain is a private AI assistant connected to your own documents, wikis, past proposals and inbox. Instead of asking the one person who remembers, your team asks the assistant and gets an answer with a link to the source. It is built with retrieval-augmented generation (RAG), so it answers from your material rather than guessing, and access follows the permissions you already have.",
      },
    ],
    steps: [
      {
        title: "Free scoping call",
        body: "A 30-minute call about the problem the tool needs to solve and who will use it.",
      },
      {
        title: "Written spec and fixed price",
        body: "You get a short spec of what we'll build and a fixed price before any work starts.",
      },
      {
        title: "Working version early",
        body: "You click through a real, working version on your data early, not a mockup, and we adjust from there.",
      },
      {
        title: "Launch and training",
        body: "We deploy it, document it and train your team. You own the code and the accounts.",
      },
      {
        title: "Optional care plan",
        body: "Hosting, fixes and new features on a monthly plan, or take it in-house. Your choice.",
      },
    ],
    comparison: {
      heading: "Custom tool vs spreadsheets vs SaaS vs hiring a developer",
      intro:
        "There are four common ways to fix a workflow your current tools don't fit. Here is how they compare.",
      columns: ["GenExecutive", "Spreadsheets", "Off-the-shelf SaaS", "Freelance developer"],
      rows: [
        {
          label: "Fits your process",
          values: ["Built around it", "With workarounds", "You adapt to it", "Built around it"],
        },
        {
          label: "AI features",
          values: ["Built in where useful", "No", "Generic, if any", "Depends on the developer"],
        },
        {
          label: "Price",
          values: ["Fixed, agreed upfront", "Free, costs time", "Per seat, every month", "Usually hourly"],
        },
        {
          label: "Who owns it",
          values: ["You", "You", "The vendor", "You"],
        },
        {
          label: "Support after launch",
          values: ["Optional care plan", "None", "Vendor support", "If they're available"],
        },
      ],
    },
    faq: [
      {
        q: "How much does a custom tool cost?",
        a: "Projects start from $2,500 and are quoted at a fixed price after a free scoping call, so you know the full cost before we start. An optional care plan for hosting, fixes and new features starts from $300/month.",
      },
      {
        q: "How long does it take to build?",
        a: "It depends on the scope, but because we build with AI in the loop we deliver much faster than a traditional development agency, and you see a working version early rather than waiting for a big reveal at the end.",
      },
      {
        q: "Do we own the code?",
        a: "Yes. Once the project is paid for, the code, the data and the accounts it runs on are yours.",
      },
      {
        q: "Is our data safe in an AI tool?",
        a: "Your tool runs in accounts you own, AI features only see the data they need, and a company brain follows the access permissions you already have. We never use your data to train our own models.",
      },
    ],
    relatedPosts: [
      "claude-code-skill-gemini-video-analysis",
      "claude-code-3-hacks-seo",
    ],
  },
  {
    slug: "back-office-support",
    name: "Back-Office Support",
    seoTitle: "Outsourced Back-Office Support for Small Businesses | GenExecutive",
    description:
      "Outsourced back-office support for small businesses, coaches and consultants in the US and UK: inbox, calendar, invoicing, follow-ups and admin handled. From $400/month.",
    h1: "Back-office support that gives founders their week back",
    intro:
      "Businesses rarely stall because they run out of customers. They stall because routine operations expand faster than the team does, until the person meant to be growing the company is the one running it. We take that back office off your hands, with experienced people doing the work and AI automation making every hour go further.",
    proofValue: "10+",
    proofLabel: "hours saved per client, per week",
    whoFor: [
      "Founders whose calendar is full but whose priorities have not moved",
      "Coaches and consultants losing billable hours to scheduling, email and invoicing",
      "Small business owners in the US and UK who need support without a full-time hire",
    ],
    sections: [
      {
        heading: "What does back-office support cover?",
        body: "Back-office support is the recurring, time-heavy work that keeps a business running but doesn't grow it. In practice we own your inbox, so the messages that need you surface and the rest are answered, filed or drafted for approval; your calendar, so meetings are scheduled, confirmed and prepared for without the back-and-forth; invoicing and payment chasing, so cash comes in on time; supplier and vendor coordination; research and document preparation; and chasing the status of projects so nothing waits on you. It works like having an executive assistant and an operations coordinator in one, without hiring either.",
        items: [
          "Inbox triage and drafting",
          "Calendar management and meeting preparation",
          "Invoicing and payment follow-up",
          "Vendor and supplier coordination",
          "Research, documents and project coordination",
        ],
      },
      {
        heading: "How do people and AI work together on it?",
        body: "Automation handles the mechanical, high-volume steps: sorting email, logging updates, sending reminders, drafting routine replies. Your support team handles the parts that need context and judgment, reviews anything that goes out under your name, and tells us which steps to automate next. You get the reliability of a person and the speed of software, without managing either.",
      },
      {
        heading: "When should you outsource your back office?",
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
        body: "Your support team gets access to the tools they need and learns your preferences, priorities and tone.",
      },
      {
        title: "Automation layer",
        body: "We automate the mechanical steps around the work so human hours go to judgment, not busywork.",
      },
      {
        title: "Ongoing support",
        body: "Monthly, with no fixed end date: scale up, scale down or pause as your needs change.",
      },
    ],
    comparison: {
      heading: "Outsourced back office vs freelance VA vs in-house hire vs AI tools",
      intro:
        "Most founders weigh the same four options. The right one depends on how much judgment the work needs and how much managing you want to do.",
      columns: ["GenExecutive", "Freelance VA", "In-house hire", "AI-only tools"],
      rows: [
        {
          label: "Handles judgment calls",
          values: ["Yes, with your approval", "Sometimes", "Yes", "No"],
        },
        {
          label: "AI automation included",
          values: ["Yes", "Rarely", "Rarely", "Yes, you configure it"],
        },
        {
          label: "Commitment",
          values: ["Monthly, pause anytime", "Hourly or retainer", "Full-time salary", "Subscription"],
        },
        {
          label: "Can build you tools",
          values: ["Yes, same team", "No", "Rarely", "No"],
        },
      ],
    },
    faq: [
      {
        q: "What does back-office support include?",
        a: "Inbox triage and drafting, calendar and schedule management, meeting preparation, invoicing and payment follow-up, vendor coordination, research, documents and general administration. Think of it as an executive assistant and an operations coordinator in one.",
      },
      {
        q: "How much does back-office support cost?",
        a: "Back-office support starts from $400/month on a monthly retainer. You can scale up, scale down or pause whenever your needs change.",
      },
      {
        q: "Is this the same as a virtual assistant?",
        a: "It covers what a virtual executive assistant does, and more: the same team can automate the repetitive parts with AI and build custom tools when a spreadsheet stops being enough.",
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
  {
    slug: "ai-automation",
    name: "AI Agents & Automations",
    seoTitle: "AI Agents & Workflow Automation for Small Business | GenExecutive",
    description:
      "AI agents and workflow automation for small businesses, built on the tools you already use, with human approval on anything sensitive. Setup from $1,000.",
    h1: "AI agents and automations that do the repetitive work, with you in control",
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
        heading: "What do AI agents and automations actually do?",
        body: "Automations are the connective layer between the tools you already pay for, so work moves between them without someone copying, pasting or remembering to chase it. For a small business that usually means a handful of pipelines rather than one big system: new leads captured, qualified and routed to the right person; CRM records kept clean without manual data entry; inbound email sorted, drafted and escalated; client onboarding sent out the moment a deal closes; and weekly reports assembled from the numbers you already have. AI agents sit on top of those pipelines and handle the steps that need language and judgment, such as researching a prospect, drafting a reply or summarizing a call into next steps.",
        items: [
          "Lead capture, qualification and routing",
          "CRM updates and record hygiene",
          "Email triage and drafted replies",
          "Client onboarding and follow-ups",
          "Automated reporting",
        ],
      },
      {
        heading: "Will an AI agent send things without asking me?",
        body: "Only if you want it to. Anything sensitive, such as a refund, a contract or a message going out under your name, goes through human-in-the-loop review: the agent prepares it, a person approves it, and only then is it sent. Routine, low-risk steps run on their own, and every action is logged so you can see what happened and why.",
      },
      {
        heading: "What should a small business automate first?",
        body: "Start with work that is repetitive, rule-based and time-heavy but not judgment-heavy: inbox and calendar management, lead follow-up and CRM updates, client onboarding, reporting, and internal ops coordination. These return the most hours for the least risk, and they make the case for the next round of automation on their own numbers.",
      },
      {
        heading: "Built, documented, handed over",
        body: "Every automation is tested, documented and handed over with training, so your team can manage and extend it without waiting on us. Built on mainstream platforms like Make, Zapier, ChatGPT, Claude, Gemini, Notion AI and ClickUp, so you are never locked in.",
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
        title: "Optional monitoring",
        body: "We watch the automations and fix them when a tool changes, so nothing breaks silently.",
      },
    ],
    comparison: {
      heading: "GenExecutive vs DIY automation vs hiring",
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
          label: "When a tool changes",
          values: ["We fix it (with monitoring)", "It breaks quietly", "Salary plus tools"],
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
        a: "We design and deploy custom AI agents trained on your specific workflows, tools, and data. These agents complete tasks — from research and data entry to customer follow-ups — and only check in when human judgment is genuinely required.",
      },
      {
        q: "Which tools do you work with?",
        a: "We build on mainstream platforms including Make, Zapier, ChatGPT, Claude, Gemini, Notion AI and ClickUp, and integrate with the CRM, inbox and calendar you already use. When nothing off the shelf fits, we build a custom tool instead.",
      },
      {
        q: "How much does AI automation cost?",
        a: "Setup starts from $1,000, depending on how many workflows we automate. Optional monitoring, so automations are fixed when a tool changes, starts from $200/month.",
      },
    ],
    relatedPosts: [
      "founders-guide-to-ai-agents",
      "claude-skills-linkedin-outreach",
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
