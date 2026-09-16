import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/data/site";

export default function CollectionCard({
  category,
  count,
  cover,
  index,
}: {
  category: Exclude<Category, "ALL">;
  count: number;
  cover: string;
  index?: number;
}) {
  return (
    <Link
      href={`/archive/${category.toLowerCase()}`}
      data-cursor="link"
      data-reveal
      style={{ "--enter-delay": `${(index ?? 0) * 0.06}s` } as React.CSSProperties}
      className="enter-rise group flex flex-col gap-4"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={cover}
          alt={category}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-[900ms] ease-framer group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex items-baseline justify-between">
        <h3 className="font-display text-[22px] font-light uppercase text-paper">{category}</h3>
        <span className="ui-label text-muted">{count} works</span>
      </div>
    </Link>
  );
}
