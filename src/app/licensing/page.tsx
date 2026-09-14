import type { Metadata } from "next";
import TextPage from "@/components/TextPage";
import { site } from "@/data/site";

export const metadata: Metadata = { title: `Licensing — ${site.name}` };

export default function LicensingPage() {
  return (
    <TextPage
      heading="Licensing"
      sections={[
        {
          title: "PERSONAL",
          body: "Prints and files for private display. No resale, no commercial reproduction, no use in advertising of any kind.",
        },
        {
          title: "EDITORIAL",
          body: "Use inside articles, features, and books where the image illustrates the story rather than sells a product. Credit line required alongside the image or in the publication's credits.",
        },
        {
          title: "COMMERCIAL",
          body: "Advertising, packaging, campaign, and brand use. Priced by territory, duration, and placement — send the brief and you will get a quote within two working days.",
        },
        {
          title: "EXCLUSIVITY",
          body: "Any licence can be made exclusive for a defined term and territory. Exclusive terms remove the frame from the portfolio for the duration if you would like it that way.",
        },
        {
          title: "CREDIT",
          body: `Wherever a credit is practical, please use "© ${site.name}". It is not required on commercial placements but it is always appreciated.`,
        },
      ]}
    />
  );
}
