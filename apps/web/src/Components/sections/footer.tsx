import Link from "next/link";

const services = [
  "Executive Support",
  "AI Automation",
  "AI Agents",
  "Landing Pages",
  "MVP Development",
];

const company = [
  { label: "About", href: "/#about" },
  { label: "Blog", href: "/blog" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Contact", href: "mailto:abhikzapifyflow@gmail.com" },
];

export function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-400">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          {/* Brand */}
          <div>
            <div className="text-white font-semibold text-lg tracking-tight mb-3">
              GenExecutive
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed mb-5">
              Executive intelligence and AI automation for ambitious teams.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                aria-label="Twitter / X"
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="mailto:abhikzapifyflow@gmail.com"
                aria-label="Email"
                className="text-zinc-500 hover:text-white transition-colors"
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
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2.5">
              {company.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Connect</h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:abhikzapifyflow@gmail.com"
                  className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  abhikzapifyflow@gmail.com
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                  Twitter / X
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                  Book a Call
                </a>
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
            <a href="#" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
