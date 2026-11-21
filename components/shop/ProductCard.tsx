"use client";

import { MessageCircle, Plus, RotateCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type MouseEvent, type PointerEvent, useRef } from "react";
import { Price } from "@/components/ui/Price";
import { PatchworkPlaceholder } from "@/components/ui/PatchworkPlaceholder";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Swatches } from "@/components/ui/Swatches";
import { flyToCart } from "@/lib/fly-to-cart";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useStore } from "@/lib/store";
import type { ProductSummary } from "@/lib/types";

export function ProductCard({
  product,
  sizes = "(max-width: 767px) 50vw, (max-width: 1279px) 33vw, 25vw",
  priority = false,
}: {
  product: ProductSummary;
  sizes?: string;
  priority?: boolean;
}) {
  const { addToCart, openEnquiry, pushToast, setCartOpen } = useStore();
  const mediaRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLSpanElement>(null);
  const chipX = useRef<gsap.QuickToFunc | null>(null);
  const chipY = useRef<gsap.QuickToFunc | null>(null);
  const href = `/product/${product.slug}`;
  const purchasable = product.price !== null && product.status === "available";

  useGSAP(
    () => {
      if (!chipRef.current) return;
      chipX.current = gsap.quickTo(chipRef.current, "x", { duration: 0.45, ease: "power3.out" });
      chipY.current = gsap.quickTo(chipRef.current, "y", { duration: 0.45, ease: "power3.out" });
    },
    { scope: mediaRef },
  );

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || prefersReducedMotion()) return;
    const rect = mediaRef.current?.getBoundingClientRect();
    if (!rect) return;
    chipX.current?.(e.clientX - rect.left);
    chipY.current?.(e.clientY - rect.top);
  };
  const onEnter = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || prefersReducedMotion()) return;
    const rect = mediaRef.current?.getBoundingClientRect();
    if (rect && chipRef.current) gsap.set(chipRef.current, { x: e.clientX - rect.left, y: e.clientY - rect.top });
    gsap.to(chipRef.current, { scale: 1, autoAlpha: 1, duration: 0.35, ease: "back.out(2)" });
  };
  const onLeave = () => {
    gsap.to(chipRef.current, { scale: 0.4, autoAlpha: 0, duration: 0.25 });
  };

  const action = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const enquiryProduct = { slug: product.slug, name: product.name, skus: product.skus, image: product.image };
    if (product.status === "sold") return openEnquiry({ kind: "similar", product: enquiryProduct });
    if (product.price === null) return openEnquiry({ kind: "price", product: enquiryProduct });
    const ok = addToCart(product);
    if (!ok) {
      pushToast({ title: "That's all we have", detail: `Only ${product.stock} of this piece available.` });
      return;
    }
    flyToCart(mediaRef.current);
    pushToast({ title: "Added to your bag", detail: product.name, image: product.image, action: { label: "View bag", onClick: () => setCartOpen(true) } });
    gsap.fromTo(e.currentTarget, { scale: 0.86 }, { scale: 1, duration: 0.5, ease: "back.out(3)" });
  };

  const ActionIcon = product.status === "sold" ? RotateCcw : purchasable ? Plus : MessageCircle;
  const actionLabel = product.status === "sold" ? "Request similar" : purchasable ? "Add" : "Enquire";

  return (
    <article className="group relative min-w-0 rounded-[20px] bg-white p-2.5 shadow-[0_1px_0_rgb(17_18_15/0.06)] transition-[transform,box-shadow] duration-300 ease-store hover:-translate-y-1 hover:shadow-[0_18px_45px_rgb(17_18_15/0.1)]">
      <div
        ref={mediaRef}
        className="relative aspect-[4/5] overflow-hidden rounded-[15px] bg-canvas sm:cursor-none"
        onPointerMove={onMove}
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
      >
        {product.image ? (
          <>
            <Image
              src={product.image}
              alt={`${product.name} — Sangam Designs`}
              fill
              sizes={sizes}
              priority={priority}
              className={`object-cover transition-[transform,opacity] duration-[700ms] ease-store group-hover:scale-[1.05] ${product.hoverImage ? "group-hover:opacity-0" : ""} ${product.status === "sold" ? "saturate-[0.65]" : ""}`}
            />
            {product.hoverImage ? (
              <Image src={product.hoverImage} alt="" fill sizes={sizes} className="scale-[1.08] object-cover opacity-0 transition-[transform,opacity] duration-[700ms] ease-store group-hover:scale-100 group-hover:opacity-100" />
            ) : null}
          </>
        ) : (
          <PatchworkPlaceholder seed={product.slug} colors={product.colors} />
        )}
        <Link href={href} className="absolute inset-0 z-[1]" aria-label={`View ${product.name}`} />
        <StatusBadge product={product} className="absolute top-3 left-3 z-[2]" />
        <span className="pointer-events-none absolute top-3 right-3 z-[2] rounded-full bg-black/35 px-2 py-1 font-sans text-[9px] font-medium text-white tabular-nums backdrop-blur">
          {product.skus[0]}
        </span>
        <span
          ref={chipRef}
          className="pointer-events-none absolute top-0 left-0 z-[3] -mt-7 -ml-7 hidden size-14 place-items-center rounded-full bg-white/95 font-display text-[10px] tracking-[0.14em] text-ink uppercase shadow-[0_8px_24px_rgb(0_0_0/0.18)] sm:grid"
          style={{ visibility: "hidden", opacity: 0, transform: "scale(0.4)" }}
          aria-hidden="true"
        >
          View
        </span>
        <button
          type="button"
          onClick={action}
          aria-label={`${actionLabel}: ${product.name}`}
          className={`absolute right-3 bottom-3 z-[4] inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full border px-3 font-display text-[10px] font-medium tracking-[0.12em] uppercase backdrop-blur-sm transition-[opacity,transform,background-color,color] duration-300 ease-store sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:focus-visible:translate-y-0 sm:focus-visible:opacity-100 ${
            purchasable ? "border-white/70 bg-white/92 text-ink hover:bg-ink hover:text-white" : "border-accent/20 bg-white/92 text-accent hover:bg-accent hover:text-white"
          }`}
        >
          <ActionIcon size={13} />
          {actionLabel}
        </button>
      </div>
      <Link href={href} className="@container block px-1 pt-4 pb-1.5">
        <div className="mb-1 flex flex-col gap-1.5 @min-[340px]:flex-row @min-[340px]:items-start @min-[340px]:justify-between @min-[340px]:gap-3">
          <h3 className="m-0 line-clamp-2 font-display text-[14px] leading-[1.08] font-medium tracking-[0.02em] text-ink uppercase @min-[220px]:text-[16px]">{product.name}</h3>
          <Price product={product} className="shrink-0 text-[12px] @min-[220px]:text-[13px] @min-[340px]:pt-0.5 @min-[340px]:text-right" />
        </div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="truncate font-display text-[9px] tracking-[0.14em] text-muted uppercase">{product.categoryName}</span>
          <Swatches colors={product.colors} />
        </div>
      </Link>
    </article>
  );
}
