import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { kickerClass, sectionClass, sectionTitleClass, textLinkCtaClass, textLinkLabelClass } from "@/lib/styles";

export function SplitFeatures() {
  return (
    <div className={`${sectionClass} grid gap-(--grid-gap) pt-0 lg:grid-cols-2`}>
      <Reveal as="article" className="group grid min-h-0 overflow-hidden rounded-[var(--card-radius)] bg-white">
        <div className="flex min-h-[320px] flex-col items-start justify-center p-[clamp(28px,4vw,58px)]">
          <p className={`${kickerClass} mb-5`}>
            <span className="font-sans tabular-nums">01</span> / The signatures
          </p>
          <SplitReveal className={`${sectionTitleClass} mb-[18px] text-[clamp(40px,4.6vw,64px)]`}>Log cabins & X-boxes</SplitReveal>
          <p className="mb-8 max-w-[420px] text-[13px] leading-[1.65] text-steel">
            Classic quilt blocks — log cabin, X-box, crazy quilt and My Flower Garden — pieced in our own colours, from purple to pink to sunny orange.
          </p>
          <Link className={`${textLinkCtaClass} text-ink`} href="/shop?q=log%20cabin">
            <span className={textLinkLabelClass}>Shop log cabins</span>
            <ArrowRight size={14} className="transition-transform duration-200 ease-store group-hover:translate-x-[3px]" />
          </Link>
        </div>
        <div className="relative min-h-[420px] overflow-hidden">
          <Parallax amount={10}>
            <Image src="/products/be36/2.webp" alt="Orange log cabin bedspread detail" fill sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover transition-transform duration-[900ms] ease-store group-hover:scale-[1.04]" />
          </Parallax>
        </div>
      </Reveal>

      <Reveal as="article" delay={0.08} className="group grid min-h-0 overflow-hidden rounded-[var(--card-radius)] bg-mist">
        <div className="relative min-h-[420px] overflow-hidden">
          <Parallax amount={10}>
            <Image src="/gallery/a156.webp" alt="Close-up of scrap patchwork squares" fill sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover transition-transform duration-[900ms] ease-store group-hover:scale-[1.04]" />
          </Parallax>
        </div>
        <div className="flex min-h-[320px] flex-col items-start justify-center p-[clamp(28px,4vw,58px)]">
          <p className={`${kickerClass} mb-5`}>
            <span className="font-sans tabular-nums">02</span> / Waste to wealth
          </p>
          <SplitReveal className={`${sectionTitleClass} mb-[18px] text-[clamp(40px,4.6vw,64px)]`}>Zero waste, by design</SplitReveal>
          <p className="mb-8 max-w-[420px] text-[13px] leading-[1.65] text-steel">
            We upcycle and recycle fabric into planet-friendly pieces. See how a pile of scraps becomes a quilt you&apos;ll keep for years.
          </p>
          <Link className={`${textLinkCtaClass} text-ink`} href="/zero-waste">
            <span className={textLinkLabelClass}>See how it&apos;s done</span>
            <ArrowRight size={14} className="transition-transform duration-200 ease-store group-hover:translate-x-[3px]" />
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
