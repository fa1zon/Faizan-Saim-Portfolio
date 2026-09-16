import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import RollingText from "@/components/RollingText";
import { interviews, site } from "@/data/site";

export function generateStaticParams() {
  return interviews.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = interviews.find((i) => i.slug === slug);
  return { title: item ? `${item.title} — ${site.wordmark}` : site.wordmark };
}

export default async function InterviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = interviews.find((i) => i.slug === slug);
  if (!item) notFound();

  return (
    <main className="px-4 pb-24 pt-28 md:px-10 md:pt-40">
      <div className="mx-auto max-w-[860px]">
        <Link
          href="/interviews"
          data-roll-host
          data-cursor="link"
          className="ui-label w-fit text-muted transition-colors duration-300 ease-framer hover:text-paper"
        >
          <RollingText text="← Interviews" className="ui-label" />
        </Link>

        <span className="ui-label mt-8 block text-muted">{item.outlet}</span>
        <h1 className="mt-2 font-display text-[36px] font-light uppercase leading-[1] text-paper md:text-[56px]">
          {item.title}
        </h1>

        <div className="mt-10 flex flex-col gap-5 border-l-2 border-line pl-6">
          {item.body.map((p, i) => (
            <p key={p.slice(0, 24)} className={`body-copy text-[17px] md:text-[18px] ${i === 0 ? "italic text-paper" : ""}`}>
              {i === 0 ? `“${p}”` : p}
            </p>
          ))}
        </div>
      </div>
    </main>
  );
}
