"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import RollingText from "./RollingText";
import { works } from "@/data/site";

type Slot = { work: (typeof works)[number]; widthVw: number; topVh: number; aspect: string };

/** Loose two-tier scatter, widths/offsets in viewport units so it scales with the screen. */
const slots: Slot[] = [
  { work: works[18], widthVw: 19, topVh: 0, aspect: "4 / 5" },
  { work: works[6], widthVw: 11, topVh: 15, aspect: "3 / 4" },
  { work: works[16], widthVw: 16, topVh: 4, aspect: "4 / 5" },
  { work: works[9], widthVw: 16, topVh: 0, aspect: "4 / 5" },
  { work: works[24], widthVw: 14, topVh: 32, aspect: "3 / 4" },
  { work: works[2], widthVw: 18, topVh: 20, aspect: "3 / 4" },
  { work: works[19], widthVw: 22, topVh: 32, aspect: "1 / 1" },
  { work: works[27], widthVw: 18, topVh: 34, aspect: "4 / 5" },
];

/**
 * The reference's hero isn't a single strip — frames scatter across two loose
 * tiers with a lot of empty space, and the "Enter Archives" button floats
 * centered over the top of it. The whole scatter is one wheel-driven
 * horizontal ticker: scrolling down pans it sideways until it runs out, then
 * ordinary vertical scrolling takes over (see the capture-phase listener
 * below — it also has to win the race against Lenis, which listens for
 * wheel on window too).
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
      if (window.scrollY > 2) return;

      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta === 0) return;

      const max = el.scrollWidth - el.clientWidth;
      const next = Math.max(0, Math.min(max, targetX + delta));
      if (next === targetX) return;

      targetX = next;
      e.preventDefault();
      e.stopPropagation();
    };

    const loop = () => {
      el.scrollLeft += (targetX - el.scrollLeft) * 0.12;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    return () => {
      window.removeEventListener("wheel", onWheel, { capture: true });
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      data-reveal
      style={{ "--enter-delay": "0.1s" } as React.CSSProperties}
      className="enter-fade relative h-[62vh] min-h-[420px] max-h-[720px]"
    >
      <div
        ref={track}
        className="flex h-full items-start gap-[3vw] overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:px-10"
      >
        {slots.map((s, i) => (
          <div
            key={`${s.work.slug}-${i}`}
            data-reveal
            style={
              {
                "--enter-delay": `${0.15 + i * 0.05}s`,
                width: `${s.widthVw}vw`,
                marginTop: `${s.topVh}vh`,
                aspectRatio: s.aspect,
              } as React.CSSProperties
            }
            className="enter-rise relative shrink-0 overflow-hidden"
          >
            <Image
              src={s.work.cover}
              alt={s.work.title}
              fill
              priority={i < 4}
              sizes="30vw"
              className="object-cover"
            />
          </div>
        ))}
        <div className="w-4 shrink-0 md:w-10" aria-hidden />
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        <Link href="/archive" data-roll-host data-cursor="link" className="btn-solid pointer-events-auto">
          <RollingText text="Enter Archives" className="ui-label" />
        </Link>
      </div>
    </div>
  );
}
