"use client";

import type { CSSProperties } from "react";
import { useEffect } from "react";
import { motion } from "motion/react";
import { getCalApi } from "@calcom/embed-react";

export function CTA() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <section id="cta" className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-violet-600 to-indigo-600 py-28 px-6">
      {/* Orb overlays */}
      <div
        data-parallax="-16"
        className="absolute top-[-70px] left-[-90px] w-80 h-80 rounded-full bg-white/10 blur-3xl animate-blob pointer-events-none"
        style={{ "--blob-dur": "11s" } as CSSProperties}
      />
      <div
        data-parallax="14"
        className="absolute bottom-[-50px] right-[-70px] w-64 h-64 rounded-full bg-indigo-300/20 blur-3xl animate-blob blob-delay-2 pointer-events-none"
        style={{ "--blob-dur": "14s" } as CSSProperties}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center gsap-reveal">
        <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-5">
          Focus on Growth.<br className="hidden sm:block" /> We&apos;ll Handle the Operations.
        </h2>
        <p className="text-violet-200 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Build efficient systems, automate repetitive work, and scale your
          business with AI-powered operational support.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button
            data-cal-namespace="30min"
            data-cal-link="abhik-halder/30min"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="h-12 cursor-pointer rounded-full bg-white px-8 text-sm font-semibold text-violet-700 shadow-lg hover:bg-violet-50 transition-colors"
          >
            Book a Discovery Call
          </motion.button>
          <motion.a
            href="#services"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="h-12 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-8 inline-flex items-center text-sm font-medium text-white hover:bg-white/20 transition-colors"
          >
            Explore Services →
          </motion.a>
        </div>
      </div>
    </section>
  );
}

export default CTA;
