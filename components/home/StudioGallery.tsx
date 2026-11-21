"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { gsap, useGSAP } from "@/lib/gsap";
import { kickerClass, sectionTitleClass, trackClass } from "@/lib/styles";

export type StudioItem = { src: string; title: string; caption: string; href: string };

/**
 * Pinned horizontal scroll on desktop (scrubbed by vertical scroll); a
 * native swipe track on touch / small screens / reduced motion.
 */
export function StudioGallery({ items }: { items: StudioItem[] }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = ref.current;
      const track = section?.querySelector<HTMLElement>("[data-htrack]");
      if (!section || !track) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const distance = () => track.scrollWidth - window.innerWidth + 48;
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        track.querySelectorAll<HTMLElement>("[data-hitem] img").forEach((img) => {
          gsap.fromTo(img, { scale: 1.25 }, {
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: img.closest("[data-hitem]"), containerAnimation: tween, start: "left right", end: "right left", scrub: true },
          });
        });
        const bar = section.querySelector("[data-hprogress]");
        gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: section, start: "top top", end: () => `+=${distance()}`, scrub: true } });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="overflow-hidden py-(--section-space) lg:flex lg:h-svh lg:flex-col lg:justify-center lg:py-0" id="studio">
      <div className="mx-auto mb-8 flex w-full max-w-[var(--content-max)] items-end justify-between gap-5 px-(--page-gutter)">
        <div>
          <p className={`${kickerClass} mb-4`}>From the studio</p>
          <SplitReveal className={`${sectionTitleClass} max-w-[9ch] text-[clamp(42px,5vw,68px)]`}>Stories in every block</SplitReveal>
        </div>
        <div className="hidden w-[220px] lg:block">
          <span className="mb-2 block text-right font-display text-[10px] tracking-[0.15em] text-muted uppercase">Keep scrolling</span>
          <span className="block h-px w-full bg-line">
            <span data-hprogress className="block h-px origin-left bg-stitch" />
          </span>
        </div>
      </div>
      <div className={`${trackClass} lg:overflow-visible`}>
        <div data-htrack className="flex w-max gap-(--grid-gap) px-(--page-gutter)">
          {items.map((item, i) => (
            <Link key={item.src} data-hitem href={item.href} className="group relative aspect-[4/5] w-[min(76vw,340px)] shrink-0 overflow-hidden rounded-[var(--card-radius)] bg-canvas text-white after:absolute after:inset-0 after:bg-[linear-gradient(0deg,rgb(0_0_0/0.65),transparent_55%)] lg:aspect-[3/4] lg:w-[clamp(300px,26vw,420px)] lg:[&:nth-child(even)]:mt-14">
              <Image src={item.src} alt={item.title} fill sizes="(max-width: 1023px) 76vw, 26vw" className="object-cover transition-[filter] duration-500 group-hover:brightness-110" />
              <span className="absolute top-4 right-4 z-[2] grid size-9 scale-75 place-items-center rounded-full bg-white/90 text-ink opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                <ArrowUpRight size={15} />
              </span>
              <span className="absolute right-5 bottom-5 left-5 z-[2] grid">
                <small className="font-sans text-[10px] font-medium tracking-[0.1em] text-white/70 uppercase tabular-nums">{String(i + 1).padStart(2, "0")} · {item.caption}</small>
                <strong className="mt-1 font-display text-[clamp(20px,2vw,26px)] leading-[1] font-medium tracking-[0.01em] uppercase">{item.title}</strong>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
