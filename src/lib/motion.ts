import type { Variants } from "motion/react";

/** Framer's default "smooth" curve — everything on the reference site uses it. */
export const EASE = [0.44, 0, 0.22, 1] as const;
/** Menu rows drop in one after another once the pill has finished growing. */
export const rowEnter: Variants = {
  hidden: { opacity: 0, y: -8 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: 0.12 + i * 0.05, ease: EASE },
  }),
  exit: { opacity: 0, y: -8, transition: { duration: 0.15, ease: EASE } },
};

/** Category rows fly up out of the bottom bar. */
export const optionEnter: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.035, ease: EASE },
  }),
  exit: (i: number = 0) => ({
    opacity: 0,
    y: 10,
    transition: { duration: 0.18, delay: i * 0.015, ease: EASE },
  }),
};
