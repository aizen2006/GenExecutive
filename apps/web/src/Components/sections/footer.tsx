import Link from "next/link";

const social = {
  x: "https://x.com/Genexegrowth",
  linkedin: "https://www.linkedin.com/company/gen-executive/",
};

const services = [
  { label: "Custom Tools & Apps", href: "/services/custom-tools-apps" },
  { label: "Back-Office Support", href: "/services/back-office-support" },
  { label: "AI Agents & Automations", href: "/services/ai-automation" },
];

const company = [
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Reviews", href: "/#testimonials" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-400">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 sm:gap-12 mb-12 sm:mb-14">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="text-white font-semibold text-lg tracking-tight mb-3">
              GenExecutive
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed mb-5">
              Back-office support, custom tools and AI agents for small businesses in the US and UK.
            </p>
            <div className="-ml-2.5 flex items-center gap-1">
              <a
                href={social.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="flex h-11 w-11 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="mailto:info@genexecutive.in"
                aria-label="Email"
                className="flex h-11 w-11 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-0.5 sm:space-y-1">
              {services.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="inline-flex min-h-11 items-center text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-0.5 sm:space-y-1">
              {company.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect — full row below lg so the email fits on one line. */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-sm font-semibold text-white mb-4">Connect</h3>
            <ul className="space-y-0.5 sm:space-y-1">
              <li>
                <a
                  href="mailto:info@genexecutive.in"
                  className="inline-flex min-h-11 items-center break-words text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  info@genexecutive.in
                </a>
              </li>
              <li>
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={social.x} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                  Twitter / X
                </a>
              </li>
              <li>
                <button
                  type="button"
                  data-cal-namespace="30min"
                  data-cal-link="abhik-halder/30min"
                  data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                  className="inline-flex min-h-11 cursor-pointer items-center text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  Book a Call
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-zinc-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} GenExecutive. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="inline-flex min-h-11 items-center text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="inline-flex min-h-11 items-center text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
