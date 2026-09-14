"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import DetailsPanel from "./DetailsPanel";
import RollingText from "./RollingText";
import type { Work } from "@/data/site";

/**
 * A project reads as one continuous strip: the viewport height stays fixed and
 * the wheel drives horizontal travel with the same inertia as the vertical
 * scroll elsewhere. Trackpads that already send horizontal deltas pass through.
 */
export default function HorizontalGallery({ work, next }: { work: Work; next: Work }) {
  const track = useRef<HTMLDivElement>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let targetX = el.scrollLeft;
    let raf = 0;

    const onWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta === 0) return;
      e.preventDefault();
      const max = el.scrollWidth - el.clientWidth;
      targetX = Math.max(0, Math.min(max, targetX + delta));
      if (reduce) el.scrollLeft = targetX;
    };

    const loop = () => {
      el.scrollLeft += (targetX - el.scrollLeft) * 0.11;
      raf = requestAnimationFrame(loop);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    if (!reduce) raf = requestAnimationFrame(loop);

    return () => {
      el.removeEventListener("wheel", onWheel);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <main className="h-[100svh] overflow-hidden">
      <div
        ref={track}
        className="flex h-full gap-[6px] overflow-x-auto overflow-y-hidden p-[6px] [scrollbar-width:none]"
      >
        {work.gallery.map((src, i) => (
          <figure
            key={`${src}-${i}`}
            data-reveal
            style={{ "--enter-delay": `${0.08 * i}s` } as React.CSSProperties}
            /* First frame is a narrow portrait plate; the rest run full-bleed. */
            className={`enter-slide relative h-full shrink-0 overflow-hidden rounded-card ${
              i === 0 ? "aspect-[3/4]" : "aspect-[3/2]"
            }`}
          >
            <Image
              src={src}
              alt={`${work.title} — frame ${i + 1}`}
              fill
              priority={i < 2}
              sizes="(max-width: 1024px) 90vw, 60vw"
              className="object-cover"
            />
          </figure>
        ))}

        {/* Trailing spacer so the last frame clears the fixed bottom bar. */}
        <div className="h-full w-[6px] shrink-0" aria-hidden />
      </div>

      <DetailsPanel work={work} open={detailsOpen} setOpen={setDetailsOpen} />

      <div
        data-reveal
        style={{ "--enter-delay": "0.35s" } as React.CSSProperties}
        className="enter-lift fixed bottom-4 right-4 z-50 md:bottom-10 md:right-10"
      >
        <Link
          href={`/work/${next.slug}`}
          data-roll-host
          data-cursor="link"
          className="glass flex h-11 items-center gap-4 rounded-card px-4 text-paper"
        >
          <RollingText text="NEXT" className="ui-label" />
          <span className="ui-label hidden text-muted md:inline">{next.title.toUpperCase()}</span>
        </Link>
      </div>
    </main>
  );
}
