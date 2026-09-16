import Image from "next/image";
import Link from "next/link";
import type { JournalPost } from "@/data/site";

export default function JournalCard({ post, index }: { post: JournalPost; index?: number }) {
  return (
    <Link
      href={`/journal/${post.slug}`}
      data-cursor="link"
      data-reveal
      style={{ "--enter-delay": `${(index ?? 0) * 0.05}s` } as React.CSSProperties}
      className="enter-rise group flex flex-col gap-4"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={post.cover}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-[900ms] ease-framer group-hover:scale-[1.04]"
        />
      </div>
      <h3 className="font-display text-[19px] font-normal uppercase leading-[1.2] text-paper">{post.title}</h3>
      <p className="body-copy text-[14px]">{post.excerpt}</p>
    </Link>
  );
}
