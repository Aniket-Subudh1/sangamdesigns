import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { StitchLine } from "@/components/motion/StitchLine";
import { type GridChip, ProductGrid } from "@/components/shop/ProductGrid";
import { ComingSoon } from "@/components/shop/ComingSoon";
import { contentClass, kickerClass, sectionTitleClass } from "@/lib/styles";
import type { Category, ProductSummary } from "@/lib/types";

export function ShopView({
  title,
  kicker,
  description,
  crumbs,
  products,
  chips,
  siblings,
  activeSlug,
  heroImage,
  category,
}: {
  title: string;
  kicker: string;
  description: string;
  crumbs: { label: string; href: string }[];
  products: ProductSummary[];
  chips: GridChip[];
  siblings: Pick<Category, "slug" | "name">[];
  activeSlug?: string;
  heroImage?: string | null;
  category?: Category;
}) {
  return (
    <div className={`${contentClass} pt-[96px] pb-(--section-space)`}>
      <div className="linen relative mb-(--grid-gap) grid overflow-hidden rounded-[var(--card-radius)] border border-line md:grid-cols-[1.2fr_0.8fr]">
        <div className="flex flex-col justify-end p-[clamp(24px,4vw,56px)]">
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-[11px] text-muted">
            {crumbs.map((c, i) => (
              <span key={c.href} className="inline-flex items-center gap-1">
                {i ? <ChevronRight size={11} /> : null}
                <Link href={c.href} className="hover:text-ink">{c.label}</Link>
              </span>
            ))}
          </nav>
          <p className={`${kickerClass} mb-4 w-fit`}>{kicker}</p>
          <SplitReveal as="h1" className={`${sectionTitleClass} max-w-[12ch] text-[clamp(44px,6vw,88px)]`}>{title}</SplitReveal>
          <p className="mt-4 mb-0 max-w-[52ch] text-[13px] leading-[1.7] text-steel">{description}</p>
          {siblings.length ? (
            <div className="mt-6 flex flex-wrap gap-1.5">
              {siblings.map((s) => (
                <Link key={s.slug} href={`/shop/${s.slug}`} className={`rounded-full border px-3.5 py-1.5 font-display text-[10px] tracking-[0.13em] uppercase transition-colors ${s.slug === activeSlug ? "border-ink bg-ink text-white" : "border-line bg-white text-steel hover:border-ink hover:text-ink"}`}>
                  {s.name}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
        {heroImage ? (
          <div className="relative hidden min-h-[300px] overflow-hidden md:block">
            <Image src={heroImage} alt="" fill priority sizes="40vw" className="object-cover" />
            <span className="absolute right-4 bottom-4 rounded-full bg-white/92 px-3 py-1.5 font-sans text-[10px] font-semibold tabular-nums backdrop-blur">{products.length} pieces</span>
          </div>
        ) : null}
      </div>
      <StitchLine className="my-8" />
      {products.length ? (
        <ProductGrid products={products} chips={chips} toolbar />
      ) : (
        <Reveal>
          <ComingSoon category={category} />
        </Reveal>
      )}
    </div>
  );
}
