"use client";

import { ArrowLeft, Check, Hand, MessageCircle, Minus, Plus, RotateCcw, Ruler, ShoppingBag, X, ZoomIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type PointerEvent, useEffect, useRef, useState } from "react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import { ProductCard } from "@/components/shop/ProductCard";
import { Accordion } from "@/components/ui/Accordion";
import { PatchworkPlaceholder } from "@/components/ui/PatchworkPlaceholder";
import { Price } from "@/components/ui/Price";
import { SwatchDot } from "@/components/ui/Swatches";
import { flyToCart } from "@/lib/fly-to-cart";
import { formatDimensions } from "@/lib/format";
import { EASE, Flip, gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useScrollLock } from "@/lib/lenis";
import { useStore } from "@/lib/store";
import { accentCtaClass, contentClass, inkCtaClass, kickerClass } from "@/lib/styles";
import type { Product, ProductSummary, SiteContent } from "@/lib/types";

const trustItems = [
  { icon: Hand, label: "Handcrafted" },
  { icon: Ruler, label: "Any size on request" },
  { icon: MessageCircle, label: "Quick replies on Instagram" },
];

function ZoomImage({ src, alt, priority }: { src: string; alt: string; priority?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || prefersReducedMotion()) return;
    const img = ref.current?.querySelector("img");
    const rect = ref.current?.getBoundingClientRect();
    if (!img || !rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    gsap.to(img, { scale: 1.8, transformOrigin: `${x}% ${y}%`, duration: 0.5, ease: "power3.out" });
  };
  const leave = () => {
    const img = ref.current?.querySelector("img");
    if (img) gsap.to(img, { scale: 1, duration: 0.6, ease: EASE });
  };
  return (
    <div ref={ref} className="absolute inset-0" onPointerMove={move} onPointerLeave={leave}>
      <Image src={src} alt={alt} fill priority={priority} sizes="(max-width: 640px) 82vw, (max-width: 1024px) 50vw, 32vw" className="object-cover" />
    </div>
  );
}

function Lightbox({ images, index, name, onClose, onIndex }: { images: string[]; index: number | null; name: string; onClose: () => void; onIndex: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollLock(index !== null);
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % images.length);
      if (e.key === "ArrowLeft") onIndex((index - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, images.length, onClose, onIndex]);

  useGSAP(
    () => {
      if (index === null || !ref.current) return;
      const thumb = document.querySelector(`[data-thumb="${index}"]`);
      const frame = ref.current.querySelector("[data-frame]");
      gsap.fromTo(ref.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 });
      if (thumb && frame && !prefersReducedMotion()) {
        Flip.fit(frame, thumb, { scale: true });
        gsap.to(frame, { x: 0, y: 0, scaleX: 1, scaleY: 1, rotate: 0, duration: 0.75, ease: EASE });
      }
    },
    { dependencies: [index === null] },
  );

  if (index === null) return null;
  return (
    <div ref={ref} className="fixed inset-0 z-[130] grid place-items-center bg-[rgb(10_14_13/0.9)] p-[clamp(16px,4vw,60px)] backdrop-blur-[10px]" role="dialog" aria-modal="true" aria-label={`${name} photos`} onClick={onClose}>
      <button className="absolute top-5 right-5 z-[2] grid size-11 place-items-center rounded-full border border-white/40 bg-white/10 text-white transition-transform hover:rotate-90" onClick={onClose} aria-label="Close">
        <X />
      </button>
      <div data-frame className="relative aspect-[4/3] w-[min(92vw,calc(80vh*4/3))] overflow-hidden rounded-[22px]" onClick={(e) => e.stopPropagation()}>
        <Image key={images[index]} src={images[index]} alt={`${name}, photo ${index + 1}`} fill sizes="92vw" className="object-contain" />
      </div>
      <div className="absolute bottom-5 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
        {images.map((src, i) => (
          <button key={src} onClick={() => onIndex(i)} className={`h-1.5 rounded-full transition-all ${i === index ? "w-8 bg-white" : "w-3 bg-white/40"}`} aria-label={`Photo ${i + 1}`} />
        ))}
      </div>
    </div>
  );
}

export function ProductDetail({
  product,
  summary,
  siblings,
  related,
  site,
  categoryName,
}: {
  product: Product;
  summary: ProductSummary;
  siblings: Product[];
  related: ProductSummary[];
  site: SiteContent;
  categoryName: string;
}) {
  const { addToCart, openEnquiry, pushToast, setCartOpen, cart } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);
  const swatchWrap = useRef<HTMLDivElement>(null);
  const purchasable = product.price !== null && product.status === "available";
  const inBag = cart.find((l) => l.slug === product.slug)?.quantity ?? 0;
  const remaining = Math.max(0, product.stock - inBag);
  const enquiryProduct = { slug: product.slug, name: product.name, skus: product.skus, image: product.images[0] ?? null };

  /* Variant swatch ring follows hover, rests on the current piece. */
  const moveRing = (el: HTMLElement | null) => {
    const ring = ringRef.current;
    if (!ring || !el) return;
    gsap.to(ring, { x: el.offsetLeft - 4, y: el.offsetTop - 4, duration: prefersReducedMotion() ? 0 : 0.45, ease: EASE });
  };
  useGSAP(() => {
    moveRing(swatchWrap.current?.querySelector<HTMLElement>("[data-current]") ?? null);
  }, { dependencies: [product.slug] });

  const handleAdd = () => {
    const ok = addToCart(summary, quantity);
    if (!ok) {
      pushToast({ title: "That's all we have", detail: `Only ${product.stock} available — already in your bag.` });
      return;
    }
    flyToCart(galleryRef.current?.querySelector<HTMLElement>("[data-thumb='0']") ?? null);
    setAdded(true);
    pushToast({ title: "Added to your bag", detail: product.name, image: product.images[0] ?? null, action: { label: "View bag", onClick: () => setCartOpen(true) } });
    window.setTimeout(() => setAdded(false), 1600);
  };

  const gallery = product.images.slice(0, 3);
  const details: [string, string][] = [
    ["Item code", product.skus.join(", ")],
    ...(product.dimensionsIn ? [["Size", formatDimensions(product.dimensionsIn)] as [string, string]] : []),
    ...(product.sizeLabel ? [["Bed size", product.sizeLabel] as [string, string]] : []),
    ...(product.setComposition ? [["Set", product.setComposition] as [string, string]] : []),
    ["Availability", product.status === "sold" ? "Sold — can be made to order" : product.stock > 1 ? `${product.stock} available` : "One piece available"],
  ];

  return (
    <div>
      <div className={`${contentClass} flex min-h-svh flex-col pt-[88px] pb-[clamp(58px,7vw,100px)] lg:h-svh lg:min-h-[640px] lg:overflow-hidden lg:pb-(--page-gutter)`}>
        <Link href={`/shop/${product.category}`} className="group mb-4 inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-line bg-white px-3.5 py-2 font-display text-[10px] font-medium tracking-[0.14em] text-muted uppercase transition-colors hover:border-ink hover:text-ink lg:mb-3 lg:py-1.5">
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" /> {categoryName}
        </Link>

        <div className="grid items-start gap-(--grid-gap) lg:min-h-0 lg:flex-1 lg:grid-cols-[minmax(0,1.18fr)_minmax(380px,0.82fr)] lg:items-stretch">
          <div ref={galleryRef} className="grid auto-cols-[82vw] grid-flow-col gap-(--grid-gap) overflow-x-auto overscroll-x-contain pb-1 no-scrollbar snap-x snap-mandatory sm:auto-cols-auto sm:grid-flow-row sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:h-full lg:min-h-0 lg:grid-rows-2 lg:overflow-hidden">
            {gallery.length ? (
              gallery.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  data-thumb={index}
                  onClick={() => setLightbox(index)}
                  className={`group relative aspect-[4/5] snap-start overflow-hidden rounded-[var(--card-radius)] bg-canvas text-left sm:cursor-zoom-in lg:h-full lg:min-h-0 lg:aspect-auto ${index === 0 && gallery.length < 3 ? "sm:row-span-2 sm:aspect-auto" : ""}`}
                  aria-label={`Open photo ${index + 1} of ${product.name}`}
                >
                  <ZoomImage src={src} alt={`${product.name}, photo ${index + 1}`} priority={index === 0} />
                  {index === 0 && product.status === "sold" ? <span className="absolute top-4 left-4 rounded-full bg-stitch px-3 py-1.5 font-display text-[9px] tracking-[0.14em] text-white uppercase">Sold</span> : null}
                  <span className="absolute right-4 bottom-4 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1.5 font-sans text-[9px] font-medium text-white tabular-nums backdrop-blur">
                    <ZoomIn size={11} /> {String(index + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
                  </span>
                </button>
              ))
            ) : (
              <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--card-radius)] sm:row-span-2 sm:aspect-auto lg:h-full">
                <PatchworkPlaceholder seed={product.slug} colors={product.colors} label="Photo coming soon — ask us for pictures" />
              </div>
            )}
            {/* Maker's note fills the last cell of the 2×2 grid (gumana layout). */}
            <div className={`stitch flex aspect-[4/5] snap-start flex-col justify-between rounded-[var(--card-radius)] bg-mist p-[clamp(22px,3.5vw,44px)] lg:h-full lg:min-h-0 lg:aspect-auto lg:p-6 ${gallery.length <= 1 ? "sm:row-span-2 sm:aspect-auto" : ""}`}>
                <span className="font-sans text-[10px] font-medium text-muted tabular-nums">{product.skus[0]} / Maker&apos;s note</span>
                <div>
                  <p className="m-0 font-display text-[clamp(26px,3.2vw,44px)] leading-[0.96] font-medium uppercase lg:text-[clamp(22px,2.3vw,34px)]">
                    {product.status === "sold" ? "Loved, and sent home." : "Made once. Made by hand."}
                  </p>
                  <p className="mt-3 mb-0 text-[12px] leading-[1.65] text-steel lg:line-clamp-3">
                    {product.patterns.length ? `${product.patterns.join(" · ")}. ` : ""}Each piece is handcrafted, so colours and measurements can vary slightly.
                  </p>
                </div>
                <span className="font-script text-[24px] leading-none text-stitch">Sangam Designs</span>
            </div>
          </div>

          <Reveal className="pdp-buy-panel flex flex-col rounded-[var(--card-radius)] bg-white p-[clamp(24px,4vw,48px)] lg:h-full lg:min-h-0 lg:overflow-y-auto lg:p-[clamp(18px,2vw,30px)] lg:no-scrollbar" data-lenis-prevent>
            <div className="flex items-center justify-between gap-4">
              <p className={kickerClass}>{categoryName}</p>
              <span className="font-sans text-[10px] font-medium text-muted tabular-nums">{product.skus.join(" · ")}</span>
            </div>
            <h1 className="pdp-title m-0 mt-5 mb-3 max-w-[16ch] font-display text-[clamp(36px,4.4vw,60px)] leading-[0.92] font-medium tracking-[0.01em] text-ink uppercase lg:mt-3 lg:mb-2 lg:text-[clamp(30px,3vw,48px)]">{product.name}</h1>
            <Price product={product} className={product.price !== null && product.status !== "sold" ? "mb-5 text-[22px] lg:mb-3 lg:text-[20px]" : "mb-5 text-[13px] lg:mb-3"} />
            <p className="pdp-description mb-6 max-w-[48ch] text-[13px] leading-[1.7] text-steel lg:mb-4 lg:text-[12px] lg:leading-[1.6]">{product.description}</p>

            <div className="mb-6 lg:mb-4">
              <p className="mb-2.5 font-display text-[10px] tracking-[0.16em] text-muted uppercase">Colours — {product.colors.map((c) => c.name).join(", ")}</p>
              <div className="flex flex-wrap items-center gap-1.5">
                {product.colors.map((c) => (
                  <SwatchDot key={c.name} swatch={c} className="size-6" />
                ))}
              </div>
            </div>

            {siblings.length > 1 ? (
              <div className="mb-6 lg:mb-4">
                <p className="mb-2.5 font-display text-[10px] tracking-[0.16em] text-muted uppercase">Also made in — {product.variantLabel}</p>
                <div ref={swatchWrap} className="relative flex flex-wrap gap-3" onMouseLeave={() => moveRing(swatchWrap.current?.querySelector<HTMLElement>("[data-current]") ?? null)}>
                  <span ref={ringRef} className="pointer-events-none absolute top-0 left-0 size-[52px] rounded-[14px] border-2 border-ink" aria-hidden="true" />
                  {siblings.map((s) => {
                    const current = s.slug === product.slug;
                    return (
                      <Link
                        key={s.slug}
                        href={`/product/${s.slug}`}
                        data-current={current ? "" : undefined}
                        onMouseEnter={(e) => moveRing(e.currentTarget)}
                        onFocus={(e) => moveRing(e.currentTarget)}
                        aria-current={current ? "page" : undefined}
                        title={`${s.variantLabel}${s.status === "sold" ? " (sold)" : ""}`}
                        className="group relative block size-11 overflow-hidden rounded-[10px] bg-canvas"
                      >
                        {s.images[0] ? <Image src={s.images[0]} alt={s.variantLabel ?? s.name} fill sizes="44px" className="object-cover" /> : <span className="absolute inset-0" style={{ background: s.colors[0]?.value }} />}
                        {s.status === "sold" ? <span className="absolute inset-0 grid place-items-center bg-white/55 font-display text-[8px] tracking-[0.1em] uppercase">Sold</span> : null}
                        <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-ink/85 py-0.5 text-center font-display text-[7px] tracking-[0.08em] text-white uppercase transition-transform duration-300 group-hover:translate-y-0">{s.variantLabel}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : null}

            <dl className="mb-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 rounded-[16px] bg-paper-warm p-4 text-[12px] lg:mb-4 lg:gap-y-1.5 lg:p-3 lg:text-[11px]">
              {details.map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="font-display text-[10px] tracking-[0.14em] text-muted uppercase">{k}</dt>
                  <dd className="m-0 text-ink tabular-nums">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mb-6 flex flex-wrap items-center gap-3 lg:mb-4">
              {purchasable ? (
                <>
                  {product.stock > 1 ? (
                    <div className="inline-grid h-12 grid-cols-[36px_36px_36px] items-center overflow-hidden rounded-full border border-line bg-paper-warm lg:h-11">
                      <button type="button" className="grid h-full place-items-center disabled:opacity-30" onClick={() => setQuantity((v) => Math.max(1, v - 1))} disabled={quantity <= 1} aria-label="Decrease quantity">
                        <Minus size={13} />
                      </button>
                      <span className="text-center font-sans text-[13px] font-medium tabular-nums">{quantity}</span>
                      <button type="button" className="grid h-full place-items-center disabled:opacity-30" onClick={() => setQuantity((v) => Math.min(remaining || 1, v + 1))} disabled={quantity >= remaining} aria-label="Increase quantity">
                        <Plus size={13} />
                      </button>
                    </div>
                  ) : null}
                  <MagneticButton className="min-w-[200px] flex-1" strength={0.2}>
                    <button type="button" onClick={handleAdd} disabled={remaining === 0} className={`${inkCtaClass} h-12 w-full lg:h-11`}>
                      {added ? <Check size={16} /> : <ShoppingBag size={15} />}
                      {remaining === 0 ? "All in your bag" : added ? "Added to bag" : "Add to bag"}
                    </button>
                  </MagneticButton>
                </>
              ) : (
                <MagneticButton className="min-w-[200px] flex-1" strength={0.2}>
                  <button type="button" onClick={() => openEnquiry({ kind: product.status === "sold" ? "similar" : "price", product: enquiryProduct })} className={`${accentCtaClass} h-12 w-full lg:h-11`}>
                    {product.status === "sold" ? <RotateCcw size={15} /> : <MessageCircle size={15} />}
                    {product.status === "sold" ? "Request a similar piece" : "Enquire for price"}
                  </button>
                </MagneticButton>
              )}
              <button type="button" onClick={() => openEnquiry({ kind: "general", product: enquiryProduct })} className="font-display text-[10px] tracking-[0.14em] text-muted uppercase underline-offset-4 hover:text-ink hover:underline">
                Ask a question
              </button>
            </div>

            <div className="mb-5 grid grid-cols-3 gap-1 rounded-[16px] bg-paper-warm p-1.5 lg:mb-3">
              {trustItems.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center justify-center gap-1.5 px-1 py-2.5 text-center">
                  <Icon size={15} className="text-accent" />
                  <span className="text-[9px] leading-tight font-medium tracking-[0.04em] text-muted uppercase">{label}</span>
                </div>
              ))}
            </div>

            <div className="mt-auto">
              <Accordion
                compact
                defaultOpen={null}
                items={[
                  { title: "Details", content: <p className="m-0">{product.description} {product.patterns.length ? `Patterns: ${product.patterns.join(", ")}.` : ""}</p> },
                  { title: "Size & made-to-order", content: <p className="m-0">{product.dimensionsIn ? `Measures ${formatDimensions(product.dimensionsIn)}. ` : ""}Handmade pieces can vary slightly. Want it in another size or colourway? We make pieces in any size on request — just ask.</p> },
                  { title: "Care", content: <p className="m-0">Wash gently in cold water, separately for the first wash. Dry in shade and iron on the reverse.</p> },
                  { title: "Questions", content: <p className="m-0">Message us on Instagram <a className="underline" href={site.instagramUrl} target="_blank" rel="noreferrer">@{site.instagramHandle}</a> or email <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>, quoting {product.skus[0]}.</p> },
                ]}
              />
            </div>
          </Reveal>
        </div>
      </div>

      <Lightbox images={gallery} index={lightbox} name={product.name} onClose={() => setLightbox(null)} onIndex={setLightbox} />

      {related.length ? <RelatedProducts related={related} /> : null}
    </div>
  );
}

function RelatedProducts({ related }: { related: ProductSummary[] }) {
  return (
    <section className={`${contentClass} border-t border-line py-(--section-space)`}>
      <Reveal className="mb-9 flex items-end justify-between gap-5">
        <div>
          <p className={`${kickerClass} mb-4`}>Keep exploring</p>
          <h2 className="m-0 font-display text-[clamp(40px,5vw,68px)] leading-[0.94] font-medium uppercase">You may also love</h2>
        </div>
        <Link href="/shop" className="hidden font-display text-[10px] tracking-[0.15em] text-muted uppercase hover:text-ink sm:block">Shop all →</Link>
      </Reveal>
      <Reveal stagger={0.07} className="grid grid-cols-2 gap-(--grid-gap) lg:grid-cols-4">
        {related.map((p) => (
          <div key={p.slug} data-reveal-item>
            <ProductCard product={p} />
          </div>
        ))}
      </Reveal>
    </section>
  );
}
