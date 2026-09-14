"use client";

import { usePathname } from "next/navigation";

/**
 * Cross-fade between routes so the fixed chrome appears to stay put.
 *
 * Deliberately a keyed element with a CSS animation rather than
 * `AnimatePresence mode="wait"`: that would hold the incoming page behind an
 * exit animation, and any hiccup in that animation leaves the site blank.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="enter-fade">
      {children}
    </div>
  );
}
