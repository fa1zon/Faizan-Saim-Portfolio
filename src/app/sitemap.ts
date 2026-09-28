import type { MetadataRoute } from "next";
import { collections, site } from "@/data/site";

/**
 * Only the pages the site actually links to. The publication, journal,
 * workshop and interview routes still build, but they hold the scaffold's
 * placeholder copy and stock photography — submitting those to a search
 * engine would put invented articles under Faizan's name.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = [
    { path: "/", priority: 1 },
    { path: "/archive", priority: 0.8 },
    ...collections.map((c) => ({ path: `/archive/${c.category.toLowerCase()}`, priority: 0.7 })),
    { path: "/contact", priority: 0.5 },
  ];

  return pages.map(({ path, priority }) => ({
    url: new URL(path, site.url).toString(),
    lastModified: now,
    priority,
  }));
}
