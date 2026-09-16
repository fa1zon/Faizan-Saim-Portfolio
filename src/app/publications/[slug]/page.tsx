import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import RollingText from "@/components/RollingText";
import { publications, site } from "@/data/site";

export function generateStaticParams() {
  return publications.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const pub = publications.find((p) => p.slug === slug);
  return { title: pub ? `${pub.title} — ${site.wordmark}` : site.wordmark };
}

export default async function PublicationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pub = publications.find((p) => p.slug === slug);
  if (!pub) notFound();

  return (
    <main className="px-4 pb-24 pt-28 md:px-16 md:pt-40">
      <div className="mx-auto max-w-[860px]">
        <Link
          href="/publications"
          data-roll-host
          data-cursor="link"
          className="ui-label w-fit text-muted transition-colors duration-300 ease-framer hover:text-paper"
        >
          <RollingText text="← Publications" className="ui-label" />
        </Link>

        <span className="ui-label mt-8 block text-muted">{pub.outlet}</span>
        <h1 className="mt-2 font-display text-[36px] font-light uppercase leading-[1] text-paper md:text-[56px]">
          {pub.title}
        </h1>

        <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden">
          <Image src={pub.cover} alt={pub.title} fill sizes="860px" className="object-cover" priority />
        </div>

        <div className="mt-10 flex flex-col gap-5">
          {pub.body.map((p) => (
            <p key={p.slice(0, 24)} className="body-copy text-[17px] md:text-[18px]">
              {p}
            </p>
          ))}
        </div>
      </div>
    </main>
  );
}
