"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { works } from "@/data/site";

const frames = [works[6], works[9], works[16], works[24], works[8], works[2], works[19], works[27]];

/**
 * The reference opens on a horizontal row of frames that the mouse wheel pans
 * sideways — scrolling down feeds the row until it runs out, then ordinary
 * vertical scrolling takes over and the page moves past the hero. Scrolling
 * back up while still at the top reverses it. Touch devices keep native
 * swipe; the wheel takeover only applies to fine pointers.
 */
export default function HeroMarquee() {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let targetX = el.scrollLeft;
    let raf = 0;

    const onWheel = (e: WheelEvent) => {
      // Once the page has actually moved past the hero, stop intercepting —
      // this only governs the strip while it's the thing on screen.
      if (window.scrollY > 2) return;

      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta === 0) return;

      const max = el.scrollWidth - el.clientWidth;
      const next = Math.max(0, Math.min(max, targetX + delta));
      // Nothing left to give the strip in this direction: let the wheel event
      // fall through to the page's own vertical scroll instead.
      if (next === targetX) return;

      targetX = next;
      e.preventDefault();
    };

    const loop = () => {
      el.scrollLeft += (targetX - el.scrollLeft) * 0.12;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={track}
      data-reveal
      style={{ "--enter-delay": "0.1s" } as React.CSSProperties}
      className="enter-fade flex h-[46vh] min-h-[260px] gap-[6px] overflow-x-auto px-4 pb-[6px] [scrollbar-width:none] md:h-[56vh] md:px-10 [&::-webkit-scrollbar]:hidden"
    >
      {frames.map((w, i) => (
        <div
          key={w.slug}
          data-reveal
          style={{ "--enter-delay": `${0.15 + i * 0.05}s` } as React.CSSProperties}
          className={`enter-rise relative h-full shrink-0 overflow-hidden ${i % 3 === 1 ? "aspect-[3/4]" : "aspect-[4/5]"} ${i % 2 === 1 ? "self-end" : "self-start"}`}
        >
          <Image
            src={w.cover}
            alt={w.title}
            fill
            priority={i < 3}
            sizes="(max-width: 768px) 60vw, 30vw"
            className="object-cover"
          />
        </div>
      ))}
      <div className="w-4 shrink-0 md:w-10" aria-hidden />
    </div>
  );
}
