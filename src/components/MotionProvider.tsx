"use client";

import { MotionConfig } from "motion/react";
import { createContext, useContext, useEffect, useState } from "react";

const FramesPausedContext = createContext(false);

/** True when the document is not being painted, so no rAF-driven animation can run. */
export const useFramesPaused = () => useContext(FramesPausedContext);

/**
 * Motion drives every animation through requestAnimationFrame, which the browser
 * pauses whenever a document is not being painted — a background tab, a
 * prerendered page, or an embedded webview that reports itself hidden. Two things
 * break when that happens:
 *
 *   1. An entrance that starts at `opacity: 0` freezes there, so the content
 *      never appears. Everything that animates in is tagged `data-reveal`, and
 *      globals.css snaps those elements to their resting state while paused.
 *   2. `AnimatePresence mode="wait"` holds the incoming page until the outgoing
 *      one finishes its exit — an exit that will never finish. PageTransition
 *      reads this context and steps out of the way instead.
 *
 * The flag latches: once we have forced content visible we keep it visible for
 * the rest of the page's life, rather than handing control back to an animation
 * that already missed its chance. The animation is a flourish; being able to see
 * and click the site is not.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const sync = () => {
      if (document.visibilityState === "visible") return; // never un-latch
      setPaused(true);
      document.documentElement.dataset.frames = "paused";
    };

    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  return (
    <FramesPausedContext.Provider value={paused}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </FramesPausedContext.Provider>
  );
}
