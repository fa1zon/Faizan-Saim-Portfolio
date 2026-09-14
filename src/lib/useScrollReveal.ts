"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveals an element the first time it scrolls into view.
 *
 * The element renders visible on the server and on the first client render, so
 * a slow or failed hydration can never hide it. Only once JavaScript is running
 * do we hide anything — and then only elements that are still below the fold,
 * where the change cannot be seen. Anything already on screen is left alone.
 */
export function useScrollReveal<T extends HTMLElement>(enabled = true) {
  const ref = useRef<T>(null);
  const [phase, setPhase] = useState<"untouched" | "waiting" | "entering">("untouched");

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;

    // Already on screen: leave it as it is rather than flashing it out and back.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    setPhase("waiting");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setPhase("entering");
        io.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [enabled]);

  return {
    ref,
    /** Applied to the element so CSS can hide, then animate, it. */
    props: {
      "data-await-scroll": phase === "waiting" ? "true" : undefined,
      className: phase === "entering" ? "enter-rise" : undefined,
    },
  };
}
