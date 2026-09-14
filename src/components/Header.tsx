"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import RollingText from "./RollingText";
import { site } from "@/data/site";
import { EASE, rowEnter } from "@/lib/motion";

const primary = [
  { label: "WORK", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/contact" },
];

const utility = [
  { label: "TERMS", href: "/terms" },
  { label: "LICENSING", href: "/licensing" },
  { label: "404", href: "/404" },
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
        className="flex h-11 items-center border-t border-line px-3 text-muted transition-colors duration-300 ease-framer hover:text-paper"
      >
        <RollingText text={label} className="ui-label" active={active} />
      </Link>
    </motion.div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [utilityOpen, setUtilityOpen] = useState(false);
  const pathname = usePathname();

  // Any navigation closes the pill, matching the reference.
  useEffect(() => {
    setOpen(false);
    setUtilityOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center md:top-10">
      <header
        data-reveal
        style={{ width: open ? 300 : 220, "--enter-delay": "0.15s" } as React.CSSProperties}
        className="enter-drop glass pointer-events-auto rounded-card p-1 pb-[3px] transition-[width] duration-500 ease-framer"
      >
        {/* Wordmark + toggle */}
        <div className="flex h-9 items-center justify-between pl-3">
          <Link href="/" data-roll-host data-cursor="link" className="flex items-center text-paper">
            <RollingText
              text={`${site.wordmark}${site.wordmarkSuffix}`}
              className="font-display text-[13px] font-normal tracking-normal"
            />
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            data-cursor="link"
            className="grid h-9 w-9 place-items-center rounded-[4px] text-paper"
          >
            <span className="relative block h-[10px] w-[14px]">
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
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.nav
              key="nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              data-reveal="expand"
              className="overflow-hidden"
            >
              {primary.map((item, i) => (
                <Row
                  key={item.href}
                  {...item}
                  index={i}
                  onNavigate={() => setOpen(false)}
                  active={pathname === item.href}
                />
              ))}

              <motion.div custom={3} variants={rowEnter} initial="hidden" animate="show" exit="exit" data-reveal>
                <button
                  type="button"
                  onClick={() => setUtilityOpen((v) => !v)}
                  data-roll-host
                  data-cursor="link"
                  aria-expanded={utilityOpen}
                  className="flex h-11 w-full items-center justify-between border-t border-line px-3 text-muted transition-colors duration-300 ease-framer hover:text-paper"
                >
                  <RollingText text="UTILITY PAGES" className="ui-label" />
                  <svg
                    width="9"
                    height="6"
                    viewBox="0 0 9 6"
                    fill="none"
                    className="transition-transform duration-[450ms] ease-framer"
                    style={{ transform: utilityOpen ? "rotate(180deg)" : "none" }}
                  >
                    <path d="M1 1.5 4.5 5 8 1.5" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </button>
              </motion.div>

              <AnimatePresence initial={false}>
                {utilityOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    data-reveal="expand"
                    transition={{ duration: 0.4, ease: EASE }}
                    className="overflow-hidden"
                  >
                    {utility.map((item, i) => (
                      <Row key={item.href} {...item} index={i} onNavigate={() => setOpen(false)} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}
