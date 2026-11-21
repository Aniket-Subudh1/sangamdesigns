import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { getGallery } from "@/lib/data";
import { contentClass, kickerClass, sectionTitleClass } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Photo gallery",
  description: "Quilts, bedspreads, bedsheets, table linen, bags and custom orders from the Sangam Designs studio.",
};

export default async function GalleryPage() {
  const images = await getGallery();
  return (
    <div className={`${contentClass} pt-[110px] pb-(--section-space)`}>
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className={`${kickerClass} mb-4`}>Photo gallery · {images.length} photos</p>
          <SplitReveal as="h1" className={`${sectionTitleClass} max-w-[11ch] text-[clamp(48px,7vw,104px)]`}>From the studio floor</SplitReveal>
        </div>
        <p className="m-0 max-w-[40ch] text-[13px] leading-[1.7] text-steel">Every photo here is a piece we&apos;ve made — from quilts and bedspreads to table linen, bags and custom event orders. Tap any photo to see it up close.</p>
      </div>
      <GalleryGrid images={images} />
    </div>
  );
}
