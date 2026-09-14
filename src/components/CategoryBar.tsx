"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import RollingText from "./RollingText";
import { categories, type Category } from "@/data/site";
import { EASE, optionEnter } from "@/lib/motion";

/**
 * Bottom-centre filter pill. Closed it names the active filter; open it lists
 * every category above itself, each row flying up in sequence.
 */
export default function CategoryBar({
  active,
  onChange,
  open,
  setOpen,
}: {
  active: Category;
  onChange: (c: Category) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  const label = open ? "CHOOSE CATEGORY" : active === "ALL" ? "SELECTED WORK" : active;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center md:bottom-10">
    <div
      ref={ref}
      data-reveal
      style={{ "--enter-delay": "0.3s" } as React.CSSProperties}
      className="enter-lift pointer-events-auto relative"
    >
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            data-reveal
            className="glass-strong absolute bottom-[52px] left-1/2 w-[172px] -translate-x-1/2 overflow-hidden rounded-card p-1"
          >
            {categories.map((c, i) => (
              <motion.li
                key={c}
                custom={categories.length - 1 - i}
                variants={optionEnter}
                initial="hidden"
                animate="show"
                exit="exit"
                data-reveal
              >
                <button
                  type="button"
                  onClick={() => {
                    onChange(c);
                    setOpen(false);
                  }}
                  data-roll-host
                  data-cursor="link"
                  className={`flex h-9 w-full items-center rounded-[4px] px-3 text-left transition-colors duration-300 ease-framer hover:bg-white/[0.06] ${
                    active === c ? "text-paper" : "text-muted hover:text-paper"
                  }`}
                >
                  <RollingText text={c} className="ui-label" />
                </button>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        data-roll-host
        data-cursor="link"
        className="glass flex h-11 min-w-[172px] items-center justify-between gap-6 rounded-card px-4 text-paper"
      >
        <RollingText key={label} text={label} className="ui-label" />
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
    </div>
  );
}
