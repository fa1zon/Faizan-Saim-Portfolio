import Image from "next/image";
import Link from "next/link";
import RollingText from "./RollingText";
import type { Publication } from "@/data/site";

export default function PublicationRow({ pub, reverse, index }: { pub: Publication; reverse?: boolean; index?: number }) {
  return (
    <article
      data-reveal
      style={{ "--enter-delay": `${(index ?? 0) * 0.05}s` } as React.CSSProperties}
      className={`enter-lift grid grid-cols-1 items-center gap-8 border-t border-line py-12 md:grid-cols-2 md:gap-16 md:py-20 ${
        reverse ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="flex flex-col gap-4">
        <span className="ui-label text-muted">{pub.outlet}</span>
        <h3 className="font-display text-[28px] font-light uppercase leading-[1.05] text-paper md:text-[36px]">
          {pub.title}
        </h3>
        <p className="body-copy max-w-[46ch] text-[15px] md:text-[16px]">{pub.excerpt}</p>
        <Link
          href={`/publications/${pub.slug}`}
          data-roll-host
          data-cursor="link"
          className="btn-solid mt-2 w-fit"
        >
          <RollingText text="Read More" className="ui-label" />
        </Link>
      </div>

      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image src={pub.cover} alt={pub.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
      </div>
    </article>
  );
}
