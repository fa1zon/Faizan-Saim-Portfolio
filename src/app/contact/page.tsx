import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { contact, site } from "@/data/site";

export const metadata: Metadata = { title: `Contact — ${site.wordmark}` };

export default function ContactPage() {
  return (
    <main className="px-4 pb-24 pt-28 md:px-16 md:pt-40">
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
    </main>
  );
}
