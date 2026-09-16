import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { contact, site } from "@/data/site";

export const metadata: Metadata = { title: `Contact — ${site.wordmark}` };

export default function ContactPage() {
  return (
    <main className="px-4 pb-24 pt-28 md:px-10 md:pt-40">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 md:grid-cols-2 md:gap-24">
        <div className="flex flex-col gap-8">
          <h1
            data-reveal
            className="enter-lift font-display text-[36px] font-light uppercase leading-[1.05] text-paper md:text-[52px]"
          >
            {contact.headline}
          </h1>
          <p className="ui-label text-muted">{contact.coffee}</p>
          <a href={`mailto:${site.email}`} data-cursor="link" className="font-display text-[22px] font-light lowercase text-paper">
            {site.email}
          </a>
        </div>

        <div>
          <p className="ui-label mb-4 text-muted">Send Me A Message</p>
          <ContactForm />
        </div>
      </div>

      <div className="mx-auto mt-24 max-w-[860px] md:mt-32">
        <h2 className="font-display text-[28px] font-light uppercase leading-[1.05] text-paper md:text-[36px]">
          Frequently Asked Questions
        </h2>

        <div className="mt-8 flex flex-col">
          {contact.faqs.map((f, i) => (
            <details
              key={f.q}
              data-reveal
              style={{ "--enter-delay": `${i * 0.06}s` } as React.CSSProperties}
              className="enter-lift group border-t border-line py-6 last:border-b"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-[17px] font-normal text-paper md:text-[19px]">
                {f.q}
                <span className="shrink-0 text-muted transition-transform duration-300 ease-framer group-open:rotate-45">+</span>
              </summary>
              <p className="body-copy mt-4 text-[15px] md:text-[16px]">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </main>
  );
}
