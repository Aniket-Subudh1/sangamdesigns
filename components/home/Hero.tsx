"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Parallax } from "@/components/motion/Parallax";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { EASE, gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";
import { contentClass, inkCtaClass, textLinkCtaClass, textLinkLabelClass } from "@/lib/styles";

export type HeroFeature = { href: string; image: string; name: string; label: string };

export function Hero({ feature, count }: { feature: HeroFeature; count: number }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      /* Resolve elements now: the intro callback may run inside another GSAP context. */
      const q = (sel: string) => Array.from(root.querySelectorAll<HTMLElement>(sel));
      const media = q("[data-hero-media]");
      const img = q("[data-hero-img]");
      const cards = q("[data-hero-card]");
      const fades = q("[data-hero-fade]");
      const mm = gsap.matchMedia();
      let tl: gsap.core.Timeline | null = null;
      let cancelled = false;
      mm.add(MOTION_OK, () => {
        gsap.set(cards, { autoAlpha: 0, y: 30 });
        gsap.set(media, { clipPath: "inset(12% 8% 12% 8% round 30px)" });
        gsap.set(img, { scale: 1.25 });
        gsap.set(fades, { autoAlpha: 0, y: 18 });
        onIntroDone(() => {
          if (cancelled) return;
          tl = gsap.timeline({ defaults: { ease: EASE } });
          tl.to(media, { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1.5 })
            .to(img, { scale: 1, duration: 1.8 }, 0)
            .to(cards, { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.12 }, 0.25)
            .to(fades, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.6);
        });
      });
      return () => {
        cancelled = true;
        tl?.kill();
        mm.revert();
      };
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={`${contentClass} overflow-hidden pt-[76px] pb-(--page-gutter) md:h-svh md:min-h-[620px]`} id="top">
      <div className="hero-shell relative grid grid-rows-[56svh_auto] gap-(--grid-gap) md:h-full md:grid-cols-[1.16fr_0.84fr] md:grid-rows-1 md:overflow-hidden">
        <div data-hero-media className="relative min-h-0 overflow-hidden rounded-[var(--card-radius)] bg-canvas">
          <Parallax amount={14} start="top top">
            <div data-hero-img className="absolute inset-0">
              <Image src="/products/du19/1.webp" alt="Aqua Fan patchwork duvet cover on a bed" fill priority sizes="(max-width: 767px) 100vw, 58vw" className="object-cover object-[50%_60%]" />
            </div>
          </Parallax>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgb(0_0_0/0.55)_100%)]" />
          <div className="absolute inset-x-5 bottom-5 z-[2] flex items-end justify-between gap-4 text-white sm:inset-x-7 sm:bottom-7">
            <div data-hero-fade>
              <p className="mb-1 font-script text-[clamp(22px,2.4vw,32px)] leading-none text-white/90">the patchwork edit</p>
              <p className="m-0 max-w-[16ch] font-display text-[clamp(24px,3.6vw,48px)] leading-[0.98] font-medium uppercase">Pieced from what was saved.</p>
            </div>
            <Link data-hero-fade href="/product/aqua-fan-du19" className="group hidden shrink-0 items-center gap-2 rounded-full border border-white/40 bg-black/20 py-1.5 pr-1.5 pl-3 font-display text-[10px] tracking-[0.12em] uppercase backdrop-blur-md transition-colors hover:bg-white hover:text-ink sm:inline-flex">
              DU19 · Aqua Fan
              <span className="grid size-6 place-items-center rounded-full bg-white text-ink transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight size={12} />
              </span>
            </Link>
          </div>
        </div>

        <div className="hero-right relative z-[3] grid min-h-0 grid-rows-1 md:h-full md:gap-(--grid-gap) md:overflow-hidden">
          <div data-hero-card className="hero-headline-card linen flex min-h-0 w-full flex-col justify-between overflow-hidden rounded-[var(--card-radius)] border border-line p-[clamp(18px,3vh,28px)] md:p-[clamp(20px,4.2vh,46px)]">
            <div className="flex items-center justify-between gap-3">
              <span className="min-w-0 truncate rounded-full border border-line bg-white/70 px-3 py-1.5 font-display text-[10px] tracking-[0.16em] whitespace-nowrap text-muted uppercase">
                <span className="md:max-xl:hidden">Sangam Designs™ · </span>#Handcrafted
              </span>
              <span className="shrink-0 font-sans text-[10px] font-medium whitespace-nowrap text-muted tabular-nums">{count} pieces</span>
            </div>
            <div className="hero-headline-copy mt-[clamp(12px,3vh,40px)]">
              <SplitReveal as="h1" mode="intro" delay={0.2} className="m-0 max-w-[11ch] font-display text-[clamp(38px,11vw,58px)] leading-[0.9] font-medium tracking-[-0.01em] text-ink uppercase md:text-[clamp(38px,min(4.4vw,7.4vh),72px)]">
                Every scrap tells a story.
              </SplitReveal>
              <p data-hero-fade className="hero-description my-[clamp(12px,2.4vh,22px)] max-w-[44ch] text-[12px] leading-[1.65] text-steel sm:text-[13px]">
                Quilts, bedspreads, dohars, table linen and bags — handcrafted to upcycle and recycle into planet-friendly pieces, while empowering the differently abled.
              </p>
              <div data-hero-fade className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <MagneticButton>
                  <Link className={inkCtaClass} href="/shop">
                    <span className="text-roll">
                      <span>Shop the collection</span>
                      <span aria-hidden="true">Shop the collection</span>
                    </span>
                    <ArrowRight size={15} />
                  </Link>
                </MagneticButton>
                <Link href="/zero-waste" className={`${textLinkCtaClass} text-ink`}>
                  <span className={textLinkLabelClass}>Our zero-waste story</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="hero-promos hidden min-h-0 grid-cols-1 gap-(--grid-gap) overflow-hidden md:grid xl:grid-cols-[1.05fr_0.95fr]">
            <Link data-hero-card href={feature.href} className="group relative min-h-0 overflow-hidden rounded-[var(--card-radius)] bg-mist">
              <Image src={feature.image} alt={feature.name} fill sizes="(max-width: 1279px) 42vw, 24vw" className="object-cover transition-transform duration-700 ease-store group-hover:scale-[1.05]" />
              <span className="absolute top-4 left-4 rounded-full bg-white px-3 py-1.5 font-display text-[10px] tracking-[0.12em] uppercase">{feature.label}</span>
              <span className="absolute right-4 bottom-4 left-4 flex items-center justify-between gap-2 rounded-full bg-white/92 py-2 pr-2 pl-4 font-display text-[11px] tracking-[0.1em] uppercase backdrop-blur">
                <span className="truncate">{feature.name}</span>
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ink text-white transition-transform duration-300 group-hover:-rotate-45">
                  <ArrowRight size={14} />
                </span>
              </span>
            </Link>
            <Link data-hero-card href="/zero-waste" className="stitch-light group hidden min-h-0 flex-col justify-between overflow-hidden rounded-[var(--card-radius)] bg-accent p-[clamp(18px,3vh,24px)] text-white xl:flex">
              <span className="font-display text-[10px] tracking-[0.18em] text-white/60 uppercase">Our standard</span>
              <p className="m-0 font-display text-[clamp(26px,2.8vw,40px)] leading-[0.98] font-medium uppercase">
                Zero waste.
                <br />
                Waste to wealth.
              </p>
              <span className="inline-flex items-center gap-2 text-[11px] text-white/75">
                See how it&apos;s done <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
