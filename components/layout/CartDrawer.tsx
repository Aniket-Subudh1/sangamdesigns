"use client";

import { ArrowRight, Minus, Plus, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ProductImage } from "@/components/ui/ProductImage";
import { formatPrice } from "@/lib/format";
import { EASE, gsap, useGSAP } from "@/lib/gsap";
import { useScrollLock } from "@/lib/lenis";
import { useStore } from "@/lib/store";
import { canvasCloseClass, inkCtaClass } from "@/lib/styles";

export function CartDrawer() {
  const { cart, isCartOpen, setCartOpen, removeFromCart, updateQuantity, subtotal, cartCount } = useStore();
  const panelRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLButtonElement>(null);
  useScrollLock(isCartOpen);

  useGSAP(
    () => {
      const panel = panelRef.current;
      const overlay = overlayRef.current;
      if (!panel || !overlay) return;
      if (isCartOpen) {
        gsap.to(overlay, { autoAlpha: 1, duration: 0.3 });
        gsap.to(panel, { x: 0, xPercent: 0, duration: 0.65, ease: EASE });
        gsap.fromTo(panel.querySelectorAll("[data-line]"), { x: 40, autoAlpha: 0 }, { x: 0, autoAlpha: 1, stagger: 0.05, delay: 0.15, duration: 0.6, ease: EASE });
      } else {
        gsap.to(overlay, { autoAlpha: 0, duration: 0.3 });
        gsap.to(panel, { x: 0, xPercent: 104, duration: 0.45, ease: "power3.in" });
      }
    },
    { dependencies: [isCartOpen] },
  );

  const remove = (slug: string, el: HTMLElement | null) => {
    if (!el) return removeFromCart(slug);
    gsap.to(el, { height: 0, autoAlpha: 0, paddingTop: 0, paddingBottom: 0, x: 30, duration: 0.4, ease: "power2.in", onComplete: () => removeFromCart(slug) });
  };

  return (
    <>
      <button
        ref={overlayRef}
        className="invisible fixed inset-0 z-[89] border-0 bg-black/40 opacity-0 backdrop-blur-[2px]"
        onClick={() => setCartOpen(false)}
        aria-label="Close bag"
        tabIndex={isCartOpen ? 0 : -1}
      />
      <aside
        ref={panelRef}
        className="fixed top-3 right-3 z-[90] flex h-[calc(100dvh-24px)] w-[min(440px,calc(100%-24px))] flex-col overflow-hidden rounded-[26px] bg-paper-warm text-charcoal shadow-[-20px_0_60px_rgb(0_0_0/0.18)]"
        style={{ transform: "translateX(104%)" }}
        aria-hidden={!isCartOpen}
        aria-label="Shopping bag"
        data-lenis-prevent
      >
        <div className="flex items-start justify-between border-b border-line bg-white p-7 max-[380px]:px-5">
          <div>
            <p className="m-0 mb-1 font-display text-[10px] tracking-[0.16em] text-muted uppercase">Your selection · {cartCount} {cartCount === 1 ? "piece" : "pieces"}</p>
            <h2 className="m-0 font-display text-[36px] leading-none font-medium tracking-[0.01em] uppercase">Your bag</h2>
          </div>
          <button className={canvasCloseClass} onClick={() => setCartOpen(false)} aria-label="Close bag" tabIndex={isCartOpen ? 0 : -1}>
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-7 py-3 max-[380px]:px-5">
          {cart.length ? (
            cart.map((line) => (
              <article key={line.slug} data-line className="grid grid-cols-[88px_1fr] gap-4 overflow-hidden border-b border-line py-4">
                <Link href={`/product/${line.slug}`} onClick={() => setCartOpen(false)} className="relative h-[104px] overflow-hidden rounded-[14px] bg-canvas" tabIndex={isCartOpen ? 0 : -1}>
                  <ProductImage src={line.image} alt={line.name} seed={line.slug} colors={[]} sizes="88px" placeholderLabel="" />
                </Link>
                <div className="min-w-0">
                  <p className="m-0 font-display text-[9px] tracking-[0.14em] text-muted uppercase">{line.sku} · {line.categoryName}</p>
                  <h3 className="mt-1 mb-1 font-display text-[15px] leading-[1.1] font-medium tracking-[0.02em] uppercase">{line.name}</h3>
                  <p className="mb-3 text-[12px] font-semibold tabular-nums">{formatPrice(line.price)}</p>
                  <div className="flex items-center justify-between">
                    <div className="inline-grid grid-cols-[30px_30px_30px] items-center overflow-hidden rounded-full border border-line bg-white">
                      <button className="grid h-7 place-items-center hover:bg-paper-warm" onClick={() => updateQuantity(line.slug, -1)} aria-label={`Decrease ${line.name}`} tabIndex={isCartOpen ? 0 : -1}>
                        <Minus size={11} />
                      </button>
                      <span key={line.quantity} className="text-center font-sans text-[11px] font-medium tabular-nums">{line.quantity}</span>
                      <button className="grid h-7 place-items-center hover:bg-paper-warm disabled:opacity-30" onClick={() => updateQuantity(line.slug, 1)} disabled={line.quantity >= line.stock} aria-label={`Increase ${line.name}`} tabIndex={isCartOpen ? 0 : -1}>
                        <Plus size={11} />
                      </button>
                    </div>
                    <button className="text-[10px] text-muted underline underline-offset-2 hover:text-stitch" onClick={(e) => remove(line.slug, e.currentTarget.closest("article"))} tabIndex={isCartOpen ? 0 : -1}>
                      Remove
                    </button>
                  </div>
                  {line.stock > 1 ? <p className="mt-2 text-[10px] text-muted">{line.stock} available</p> : null}
                </div>
              </article>
            ))
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center text-muted">
              <span className="stitch grid size-20 place-items-center rounded-full bg-white">
                <ShoppingBag size={26} />
              </span>
              <p className="max-w-[260px] font-display text-[26px] leading-[1.02] font-medium tracking-[0.01em] text-ink uppercase">Your bag is waiting for a story.</p>
              <Link href="/shop" onClick={() => setCartOpen(false)} className={inkCtaClass} tabIndex={isCartOpen ? 0 : -1}>
                Explore the shop <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>

        {cart.length > 0 ? (
          <div className="border-t border-line bg-white px-7 pt-5 pb-6 max-[380px]:px-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-display text-[15px] tracking-[0.05em] uppercase">Subtotal</span>
              <strong className="font-sans text-[16px] font-semibold tabular-nums">{formatPrice(subtotal)}</strong>
            </div>
            <MagneticButton className="block w-full" strength={0.15}>
              <Link href="/checkout" onClick={() => setCartOpen(false)} className={`${inkCtaClass} h-12 w-full`} tabIndex={isCartOpen ? 0 : -1}>
                Checkout <ArrowRight size={15} />
              </Link>
            </MagneticButton>
            <small className="mt-2 block text-center text-[10px] text-muted">Shipping is calculated at checkout.</small>
          </div>
        ) : null}
      </aside>
    </>
  );
}
