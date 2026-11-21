"use client";

import Image from "next/image";
import { useRef } from "react";
import { EASE, gsap, useGSAP } from "@/lib/gsap";
import { markIntroDone } from "@/lib/intro";

/**
 * First-visit-per-session intro: the logo patch is "stitched" in, a counter
 * runs, then the linen panel lifts to reveal the hero. Hidden before paint for
 * returning visitors and reduced motion (see the inline head script + CSS).
 */
export function Preloader() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const hidden = getComputedStyle(el).display === "none";
      if (hidden) {
        markIntroDone();
        return;
      }
      try {
        sessionStorage.setItem("sangam-intro", "1");
      } catch {
        /* private mode */
      }
      const counter = el.querySelector("[data-count]");
      const state = { n: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          el.style.display = "none";
          document.documentElement.dataset.intro = "seen";
        },
      });
      tl.from("[data-logo]", { scale: 0.6, rotate: -14, autoAlpha: 0, duration: 0.9, ease: "back.out(1.6)" })
        .fromTo("[data-ring]", { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.1, ease: "power2.inOut" }, 0.1)
        .from("[data-word]", { yPercent: 110, duration: 0.8, stagger: 0.06, ease: EASE }, 0.35)
        .to(state, {
          n: 100,
          duration: 1.2,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counter) counter.textContent = Math.round(state.n).toString().padStart(3, "0");
          },
        }, 0.1)
        .add(() => markIntroDone(), 1.35)
        .to(el, { clipPath: "inset(0 0 100% 0)", duration: 0.9, ease: "expo.inOut" }, 1.3)
        .to("[data-inner]", { yPercent: -30, autoAlpha: 0, duration: 0.6, ease: "power2.in" }, 1.25);
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="preloader linen fixed inset-0 z-[200] grid place-items-center" style={{ clipPath: "inset(0 0 0% 0)" }} aria-hidden="true">
      <div data-inner className="flex flex-col items-center">
        <div className="relative size-[132px]">
          <svg viewBox="0 0 140 140" className="absolute -inset-1 size-[140px] text-stitch">
            <circle data-ring cx="70" cy="70" r="66" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <span data-logo className="absolute inset-[6px] overflow-hidden rounded-full bg-white">
            <Image src="/brand/logo.jpg" alt="" fill sizes="132px" className="object-cover" priority />
          </span>
        </div>
        <div className="mt-6 flex gap-2 overflow-hidden font-display text-[13px] tracking-[0.4em] text-ink uppercase">
          {"Handmade with love".split(" ").map((w) => (
            <span key={w} data-word className="inline-block">{w}</span>
          ))}
        </div>
        <span data-count className="mt-3 font-sans text-[11px] font-medium text-muted tabular-nums">000</span>
      </div>
    </div>
  );
}
