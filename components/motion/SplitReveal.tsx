"use client";

import { type ElementType, type ReactNode, useRef } from "react";
import { onIntroDone } from "@/lib/intro";
import { EASE, gsap, MOTION_OK, SplitText, useGSAP } from "@/lib/gsap";

/**
 * Masked line-by-line headline reveal (GSAP SplitText) — the gumana
 * "lineReveal" effect. `mode="intro"` waits for the preloader instead of
 * scroll position.
 */
export function SplitReveal({
  as,
  children,
  className,
  delay = 0,
  mode = "scroll",
  type = "lines",
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  mode?: "scroll" | "intro";
  type?: "lines" | "words";
}) {
  const Tag = (as ?? "h2") as ElementType;
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        let cancelled = false;
        let split: SplitText | null = null;
        const run = () => {
          if (cancelled) return;
          split = SplitText.create(el, {
            type,
            mask: type,
            autoSplit: true,
            linesClass: "split-line",
            onSplit(self) {
              gsap.set(el, { visibility: "visible" });
              el.setAttribute("data-revealed", "");
              const targets = type === "lines" ? self.lines : self.words;
              return gsap.from(targets, {
                yPercent: 112,
                rotate: 2,
                duration: 1.05,
                delay,
                stagger: type === "lines" ? 0.09 : 0.045,
                ease: EASE,
                scrollTrigger:
                  mode === "scroll"
                    ? { trigger: el, start: "top 90%", once: true }
                    : undefined,
              });
            },
          });
        };
        if (mode === "intro") onIntroDone(() => document.fonts.ready.then(run));
        else document.fonts.ready.then(run);
        return () => {
          cancelled = true;
          split?.revert();
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} data-split="" className={className}>
      {children}
    </Tag>
  );
}
