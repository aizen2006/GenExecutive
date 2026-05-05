"use client";

import { getCalApi } from "@calcom/embed-react";
import { useEffect, type ReactNode } from "react";
import { motion } from "motion/react";

interface CalButtonProps {
  children?: ReactNode;
  className?: string;
}

export default function CalButton({ children = "Book a Call", className }: CalButtonProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <motion.button
      data-cal-namespace="30min"
      data-cal-link="abhik-halder/30min"
      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`inline-flex h-12 cursor-pointer items-center justify-center rounded-full bg-violet-600 px-7 text-sm font-medium text-white shadow-md transition-colors hover:bg-violet-700 ${className ?? ""}`}
    >
      {children}
    </motion.button>
  );
}
