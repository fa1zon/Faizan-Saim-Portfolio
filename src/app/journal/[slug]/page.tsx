import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import RollingText from "@/components/RollingText";
import { journalPosts, nextJournalPost, site } from "@/data/site";

export function generateStaticParams() {
  return journalPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = journalPosts.find((p) => p.slug === slug);
  return { title: post ? `${post.title} — ${site.wordmark}` : site.wordmark };
}

export default async function JournalPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = journalPosts.find((p) => p.slug === slug);
  if (!post) notFound();
  const next = nextJournalPost(slug);

  return (
    <main className="px-4 pb-24 pt-28 md:px-16 md:pt-40">
      <div className="mx-auto max-w-[860px]">
        <Link
          href="/journal"
          data-roll-host
          data-cursor="link"
          className="ui-label w-fit text-muted transition-colors duration-300 ease-framer hover:text-paper"
        >
          <RollingText text="← Journal" className="ui-label" />
        </Link>

        <h1 className="mt-8 font-display text-[36px] font-light uppercase leading-[1] text-paper md:text-[56px]">
          {post.title}
        </h1>

        <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden">
          <Image src={post.cover} alt={post.title} fill sizes="860px" className="object-cover" priority />
        </div>

        <div className="mt-10 flex flex-col gap-5">
          {post.body.map((p) => (
            <p key={p.slice(0, 24)} className="body-copy text-[17px] md:text-[18px]">
              {p}
            </p>
          ))}
        </div>

        <Link
          href={`/journal/${next.slug}`}
          data-roll-host
          data-cursor="link"
          className="ui-label mt-16 flex w-fit items-center gap-2 border-t border-line pt-6 text-paper"
        >
          <RollingText text={`${next.title} ›`} className="ui-label" />
        </Link>
      </div>
    </main>
  );
}
