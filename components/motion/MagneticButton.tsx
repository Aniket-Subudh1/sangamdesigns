"use client";

import { type PointerEvent, type ReactNode, useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

/** Nudges its child toward the cursor and springs back (mouse only). */
export function MagneticButton({
  children,
  className = "",
  strength = 0.35,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      xTo.current = gsap.quickTo(ref.current, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
      yTo.current = gsap.quickTo(ref.current, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
    },
    { scope: ref },
  );

  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || prefersReducedMotion()) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    xTo.current?.((event.clientX - rect.left - rect.width / 2) * strength);
    yTo.current?.((event.clientY - rect.top - rect.height / 2) * strength);
  };

  const reset = () => {
    xTo.current?.(0);
    yTo.current?.(0);
  };

  return (
    <div
      ref={ref}
      className={`inline-block will-change-transform ${className}`}
      onPointerMove={move}
      onPointerLeave={reset}
    >
      {children}
    </div>
  );
}
