"use client";

import Image from "next/image";
import Link from "next/link";
import RollingText from "./RollingText";
import { socialIcons } from "./Icons";
import { site } from "@/data/site";

/** The fixed identity chip in the bottom-left corner. */
export default function ProfileBadge() {
  return (
    <div
      data-reveal
      style={{ "--enter-delay": "0.25s" } as React.CSSProperties}
      className="enter-lift pointer-events-auto fixed bottom-4 left-4 z-50 flex h-11 items-center gap-[6px] md:bottom-10 md:left-10"
    >
      <Link
        href="/about"
        data-roll-host
        data-cursor="link"
        className="glass flex h-11 items-center gap-2 rounded-card p-1 md:pr-4"
      >
        <Image
          src={site.avatar}
          alt=""
          width={72}
          height={72}
          className="h-9 w-9 rounded-[4px] object-cover"
        />
        <RollingText text={site.name.toUpperCase()} className="ui-label hidden text-paper md:inline-flex" />
      </Link>

      <div className="glass hidden h-11 items-center gap-1 rounded-card px-2 md:flex">
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
              className="grid h-7 w-7 place-items-center rounded-[4px] text-muted transition-colors duration-300 ease-framer hover:text-paper"
            >
              <Icon className="h-[13px] w-[13px]" />
            </a>
          );
        })}
      </div>
    </div>
  );
}
