"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { Button } from "./ui/button";
import { gsap, useGSAP } from "../lib/gsap";


const navLinks = [
  { name: "Services", href: "/#services" },
  { name: "Contact", href: "/contact" },
  { name: "Pricing", href: "/#pricing" },
  { name: "About", href: "/#about" },
  { name: "Reviews", href: "/#testimonials" },
  { name: "Blog", href: "/blog" },
];

function NavLink({ name, href }: { name: string; href: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors px-1 py-0.5"
    >
      {name}
      <motion.span
        className="absolute -bottom-0.5 left-0 h-[1.5px] bg-violet-600 w-full origin-center"
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
    </Link>
  );
}

function NavWordmark() {
  return (
    <Link
      href="/"
      className="font-semibold text-zinc-900 text-[17px] tracking-tight flex items-center"
    >
      {"GenExecutive".split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 + i * 0.025, duration: 0.3, ease: "easeOut" }}
        >
          {char}
        </motion.span>
      ))}
    </Link>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  // Two bars that cross into an X — cheaper than swapping icons.
  const common =
    "absolute left-1/2 h-[1.5px] w-5 -translate-x-1/2 rounded-full bg-zinc-800";
  return (
    <span className="relative block h-4 w-5" aria-hidden>
      <motion.span
        className={common}
        animate={open ? { top: 7, rotate: 45 } : { top: 3, rotate: 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      />
      <motion.span
        className={common}
        animate={open ? { top: 7, rotate: -45 } : { top: 11, rotate: 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      />
    </span>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Phone-width nav needs tighter horizontal padding or the wordmark, CTA and
  // menu button don't fit on a 320px screen.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Close the sheet on Escape, and never leave it open past the md breakpoint.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onWide = () => mq.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onWide);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onWide);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  // Scroll-progress bar driven by whole-page scroll.
  useGSAP(() => {
    if (!progressRef.current) return;
    gsap.fromTo(
      progressRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      },
    );
  });

  const handleGetStarted = () => {
    setOpen(false);
    router.push("/#cta");
  };

  return (
    <>
      <div
        ref={progressRef}
        className="fixed top-0 left-0 z-[60] h-[3px] w-full origin-left bg-gradient-to-r from-violet-500 via-violet-500 to-indigo-500"
        style={{ transform: "scaleX(0)" }}
      />
      <div className="fixed top-0 inset-x-0 z-50 flex flex-col items-center pointer-events-none">
      <motion.nav
        className="pointer-events-auto relative w-full flex items-center justify-between overflow-hidden"
        animate={{
          maxWidth: scrolled ? 700 : 9999,
          borderRadius: scrolled ? 9999 : 0,
          paddingTop: scrolled ? 10 : 16,
          paddingBottom: scrolled ? 10 : 16,
          paddingLeft: compact ? (scrolled ? 14 : 18) : scrolled ? 22 : 32,
          paddingRight: compact ? (scrolled ? 14 : 18) : scrolled ? 22 : 32,
          marginTop: scrolled ? 12 : 0,
          backgroundColor: scrolled
            ? "rgba(255, 255, 255, 0.92)"
            : "rgba(255, 255, 255, 0)",
          boxShadow: scrolled
            ? "0 0 0 1px rgba(228,228,231,0.8), 0 4px 24px rgba(0,0,0,0.06)"
            : "0 0 0 0px rgba(228,228,231,0), 0 0px 0px rgba(0,0,0,0)",
        }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        style={{
          backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
        }}
      >
        {/* Shimmer sweep on pill */}
        <AnimatePresence>
          {scrolled && (
            <motion.div
              key="shimmer"
              className="absolute inset-0 pointer-events-none overflow-hidden"
              style={{ borderRadius: "inherit" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                style={{ skewX: "-20deg" }}
                initial={{ x: -120 }}
                animate={{ x: 820 }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 5,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <NavWordmark />

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <NavLink key={link.name} name={link.name} href={link.href} />
          ))}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <Button onClick={handleGetStarted}>Get Started</Button>
          </motion.div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-zinc-800 transition-colors hover:bg-zinc-100 active:bg-zinc-200 md:hidden"
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile sheet — sibling of the pill because the pill clips overflow. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="pointer-events-auto mt-2 w-[calc(100%-1.5rem)] max-w-[700px] overflow-hidden rounded-2xl border border-zinc-200 bg-white/95 p-2 shadow-[0_12px_40px_rgba(0,0,0,0.10)] backdrop-blur-xl md:hidden"
          >
            <nav aria-label="Mobile">
              <ul className="flex flex-col">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-[48px] items-center rounded-xl px-4 text-[15px] font-medium text-zinc-700 transition-colors hover:bg-violet-50 hover:text-violet-700 active:bg-violet-100"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tap-outside catcher, below the sheet but above the page. */}
      <AnimatePresence>
        {open && (
          <motion.button
            key="menu-scrim"
            type="button"
            aria-hidden
            tabIndex={-1}
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto fixed inset-0 -z-10 cursor-default bg-zinc-900/20 md:hidden"
          />
        )}
      </AnimatePresence>
      </div>
    </>
  );
}

export default Navbar;
