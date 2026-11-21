import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { FacebookIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import { getCategoryTree, getSite } from "@/lib/data";
import { contentClass, kickerClass, sectionTitleClass } from "@/lib/styles";

export const metadata: Metadata = {
  title: "About",
  description: "Sangam Designs™ — handcrafted, upcycled and planet-friendly. Empowering the differently abled.",
};

const values = [
  { n: "01", title: "#Handcrafted", body: "Quilts, bedspreads, dohars, table linen and bags, made piece by piece." },
  { n: "02", title: "Upcycle & recycle", body: "Planet-friendly products from fabric that deserves a second life." },
  { n: "03", title: "Empowering differently abled", body: "Craft that creates opportunity is at the heart of the studio." },
];

export default async function AboutPage() {
  const [site, tree] = await Promise.all([getSite(), getCategoryTree()]);
  return (
    <>
      <section className={`${contentClass} pt-[96px] pb-(--grid-gap)`}>
        <div className="grid gap-(--grid-gap) lg:grid-cols-[1fr_1fr]">
          <div className="linen flex flex-col justify-between rounded-[var(--card-radius)] border border-line p-[clamp(24px,5vw,64px)]">
            <p className={`${kickerClass} w-fit`}>About Sangam Designs</p>
            <div className="mt-16">
              <span className="font-script text-[clamp(28px,3vw,40px)] leading-none text-stitch">sangam (n.)</span>
              <p className="mt-2 mb-6 text-[13px] text-muted italic">a confluence; a meeting point</p>
              <SplitReveal as="h1" className={`${sectionTitleClass} max-w-[11ch] text-[clamp(46px,6.4vw,96px)]`}>Where fabric, craft and purpose meet.</SplitReveal>
            </div>
          </div>
          <div className="relative min-h-[420px] overflow-hidden rounded-[var(--card-radius)] bg-canvas">
            <Parallax amount={12} start="top top">
              <Image src="/products/qu9/1.webp" alt="Waves of the Ocean quilt" fill priority sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" />
            </Parallax>
          </div>
        </div>
      </section>

      <section className={`${contentClass} py-(--section-space)`}>
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="stitch relative rounded-[var(--card-radius)] bg-white p-[clamp(24px,4vw,48px)]">
            <div className="flex items-center gap-4">
              <span className="relative size-16 overflow-hidden rounded-full ring-1 ring-black/5">
                <Image src="/brand/logo.jpg" alt="Sangam Designs logo" fill sizes="64px" className="object-cover" />
              </span>
              <div>
                <p className="m-0 font-display text-[16px] tracking-[0.08em] uppercase">@{site.instagramHandle}</p>
                <p className="m-0 text-[11px] text-muted">Our Instagram bio</p>
              </div>
            </div>
            <blockquote className="mt-6 mb-6 text-[clamp(18px,2vw,24px)] leading-[1.5] text-ink">
              {site.bio.map((line) => (
                <span key={line} className="block">{line}</span>
              ))}
            </blockquote>
            <div className="flex flex-wrap gap-2">
              <a href={site.instagramUrl} target="_blank" rel="noreferrer" className="group inline-flex h-10 items-center gap-2 rounded-full bg-ink px-4 font-display text-[11px] tracking-[0.13em] text-white uppercase">
                <InstagramIcon /> Follow <ArrowUpRight size={13} className="transition-transform group-hover:rotate-45" />
              </a>
              {site.facebookUrl ? (
                <a href={site.facebookUrl} target="_blank" rel="noreferrer" className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 font-display text-[11px] tracking-[0.13em] uppercase">
                  <FacebookIcon /> Facebook
                </a>
              ) : null}
            </div>
          </Reveal>
          <div>
            <p className={`${kickerClass} mb-6`}>What we stand for</p>
            <Reveal stagger={0.1} className="border-t border-line">
              {values.map((v) => (
                <div key={v.n} data-reveal-item className="group grid grid-cols-[56px_1fr] gap-4 border-b border-line py-7">
                  <span className="font-sans text-[13px] font-medium text-stitch tabular-nums">{v.n}</span>
                  <div>
                    <h2 className="m-0 font-display text-[clamp(26px,3vw,40px)] leading-[1] font-medium uppercase transition-colors group-hover:text-accent">{v.title}</h2>
                    <p className="mt-2 mb-0 max-w-[46ch] text-[13px] leading-[1.7] text-steel">{v.body}</p>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section className={`${contentClass} pb-(--section-space)`}>
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className={`${kickerClass} mb-4`}>What we make</p>
            <SplitReveal className={`${sectionTitleClass} max-w-[12ch] text-[clamp(40px,5vw,68px)]`}>From quilts to kurtas</SplitReveal>
          </div>
          <Link href="/zero-waste" className="hidden items-center gap-2 font-display text-[11px] tracking-[0.14em] uppercase sm:inline-flex">How we work <ArrowRight size={13} /></Link>
        </div>
        <Reveal stagger={0.06} className="grid grid-cols-2 gap-(--grid-gap) md:grid-cols-4">
          {tree.map((node) => (
            <Link key={node.slug} data-reveal-item href={`/shop/${node.slug}`} className="group rounded-[20px] bg-white p-5 transition-transform duration-300 hover:-translate-y-1">
              <p className="m-0 font-display text-[22px] font-medium uppercase transition-colors group-hover:text-accent">{node.name}</p>
              <p className="mt-2 mb-4 text-[12px] leading-[1.6] text-steel">{node.tagline}</p>
              <span className="font-sans text-[11px] text-muted tabular-nums">{node.productCount ? `${node.productCount} pieces` : "Coming soon"}</span>
            </Link>
          ))}
        </Reveal>
        <div className="mt-12 flex justify-center">
          <MagneticButton>
            <Link href="/contact" className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-accent px-6 font-display text-[12px] tracking-[0.13em] text-white uppercase">
              Get in touch <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </MagneticButton>
        </div>
      </section>
    </>
  );
}
