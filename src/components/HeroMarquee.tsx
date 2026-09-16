"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { works } from "@/data/site";

const frames = [works[6], works[9], works[16], works[24], works[8], works[2], works[19], works[27]];

function Frame({ w, i, reveal }: { w: (typeof frames)[number]; i: number; reveal?: boolean }) {
  return (
    <div
      data-reveal={reveal || undefined}
      style={reveal ? ({ "--enter-delay": `${0.15 + i * 0.05}s` } as React.CSSProperties) : undefined}
      className={`relative h-full shrink-0 overflow-hidden ${reveal ? "enter-rise" : ""} ${
        i % 3 === 1 ? "aspect-[3/4]" : "aspect-[4/5]"
      } ${i % 2 === 1 ? "self-end" : "self-start"}`}
    >
      <Image
        src={w.cover}
        alt={w.title}
        fill
        priority={reveal && i < 3}
        sizes="(max-width: 768px) 60vw, 30vw"
        className="object-cover"
        draggable={false}
      />
    </div>
  );
}

/**
 * The hero row drifts sideways on its own, slowly, forever, via a CSS
 * transform animation on the track (see .hero-marquee-track) — that keeps
 * running on the compositor thread even when the tab is backgrounded, unlike
 * a JS requestAnimationFrame loop, which can stall almost completely there.
 * The track sits inside a native horizontally-scrollable container, so a
 * trackpad swipe, shift+wheel, or touch drag moves it too; a CSS transform
 * composes on top of scroll position rather than fighting it, so nothing
 * needs to pause the animation for that to work. Click-drag is added here
 * for plain-mouse desktop users, on the same basis — it just changes
 * scrollLeft, same as any other manual scroll.
 */
export default function HeroMarquee() {
  const outer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = outer.current;
    if (!el) return;

    let dragging = false;
    let startX = 0;
    let startScroll = 0;

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      startX = e.clientX;
      startScroll = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      el.scrollLeft = startScroll - (e.clientX - startX);
    };
    const endDrag = () => {
      dragging = false;
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);
    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", endDrag);
      el.removeEventListener("pointercancel", endDrag);
    };
  }, []);

  return (
    <div
      data-reveal
      style={{ "--enter-delay": "0.1s" } as React.CSSProperties}
      className="enter-fade h-[46vh] min-h-[260px] md:h-[56vh]"
    >
      <div
        ref={outer}
        className="h-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ cursor: "grab", touchAction: "pan-x" }}
      >
        <div className="hero-marquee-track flex h-full w-max items-stretch gap-[6px] py-[3px] pl-4 md:pl-10">
          {frames.map((w, i) => (
            <Frame key={`a-${w.slug}`} w={w} i={i} reveal />
          ))}
          {frames.map((w, i) => (
            <Frame key={`b-${w.slug}`} w={w} i={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
