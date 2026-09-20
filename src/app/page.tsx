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

      {/* The introduction: a statement set low on the page, with a portrait
          running the full height of the right-hand edge. */}
      <section className="relative overflow-hidden">
        <div className="flex items-end px-4 pb-14 pt-16 md:min-h-screen md:pb-24 md:pl-[28%] md:pr-[40vw] md:pt-24">
          <p
            data-reveal
            className="enter-lift font-display text-[24px] font-light uppercase leading-[1.25] text-paper md:text-[34px]"
          >
            {site.hero.lead.replace(/\*\*/g, "")}
          </p>
        </div>

        <div className="relative h-[60vh] w-full md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-[34vw]">
          <Image
            src="/media/about.jpg"
            alt={site.name}
            fill
            sizes="(max-width: 767px) 100vw, 34vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="px-4 py-20 md:px-16 md:py-28">
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

        <div className="mx-auto mt-12 max-w-[1400px]">
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
