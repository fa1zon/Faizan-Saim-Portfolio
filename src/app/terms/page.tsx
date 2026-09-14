import type { Metadata } from "next";
import TextPage from "@/components/TextPage";
import { site } from "@/data/site";

export const metadata: Metadata = { title: `Terms — ${site.name}` };

export default function TermsPage() {
  return (
    <TextPage
      heading="Terms"
      sections={[
        {
          title: "01 — SCOPE",
          body: `These terms cover every commission, licence, and print sale made through ${site.name}. Booking a shoot or purchasing a licence means you accept them as written on the day of the agreement.`,
        },
        {
          title: "02 — BOOKINGS",
          body: "A date is held once a deposit of 30% has cleared. The balance falls due on delivery of the edited selects. Rescheduling more than fourteen days out carries no fee; inside that window the deposit is retained.",
        },
        {
          title: "03 — DELIVERY",
          body: "Edited selects are delivered as high-resolution files through a private gallery, normally within ten working days. Raw files are not part of any delivery.",
        },
        {
          title: "04 — COPYRIGHT",
          body: `Copyright in every frame remains with ${site.name}. What you buy is a licence to use the images in the ways set out in your agreement.`,
        },
        {
          title: "05 — CANCELLATION",
          body: "Either side may cancel in writing. Work already carried out is invoiced pro rata. Weather-dependent shoots are rescheduled at no cost.",
        },
      ]}
    />
  );
}
