"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "../lib/gsap";

/**
 * Single home for all global scroll behaviour:
 *  - `.gsap-reveal` elements fade + rise in once, batched & staggered.
 *  - `[data-parallax]` decorative elements drift on scroll (scrubbed, no pin).
 *  - In-page anchor clicks smooth-scroll via ScrollToPlugin (we removed CSS
 *    `scroll-behavior: smooth` so it can't fight ScrollTrigger scrubbing).
 *  - Honors prefers-reduced-motion: everything shows instantly, no scrub.
 *
 * Mounted once from the root layout. Renders nothing.
 */
export default function ScrollAnimations() {
  const ready = useRef(false);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // ── Reduced motion / accessibility: reveal everything, skip effects ──
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(".gsap-reveal", { autoAlpha: 1, y: 0 });
    });

    // ── Full experience ──
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Start hidden (CSS already sets opacity:0 to prevent a flash; this adds
      // the offset and lets GSAP own the property from here on).
      gsap.set(".gsap-reveal", { autoAlpha: 0, y: 40 });

      const reveals = ScrollTrigger.batch(".gsap-reveal", {
        start: "top 86%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.09,
            ease: "power3.out",
            overwrite: true,
          }),
      });

      // Decorative parallax. data-parallax = signed speed (e.g. "-12", "18").
      const parallaxTriggers: ScrollTrigger[] = [];
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = Number(el.dataset.parallax) || 0;
        const tween = gsap.to(el, {
          yPercent: speed,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        });
        if (tween.scrollTrigger) parallaxTriggers.push(tween.scrollTrigger);
      });

      // Refresh once images/fonts settle so start/end positions are correct.
      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);
      ready.current = true;

      return () => {
        window.removeEventListener("load", onLoad);
        reveals.forEach((t) => t.kill());
        parallaxTriggers.forEach((t) => t.kill());
      };
    });

    // ── Smooth in-page anchor scrolling (delegated) ──
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const link = target?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      gsap.to(window, {
        duration: reduce ? 0 : 0.9,
        ease: "power2.inOut",
        scrollTo: { y: el as HTMLElement, offsetY: 72 },
      });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      mm.revert();
    };
  });

  return null;
}
