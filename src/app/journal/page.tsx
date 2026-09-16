import type { Metadata } from "next";
import JournalCard from "@/components/JournalCard";
import { journalPosts, site } from "@/data/site";

export const metadata: Metadata = { title: `Journal — ${site.wordmark}` };

export default function JournalPage() {
  return (
    <main className="px-4 pb-24 pt-28 md:px-10 md:pt-40">
      <h1 data-reveal className="enter-lift font-display text-[40px] font-light uppercase leading-[0.95] text-paper md:text-[64px]">
        Notes From The Field
      </h1>

      <div className="mx-auto mt-16 grid max-w-[1400px] grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-3">
        {journalPosts.map((post, i) => (
          <JournalCard key={post.slug} post={post} index={i} />
        ))}
      </div>
    </main>
  );
}
