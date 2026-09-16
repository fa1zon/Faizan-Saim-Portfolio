import Image from "next/image";
import type { Work } from "@/data/site";

export default function PhotoGrid({ items }: { items: Work[] }) {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-8">
      {items.map((w, i) => (
        <div
          key={w.slug}
          data-reveal
          style={{ "--enter-delay": `${(i % 6) * 0.05}s` } as React.CSSProperties}
          className="enter-rise group relative aspect-[3/4] overflow-hidden"
        >
          <Image
            src={w.cover}
            alt={w.title}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover transition-transform duration-[900ms] ease-framer group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 ease-framer group-hover:opacity-100">
            <span className="ui-label p-4 text-ink">{w.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
