"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import RollingText from "./RollingText";
import { EASE } from "@/lib/motion";
import type { Work } from "@/data/site";

const Meta = ({ k, v }: { k: string; v: string }) => (
  <div className="flex items-center justify-between border-t border-line py-2">
    <span className="ui-label text-muted">{k}</span>
    <span className="ui-label text-paper">{v.toUpperCase()}</span>
  </div>
);

/** Bottom-centre bar for a single project: expanding details card + view toggle. */
export default function DetailsPanel({
  work,
  open,
  setOpen,
}: {
  work: Work;
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center md:bottom-10">
    <div
      data-reveal
      style={{ "--enter-delay": "0.3s" } as React.CSSProperties}
      className="enter-lift pointer-events-auto flex items-end gap-[6px]"
    >
      <div className="relative">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.45, ease: EASE }}
              data-reveal
              className="glass-strong absolute bottom-[52px] left-0 w-[448px] max-w-[calc(100vw-32px)] rounded-card p-6"
            >
              <h2 className="font-display text-[28px] font-extralight leading-tight text-paper">{work.title}</h2>
              <p className="mt-3 text-[15px] font-light leading-[1.6] tracking-[0.2px] text-muted">
                {work.description}
              </p>
              <div className="mt-6">
                <Meta k="YEAR" v={work.date} />
                <Meta k="TYPE" v={work.type} />
                <Meta k="CLIENT" v={work.client} />
                <Meta k="CATEGORY" v={work.category} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          data-roll-host
          data-cursor="link"
          className="glass flex h-11 min-w-[132px] items-center justify-between gap-4 rounded-card px-4 text-paper md:min-w-[200px] md:gap-6"
        >
          <RollingText key={open ? "details" : work.slug} text={open ? work.title.toUpperCase() : "DETAILS"} className="ui-label" />
          <svg
            width="9"
            height="6"
            viewBox="0 0 9 6"
            fill="none"
            className="shrink-0 text-muted transition-transform duration-[450ms] ease-framer"
            style={{ transform: open ? "rotate(0deg)" : "rotate(180deg)" }}
          >
            <path d="M1 1.5 4.5 5 8 1.5" stroke="currentColor" strokeWidth="1" />
          </svg>
        </button>
      </div>

      <Link
        href="/"
        aria-label="Back to all work"
        data-cursor="link"
        className="glass grid h-11 w-11 place-items-center rounded-card text-muted transition-colors duration-300 ease-framer hover:text-paper"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <rect x="0.5" y="0.5" width="5.5" height="5.5" stroke="currentColor" />
          <rect x="8" y="0.5" width="5.5" height="5.5" stroke="currentColor" />
          <rect x="0.5" y="8" width="5.5" height="5.5" stroke="currentColor" />
          <rect x="8" y="8" width="5.5" height="5.5" stroke="currentColor" />
        </svg>
      </Link>
    </div>
    </div>
  );
}
