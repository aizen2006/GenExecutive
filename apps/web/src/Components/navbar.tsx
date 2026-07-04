"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { Button } from "./ui/button";
import { gsap, useGSAP } from "../lib/gsap";


const navLinks = [
  { name: "Services", href: "/#services" },
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

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const handleGetStarted = () => router.push("/#cta");

  return (
    <>
      <div
        ref={progressRef}
        className="fixed top-0 left-0 z-[60] h-[3px] w-full origin-left bg-gradient-to-r from-violet-500 via-violet-500 to-indigo-500"
        style={{ transform: "scaleX(0)" }}
      />
      <div className="fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none">
      <motion.nav
        className="pointer-events-auto relative w-full flex items-center justify-between overflow-hidden"
        animate={{
          maxWidth: scrolled ? 700 : 9999,
          borderRadius: scrolled ? 9999 : 0,
          paddingTop: scrolled ? 10 : 16,
          paddingBottom: scrolled ? 10 : 16,
          paddingLeft: scrolled ? 22 : 32,
          paddingRight: scrolled ? 22 : 32,
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

        <motion.div
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <Button onClick={handleGetStarted}>Get Started</Button>
        </motion.div>
      </motion.nav>
      </div>
    </>
  );
}

export default Navbar;
