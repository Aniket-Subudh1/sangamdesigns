"use client";

import { Fragment, useRef } from "react";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

/** Infinite craft-word strip; speeds up and flips direction with scroll velocity. */
export function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = ref.current?.querySelector<HTMLElement>("[data-track]");
      if (!track) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const loop = gsap.to(track, { xPercent: -50, ease: "none", duration: 38, repeat: -1 });
        let direction = 1;
        const st = ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate(self) {
            if (self.direction !== direction) direction = self.direction;
            const boost = Math.min(Math.abs(self.getVelocity()) / 260, 6);
            gsap.to(loop, { timeScale: direction * (1 + boost), duration: 0.25, overwrite: true });
            gsap.to(loop, { timeScale: direction, duration: 1.2, delay: 0.25, overwrite: false });
          },
        });
        return () => st.kill();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  const row = (
    <span className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <Fragment key={item}>
          <span className="px-[clamp(14px,2vw,28px)] font-display text-[clamp(22px,3.2vw,46px)] font-medium tracking-[0.02em] uppercase">
            {item}
          </span>
          <svg viewBox="0 0 24 24" className={`size-[clamp(14px,1.6vw,22px)] shrink-0 ${i % 3 === 0 ? "text-stitch" : i % 3 === 1 ? "text-accent-bright" : "text-olive"}`} aria-hidden="true">
            <path d="M12 2c1.2 4.6 3.4 6.8 8 8-4.6 1.2-6.8 3.4-8 8-1.2-4.6-3.4-6.8-8-8 4.6-1.2 6.8-3.4 8-8Z" fill="currentColor" />
          </svg>
        </Fragment>
      ))}
    </span>
  );

  return (
    <div ref={ref} className={`overflow-hidden ${className}`} aria-label={items.join(", ")}>
      <div data-track className="flex w-max" aria-hidden="true">
        {row}
        {row}
      </div>
    </div>
  );
}
