import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      /** Placeholder sections still standing; see the note in sitemap.ts. */
      disallow: ["/publications", "/journal", "/workshops", "/interviews"],
    },
    sitemap: new URL("/sitemap.xml", site.url).toString(),
  };
}
