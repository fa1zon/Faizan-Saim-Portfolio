import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HorizontalGallery from "@/components/HorizontalGallery";
import { getWork, nextWork, site, works } from "@/data/site";

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return { title: site.name };
  return { title: `${work.title} — ${site.name}`, description: work.description };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) notFound();

  return <HorizontalGallery work={work} next={nextWork(slug)} />;
}
