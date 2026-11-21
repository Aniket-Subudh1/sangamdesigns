"use client";

import { ArrowRight, Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Price } from "@/components/ui/Price";
import { ProductImage } from "@/components/ui/ProductImage";
import { EASE, gsap, useGSAP } from "@/lib/gsap";
import type { ProductSummary } from "@/lib/types";

const quickPatterns = ["Log Cabin", "Ajrakh", "Butterflies", "Houses", "Fans", "Madhubani", "Kalamkari", "Umbrellas"];

export function searchProducts(index: ProductSummary[], query: string) {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return index.filter((p) => {
    const haystack = `${p.name} ${p.skus.join(" ")} ${p.categoryName} ${p.patterns.join(" ")} ${p.colors.map((c) => c.name).join(" ")}`.toLowerCase();
    return terms.every((t) => haystack.includes(t));
  });
}

export function SearchOverlay({
  index,
  open,
  onClose,
  compact,
}: {
  index: ProductSummary[];
  open: boolean;
  onClose: () => void;
  compact: boolean;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => searchProducts(index, query), [index, query]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!panel) return;
      if (open) {
        gsap.set(panel, { display: "block" });
        gsap.fromTo(panel, { autoAlpha: 0, y: -12 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: EASE });
      } else {
        gsap.to(panel, { autoAlpha: 0, y: -8, duration: 0.22, ease: "power2.in", onComplete: () => { gsap.set(panel, { display: "none" }); } });
      }
    },
    { dependencies: [open] },
  );

  useGSAP(
    () => {
      const items = panelRef.current?.querySelectorAll("[data-result]");
      if (items?.length) gsap.fromTo(items, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, stagger: 0.03, duration: 0.45, ease: EASE });
    },
    { dependencies: [query] },
  );

  const submit = () => {
    if (!query.trim()) return;
    router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
    onClose();
  };

  return (
    <div
      ref={panelRef}
      className={`mx-auto mt-2 rounded-[14px] border border-black/6 bg-white/96 p-3 shadow-[0_24px_60px_rgb(21_22_18/0.14)] backdrop-blur-xl transition-[max-width] duration-500 ease-store sm:p-4 ${compact ? "max-w-[1180px]" : "max-w-[var(--content-max)]"}`}
      style={{ display: "none" }}
      role="dialog"
      aria-label="Search products"
      data-lenis-prevent
    >
      <form
        className="flex h-14 items-center gap-3 rounded-[10px] bg-paper-warm px-4"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <Search size={16} className="shrink-0 text-muted" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search quilts, Ajrakh, butterflies, BE25…"
          aria-label="Search products"
          className="min-w-0 flex-1 border-0 bg-transparent text-[15px] outline-none placeholder:text-muted/70"
        />
        {query ? (
          <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="grid size-7 place-items-center rounded-full text-muted hover:bg-white">
            <X size={14} />
          </button>
        ) : (
          <kbd className="hidden rounded-[6px] border border-line bg-white px-1.5 py-0.5 font-sans text-[10px] text-muted sm:block">⌘K</kbd>
        )}
      </form>

      {!query ? (
        <div className="flex flex-wrap items-center gap-1.5 px-1 pt-3">
          <span className="mr-1 font-display text-[10px] tracking-[0.16em] text-muted uppercase">Try</span>
          {quickPatterns.map((p) => (
            <button key={p} type="button" onClick={() => setQuery(p)} className="rounded-full border border-line bg-white px-3 py-1.5 text-[11px] text-steel transition-colors hover:border-ink hover:text-ink">
              {p}
            </button>
          ))}
        </div>
      ) : results.length ? (
        <div className="max-h-[min(60vh,520px)] overflow-y-auto pt-3">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {results.slice(0, 8).map((p) => (
              <Link key={p.slug} href={`/product/${p.slug}`} onClick={onClose} data-result className="group flex items-center gap-3 rounded-[12px] p-2 transition-colors hover:bg-paper-warm">
                <span className="relative size-14 shrink-0 overflow-hidden rounded-[10px] bg-canvas">
                  <ProductImage src={p.image} alt="" seed={p.slug} colors={p.colors} sizes="56px" placeholderLabel="" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[12px] font-medium text-ink">{p.name}</span>
                  <span className="block text-[10px] text-muted">{p.skus[0]} · {p.categoryName}</span>
                  <Price product={p} className="text-[11px]" />
                </span>
              </Link>
            ))}
          </div>
          <button type="button" onClick={submit} className="group mt-2 flex w-full items-center justify-between rounded-[10px] bg-ink px-4 py-3 font-display text-[11px] tracking-[0.14em] text-white uppercase">
            See all {results.length} results
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      ) : (
        <p className="px-2 pt-4 pb-2 text-[12px] text-muted">
          No pieces match “{query}”. Try a pattern like <button type="button" className="underline" onClick={() => setQuery("Log Cabin")}>Log Cabin</button>.
        </p>
      )}
    </div>
  );
}
