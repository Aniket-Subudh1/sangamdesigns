"use client";

import { gsap, prefersReducedMotion } from "./gsap";

/**
 * Arcs a copy of the product image into the header bag icon, then bumps the
 * icon. The bag icon is located by [data-cart-target].
 */
export function flyToCart(source: HTMLElement | null) {
  const target = document.querySelector<HTMLElement>("[data-cart-target]");
  if (!target) return;

  const bump = () =>
    gsap.fromTo(
      target,
      { scale: 1.28 },
      { scale: 1, duration: 0.7, ease: "elastic.out(1.1, 0.45)" },
    );

  if (!source || prefersReducedMotion()) {
    if (!prefersReducedMotion()) bump();
    return;
  }

  const from = source.getBoundingClientRect();
  const to = target.getBoundingClientRect();
  const img = source.querySelector("img");
  const ghost = document.createElement("div");
  const size = Math.min(from.width, from.height, 180);
  Object.assign(ghost.style, {
    position: "fixed",
    left: `${from.left + from.width / 2 - size / 2}px`,
    top: `${from.top + from.height / 2 - size / 2}px`,
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "999px",
    overflow: "hidden",
    zIndex: "200",
    pointerEvents: "none",
    boxShadow: "0 18px 40px rgb(0 0 0 / 0.22)",
    background: img ? `center / cover no-repeat url("${img.currentSrc || img.src}")` : "var(--accent)",
  });
  document.body.appendChild(ghost);

  const dx = to.left + to.width / 2 - (from.left + from.width / 2);
  const dy = to.top + to.height / 2 - (from.top + from.height / 2);

  const tl = gsap.timeline({
    onComplete: () => {
      ghost.remove();
      bump();
    },
  });
  tl.fromTo(ghost, { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.22, ease: "power2.out" })
    .to(ghost, { x: dx, duration: 0.75, ease: "power1.inOut" }, 0.18)
    .to(ghost, { y: dy, duration: 0.75, ease: "back.in(1.6)" }, 0.18)
    .to(ghost, { scale: 0.12, duration: 0.75, ease: "power2.in" }, 0.18)
    .to(ghost, { opacity: 0.2, duration: 0.15 }, 0.8);
}
