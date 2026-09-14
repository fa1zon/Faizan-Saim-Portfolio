import type { Metadata } from "next";
import NotFoundView from "@/components/NotFoundView";
import { site } from "@/data/site";

export const metadata: Metadata = { title: `404 — ${site.name}` };

/** Reachable from the menu so the state can be previewed, like the reference. */
export default function Preview404() {
  return <NotFoundView />;
}
