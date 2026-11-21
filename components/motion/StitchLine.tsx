"use client";

import { useId, useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

/**
 * A running-stitch divider (the logo's pink stitching). The stitches sew
 * themselves in from left to right as the line scrolls into view.
 */
export function StitchLine({ className = "", color = "var(--stitch)" }: { className?: string; color?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const id = `stitch-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const mask = el.querySelector("[data-mask]");
        gsap.fromTo(
          mask,
          { attr: { width: 0 } },
          {
            attr: { width: 1000 },
            duration: 1.6,
            ease: "power2.inOut",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <svg ref={ref} viewBox="0 0 1000 12" preserveAspectRatio="none" className={`block h-3 w-full ${className}`} aria-hidden="true">
      <defs>
        <mask id={id}>
          <rect data-mask x="0" y="0" width="1000" height="12" fill="white" />
        </mask>
      </defs>
      <path
        d="M0 6 Q 125 1 250 6 T 500 6 T 750 6 T 1000 6"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeDasharray="10 8"
        strokeLinecap="round"
        mask={`url(#${id})`}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
