import Image from "next/image";
import Link from "next/link";
import HeroMarquee from "@/components/HeroMarquee";
import ArchiveStack from "@/components/ArchiveStack";
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
          className="enter-lift px-4 font-display text-[40px] font-light uppercase leading-[0.95] text-paper md:px-16 md:text-[64px]"
        >
          {site.hero.heading.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>

        <HeroMarquee />
      </section>

      {/* The introduction. The portrait holds still against the right-hand
          edge for most of a screen's worth of scrolling while the statement
          rides up past it — the break in the scroll before the archive. */}
      <section className="relative md:grid md:grid-cols-[1fr_31vw]">
        <div className="px-4 pb-14 pt-16 md:pb-[90vh] md:pl-[24%] md:pr-12 md:pt-[62vh]">
          <p
            data-reveal
            className="enter-lift max-w-[440px] font-display text-[24px] font-light uppercase leading-[1.25] text-paper md:text-[34px]"
          >
            {site.hero.lead}
          </p>
        </div>

        <div className="relative h-[60vh] w-full md:sticky md:top-0 md:h-screen md:self-start">
          <Image
            src="/media/about.jpg"
            alt={site.name}
            fill
            sizes="(max-width: 767px) 100vw, 31vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="px-4 py-20 md:px-16 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <ArchiveStack />
        </div>

        <div className="mx-auto mt-4 max-w-[1400px]">
          {publications.slice(0, 2).map((pub, i) => (
            <PublicationRow key={pub.slug} pub={pub} reverse={i % 2 === 1} index={i} />
          ))}
        </div>
      </section>

      <section className="px-4 py-20 md:px-16 md:py-28">
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

      <section className="px-4 py-24 text-center md:py-32">
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
