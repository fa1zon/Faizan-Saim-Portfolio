import Image from "next/image";
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
      />
    </div>
  );
}

/**
 * The hero opens on a row of frames that scrolls itself sideways, forever,
 * at a steady pace — no scrolling or hovering required. The track is the
 * frame list rendered twice; sliding it exactly one copy's width (-50%)
 * loops seamlessly since both halves are identical.
 */
export default function HeroMarquee() {
  return (
    <div
      data-reveal
      style={{ "--enter-delay": "0.1s" } as React.CSSProperties}
      className="enter-fade h-[46vh] min-h-[260px] overflow-hidden md:h-[56vh]"
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
  );
}
