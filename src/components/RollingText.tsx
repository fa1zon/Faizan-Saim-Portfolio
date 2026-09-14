"use client";

type Props = {
  text: string;
  className?: string;
  /** Seconds added per character, which produces the left-to-right ripple. */
  stagger?: number;
  /** Force the rolled state (used when a parent controls the interaction). */
  active?: boolean;
};

/**
 * Each glyph sits in a 1em-tall window with a duplicate stacked underneath.
 * On hover the stack slides up exactly one line, so the original leaves as its
 * copy arrives. Delaying each character by a few ms gives the wave.
 *
 * The roll is triggered by hovering the span itself, by hovering any ancestor
 * marked `data-roll-host`, or by passing `active`. See globals.css.
 */
export default function RollingText({ text, className = "", stagger = 0.018, active }: Props) {
  const chars = Array.from(text);

  return (
    <span
      data-rolling
      data-active={active ? "true" : undefined}
      className={`relative inline-flex align-middle leading-none ${className}`}
    >
      <span className="sr-only">{text}</span>
      {chars.map((char, i) => (
        <span key={i} aria-hidden className="relative inline-block h-[1em] overflow-hidden leading-none">
          <span className="roll-inner inline-flex flex-col leading-none" style={{ transitionDelay: `${i * stagger}s` }}>
            <span className="block h-[1em] leading-none">{char === " " ? " " : char}</span>
            <span className="block h-[1em] leading-none">{char === " " ? " " : char}</span>
          </span>
        </span>
      ))}
    </span>
  );
}
