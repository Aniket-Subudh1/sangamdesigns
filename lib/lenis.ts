"use client";

import type Lenis from "lenis";
import { useEffect } from "react";

let instance: Lenis | null = null;
let locks = 0;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}

/** Locks page scroll while an overlay (drawer, dialog, menu) is open. */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    locks += 1;
    instance?.stop();
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      locks = Math.max(0, locks - 1);
      if (locks === 0) {
        instance?.start();
        document.documentElement.style.overflow = previous;
      }
    };
  }, [active]);
}
