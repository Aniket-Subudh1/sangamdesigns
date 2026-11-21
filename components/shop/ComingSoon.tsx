"use client";

import { MessageCircle } from "lucide-react";
import { PatchworkPlaceholder } from "@/components/ui/PatchworkPlaceholder";
import { swatch } from "@/data/build";
import { useStore } from "@/lib/store";
import { inkCtaClass } from "@/lib/styles";
import type { Category } from "@/lib/types";

export function ComingSoon({ category }: { category?: Category }) {
  const { openEnquiry } = useStore();
  return (
    <div className="grid overflow-hidden rounded-[var(--card-radius)] bg-white md:grid-cols-[0.9fr_1.1fr]">
      <div className="relative min-h-[260px]">
        <PatchworkPlaceholder seed={category?.slug ?? "soon"} colors={[swatch("aqua"), swatch("pink"), swatch("olive"), swatch("mustard")]} label="" />
      </div>
      <div className="flex flex-col justify-center gap-4 p-[clamp(24px,4vw,56px)]">
        <span className="font-script text-[28px] leading-none text-stitch">on the cutting table</span>
        <h2 className="m-0 font-display text-[clamp(30px,3.4vw,46px)] leading-[0.95] font-medium uppercase">New {category?.name ?? "pieces"} landing soon</h2>
        <p className="m-0 max-w-[46ch] text-[13px] leading-[1.7] text-steel">{category?.description}</p>
        {category?.sizes ? (
          <div className="flex flex-wrap items-center gap-2">
            {category.sizes.map((s) => (
              <span key={s} className="grid h-9 min-w-10 place-items-center rounded-full border border-line px-3 font-display text-[11px] tracking-[0.08em]">{s}</span>
            ))}
            <span className="rounded-full bg-accent-soft px-3 py-2 font-display text-[10px] tracking-[0.12em] text-accent uppercase">+ Any size on request</span>
          </div>
        ) : null}
        <button type="button" onClick={() => openEnquiry({ kind: "custom" })} className={`${inkCtaClass} mt-2 w-fit`}>
          <MessageCircle size={15} /> Ask for a custom piece
        </button>
      </div>
    </div>
  );
}
