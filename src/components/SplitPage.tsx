import Image from "next/image";

/**
 * The About/Contact layout: a full-bleed still on the left, a translucent panel
 * on the right whose contents rise into place after the image has settled.
 * Entrances are CSS, so this renders and animates without any JavaScript.
 */
export default function SplitPage({
  media,
  heading,
  lead,
  children,
}: {
  media: string;
  heading: string;
  lead: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-[100svh] flex-col gap-[6px] p-[6px] lg:h-[100svh] lg:flex-row">
      <div
        data-reveal
        className="enter-zoom relative min-h-[45svh] flex-1 overflow-hidden rounded-card lg:min-h-0"
      >
        <Image src={media} alt="" fill priority sizes="(max-width: 1024px) 100vw, 68vw" className="object-cover" />
      </div>

      <aside
        data-reveal
        className="enter-lift flex w-full shrink-0 flex-col justify-between gap-16 rounded-card bg-surface p-8 pb-28 lg:w-[450px] lg:p-12 lg:pb-12"
        style={{ "--enter-delay": "0.1s" } as React.CSSProperties}
      >
        <div className="flex flex-col gap-3">
          <h1
            data-reveal
            className="enter-lift font-display text-[40px] font-extralight leading-[44px] text-paper"
            style={{ "--enter-delay": "0.2s" } as React.CSSProperties}
          >
            {heading}
          </h1>
          <div
            data-reveal
            className="enter-lift text-[17px] font-light leading-[1.6] tracking-[0.2px] text-muted"
            style={{ "--enter-delay": "0.28s" } as React.CSSProperties}
          >
            {lead}
          </div>
        </div>

        <div
          data-reveal
          className="enter-lift flex flex-col gap-7"
          style={{ "--enter-delay": "0.38s" } as React.CSSProperties}
        >
          {children}
        </div>
      </aside>
    </main>
  );
}
