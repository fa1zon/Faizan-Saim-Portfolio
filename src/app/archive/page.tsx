import type { Metadata } from "next";
import CollectionCard from "@/components/CollectionCard";
import { collections, site } from "@/data/site";

export const metadata: Metadata = { title: `Archive — ${site.wordmark}` };

export default function ArchivePage() {
  return (
    <main className="px-4 pb-24 pt-28 md:px-10 md:pt-40">
      <h1 data-reveal className="enter-lift font-display text-[40px] font-light uppercase leading-[0.95] text-paper md:text-[64px]">
        Photography Collections
      </h1>

      <div className="mx-auto mt-16 grid max-w-[1400px] grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
        {collections.map((c, i) => (
          <CollectionCard key={c.category} category={c.category} count={c.count} cover={c.cover} index={i} />
        ))}
      </div>
    </main>
  );
}
