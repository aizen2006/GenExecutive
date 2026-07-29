"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

let started = false;

/**
 * Loads the Cal.com embed once per page, and not during the initial load —
 * `getCalApi` pulls a third-party script, which competes with the hero for
 * bandwidth and main thread exactly when Speed Index is being measured.
 *
 * Deferred to idle, but brought forward by the first pointer/key/scroll so a
 * fast clicker never hits a dead "Book a Call" button.
 */
export function useCalEmbed() {
  useEffect(() => {
    if (started) return;
    started = true;

    let idleId: number | undefined;
    const events = ["pointerdown", "keydown", "touchstart", "scroll"] as const;
    const hasIdle = typeof window.requestIdleCallback === "function";

    const load = async () => {
      cleanup();
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    };

    const cleanup = () => {
      if (idleId !== undefined) {
        if (hasIdle) window.cancelIdleCallback(idleId);
        else window.clearTimeout(idleId);
        idleId = undefined;
      }
      events.forEach((e) => window.removeEventListener(e, load));
    };

    idleId = hasIdle
      ? window.requestIdleCallback(load, { timeout: 3000 })
      : window.setTimeout(load, 2000);

    events.forEach((e) =>
      window.addEventListener(e, load, { once: true, passive: true }),
    );

    return cleanup;
  }, []);
}
