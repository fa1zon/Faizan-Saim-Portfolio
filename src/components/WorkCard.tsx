"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "@/lib/useScrollReveal";
import type { Work } from "@/data/site";

/** Tiles this far into the grid are assumed on screen and animate immediately. */
const EAGER = 10;

/**
 * A grid tile. At rest it is just the photograph; on hover a scrim fades up and
 * the title and date converge toward the middle from just outside their slots.
 *
 * The entrance is CSS so the tile is painted with the page rather than waiting
 * for hydration. The first rows animate on load, staggered across each row;
 * later rows are revealed by the scroll.
 */
export default function WorkCard({ work, index, priority }: { work: Work; index: number; priority?: boolean }) {
  const eager = index < EAGER;
  const { ref, props } = useScrollReveal<HTMLDivElement>(!eager);

  return (
    <div
      ref={ref}
      data-reveal
      {...props}
      className={eager ? "enter-rise" : props.className}
      style={eager ? ({ "--enter-delay": `${(index % 5) * 0.06}s` } as React.CSSProperties) : undefined}
    >
      <Link
        href={`/work/${work.slug}`}
        data-cursor="link"
        aria-label={`${work.title} — ${work.date}`}
        className="group relative block aspect-[281/372] w-full overflow-hidden rounded-card"
      >
        <Image
          src={work.cover}
          alt={work.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          priority={priority}
          className="object-cover transition-transform duration-[900ms] ease-framer group-hover:scale-[1.04]"
        />

        {/* Scrim */}
        <div className="absolute inset-0 bg-black/45 opacity-0 transition-opacity duration-500 ease-framer group-hover:opacity-100" />

        {/* Title and date converge on the centre line */}
        <div className="absolute left-1/2 top-1/2 flex min-h-[31px] w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-[2px]">
          <span className="ui-label absolute left-1/2 -translate-x-1/2 whitespace-pre text-paper opacity-0 transition-[top,opacity] duration-500 ease-framer -top-[10px] group-hover:top-0 group-hover:opacity-100">
            {work.title.toUpperCase()}
          </span>
          <span className="ui-label absolute left-1/2 -translate-x-1/2 whitespace-pre text-muted opacity-0 transition-[bottom,opacity] duration-500 ease-framer -bottom-[10px] group-hover:bottom-0 group-hover:opacity-100">
            {work.date}
          </span>
        </div>
      </Link>
    </div>
  );
}
