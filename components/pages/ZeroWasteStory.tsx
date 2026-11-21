"use client";

import { useRef } from "react";
import { EASE, gsap, useGSAP } from "@/lib/gsap";
import { pad2 } from "@/lib/format";

/*
 * Copy is written from the Instagram bio ("Upcycle & recycle to craft
 * planet-friendly products") and the notebook brief. Please review with the
 * owner before launch.
 */
const steps = [
  { title: "Collect", body: "Leftover fabric, offcuts and pre-loved textiles are saved instead of being thrown away." },
  { title: "Sort", body: "Every scrap is sorted by colour, print and weight — Ajrakh with Ajrakh, florals with florals." },
  { title: "Piece", body: "Designs like log cabin, X-box and crazy quilt are planned around the pieces we already have." },
  { title: "Quilt", body: "The pieced top is layered, quilted and bordered into something worth keeping for years." },
];

const fabrics = [
  "/gallery/a156.webp",
  "/gallery/b022.webp",
  "/gallery/a022.webp",
  "/gallery/a140.webp",
  "/products/be9/2.webp",
  "/products/qu10/2.webp",
  "/products/du19/2.webp",
  "/products/be30/2.webp",
];

const COLS = 4;
const CELLS = 16;

function seeded(i: number, salt: number) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export function ZeroWasteStory() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = ref.current;
      if (!section) return;
      const mm = gsap.matchMedia(ref);
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const pieces = gsap.utils.toArray<HTMLElement>("[data-piece]");
        const stepEls = gsap.utils.toArray<HTMLElement>("[data-step]");
        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: { trigger: section, start: "top top", end: "+=2600", pin: true, scrub: 0.9 },
        });

        // 01 Collect — scattered scraps.
        gsap.set(pieces, {
          x: (i) => (seeded(i, 1) - 0.5) * 520,
          y: (i) => (seeded(i, 2) - 0.5) * 420,
          rotate: (i) => (seeded(i, 3) - 0.5) * 70,
          scale: (i) => 0.55 + seeded(i, 4) * 0.35,
          filter: "grayscale(0.7)",
        });
        gsap.set(stepEls.slice(1), { autoAlpha: 0, y: 30 });
        gsap.set("[data-seam-mask]", { attr: { width: 0 } });
        gsap.set("[data-border]", { autoAlpha: 0, scale: 0.94 });

        // 02 Sort — pieces drift into colour piles.
        tl.to(stepEls[0], { autoAlpha: 0, y: -30, duration: 0.4 }, 0.6)
          .to(stepEls[1], { autoAlpha: 1, y: 0, duration: 0.4 }, 0.8)
          .to(pieces, {
            x: (i) => ((i % 2) * 2 - 1) * 170 + (seeded(i, 5) - 0.5) * 60,
            y: (i) => (Math.floor(i / 8) * 2 - 1) * 120 + (seeded(i, 6) - 0.5) * 50,
            rotate: (i) => (seeded(i, 7) - 0.5) * 24,
            scale: 0.72,
            filter: "grayscale(0)",
            duration: 1.2,
          }, 0.6)
          // 03 Piece — snap into the grid with gaps.
          .to(stepEls[1], { autoAlpha: 0, y: -30, duration: 0.4 }, 2)
          .to(stepEls[2], { autoAlpha: 1, y: 0, duration: 0.4 }, 2.2)
          .to(pieces, { x: 0, y: 0, rotate: 0, scale: 0.9, duration: 1.2, stagger: { each: 0.03, from: "random" }, ease: EASE }, 2)
          // 04 Quilt — gaps close, seams stitch, border appears.
          .to(stepEls[2], { autoAlpha: 0, y: -30, duration: 0.4 }, 3.4)
          .to(stepEls[3], { autoAlpha: 1, y: 0, duration: 0.4 }, 3.6)
          .to(pieces, { scale: 1, duration: 0.8 }, 3.4)
          .to("[data-border]", { autoAlpha: 1, scale: 1, duration: 0.8 }, 3.6)
          .to("[data-seam-mask]", { attr: { width: 400 }, duration: 1, ease: "none" }, 3.9)
          .to("[data-progress]", { scaleY: 1, ease: "none", duration: 4.9 }, 0);
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative mx-auto w-full max-w-[var(--content-max)] px-(--page-gutter) lg:h-svh">
      <div className="grid h-full items-center gap-10 rounded-[var(--card-radius)] bg-white p-[clamp(20px,4vw,56px)] lg:grid-cols-[0.8fr_1.2fr]">
        <div className="relative lg:h-[300px]">
          <span className="absolute top-0 -left-[clamp(10px,2vw,28px)] hidden h-full w-px bg-line lg:block">
            <span data-progress className="block h-full origin-top scale-y-0 bg-stitch" />
          </span>
          {steps.map((s, i) => (
            <div key={s.title} data-step className="mb-8 lg:absolute lg:inset-0 lg:mb-0">
              <span className="font-sans text-[12px] font-medium text-stitch tabular-nums">{pad2(i + 1)} / {pad2(steps.length)}</span>
              <h3 className="mt-2 mb-3 font-display text-[clamp(44px,5vw,80px)] leading-[0.9] font-medium uppercase">{s.title}</h3>
              <p className="m-0 max-w-[38ch] text-[14px] leading-[1.7] text-steel">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="relative mx-auto grid aspect-square w-full max-w-[min(560px,70vh)] place-items-center">
          <div data-border className="absolute -inset-3 rounded-[22px] bg-accent shadow-[0_24px_60px_rgb(15_112_120/0.25)]" />
          <div className="relative grid size-full grid-cols-4 overflow-visible rounded-[14px]">
            {Array.from({ length: CELLS }, (_, i) => (
              <div
                key={i}
                data-piece
                className="relative overflow-hidden shadow-[0_6px_14px_rgb(0_0_0/0.12)]"
                style={{
                  backgroundImage: `url(${fabrics[i % fabrics.length]})`,
                  backgroundSize: "320%",
                  backgroundPosition: `${Math.round(seeded(i, 8) * 100)}% ${Math.round(seeded(i, 9) * 100)}%`,
                }}
              />
            ))}
            <svg viewBox="0 0 400 400" className="pointer-events-none absolute inset-0 size-full" aria-hidden="true">
              <defs>
                <mask id="zw-seams">
                  <rect data-seam-mask x="0" y="0" width="400" height="400" fill="white" />
                </mask>
              </defs>
              <g mask="url(#zw-seams)" stroke="#fff" strokeWidth="2.2" strokeDasharray="7 6" strokeLinecap="round" fill="none">
                {Array.from({ length: COLS - 1 }, (_, i) => (
                  <path key={`v${i}`} d={`M${(i + 1) * 100} 4 V396`} />
                ))}
                {Array.from({ length: COLS - 1 }, (_, i) => (
                  <path key={`h${i}`} d={`M4 ${(i + 1) * 100} H396`} />
                ))}
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
