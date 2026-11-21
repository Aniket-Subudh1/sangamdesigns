"use client";

import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
  useRef,
} from "react";
import { EASE, gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

type RevealProps<T extends ElementType> = {
  as?: T;
  delay?: number;
  y?: number;
  /** Reveal direct children with [data-reveal-item] in a stagger instead of the whole element. */
  stagger?: number;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children">;

/**
 * Scroll-triggered fade-up (GSAP port of gumana's framer Reveal). Content
 * stays visible without JS or with reduced motion.
 */
export function Reveal<T extends ElementType = "div">({
  as,
  delay = 0,
  y = 28,
  stagger,
  children,
  ...rest
}: RevealProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const items = stagger
          ? gsap.utils.toArray<HTMLElement>(el.querySelectorAll(":scope [data-reveal-item]"))
          : [];
        if (stagger && items.length) {
          gsap.set(el, { autoAlpha: 1 });
          gsap.fromTo(
            items,
            { autoAlpha: 0, y },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              delay,
              ease: EASE,
              stagger,
              clearProps: "transform",
              scrollTrigger: { trigger: el, start: "top 86%", once: true },
            },
          );
        } else {
          gsap.fromTo(
            el,
            { autoAlpha: 0, y },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.95,
              delay,
              ease: EASE,
              clearProps: "transform",
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            },
          );
        }
        el.setAttribute("data-revealed", "");
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} data-reveal="" {...rest}>
      {children}
    </Tag>
  );
}
