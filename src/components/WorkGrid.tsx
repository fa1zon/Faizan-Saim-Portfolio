"use client";

import { useMemo, useState } from "react";
import CategoryBar from "./CategoryBar";
import WorkCard from "./WorkCard";
import { works, type Category } from "@/data/site";

export default function WorkGrid() {
  const [active, setActive] = useState<Category>("ALL");
  const [open, setOpen] = useState(false);

  const visible = useMemo(
    () => (active === "ALL" ? works : works.filter((w) => w.category === active)),
    [active],
  );

  return (
    <>
      {/* Keying on the filter remounts the tiles, so the CSS entrance replays
          on every category change without a presence wrapper to stall on. */}
      <div
        key={active}
        className="grid grid-cols-2 gap-[6px] px-[6px] pt-[6px] pb-[220px] sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
        {visible.map((work, i) => (
          <WorkCard key={work.slug} work={work} index={i} priority={i < 10} />
        ))}
      </div>

      <CategoryBar active={active} onChange={setActive} open={open} setOpen={setOpen} />
    </>
  );
}
