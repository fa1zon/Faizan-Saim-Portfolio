import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import SplitPage from "@/components/SplitPage";
import { site } from "@/data/site";

export const metadata: Metadata = { title: `Contact — ${site.name}` };

export default function ContactPage() {
  return (
    <SplitPage media={site.contact.media} heading={site.contact.heading} lead={<p>{site.contact.lead}</p>}>
      <ContactForm />
    </SplitPage>
  );
}
