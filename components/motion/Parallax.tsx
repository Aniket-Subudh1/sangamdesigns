"use client";

import { type ReactNode, useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

/** Scrubbed vertical drift for images inside an overflow-hidden frame. */
export function Parallax({
  children,
  amount = 10,
  className = "",
  start = "top bottom",
}: {
  children: ReactNode;
  amount?: number;
  className?: string;
  start?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el?.parentElement) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          el,
          { yPercent: -amount / 2 },
          {
            yPercent: amount / 2,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement, start, end: "bottom top", scrub: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className={`absolute inset-x-0 -top-[8%] h-[116%] ${className}`}>
      {children}
    </div>
  );
}
