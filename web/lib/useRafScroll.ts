"use client";

import { useEffect, useRef } from "react";

/**
 * Runs `probe` once on mount and then at most once per animation frame while
 * the window scrolls or resizes. Re-subscribes when `key` changes, which is
 * how a client component re-binds after a route change.
 *
 * The header uses this twice — scroll spy and colour scheme — instead of
 * carrying two near-identical listener blocks.
 */
export function useRafScroll(probe: () => void, key: string): void {
  const latest = useRef(probe);
  latest.current = probe;

  useEffect(() => {
    let frame = 0;

    const run = () => {
      frame = 0;
      latest.current();
    };
    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(run);
    };

    run();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [key]);
}
