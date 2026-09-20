"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useReducedMotion, type MotionValue } from "motion/react";
import RollingText from "./RollingText";
import { works } from "@/data/site";

/**
 * How tall the scroll track is. The stage is pinned for everything past the
 * first screen of it, so this minus 100vh is how far you scroll while the
 * section holds still.
 */
const TRACK_VH = 220;
/**
 * The share of the pinned scroll spent opening the pile. The remainder is
 * the pause: fully open, still pinned, before the page moves on.
 */
const OPEN_BY = 0.5;

type Piece = {
  work: (typeof works)[number];
  /** Resting slot, as a share of the stage box. */
  leftPct: number;
  topPct: number;
  widthPct: number;
  /** width / height. */
  ratio: number;
};

type Layout = {
  /** The stage is locked to this ratio, which is what makes the maths exact. */
  stageRatio: number;
  /** Stops the stage growing taller than the screen it has to be pinned in. */
  maxWidth: string;
  /** Width of the single photo the pile reads as, as a share of the stage. */
  stackWidthPct: number;
  /** Which frame sits on top of the pile — the one picture you see first. */
  cover: number;
  pieces: Piece[];
};

/**
 * Wide stage, two tiers. Nothing is allowed into the middle (roughly 41–59%
 * across, 44–56% down) — that's the hole the button sits in once the pile
 * has opened.
 */
const DESKTOP: Layout = {
  stageRatio: 16 / 9,
  maxWidth: "142vh",
  stackWidthPct: 32,
  cover: 2,
  pieces: [
    { work: works[0], leftPct: 0, topPct: 4, widthPct: 18, ratio: 0.8 },
    { work: works[3], leftPct: 21, topPct: 14, widthPct: 16, ratio: 0.75 },
    { work: works[5], leftPct: 41, topPct: 0, widthPct: 13, ratio: 0.75 },
    { work: works[10], leftPct: 57, topPct: 3, widthPct: 17, ratio: 1 },
    { work: works[13], leftPct: 77, topPct: 10, widthPct: 17, ratio: 0.75 },
    { work: works[15], leftPct: 1, topPct: 56, widthPct: 17, ratio: 0.75 },
    { work: works[22], leftPct: 22, topPct: 60, widthPct: 16, ratio: 0.8 },
    { work: works[27], leftPct: 43, topPct: 59, widthPct: 18, ratio: 0.8 },
    { work: works[30], leftPct: 65, topPct: 56, widthPct: 18, ratio: 1 },
  ],
};

/**
 * A phone can't carry the wide stage: at 16/9 it is barely 200px tall, so the
 * button alone eats a fifth of it and the frames crowd the tap target. This
 * one is portrait, which buys the height to clear a much larger hole — the
 * whole middle band, roughly 25–75% across and 42–58% down, stays empty.
 */
const MOBILE: Layout = {
  stageRatio: 2 / 3,
  maxWidth: "56vh",
  stackWidthPct: 60,
  cover: 1,
  pieces: [
    { work: works[0], leftPct: 2, topPct: 2, widthPct: 30, ratio: 0.75 },
    { work: works[5], leftPct: 38, topPct: 8, widthPct: 26, ratio: 0.8 },
    { work: works[10], leftPct: 68, topPct: 0, widthPct: 30, ratio: 0.75 },
    { work: works[13], leftPct: 0, topPct: 38, widthPct: 22, ratio: 0.8 },
    { work: works[3], leftPct: 78, topPct: 40, widthPct: 22, ratio: 0.75 },
    { work: works[15], leftPct: 3, topPct: 66, widthPct: 28, ratio: 0.75 },
    { work: works[27], leftPct: 36, topPct: 62, widthPct: 30, ratio: 0.8 },
    { work: works[30], leftPct: 70, topPct: 68, widthPct: 28, ratio: 1 },
  ],
};

/**
 * Each frame's offset from its slot back to the middle of the stage, written
 * as a share of the frame's *own* box — which is what a percentage in a
 * `translate` resolves against, so it stays exact at any stage size. A
 * frame's height is only ever implied (width ÷ ratio), hence deriving it
 * from the stage ratio rather than measuring anything.
 */
function stackOffset(p: Piece, l: Layout) {
  const heightPct = (p.widthPct * l.stageRatio) / p.ratio;
  const dx = 50 - (p.leftPct + p.widthPct / 2);
  const dy = 50 - (p.topPct + heightPct / 2);
  return {
    x: `${(dx / p.widthPct) * 100}%`,
    y: `${(dy / heightPct) * 100}%`,
    scale: l.stackWidthPct / p.widthPct,
  };
}

function frameStyle(p: Piece, i: number, l: Layout) {
  return {
    left: `${p.leftPct}%`,
    top: `${p.topPct}%`,
    width: `${p.widthPct}%`,
    aspectRatio: String(p.ratio),
    zIndex: i === l.cover ? 30 : 10 + i,
  };
}

const SIZES = "(max-width: 767px) 40vw, 20vw";

function Frame({ p, i, l, progress }: { p: Piece; i: number; l: Layout; progress: MotionValue<number> }) {
  const from = stackOffset(p, l);
  // Frames land one after another rather than all together, so the pile
  // peels open instead of snapping — and they are all home by OPEN_BY,
  // which is what leaves the rest of the pinned scroll as a held beat.
  const end = Math.min(OPEN_BY - 0.16 + i * 0.02, OPEN_BY);

  const x = useTransform(progress, [0, end], [from.x, "0%"]);
  const y = useTransform(progress, [0, end], [from.y, "0%"]);
  const scale = useTransform(progress, [0, end], [from.scale, 1]);

  return (
    <motion.div className="absolute overflow-hidden" style={{ ...frameStyle(p, i, l), x, y, scale }}>
      <Image src={p.work.cover} alt={p.work.title} fill sizes={SIZES} className="object-cover" />
    </motion.div>
  );
}

/**
 * How far through the pinned track we are, 0 to 1, read straight off the
 * element's live position on every scroll.
 *
 * Deliberately not Motion's `useScroll({ target })`: that measures the target
 * once and caches it, which this page keeps invalidating — Lenis drives the
 * scrolling, the stage swaps size when the layout does, and images above the
 * section settle after mount. Any of those left the cached offsets stale and
 * the whole reveal frozen. A rect read per scroll event is cheap and can't go
 * out of date.
 */
function useTrackProgress(track: React.RefObject<HTMLDivElement | null>) {
  const progress = useMotionValue(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;

    const update = () => {
      const { top, height } = el.getBoundingClientRect();
      const span = height - window.innerHeight;
      progress.set(span > 0 ? Math.min(1, Math.max(0, -top / span)) : 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [track, progress]);

  return progress;
}

/** Phones get their own stage, so the choice has to be made in JS, not CSS. */
function useLayout() {
  const [layout, setLayout] = useState<Layout>(DESKTOP);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setLayout(mq.matches ? MOBILE : DESKTOP);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return layout;
}

/**
 * The archive opener. Every frame starts stacked dead centre at the same
 * size, so the section reads as a single photograph — with the "Enter
 * Archives" button underneath the pile, covered rather than hidden.
 *
 * The stage pins to the screen for the length of the track, and that pinned
 * scroll drives the whole thing open: each frame slides and shrinks into its
 * own slot in the scatter, uncovering the button, which is why it looks like
 * it was under the picture the whole time. The pile is fully open half way
 * through, so the rest of the pinned scroll is a held beat on the finished
 * scatter before the page carries on. Scrolling back up closes it again.
 */
export default function ArchiveStack() {
  const track = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const layout = useLayout();

  // Driven straight off the scroll: Lenis already smooths it, and a spring in
  // between only adds lag the frames don't need.
  const progress = useTrackProgress(track);

  const stage = (children: React.ReactNode) => (
    <div
      className="relative mx-auto w-full"
      style={{ aspectRatio: String(layout.stageRatio), maxWidth: layout.maxWidth }}
    >
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <Link href="/archive" data-roll-host data-cursor="link" className="btn-solid">
          <RollingText text="Enter Archives" className="ui-label" />
        </Link>
      </div>
      {children}
    </div>
  );

  // Nothing to pin or drive when the frames never move.
  if (reduceMotion) {
    return stage(
      layout.pieces.map((p, i) => (
        <div key={p.work.slug} className="absolute overflow-hidden" style={frameStyle(p, i, layout)}>
          <Image src={p.work.cover} alt={p.work.title} fill sizes={SIZES} className="object-cover" />
        </div>
      )),
    );
  }

  return (
    <div ref={track} className="relative" style={{ height: `${TRACK_VH}vh` }}>
      <div className="sticky top-0 flex h-screen items-center">
        {stage(
          layout.pieces.map((p, i) => (
            <Frame key={`${layout.stageRatio}-${p.work.slug}`} p={p} i={i} l={layout} progress={progress} />
          )),
        )}
      </div>
    </div>
  );
}
