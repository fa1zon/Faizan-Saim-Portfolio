"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion, type MotionValue } from "motion/react";
import RollingText from "./RollingText";
import { works } from "@/data/site";

/** The stage is locked to this ratio, which is what makes the maths below exact. */
const STAGE_RATIO = 16 / 9;
/** Width of the single photo the pile reads as, as a share of the stage. */
const STACK_WIDTH_PCT = 32;
/** Which frame sits on top of the pile — the one picture you see first. */
const COVER = 2;
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

/**
 * Where every frame ends up: two tiers that run the full width and height of
 * the stage. Nothing is allowed into the middle (roughly 41–59% across,
 * 44–56% down) — that's the hole the button sits in once the pile has
 * opened, and it is only just wider than the button itself.
 */
const pieces: Piece[] = [
  { work: works[0], leftPct: 0, topPct: 4, widthPct: 18, ratio: 0.8 },
  { work: works[3], leftPct: 21, topPct: 14, widthPct: 16, ratio: 0.75 },
  { work: works[5], leftPct: 41, topPct: 0, widthPct: 13, ratio: 0.75 },
  { work: works[10], leftPct: 57, topPct: 3, widthPct: 17, ratio: 1 },
  { work: works[13], leftPct: 77, topPct: 10, widthPct: 17, ratio: 0.75 },
  { work: works[15], leftPct: 1, topPct: 56, widthPct: 17, ratio: 0.75 },
  { work: works[22], leftPct: 22, topPct: 60, widthPct: 16, ratio: 0.8 },
  { work: works[27], leftPct: 43, topPct: 59, widthPct: 18, ratio: 0.8 },
  { work: works[30], leftPct: 65, topPct: 56, widthPct: 18, ratio: 1 },
];

/**
 * Each frame's offset from its slot back to the middle of the stage, written
 * as a share of the frame's *own* box — which is what a percentage in a
 * `translate` resolves against, so it stays exact at any stage size. A
 * frame's height is only ever implied (width ÷ ratio), hence deriving it
 * from the stage ratio rather than measuring anything.
 */
function stackOffset(p: Piece) {
  const heightPct = (p.widthPct * STAGE_RATIO) / p.ratio;
  const dx = 50 - (p.leftPct + p.widthPct / 2);
  const dy = 50 - (p.topPct + heightPct / 2);
  return {
    x: `${(dx / p.widthPct) * 100}%`,
    y: `${(dy / heightPct) * 100}%`,
    scale: STACK_WIDTH_PCT / p.widthPct,
  };
}

function frameStyle(p: Piece, i: number) {
  return {
    left: `${p.leftPct}%`,
    top: `${p.topPct}%`,
    width: `${p.widthPct}%`,
    aspectRatio: String(p.ratio),
    zIndex: i === COVER ? 30 : 10 + i,
  };
}

function Frame({ p, i, progress }: { p: Piece; i: number; progress: MotionValue<number> }) {
  const from = stackOffset(p);
  // Frames land one after another rather than all together, so the pile
  // peels open instead of snapping — and they are all home by OPEN_BY,
  // which is what leaves the rest of the pinned scroll as a held beat.
  const end = Math.min(OPEN_BY - 0.16 + i * 0.02, OPEN_BY);

  const x = useTransform(progress, [0, end], [from.x, "0%"]);
  const y = useTransform(progress, [0, end], [from.y, "0%"]);
  const scale = useTransform(progress, [0, end], [from.scale, 1]);

  return (
    <motion.div className="absolute overflow-hidden" style={{ ...frameStyle(p, i), x, y, scale }}>
      <Image src={p.work.cover} alt={p.work.title} fill sizes="30vw" className="object-cover" />
    </motion.div>
  );
}

/** The stage never gets taller than the screen, and keeps its ratio exactly. */
const STAGE = "relative mx-auto aspect-[16/9] w-[min(100%,142vh)]";

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

  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 22, mass: 0.5 });

  const button = (
    <div className="absolute inset-0 z-0 flex items-center justify-center">
      <Link href="/archive" data-roll-host data-cursor="link" className="btn-solid">
        <RollingText text="Enter Archives" className="ui-label" />
      </Link>
    </div>
  );

  // Nothing to pin or drive when the frames never move.
  if (reduceMotion) {
    return (
      <div className={STAGE}>
        {button}
        {pieces.map((p, i) => (
          <div key={p.work.slug} className="absolute overflow-hidden" style={frameStyle(p, i)}>
            <Image src={p.work.cover} alt={p.work.title} fill sizes="30vw" className="object-cover" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={track} className="relative" style={{ height: `${TRACK_VH}vh` }}>
      <div className="sticky top-0 flex h-screen items-center">
        <div className={STAGE}>
          {button}
          {pieces.map((p, i) => (
            <Frame key={p.work.slug} p={p} i={i} progress={progress} />
          ))}
        </div>
      </div>
    </div>
  );
}
