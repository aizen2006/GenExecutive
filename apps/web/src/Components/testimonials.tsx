"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

const testimonials = [
  {
    author: "Sarah Chen",
    role: "CEO at TechFlow",
    text: "GenExecutive transformed our operations. The AI agents handle what used to take my team 3 hours — now it's done before I finish my morning coffee.",
  },
  {
    author: "Marcus Rodriguez",
    role: "Founder at ScaleUp",
    text: "Exceptional executive support. It's like having a world-class EA who never sleeps and always anticipates exactly what I need next.",
  },
  {
    author: "Alex Kim",
    role: "CMO at LaunchPad",
    text: "Our landing page conversion increased 40% after GenExecutive rebuilt it. The quality and speed of delivery were truly unmatched.",
  },
  {
    author: "Priya Nair",
    role: "COO at Meridian",
    text: "The AI automation they built for our onboarding flow saved us 20+ hours a week. It's been completely game-changing for our team.",
  },
];

function TestimonialCard({
  author,
  role,
  text,
}: {
  author: string;
  role: string;
  text: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 150, damping: 15 });
  const smoothY = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-7, 7]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="relative w-72 rounded-2xl bg-white p-5 shadow-lg border border-zinc-100 overflow-hidden"
    >
      {/* Gradient shimmer */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-br from-white/60 to-transparent opacity-60" />
      <p className="text-sm text-zinc-600 italic leading-relaxed mb-4">
        &ldquo;{text}&rdquo;
      </p>
      <div>
        <div className="text-sm font-semibold text-zinc-900">{author}</div>
        <div className="text-xs text-zinc-400">{role}</div>
      </div>
    </motion.div>
  );
}

const ghostPositions = [
  { top: "6%", left: "4%", rotate: -8 },
  { top: "50%", right: "3%", rotate: 6 },
  { bottom: "8%", left: "16%", rotate: -4 },
];

export function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [cycleKey, setCycleKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((i) => (i + 1) % testimonials.length);
      setCycleKey((k) => k + 1);
    }, 4200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="testimonials"
      className="relative bg-zinc-50 py-32 overflow-hidden"
      style={{ minHeight: 680 }}
    >
      {/* Ghost cards — decorative background layer */}
      {ghostPositions.map((pos, i) => {
        const t = testimonials[(activeIdx + i + 1) % testimonials.length];
        return (
          <motion.div
            key={`ghost-${i}-${t.author}`}
            className="absolute pointer-events-none hidden lg:block"
            style={{ ...pos }}
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 5 + i * 1.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.1,
            }}
          >
            <div
              className="opacity-[0.18] blur-[1.5px]"
              style={{ transform: `rotate(${pos.rotate}deg)` }}
            >
              <TestimonialCard
                author={t.author}
                role={t.role}
                text={t.text}
              />
            </div>
          </motion.div>
        );
      })}

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <motion.span
          className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-4 block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Client Stories
        </motion.span>
        <motion.h2
          className="text-4xl sm:text-5xl font-bold text-zinc-900 tracking-tight mb-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          What Our Clients Say
        </motion.h2>
        <motion.p
          className="text-zinc-500 text-lg mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          Real results from real businesses we&apos;ve worked with.
        </motion.p>

        {/* Active testimonial — pops in */}
        <AnimatePresence mode="wait">
          <motion.div
            key={cycleKey}
            initial={{ y: 52, opacity: 0, scale: 0.94 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -28, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.48, ease: "easeOut" }}
            className="relative"
          >
            <TestimonialCard
              author={testimonials[activeIdx].author}
              role={testimonials[activeIdx].role}
              text={testimonials[activeIdx].text}
            />
          </motion.div>
        </AnimatePresence>

        {/* Indicator dots */}
        <div className="flex items-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveIdx(i);
                setCycleKey((k) => k + 1);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIdx
                  ? "w-6 bg-violet-600"
                  : "w-1.5 bg-zinc-300 hover:bg-zinc-400"
              }`}
              aria-label={`Show testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
