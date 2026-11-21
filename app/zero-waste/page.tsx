import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Marquee } from "@/components/motion/Marquee";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { StitchLine } from "@/components/motion/StitchLine";
import { ZeroWasteStory } from "@/components/pages/ZeroWasteStory";
import { contentClass, inkCtaClass, kickerClass, sectionTitleClass } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Zero waste & waste to wealth",
  description: "How Sangam Designs upcycles and recycles fabric into planet-friendly quilts, bedspreads, bags and table linen.",
};

/* Copy based on the Instagram bio and the notebook brief — review with the owner. */
const smallScraps = [
  { title: "Appliqué", body: "Offcuts too small for a quilt block become butterflies, fans, houses and diyas.", image: "/products/be9/3.webp", href: "/shop?q=appliqu%C3%A9" },
  { title: "Bags", body: "Ikat, print and patchwork panels give totes a second life.", image: "/products/bag-ikat-blue/1.webp", href: "/shop/bags" },
  { title: "Table linen", body: "Block-print and Madhubani mats, sized from what's left on the table.", image: "/products/tm6/1.webp", href: "/shop/table-mat-sets" },
];

export default function ZeroWastePage() {
  return (
    <>
      <section className={`${contentClass} pt-[96px] pb-(--grid-gap)`}>
        <div className="linen relative grid overflow-hidden rounded-[var(--card-radius)] border border-line lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col justify-end p-[clamp(24px,5vw,72px)]">
            <span className="font-script text-[clamp(26px,3vw,40px)] leading-none text-stitch">the Sangam way</span>
            <SplitReveal as="h1" className={`${sectionTitleClass} mt-3 max-w-[10ch] text-[clamp(52px,8vw,120px)]`}>Zero waste. Waste to wealth.</SplitReveal>
            <p className="mt-6 mb-0 max-w-[52ch] text-[14px] leading-[1.75] text-steel">
              “Upcycle & recycle to craft planet-friendly products.” It&apos;s the line on our Instagram, and it&apos;s how every piece begins: with fabric someone else might have thrown away.
            </p>
          </div>
          <div className="relative min-h-[360px] overflow-hidden">
            <Image src="/gallery/b022.webp" alt="Crazy-quilt patchwork made from many small scraps" fill priority sizes="(max-width: 1023px) 100vw, 45vw" className="object-cover" />
          </div>
        </div>
      </section>

      <Marquee className="my-(--grid-gap) py-3 text-accent" items={["Collect", "Sort", "Piece", "Quilt", "Upcycle", "Recycle", "Repeat"]} />

      <ZeroWasteStory />

      <section className={`${contentClass} py-(--section-space)`}>
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className={`${kickerClass} mb-4`}>Even the smallest scraps</p>
            <SplitReveal className={`${sectionTitleClass} max-w-[12ch] text-[clamp(40px,5vw,68px)]`}>Nothing is too small to use</SplitReveal>
          </div>
          <p className="m-0 max-w-[40ch] text-[13px] leading-[1.7] text-steel">What doesn&apos;t fit a quilt finds its way into something else.</p>
        </div>
        <Reveal stagger={0.08} className="grid gap-(--grid-gap) md:grid-cols-3">
          {smallScraps.map((s) => (
            <Link key={s.title} data-reveal-item href={s.href} className="group overflow-hidden rounded-[var(--card-radius)] bg-white">
              <div className="relative aspect-[4/3] overflow-hidden bg-canvas">
                <Image src={s.image} alt="" fill sizes="(max-width: 767px) 100vw, 33vw" className="object-cover transition-transform duration-700 ease-store group-hover:scale-[1.06]" />
              </div>
              <div className="flex items-end justify-between gap-4 p-6">
                <div>
                  <h3 className="m-0 font-display text-[26px] font-medium uppercase">{s.title}</h3>
                  <p className="mt-2 mb-0 text-[12px] leading-[1.6] text-steel">{s.body}</p>
                </div>
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                  <ArrowRight size={15} />
                </span>
              </div>
            </Link>
          ))}
        </Reveal>
      </section>

      <section className={`${contentClass} pb-(--section-space)`}>
        <Reveal className="stitch-light grid items-center gap-8 rounded-[var(--card-radius)] bg-accent p-[clamp(28px,5vw,72px)] text-white md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <span className="font-script text-[30px] leading-none text-white/85">with purpose</span>
            <p className="mt-3 mb-0 font-display text-[clamp(36px,4.6vw,64px)] leading-[0.95] font-medium uppercase">Empowering the differently abled.</p>
            <p className="mt-5 mb-0 max-w-[48ch] text-[14px] leading-[1.75] text-white/80">It&apos;s the last line of our bio and the first thing we think about: craft as a way to create skills, livelihood and pride.</p>
          </div>
          <div className="flex flex-col items-start gap-4 md:items-end">
            <MagneticButton>
              <Link href="/shop" className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-white px-6 font-display text-[12px] tracking-[0.13em] text-ink uppercase transition-transform hover:-translate-y-0.5">
                Shop upcycled pieces <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </MagneticButton>
            <Link href="/about" className="font-display text-[11px] tracking-[0.14em] text-white/80 uppercase underline-offset-4 hover:underline">Read our story</Link>
          </div>
        </Reveal>
        <StitchLine className="mt-(--section-space)" />
        <div className="mt-10 flex justify-center">
          <Link href="/gallery" className={inkCtaClass}>
            See the gallery <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
