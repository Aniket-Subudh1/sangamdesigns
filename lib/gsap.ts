"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, Flip, DrawSVGPlugin);
  gsap.defaults({ ease: "expo.out", duration: 0.8 });
}

/** Mirrors the CSS --ease-store curve (cubic-bezier(.22,1,.36,1)). */
export const EASE = "expo.out";
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia(REDUCED_MOTION).matches
  );
}

export { DrawSVGPlugin, Flip, gsap, ScrollTrigger, SplitText, useGSAP };
