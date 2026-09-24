/**
 * Facts about the business itself, shared by the About page, the legal pages,
 * blog bylines and the Organization structured data.
 *
 * Empty strings / empty arrays are treated as "not provided yet": the pages
 * leave that detail out rather than printing a placeholder.
 */

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.genexecutive.in";

export const company = {
  name: "GenExecutive",
  email: "info@genexecutive.in",
  logo: `${siteUrl}/genexe-icon.png`,
  sameAs: [
    "https://x.com/Genexegrowth",
    "https://www.linkedin.com/company/gen-executive/",
  ],
  areaServed: ["US", "GB"],
};

/**
 * GenExecutive is run as a sole proprietorship in India. Fill these in before
 * relying on the Privacy Policy and Terms pages.
 */
export const legal = {
  /** Proprietor's full legal name. */
  proprietorName: "Abhik Halder",
  /** Postal address, or at least city, state, India. */
  address: "Naraina Village , New Delhi , India",
  /** Grievance officer contact (IT Rules, 2011). */
  grievanceEmail: "info@genexecutive.in",
  /** Date the legal pages were last revised, ISO format. */
  lastUpdated: "2026-09-23",
};

export interface TeamMember {
  /** Used as the `author` value in post frontmatter. */
  id: string;
  name: string;
  role: string;
  bio: string;
  linkedin?: string;
}

/**
 * Founders and team. Empty until real names are added; the About page's team
 * section and per-person blog bylines only render when this has entries.
 */
export const team: TeamMember[] = [
  {
    id:"01",
    name:"Abhik Halder",
    role:"Founder",
    bio:"Helping startup founders scale faster with AI",
    linkedin:"https://www.linkedin.com/in/abhik0halder/"
  }
];

export function getTeamMember(id: string | undefined): TeamMember | undefined {
  return id ? team.find((m) => m.id === id) : undefined;
}
