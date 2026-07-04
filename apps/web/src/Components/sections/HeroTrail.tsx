"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";

/**
 * "Inertia trail burst" — a hidden pool of logo tiles. As the pointer moves far
 * enough, the next tile spawns under the cursor, pops in with a springy wobble,
 * skids in the direction of travel (inertia throw), then shrinks away.
 *
 * GSAP-only (no motion/react) per the project's transform-ownership rule.
 * Touch devices get a gentle auto-playing burst; reduced-motion stays static.
 */

const LOGOS = [
  "chatgpt",
  "claude",
  "gemini",
  "perplexity",
  "cursor",
  "make",
  "zapier",
  "notion-ai",
  "clickup",
  "framer",
  "elevenlabs",
];
// Repeat so a fast pointer never recycles a still-animating tile.
const POOL = [...LOGOS, ...LOGOS];

const THRESHOLD = 60; // px of pointer travel between spawns
const THROW = 90; // px of inertia skid
const TILE = 64; // px

export default function HeroTrail() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = container.current;
      if (!root) return;

      const tiles = gsap.utils.toArray<HTMLElement>(".trail-tile");
      gsap.set(tiles, { xPercent: -50, yPercent: -50 });

      let idx = 0;
      let z = 0;

      const spawn = (x: number, y: number, dirX: number, dirY: number) => {
        const tile = tiles[idx % tiles.length];
        idx += 1;
        gsap.killTweensOf(tile);
        gsap.set(tile, {
          x,
          y,
          scale: 0,
          rotation: gsap.utils.random(-18, 18),
          autoAlpha: 1,
          zIndex: ++z,
        });
        const tl = gsap.timeline();
        tl.to(tile, {
          scale: 1,
          duration: 0.5,
          ease: "back.out(2.2)",
        });
        tl.to(
          tile,
          {
            x: `+=${dirX * THROW}`,
            y: `+=${dirY * THROW}`,
            duration: 0.9,
            ease: "power3.out",
          },
          "<",
        );
        tl.to(tile, {
          scale: 0.25,
          autoAlpha: 0,
          duration: 0.5,
          ease: "power2.in",
        });
      };

      const mm = gsap.matchMedia();

      // ── Pointer trail (fine pointer devices) ──
      mm.add(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          let lastX = 0;
          let lastY = 0;
          let primed = false;

          const onMove = (e: MouseEvent) => {
            const r = root.getBoundingClientRect();
            const x = e.clientX - r.left;
            const y = e.clientY - r.top;
            if (x < 0 || y < 0 || x > r.width || y > r.height) return;

            if (!primed) {
              lastX = x;
              lastY = y;
              primed = true;
              return;
            }
            const dx = x - lastX;
            const dy = y - lastY;
            const dist = Math.hypot(dx, dy);
            if (dist < THRESHOLD) return;
            spawn(x, y, dx / dist, dy / dist);
            lastX = x;
            lastY = y;
          };

          window.addEventListener("mousemove", onMove);
          return () => window.removeEventListener("mousemove", onMove);
        },
      );

      // ── Auto-play burst (touch / no-hover devices) ──
      mm.add(
        "(hover: none) and (prefers-reduced-motion: no-preference)",
        () => {
          let t = 0;
          const tick = () => {
            const r = root.getBoundingClientRect();
            const cx = r.width / 2;
            const cy = r.height / 2;
            const rx = r.width * 0.32;
            const ry = r.height * 0.28;
            // Lissajous walk + its tangent for the throw direction.
            const x = cx + rx * Math.cos(t);
            const y = cy + ry * Math.sin(t * 1.3);
            const tanX = -rx * Math.sin(t);
            const tanY = ry * 1.3 * Math.cos(t * 1.3);
            const mag = Math.hypot(tanX, tanY) || 1;
            spawn(x, y, tanX / mag, tanY / mag);
            t += 0.7;
          };
          const call = gsap.delayedCall(0.7, function repeat() {
            tick();
            call.restart(true);
          });
          return () => call.kill();
        },
      );
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
    >
      {POOL.map((id, i) => (
        <div
          key={`${id}-${i}`}
          className="trail-tile absolute left-0 top-0 opacity-0 will-change-transform"
        >
          <div
            className="flex items-center justify-center rounded-2xl bg-white shadow-[0_10px_30px_-8px_rgba(76,29,149,0.35)] ring-1 ring-zinc-200/70"
            style={{ width: TILE, height: TILE }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/logos/${id}.svg`}
              alt=""
              className="h-9 w-9 object-contain"
              draggable={false}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
