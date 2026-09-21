"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import RollingText from "./RollingText";
import { site } from "@/data/site";
import { EASE, rowEnter } from "@/lib/motion";

const nav = [
  { label: "Archive", href: "/archive" },
  { label: "Contact", href: "/contact" },
];

function Row({
  href,
  label,
  index,
  onNavigate,
  active,
}: {
  href: string;
  label: string;
  index: number;
  onNavigate: () => void;
  active?: boolean;
}) {
  return (
    <motion.div custom={index} variants={rowEnter} initial="hidden" animate="show" exit="exit" data-reveal>
      <Link
        href={href}
        onClick={onNavigate}
        data-roll-host
        data-cursor="link"
        className="flex h-11 items-center justify-end border-t border-line px-4 text-muted transition-colors duration-300 ease-framer hover:text-paper"
      >
        <RollingText text={label.toUpperCase()} className="ui-label" active={active} />
      </Link>
    </motion.div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div data-reveal className="enter-drop fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 md:px-16 md:pt-8">
      <div className="flex w-full max-w-[1400px] items-start justify-between">
        <Link href="/" data-roll-host data-cursor="link" className="glass flex h-11 items-center px-4 text-paper">
          <RollingText text={site.wordmark} className="font-display text-[14px] font-medium tracking-[0.5px]" />
        </Link>

        <div className="relative">
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            data-cursor="link"
            className="glass grid h-11 w-11 place-items-center text-paper"
          >
            <span className="relative block h-[10px] w-[16px]">
              <span
                className="absolute left-0 block h-px w-full bg-current transition-all duration-[450ms] ease-framer"
                style={{ top: open ? 5 : 1, transform: open ? "rotate(45deg)" : "none" }}
              />
              <span
                className="absolute left-0 block h-px w-full bg-current transition-all duration-[450ms] ease-framer"
                style={{ top: open ? 5 : 8, transform: open ? "rotate(-45deg)" : "none" }}
              />
            </span>
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.nav
                key="nav"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
                data-reveal="expand"
                className="glass-strong absolute right-0 top-[52px] w-[220px] overflow-hidden"
              >
                {nav.map((item, i) => (
                  <Row
                    key={item.href}
                    {...item}
                    index={i}
                    onNavigate={() => setOpen(false)}
                    active={pathname === item.href}
                  />
                ))}
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
