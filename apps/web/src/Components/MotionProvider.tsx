"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

/**
 * `reducedMotion="user"` makes every motion/react animation honour the OS
 * "reduce motion" setting — including the always-on idle loops (floating
 * logos, pulsing badges, ghost cards) that would otherwise keep the main
 * thread and the battery busy on phones.
 *
 * GSAP handles the same preference separately in ScrollAnimations.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
