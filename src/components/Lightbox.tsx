"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import type { Work } from "@/data/site";
import { EASE } from "@/lib/motion";

/**
 * Full-screen view of one photograph, opened from the album grid.
 *
 * The image is requested at the viewport's own size rather than a grid
 * thumbnail's, so what you get here is the full-resolution file scaled to
 * your screen. `object-contain` means the whole frame is visible whatever
 * its shape — nothing is cropped the way the grid crops.
 */
export default function Lightbox({
  items,
  index,
  onClose,
  onMove,
}: {
  items: Work[];
  index: number | null;
  onClose: () => void;
  onMove: (next: number) => void;
}) {
  const open = index !== null;
  const item = open ? items[index] : null;
  // Portalled to the body: rendered in place it would be trapped inside
  // PageTransition's stacking context, which sits under the fixed header —
  // so the header's menu button covered the close control.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const step = useCallback(
    (delta: number) => {
      if (index === null) return;
      onMove((index + delta + items.length) % items.length);
    },
    [index, items.length, onMove],
  );

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };

    // The page behind must not scroll while this is over it, and the site
    // header is hidden so nothing floats over the photograph.
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.dataset.lightbox = "open";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      delete document.body.dataset.lightbox;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, step]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {item && (
        <motion.div
          key="lightbox"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-paper/95 p-4 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center text-ink/70 transition-colors duration-300 ease-framer hover:text-ink md:right-8 md:top-8"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>

          {items.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                className="absolute left-2 z-10 grid h-12 w-12 place-items-center text-ink/60 transition-colors duration-300 ease-framer hover:text-ink md:left-6"
              >
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M15 5l-7 7 7 7" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Next"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                className="absolute right-2 z-10 grid h-12 w-12 place-items-center text-ink/60 transition-colors duration-300 ease-framer hover:text-ink md:right-6"
              >
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          <motion.div
            key={item.slug}
            className="relative h-full w-full"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={item.cover}
              alt={item.title}
              fill
              sizes="100vw"
              quality={90}
              priority
              className="object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
