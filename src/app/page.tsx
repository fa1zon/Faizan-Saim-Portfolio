import Image from "next/image";
import Link from "next/link";
import HeroMarquee from "@/components/HeroMarquee";
import PublicationRow from "@/components/PublicationRow";
import JournalCard from "@/components/JournalCard";
import RollingText from "@/components/RollingText";
import { site, publications, journalPosts } from "@/data/site";

export default function Home() {
  return (
    <main>
      <section className="flex flex-col gap-8 pb-[6px] pt-28 md:pt-40">
        <h1
          data-reveal
          className="enter-lift px-4 font-display text-[40px] font-light uppercase leading-[0.95] text-paper md:px-10 md:text-[64px]"
        >
          {site.hero.heading.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>

        <HeroMarquee />
      </section>

      <section className="mx-auto flex max-w-[1400px] items-start gap-5 px-4 py-20 md:px-10 md:py-28">
        <Image
          src={site.avatar}
          alt={site.name}
          width={80}
          height={80}
          className="h-16 w-16 shrink-0 rounded-full object-cover md:h-20 md:w-20"
        />
        <p
          data-reveal
          className="enter-lift body-copy max-w-[560px] text-[18px] md:text-[22px]"
          style={{ "--enter-delay": "0.1s" } as React.CSSProperties}
        >
          {site.hero.lead.split("**").map((part, i) =>
            i % 2 === 1 ? (
              <strong key={i} className="font-normal text-paper">
                {part}
              </strong>
            ) : (
              <span key={i}>{part}</span>
            ),
          )}
        </p>
      </section>

      <section className="border-t border-line px-4 py-20 md:px-10 md:py-28">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-[32px] font-light uppercase leading-[0.95] text-paper md:text-[48px]">
            {site.narrative.heading.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <Link href="/publications" data-roll-host data-cursor="link" className="btn-solid w-fit shrink-0">
            <RollingText text={site.narrative.cta} className="ui-label" />
          </Link>
        </div>

        <div className="mx-auto mt-4 max-w-[1400px]">
          {publications.slice(0, 2).map((pub, i) => (
            <PublicationRow key={pub.slug} pub={pub} reverse={i % 2 === 1} index={i} />
          ))}
        </div>
      </section>

      <section className="border-t border-line px-4 py-20 md:px-10 md:py-28">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-[32px] font-light uppercase leading-[0.95] text-paper md:text-[48px]">
            {site.journalTeaser.heading.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <Link href="/journal" data-roll-host data-cursor="link" className="btn-solid w-fit shrink-0">
            <RollingText text={site.journalTeaser.cta} className="ui-label" />
          </Link>
        </div>

        <div className="mx-auto mt-12 grid max-w-[1400px] grid-cols-1 gap-10 md:grid-cols-2">
          {journalPosts.slice(0, 2).map((post, i) => (
            <JournalCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </section>

      <section className="border-t border-line px-4 py-24 text-center md:py-32">
        <h2
          data-reveal
          className="enter-lift font-display text-[36px] font-light uppercase leading-[0.95] text-paper md:text-[56px]"
        >
          {site.connect.heading}
        </h2>
        <Link
          href="/contact"
          data-roll-host
          data-cursor="link"
          className="btn-solid mx-auto mt-8 w-fit"
        >
          <RollingText text="Contact Me" className="ui-label" />
        </Link>
      </section>
    </main>
  );
}
