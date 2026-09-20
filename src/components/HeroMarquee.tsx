"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { works } from "@/data/site";

type Slot = { work: (typeof works)[number]; aspect: string; baseline?: boolean };

/** Height of the strip, and of a portrait frame: 1.5 frame-widths. */
const STRIP_HEIGHT = "calc(var(--hero-w) * 1.5)";
/** Hangs a landscape frame off the baseline rather than the top of the strip. */
const BASELINE_DROP = "calc(var(--hero-w) * 1.5 - var(--hero-w) / 1.5)";

/**
 * Tall portraits alternating with short landscapes, the landscapes hung from
 * the top and the baseline in turn. Every frame is one `--hero-w` wide (see
 * .hero-strip in globals.css), so the whole rhythm scales off a single knob.
 */
const slots: Slot[] = [
  { work: works[18], aspect: "3 / 2" },
  { work: works[6], aspect: "2 / 3" },
  { work: works[16], aspect: "3 / 2", baseline: true },
  { work: works[9], aspect: "2 / 3" },
  { work: works[24], aspect: "3 / 2" },
  { work: works[2], aspect: "2 / 3" },
  { work: works[19], aspect: "3 / 2", baseline: true },
  { work: works[27], aspect: "2 / 3" },
];

function Frame({ s, i, reveal }: { s: Slot; i: number; reveal?: boolean }) {
  return (
    <div
      data-reveal={reveal || undefined}
      style={
        {
          "--enter-delay": reveal ? `${0.15 + i * 0.05}s` : undefined,
          width: "var(--hero-w)",
          marginTop: s.baseline ? BASELINE_DROP : undefined,
          aspectRatio: s.aspect,
        } as React.CSSProperties
      }
      className={`relative shrink-0 overflow-hidden ${reveal ? "enter-rise" : ""}`}
    >
      <Image
        src={s.work.cover}
        alt={s.work.title}
        fill
        priority={reveal && i < 4}
        sizes="20vw"
        className="object-cover"
      />
    </div>
  );
}

/**
 * The scatter drifts sideways on its own, slowly, forever, via a CSS
 * transform animation on the track (see .hero-marquee-track in globals.css)
 * — that keeps running on the compositor thread even when the tab is
 * backgrounded, unlike a JS requestAnimationFrame loop, which can stall
 * almost completely there. The track renders the scatter twice back to back
 * and slides exactly one copy's width left, so the loop point is invisible.
 * It still sits inside a native horizontally-scrollable container, so a
 * trackpad swipe, touch drag, or click-drag all move it too — a CSS
 * transform composes on top of scroll position rather than fighting it. It
 * never pauses on hover, only while a frame is actually pressed (see
 * .is-pressed), so it keeps drifting until you touch it.
 */
export default function HeroMarquee() {
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = outer.current;
    const trackEl = track.current;
    if (!el || !trackEl) return;

    let dragging = false;
    let startX = 0;
    let startScroll = 0;

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      startX = e.clientX;
      startScroll = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
      trackEl.classList.add("is-pressed");
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      el.scrollLeft = startScroll - (e.clientX - startX);
    };
    const endDrag = () => {
      dragging = false;
      trackEl.classList.remove("is-pressed");
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
      style={{ "--enter-delay": "0.1s", height: STRIP_HEIGHT } as React.CSSProperties}
      className="hero-strip enter-fade relative"
    >
      <div
        ref={outer}
        className="h-full overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:px-16"
        style={{ cursor: "grab", touchAction: "pan-x" }}
      >
        <div
          ref={track}
          className="hero-marquee-track flex h-full w-max items-start gap-[calc(var(--hero-w)*0.125)]"
        >
          {slots.map((s, i) => (
            <Frame key={`a-${s.work.slug}-${i}`} s={s} i={i} reveal />
          ))}
          <div className="w-[calc(var(--hero-w)*0.125)] shrink-0" aria-hidden />
          {slots.map((s, i) => (
            <Frame key={`b-${s.work.slug}-${i}`} s={s} i={i} />
          ))}
          <div className="w-[calc(var(--hero-w)*0.125)] shrink-0" aria-hidden />
        </div>
      </div>
    </div>
  );
}
