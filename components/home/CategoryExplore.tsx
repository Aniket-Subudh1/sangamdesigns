import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { PatchworkPlaceholder } from "@/components/ui/PatchworkPlaceholder";
import { swatch } from "@/data/build";
import { pad2 } from "@/lib/format";
import { kickerClass, sectionClass, sectionTitleClass } from "@/lib/styles";
import type { CategoryNode } from "@/lib/types";

/* gumana ExploreRow → shop by category (dynamic tree). */
export function CategoryExplore({ tree }: { tree: CategoryNode[] }) {
  return (
    <section className={sectionClass} id="categories">
      <div className="mb-8 flex items-end justify-between gap-6">
        <div>
          <p className={`${kickerClass} mb-4`}>Shop by category</p>
          <SplitReveal className={`${sectionTitleClass} max-w-[10ch] text-[clamp(42px,5vw,68px)]`}>Find your next heirloom</SplitReveal>
        </div>
        <span className="hidden max-w-[30ch] text-right text-[13px] leading-[1.65] text-steel sm:block">Bedding, living, bags and menswear — all made by hand.</span>
      </div>
      <Reveal stagger={0.08} className="grid grid-cols-2 gap-(--grid-gap) lg:grid-cols-4">
        {tree.map((node, index) => (
          <Link
            key={node.slug}
            data-reveal-item
            href={`/shop/${node.slug}`}
            className="group relative aspect-[3/4] overflow-hidden rounded-[var(--card-radius)] bg-canvas transition-transform duration-300 ease-store before:absolute before:inset-0 before:z-[1] before:bg-[linear-gradient(0deg,rgb(0_0_0/0.72),transparent_58%)] before:content-[''] hover:-translate-y-1"
          >
            {node.image ? (
              <Image src={node.image} alt={`${node.name} by Sangam Designs`} fill sizes="(max-width: 1023px) 50vw, 25vw" className="object-cover transition-transform duration-[750ms] ease-store group-hover:scale-[1.06]" />
            ) : (
              <PatchworkPlaceholder seed={node.slug} colors={[swatch("aqua"), swatch("pink"), swatch("olive")]} label="" />
            )}
            <div className="absolute right-3 bottom-3 left-3 z-[2] text-white">
              <span className="font-sans text-[9px] font-medium tracking-[0.08em] text-white/70 uppercase tabular-nums">
                {pad2(index + 1)} / {node.productCount ? `${node.productCount} pieces` : "Coming soon"}
              </span>
              <h3 className="mx-0 mt-1 mb-1 font-display text-[clamp(22px,3vw,36px)] leading-[0.96] font-medium tracking-[0.01em] uppercase">{node.name}</h3>
              <p className="mb-3 line-clamp-1 text-[11px] text-white/75">{node.tagline}</p>
              <span className="inline-flex h-8 items-center gap-1.5 rounded-full bg-paper px-3 font-display text-[9px] font-medium tracking-[0.12em] text-ink uppercase transition-[gap] duration-300 group-hover:gap-2.5">
                {node.productCount ? "Shop" : "Preview"} <ArrowRight size={10} />
              </span>
            </div>
          </Link>
        ))}
      </Reveal>
    </section>
  );
}
