import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PhotoGrid from "@/components/PhotoGrid";
import RollingText from "@/components/RollingText";
import { categories, site, worksByCategory, type Category } from "@/data/site";

export function generateStaticParams() {
  return categories.filter((c) => c !== "ALL").map((category) => ({ category: category.toLowerCase() }));
}

function resolve(category: string): Exclude<Category, "ALL"> | undefined {
  return categories.find((c) => c !== "ALL" && c.toLowerCase() === category.toLowerCase()) as
    | Exclude<Category, "ALL">
    | undefined;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const resolved = resolve(category);
  return { title: resolved ? `${resolved} — ${site.wordmark}` : site.wordmark };
}

export default async function ArchiveCollectionPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const resolved = resolve(category);
  if (!resolved) notFound();

  const items = worksByCategory(resolved);

  return (
    <main className="px-4 pb-24 pt-28 md:px-10 md:pt-40">
      <div className="mb-16 flex flex-col gap-6">
        <Link href="/archive" data-roll-host data-cursor="link" className="ui-label w-fit text-muted transition-colors duration-300 ease-framer hover:text-paper">
          <RollingText text="← All Collections" className="ui-label" />
        </Link>
        <h1 className="font-display text-[40px] font-light uppercase leading-[0.95] text-paper md:text-[64px]">
          {resolved}
        </h1>
      </div>

      <PhotoGrid items={items} />
    </main>
  );
}
