import type { Metadata } from "next";
import { site, workshops } from "@/data/site";

export const metadata: Metadata = { title: `Workshops — ${site.wordmark}` };

export default function WorkshopsPage() {
  return (
    <main className="px-4 pb-24 pt-28 md:px-10 md:pt-40">
      <h1 data-reveal className="enter-lift font-display text-[40px] font-light uppercase leading-[0.95] text-paper md:text-[64px]">
        Walk With Me
      </h1>

      <div className="mx-auto mt-16 max-w-[1000px]">
        {workshops.map((w, i) => (
          <div
            key={w.title}
            data-reveal
            style={{ "--enter-delay": `${i * 0.06}s` } as React.CSSProperties}
            className="enter-lift flex flex-col justify-between gap-2 border-t border-line py-8 md:flex-row md:items-center md:py-10"
          >
            <h3 className="font-display text-[24px] font-light uppercase leading-[1.1] text-paper md:text-[30px]">
              {w.title}
            </h3>
            <span className="ui-label text-muted">{w.season}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
