"use client";

/* Coordinates the first-visit preloader with hero entrance animations. */
let done = false;
const listeners = new Set<() => void>();

export function markIntroDone() {
  if (done) return;
  done = true;
  const pending = [...listeners];
  listeners.clear();
  // Run outside the caller's GSAP context (timeline callbacks inherit the
  // creating context, which would scope selector text to the preloader).
  queueMicrotask(() => pending.forEach((fn) => fn()));
}

export function onIntroDone(fn: () => void) {
  if (done || document.documentElement.dataset.intro === "seen") {
    done = true;
    fn();
    return;
  }
  listeners.add(fn);
}
