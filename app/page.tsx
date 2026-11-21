import { CategoryExplore } from "@/components/home/CategoryExplore";
import { Hero } from "@/components/home/Hero";
import { InstagramBand } from "@/components/home/InstagramBand";
import { Mission } from "@/components/home/Mission";
import { PatternRail } from "@/components/home/PatternRail";
import { ServiceStrip } from "@/components/home/ServiceStrip";
import { SplitFeatures } from "@/components/home/SplitFeatures";
import { StudioGallery, type StudioItem } from "@/components/home/StudioGallery";
import { WhySangam } from "@/components/home/WhySangam";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { getCategoryTree, getFeaturedProducts, getPatterns, getProduct, getSearchIndex, getSite, toSummary } from "@/lib/data";
import { kickerClass, sectionClass, sectionTitleClass, textLinkCtaClass, textLinkLabelClass } from "@/lib/styles";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const studioPicks: { slug: string; caption: string }[] = [
  { slug: "fans-of-love-fans-on-red-squares-qu10", caption: "Quilt" },
  { slug: "multicoloured-umbrellas-be35", caption: "Bedspread" },
  { slug: "red-butterfly-applique-be9", caption: "Bedspread" },
  { slug: "pink-and-grey-houses-be21", caption: "Bedspread" },
  { slug: "waves-of-the-ocean-white-border-qu9", caption: "Quilt" },
  { slug: "purple-diyas-on-mehendi-and-purple-polka-dots-be30", caption: "Bedspread" },
  { slug: "ajrakh-fans-dohar-with-blue-border-be26", caption: "Fans dohar" },
  { slug: "aqua-and-blue-applique-flowers-du30", caption: "Duvet cover" },
  { slug: "brown-butterflies-on-khaki-with-mangalagiri-khadi-print-be28", caption: "Bedspread" },
];

export default async function Home() {
  const [site, tree, featured, patterns, index] = await Promise.all([
    getSite(),
    getCategoryTree(),
    getFeaturedProducts(),
    getPatterns(),
    getSearchIndex(),
  ]);

  const studioProducts = await Promise.all(studioPicks.map((s) => getProduct(s.slug)));
  const studio: StudioItem[] = studioProducts.flatMap((p, i) =>
    p && p.images.length ? [{ src: p.images[1] ?? p.images[0], title: p.name, caption: `${p.skus[0]} · ${studioPicks[i].caption}`, href: `/product/${p.slug}` }] : [],
  );

  const heroProduct = await getProduct("fans-of-love-fans-on-red-squares-qu10");
  const feature = heroProduct
    ? { href: `/product/${heroProduct.slug}`, image: heroProduct.images[0], name: heroProduct.name, label: "Signature quilt" }
    : { href: "/shop", image: "/products/qu10/1.webp", name: "Shop quilts", label: "Signature quilt" };

  const featuredSummaries = featured.map(toSummary);
  const rootChips = tree
    .filter((n) => featuredSummaries.some((p) => p.rootCategory === n.slug))
    .map((n) => ({ label: n.name, value: n.slug, field: "rootCategory" as const }));

  return (
    <>
      <Hero feature={feature} count={index.length} />

      <Marquee
        className="border-y border-line bg-white py-4 text-ink"
        items={["Patchwork", "Appliqué", "Ajrakh", "Kalamkari", "Sambalpuri", "Madhubani", "Jaipur prints", "Crochet", "Log cabin", "Upcycled"]}
      />

      <section className={sectionClass} id="favourites">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className={`${kickerClass} mb-4`}>Picked from the studio</p>
            <SplitReveal className={`${sectionTitleClass} max-w-[9ch] text-[clamp(44px,5.5vw,76px)]`}>Favourite pieces</SplitReveal>
          </div>
          <Link className={`${textLinkCtaClass} text-ink max-[767px]:hidden`} href="/shop">
            <span className={textLinkLabelClass}>Shop all {index.length} pieces</span>
            <ArrowRight size={14} className="transition-transform duration-200 ease-store group-hover:translate-x-[3px]" />
          </Link>
        </div>
        <ProductGrid products={featuredSummaries} chips={rootChips} limit={8} />
        <Reveal className="mt-8 flex justify-center md:hidden">
          <Link className={`${textLinkCtaClass} text-ink`} href="/shop">
            <span className={textLinkLabelClass}>Shop all pieces</span>
            <ArrowRight size={14} />
          </Link>
        </Reveal>
      </section>

      <WhySangam />
      <ServiceStrip />
      <CategoryExplore tree={tree} />
      <PatternRail patterns={patterns} />
      <SplitFeatures />
      <StudioGallery items={studio} />
      <InstagramBand site={site} images={["/gallery/a022.webp", "/products/be41/2.webp", "/products/qu9/2.webp", "/products/be28/2.webp", "/products/du19/2.webp", "/gallery/b022.webp"]} />
      <Mission />
    </>
  );
}
