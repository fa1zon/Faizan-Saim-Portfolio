/** Utility pages: a single narrow column of prose on the dark ground. */
export default function TextPage({
  heading,
  sections,
}: {
  heading: string;
  sections: { title: string; body: string }[];
}) {
  return (
    <main className="mx-auto min-h-[100svh] w-full max-w-[720px] px-6 pb-[220px] pt-[160px]">
      <h1 data-reveal className="enter-lift font-display text-[40px] font-extralight leading-[44px] text-paper">
        {heading}
      </h1>

      <div className="mt-12 flex flex-col gap-10">
        {sections.map((s, i) => (
          <section
            key={s.title}
            data-reveal
            className="enter-lift border-t border-line pt-6"
            style={{ "--enter-delay": `${0.1 + i * 0.06}s` } as React.CSSProperties}
          >
            <h2 className="ui-label text-paper">{s.title}</h2>
            <p className="mt-3 text-[17px] font-light leading-[1.6] tracking-[0.2px] text-muted">{s.body}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
