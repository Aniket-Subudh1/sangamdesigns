"use client";

import { type ReactNode, useRef, useState } from "react";
import { EASE, gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

let hasMounted = false;

/**
 * Route enter transition (used by app/template.tsx): a linen curtain with a
 * pink running stitch lifts away and the page rises in. Skipped on the very
 * first load, where the preloader runs instead.
 */
export function PageEnter({ children }: { children: ReactNode }) {
  const [withCurtain] = useState(() => hasMounted);
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      hasMounted = true;
      if (!withCurtain) return;
      const mm = gsap.matchMedia(ref);
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline();
        tl.fromTo("[data-curtain]", { clipPath: "inset(0 0 0% 0)" }, { clipPath: "inset(0 0 100% 0)", duration: 0.85, ease: "expo.inOut" })
          .fromTo("[data-page]", { y: 36, autoAlpha: 0.4 }, { y: 0, autoAlpha: 1, duration: 0.9, ease: EASE, clearProps: "transform,opacity,visibility" }, 0.25);
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref}>
      {withCurtain ? (
        <div data-curtain className="linen pointer-events-none fixed inset-0 z-[150] grid place-items-center motion-reduce:hidden" style={{ clipPath: "inset(0 0 100% 0)" }} aria-hidden="true">
          <svg viewBox="0 0 400 20" className="w-[min(320px,60vw)] text-stitch">
            <path d="M0 10 Q 100 2 200 10 T 400 10" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 8" strokeLinecap="round" />
          </svg>
        </div>
      ) : null}
      <div data-page>{children}</div>
    </div>
  );
}
