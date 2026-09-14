import type { Metadata } from "next";
import SplitPage from "@/components/SplitPage";
import { site } from "@/data/site";

export const metadata: Metadata = { title: `About — ${site.name}` };

export default function AboutPage() {
  return (
    <SplitPage
      media={site.about.media}
      heading={site.about.heading}
      lead={
        <p>
          I&rsquo;m <strong className="font-medium text-paper">{site.name}</strong>, a photographer and filmmaker
          exploring the quiet power of light, movement, and emotion.
        </p>
      }
    >
      <div className="flex flex-col gap-5 text-[17px] font-light leading-[1.6] tracking-[0.2px] text-muted">
        {site.about.body.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>

      <ul className="flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6">
        {site.socials.map((s) => (
          <li key={s.label}>
            <a
              href={s.href}
              target="_blank"
              rel="noreferrer noopener"
              data-cursor="link"
              className="ui-label text-muted transition-colors duration-300 ease-framer hover:text-paper"
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </SplitPage>
  );
}
