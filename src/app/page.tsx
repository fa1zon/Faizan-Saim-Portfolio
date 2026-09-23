import Image from "next/image";
import Link from "next/link";
import HeroMarquee from "@/components/HeroMarquee";
import ArchiveStack from "@/components/ArchiveStack";
import RollingText from "@/components/RollingText";
import { site } from "@/data/site";

export default function Home() {
  return (
    <main>
      {/* Holds the first screen on its own, so the introduction below can't
          peek up under the strip before you've scrolled to it. */}
      <section className="flex min-h-screen flex-col gap-8 pb-[6px] pt-28 md:pt-40">
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
