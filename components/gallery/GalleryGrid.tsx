"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight, X, ZoomIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { EASE, Flip, gsap, MOTION_OK, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useScrollLock } from "@/lib/lenis";
import { chipClass } from "@/lib/styles";
import type { GalleryImage } from "@/lib/types";

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const tags = useMemo(() => ["All", ...Array.from(new Set(images.map((i) => i.tag)))], [images]);
  const [tag, setTag] = useState("All");
  const [open, setOpen] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const visible = useMemo(() => images.filter((i) => tag === "All" || i.tag === tag), [images, tag]);
  useScrollLock(open !== null);

  const choose = (t: string) => {
    if (gridRef.current) flipState.current = Flip.getState(gridRef.current.querySelectorAll("[data-g]"));
    setTag(t);
  };

  useLayoutEffect(() => {
    const state = flipState.current;
    if (!state) return;
    flipState.current = null;
    gridRef.current?.querySelectorAll("[data-g]").forEach((el) => el.setAttribute("data-revealed", ""));
    if (prefersReducedMotion()) return;
    Flip.from(state, {
      duration: 0.7,
      ease: EASE,
      absolute: true,
      onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.6 }),
      onComplete: () => ScrollTrigger.refresh(),
    });
  }, [tag]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia(gridRef);
      mm.add(MOTION_OK, () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-g]");
        const triggers = ScrollTrigger.batch(items, {
          start: "top 94%",
          once: true,
          onEnter: (batch) => {
            batch.forEach((el) => (el as HTMLElement).setAttribute("data-revealed", ""));
            gsap.fromTo(batch, { autoAlpha: 0, y: 50, rotate: () => gsap.utils.random(-2, 2) }, { autoAlpha: 1, y: 0, rotate: 0, stagger: 0.06, duration: 1, ease: EASE });
          },
        });
        return () => triggers.forEach((t) => t.kill());
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gridRef.current?.querySelectorAll("[data-g]").forEach((el) => el.setAttribute("data-revealed", ""));
      });
      return () => mm.revert();
    },
    { scope: gridRef },
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % visible.length));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + visible.length) % visible.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, visible.length]);

  useGSAP(
    () => {
      if (open === null || !boxRef.current) return;
      gsap.fromTo(boxRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 });
      const frame = boxRef.current.querySelector("[data-frame]");
      const thumb = gridRef.current?.querySelector(`[data-g-index="${open}"]`);
      if (frame && thumb && !prefersReducedMotion()) {
        Flip.fit(frame, thumb, { scale: true });
        gsap.to(frame, { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: 0.8, ease: EASE });
      }
    },
    { dependencies: [open === null] },
  );

  const current = open !== null ? visible[open] : null;

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center gap-1 rounded-full border border-line bg-white p-1 sm:w-fit" role="tablist" aria-label="Filter photos">
        {tags.map((t) => (
          <button key={t} type="button" role="tab" aria-selected={tag === t} onClick={() => choose(t)} className={`${chipClass} ${tag === t ? "bg-ink text-white" : "text-muted hover:text-ink"}`}>
            {t}
          </button>
        ))}
      </div>
      <div ref={gridRef} data-grid-reveal className="columns-2 gap-(--grid-gap) md:columns-3 xl:columns-4">
        {visible.map((img, i) => (
          <button
            key={img.src}
            type="button"
            data-g
            data-flip-item
            data-g-index={i}
            onClick={() => setOpen(i)}
            className="group relative mb-(--grid-gap) block w-full break-inside-avoid overflow-hidden rounded-[18px] bg-canvas"
            aria-label={`Open photo: ${img.alt}`}
          >
            <Image src={img.src} alt={img.alt} width={700} height={i % 3 === 0 ? 875 : 525} sizes="(max-width: 767px) 50vw, (max-width: 1279px) 33vw, 25vw" className={`w-full object-cover transition-transform duration-700 ease-store group-hover:scale-[1.06] ${i % 3 === 0 ? "aspect-[4/5]" : "aspect-[4/3]"}`} />
            <span className="absolute inset-0 bg-[linear-gradient(0deg,rgb(0_0_0/0.6),transparent_50%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="absolute right-3 bottom-3 left-3 translate-y-2 text-left text-[11px] leading-tight text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">{img.alt}</span>
            <ZoomIn className="absolute top-3 right-3 size-8 scale-75 rounded-full bg-white/90 p-2 text-ink opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
          </button>
        ))}
      </div>

      {current && open !== null ? (
        <div ref={boxRef} className="fixed inset-0 z-[130] grid place-items-center bg-[rgb(10_14_13/0.92)] p-[clamp(16px,4vw,60px)] backdrop-blur-[10px]" role="dialog" aria-modal="true" aria-label={current.alt} onClick={() => setOpen(null)}>
          <button className="absolute top-5 right-5 z-[2] grid size-11 place-items-center rounded-full border border-white/40 bg-white/10 text-white transition-transform hover:rotate-90" onClick={() => setOpen(null)} aria-label="Close">
            <X />
          </button>
          <div data-frame className="relative aspect-[4/3] w-[min(92vw,calc(78vh*4/3))] overflow-hidden rounded-[22px]" onClick={(e) => e.stopPropagation()}>
            <Image key={current.src} src={current.src} alt={current.alt} fill sizes="92vw" className="object-contain" />
          </div>
          <div className="absolute inset-x-5 bottom-5 flex items-center justify-between gap-4 text-white" onClick={(e) => e.stopPropagation()}>
            <button className="grid size-11 place-items-center rounded-full border border-white/30 hover:bg-white hover:text-ink" onClick={() => setOpen((open - 1 + visible.length) % visible.length)} aria-label="Previous photo">
              <ArrowLeft size={18} />
            </button>
            <div className="min-w-0 text-center">
              <p className="m-0 truncate text-[13px]">{current.alt}</p>
              <p className="m-0 mt-1 font-sans text-[10px] text-white/60 tabular-nums">{open + 1} / {visible.length} · {current.tag}</p>
              {current.href ? (
                <Link href={current.href} className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 font-display text-[10px] tracking-[0.12em] text-ink uppercase">
                  View piece <ArrowUpRight size={12} />
                </Link>
              ) : null}
            </div>
            <button className="grid size-11 place-items-center rounded-full border border-white/30 hover:bg-white hover:text-ink" onClick={() => setOpen((open + 1) % visible.length)} aria-label="Next photo">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
