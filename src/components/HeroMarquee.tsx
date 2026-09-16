"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { works } from "@/data/site";

const frames = [works[6], works[9], works[16], works[24], works[8], works[2], works[19], works[27]];

/** Px/second the strip drifts on its own when nobody is touching it. */
const AUTOPLAY_SPEED = 14;
/** How long after the last manual scroll/drag before autoplay picks back up. */
const RESUME_DELAY = 1200;

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
 * The hero row drifts sideways on its own, slowly, forever — but it's still
 * a real scroll container underneath: trackpad swipe, shift+wheel, touch, and
 * click-drag all move it directly. Any of those pauses the autoplay for a
 * beat, then it eases back in. The frame list is rendered twice so nudging
 * scrollLeft past the halfway point can wrap invisibly, back or forward.
 */
export default function HeroMarquee() {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let active = false;
    let resumeAt = 0;
    let dragging = false;
    let dragStartX = 0;
    let dragStartScroll = 0;
    let last = performance.now();
    let raf = 0;

    const wrap = () => {
      const half = el.scrollWidth / 2;
      if (el.scrollLeft >= half) el.scrollLeft -= half;
      else if (el.scrollLeft < 0) el.scrollLeft += half;
    };

    const loop = (t: number) => {
      const dt = (t - last) / 1000;
      last = t;
      if (!active && !dragging) {
        el.scrollLeft += AUTOPLAY_SPEED * dt;
        wrap();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const pauseAwhile = () => {
      active = true;
      resumeAt = performance.now() + RESUME_DELAY;
      setTimeout(() => {
        if (performance.now() >= resumeAt) active = false;
      }, RESUME_DELAY + 20);
    };

    const onWheel = () => pauseAwhile();
    const onTouchStart = () => pauseAwhile();
    // Note: this also fires for the autoplay loop's own `scrollLeft` writes —
    // it must only wrap, never pause, or autoplay would pause itself on every
    // single frame it advances.
    const onScroll = () => wrap();

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      dragStartX = e.clientX;
      dragStartScroll = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
      pauseAwhile();
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      el.scrollLeft = dragStartScroll - (e.clientX - dragStartX);
      wrap();
    };
    const endDrag = () => {
      dragging = false;
      pauseAwhile();
    };

    el.addEventListener("wheel", onWheel, { passive: true });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("scroll", onScroll);
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
        ref={track}
        className="flex h-full items-stretch gap-[6px] overflow-x-auto py-[3px] pl-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:pl-10"
        style={{ cursor: "grab", touchAction: "pan-x" }}
      >
        {frames.map((w, i) => (
          <Frame key={`a-${w.slug}`} w={w} i={i} reveal />
        ))}
        {frames.map((w, i) => (
          <Frame key={`b-${w.slug}`} w={w} i={i} />
        ))}
      </div>
    </div>
  );
}
