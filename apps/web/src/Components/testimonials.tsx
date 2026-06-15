"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

interface Testimonial {
  author: string;
  role: string;
  text: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    author: "Ishani Behl",
    role: "CEO at Skillopp",
    text: "GenExecutive's AI agents completely automated our operations — scheduling, reporting, follow-ups — what used to eat 3 hours of my team's day now runs itself. The executive support alone is worth every penny.",
    image: "/testimonials/ishani-behl.jpg",
  },
  {
    author: "Shabaz Ahmad",
    role: "Managing Director at SportsRadar",
    text: "Having GenExecutive in my corner feels like gaining an executive team that never clocks out. Every briefing, every follow-up, every decision brief — handled before I even ask. My focus is finally on the work that matters.",
    image: "/testimonials/shabaz-ahmad.jpg",
  },
  {
    author: "Alisha Martin",
    role: "CEO at BuyBirdAcquisitions",
    text: "GenExecutive's AI agents did the research, built the strategy, and automated the execution. Our landing page conversion jumped 40% — and my team didn't lift a finger on the heavy lifting.",
    image: "/testimonials/alisha-martin.jpg",
  },
  {
    author: "Abhishek Gupta",
    role: "CEO at Timepe",
    text: "The depth of AI research GenExecutive brought to our product blew us away. They didn't just automate our onboarding — they studied our users, identified drop-off patterns, and built an intelligent flow that saves us 20+ hours a week.",
    image: "/testimonials/abhishek-gupta.jpg",
  },
  {
    author: "Rashmi Sharma",
    role: "CMO at Cocacola",
    text: "GenExecutive handles everything from campaign design to creative production. Briefs, assets, performance research — it all comes back polished and on-brand. It's the executive creative support I didn't know I needed until I had it.",
    image: "/testimonials/rashmi-sharma.jpg",
  },
];

// "Ishani Behl" → "IB"; used as the avatar fallback when the photo is missing.
function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function TestimonialCard({ author, role, text, image }: Testimonial) {
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
      <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-br from-white/60 to-transparent opacity-60" />
      <p className="text-sm text-zinc-600 italic leading-relaxed mb-4">
        &ldquo;{text}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10 shrink-0 rounded-full bg-violet-100 flex items-center justify-center overflow-hidden">
          <span className="text-xs font-semibold text-violet-700 select-none">
            {initials(author)}
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={author}
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
        <div>
          <div className="text-sm font-semibold text-zinc-900">{author}</div>
          <div className="text-xs text-zinc-400">{role}</div>
        </div>
      </div>
    </motion.div>
  );
}

// Captures testimonial content at mount time so the exiting AnimatePresence
// element never picks up updated props mid-animation.
function FrozenTestimonialCard(props: Testimonial) {
  const frozen = useRef<Testimonial>(props);
  return <TestimonialCard {...frozen.current} />;
}

const ghostPositions = [
  { top: "6%", left: "4%", rotate: -8 },
  { top: "50%", right: "3%", rotate: 6 },
  { bottom: "8%", left: "16%", rotate: -4 },
];

export function Testimonials() {
  // Single counter is the source of truth; activeIdx is always derived from it.
  // This prevents the activeIdx/cycleKey drift that occurred with two separate states.
  const [step, setStep] = useState(0);
  const activeIdx = step % testimonials.length;

  useEffect(() => {
    const id = setInterval(() => setStep((s) => s + 1), 4200);
    return () => clearInterval(id);
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
              <TestimonialCard {...t} />
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

        {/* Active testimonial */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ y: 52, opacity: 0, scale: 0.94 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -28, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.48, ease: "easeOut" }}
            className="relative"
          >
            <FrozenTestimonialCard {...testimonials[activeIdx]} />
          </motion.div>
        </AnimatePresence>

        {/* Indicator dots */}
        <div className="flex items-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setStep((s) => {
                  const n = testimonials.length;
                  const diff = (i - (s % n) + n) % n;
                  // diff === 0 means the dot for the current testimonial was clicked:
                  // advance a full cycle to re-trigger the animation.
                  return s + (diff === 0 ? n : diff);
                });
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
