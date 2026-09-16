import type { Metadata } from "next";
import Link from "next/link";
import InterviewRow from "@/components/InterviewRow";
import RollingText from "@/components/RollingText";
import { interviews, site } from "@/data/site";

export const metadata: Metadata = { title: `Interviews — ${site.wordmark}` };

export default function InterviewsPage() {
  return (
    <main className="px-4 pb-24 pt-28 md:px-16 md:pt-40">
      <h1 data-reveal className="enter-lift font-display text-[40px] font-light uppercase leading-[0.95] text-paper md:text-[64px]">
        Beyond The Frame
      </h1>

      <div className="mx-auto mt-4 max-w-[1000px]">
        {interviews.map((item, i) => (
          <InterviewRow key={item.slug} item={item} index={i} />
        ))}
      </div>

      <div className="mx-auto mt-20 flex max-w-[1000px] flex-col items-center gap-6 border-t border-line pt-16 text-center">
        <p className="ui-label text-muted">Available For Interviews, Podcasts, And Features</p>
        <Link href="/contact" data-roll-host data-cursor="link" className="btn-solid w-fit">
          <RollingText text="Get In Touch" className="ui-label" />
        </Link>
      </div>
    </main>
  );
}
