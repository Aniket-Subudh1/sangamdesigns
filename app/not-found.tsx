import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { PatchworkPlaceholder } from "@/components/ui/PatchworkPlaceholder";
import { swatch } from "@/data/build";
import { contentClass, inkCtaClass } from "@/lib/styles";

export default function NotFound() {
  return (
    <div className={`${contentClass} pt-[110px] pb-(--section-space)`}>
      <div className="grid overflow-hidden rounded-[var(--card-radius)] bg-white md:grid-cols-2">
        <div className="relative min-h-[300px]">
          <PatchworkPlaceholder seed="404" colors={[swatch("aqua"), swatch("pink"), swatch("mustard")]} label="" />
        </div>
        <div className="flex flex-col justify-center gap-4 p-[clamp(24px,5vw,64px)]">
          <span className="font-script text-[30px] leading-none text-stitch">oops — a loose thread</span>
          <h1 className="m-0 font-display text-[clamp(44px,6vw,88px)] leading-[0.9] font-medium uppercase">Page not found</h1>
          <p className="m-0 max-w-[40ch] text-[13px] leading-[1.7] text-steel">This piece may have found a new home, or the link has come unstitched.</p>
          <Link href="/shop" className={`${inkCtaClass} w-fit`}>Back to the shop <ArrowRight size={15} /></Link>
        </div>
      </div>
    </div>
  );
}
