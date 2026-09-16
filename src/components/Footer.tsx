import Link from "next/link";
import { socialIcons } from "./Icons";
import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-line px-6 pb-10 pt-16 md:px-10">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-6 text-center">
        <Link href="/" data-cursor="link" className="font-display text-[15px] font-medium uppercase tracking-[0.5px] text-paper">
          {site.wordmark}
        </Link>

        <p className="body-copy max-w-[360px] text-[15px]">{site.tagline}</p>

        <a href={`mailto:${site.email}`} data-cursor="link" className="font-display text-[18px] font-light lowercase text-paper">
          {site.email}
        </a>

        <div className="flex items-center gap-4">
          {site.socials.map((s) => {
            const Icon = socialIcons[s.icon];
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={s.label}
                data-cursor="link"
                className="grid h-8 w-8 place-items-center text-muted transition-colors duration-300 ease-framer hover:text-paper"
              >
                <Icon className="h-[15px] w-[15px]" />
              </a>
            );
          })}
        </div>

        <p className="ui-label text-muted">© {new Date().getFullYear()} {site.wordmark}</p>
      </div>
    </footer>
  );
}
