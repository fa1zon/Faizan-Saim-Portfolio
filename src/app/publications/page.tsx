import type { Metadata } from "next";
import PublicationRow from "@/components/PublicationRow";
import { publications, site } from "@/data/site";

export const metadata: Metadata = { title: `Publications — ${site.wordmark}` };

export default function PublicationsPage() {
  return (
    <main className="px-4 pb-24 pt-28 md:px-10 md:pt-40">
      <h1 data-reveal className="enter-lift font-display text-[40px] font-light uppercase leading-[0.95] text-paper md:text-[64px]">
        Featured In Print
      </h1>

      <div className="mx-auto mt-4 max-w-[1400px]">
        {publications.map((pub, i) => (
          <PublicationRow key={pub.slug} pub={pub} reverse={i % 2 === 1} index={i} />
        ))}
      </div>
    </main>
  );
}
