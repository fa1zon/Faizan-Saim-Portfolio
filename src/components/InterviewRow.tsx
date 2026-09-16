import Link from "next/link";
import RollingText from "./RollingText";
import type { Interview } from "@/data/site";

export default function InterviewRow({ item, index }: { item: Interview; index?: number }) {
  return (
    <article
      data-reveal
      style={{ "--enter-delay": `${(index ?? 0) * 0.05}s` } as React.CSSProperties}
      className="enter-lift flex flex-col gap-4 border-t border-line py-10 md:flex-row md:items-center md:justify-between md:gap-12 md:py-14"
    >
      <div className="flex flex-col gap-3 md:max-w-[65%]">
        <span className="ui-label text-muted">{item.outlet}</span>
        <h3 className="font-display text-[24px] font-light uppercase leading-[1.1] text-paper md:text-[30px]">
          {item.title}
        </h3>
        <p className="body-copy max-w-[52ch] text-[15px] italic md:text-[16px]">&ldquo;{item.quote}&rdquo;</p>
      </div>

      <Link href={`/interviews/${item.slug}`} data-roll-host data-cursor="link" className="btn-solid w-fit shrink-0">
        <RollingText text="Read More" className="ui-label" />
      </Link>
    </article>
  );
}
