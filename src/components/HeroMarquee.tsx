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

function Frame({ s, i, reveal }: { s: Slot; i: number; reveal?: boolean }) {
  return (
    <div
      data-reveal={reveal || undefined}
      style={
        {
          "--enter-delay": reveal ? `${0.15 + i * 0.05}s` : undefined,
          width: `${s.widthVw}vw`,
          marginTop: `${s.topVh}vh`,
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
        sizes="30vw"
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
      style={{ "--enter-delay": "0.1s" } as React.CSSProperties}
      className="enter-fade relative h-[62vh] min-h-[420px] max-h-[720px]"
    >
      <div
        ref={outer}
        className="h-full overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:px-16"
        style={{ cursor: "grab", touchAction: "pan-x" }}
      >
        <div ref={track} className="hero-marquee-track flex h-full w-max items-start gap-[3vw]">
          {slots.map((s, i) => (
            <Frame key={`a-${s.work.slug}-${i}`} s={s} i={i} reveal />
          ))}
          <div className="w-[3vw] shrink-0" aria-hidden />
          {slots.map((s, i) => (
            <Frame key={`b-${s.work.slug}-${i}`} s={s} i={i} />
          ))}
          <div className="w-[3vw] shrink-0" aria-hidden />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        <Link href="/archive" data-roll-host data-cursor="link" className="btn-solid pointer-events-auto">
          <RollingText text="Enter Archives" className="ui-label" />
        </Link>
      </div>
    </div>
  );
}
