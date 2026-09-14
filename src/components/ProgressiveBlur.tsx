"use client";

import { usePathname } from "next/navigation";

/** Eight layers, each blurring twice as hard as the last: 0.0625px → 8px. */
const LAYERS = 8;
const STEP = 100 / LAYERS; // 12.5% of the container per band

/**
 * Blur that ramps toward the foot of the page instead of switching on at a hard
 * edge, so the fixed chrome reads against the photographs behind it.
 *
 * Each layer is masked to its own band — transparent, ramping to opaque for two
 * steps, then ramping back out. Letting a band run to the bottom instead would
 * leave every layer partly opaque down there and compound all eight blurs into
 * a smear. Stops past 100% are dropped rather than clamped, which is what keeps
 * the last two layers' ramps the right length.
 *
 * Only rendered where photographs run under the bottom chrome; on the text
 * panels of About/Contact it would just fog the copy.
 */
export default function ProgressiveBlur({ height = 240 }: { height?: number }) {
  const pathname = usePathname();
  if (!(pathname === "/" || pathname.startsWith("/work/"))) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 bottom-0 z-40" style={{ height }}>
      {Array.from({ length: LAYERS }).map((_, i) => {
        const stops = [
          `transparent ${i * STEP}%`,
          `black ${(i + 1) * STEP}%`,
          `black ${(i + 2) * STEP}%`,
          `transparent ${(i + 3) * STEP}%`,
        ].filter((_, stop) => (i + stop) * STEP <= 100);

        const mask = `linear-gradient(to bottom, ${stops.join(", ")})`;
        const blur = `blur(${0.0625 * 2 ** i}px)`;

        return (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              backdropFilter: blur,
              WebkitBackdropFilter: blur,
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
          />
        );
      })}
    </div>
  );
}
