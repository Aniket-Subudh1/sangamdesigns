"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ProductCard } from "@/components/shop/ProductCard";
import { SwatchDot } from "@/components/ui/Swatches";
import { EASE, Flip, gsap, MOTION_OK, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { chipClass } from "@/lib/styles";
import type { ProductSummary, Swatch } from "@/lib/types";

export type GridChip = { label: string; value: string; field: "category" | "rootCategory" };

type Availability = "all" | "available" | "priced" | "on-request" | "sold";
type Sort = "featured" | "price-asc" | "price-desc" | "name";

const availabilityOptions: { value: Availability; label: string }[] = [
  { value: "all", label: "All pieces" },
  { value: "available", label: "Available" },
  { value: "priced", label: "Buy online" },
  { value: "on-request", label: "Price on request" },
  { value: "sold", label: "Sold" },
];

const sortOptions: { value: Sort; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name", label: "Name A–Z" },
];

function matchesQuery(p: ProductSummary, query: string) {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return true;
  const haystack = `${p.name} ${p.skus.join(" ")} ${p.categoryName} ${p.patterns.join(" ")} ${p.colors.map((c) => c.name).join(" ")}`.toLowerCase();
  return terms.every((t) => haystack.includes(t));
}

export function ProductGrid({
  products,
  chips = [],
  toolbar = false,
  limit,
  columns = "grid-cols-2 md:grid-cols-3 xl:grid-cols-4",
  emptyLabel = "No pieces match these filters.",
}: {
  products: ProductSummary[];
  chips?: GridChip[];
  toolbar?: boolean;
  limit?: number;
  columns?: string;
  emptyLabel?: string;
}) {
  const [chip, setChip] = useState("all");
  const [query, setQuery] = useState("");
  const [color, setColor] = useState<string | null>(null);
  const [availability, setAvailability] = useState<Availability>("all");
  const [sort, setSort] = useState<Sort>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const interacted = useRef(false);

  /* ?q= from the header search's "See all results". */
  useEffect(() => {
    if (!toolbar) return;
    const q = new URLSearchParams(window.location.search).get("q");
    // Syncing from an external source (the URL) after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (q) setQuery(q);
  }, [toolbar]);

  const colorOptions = useMemo(() => {
    const map = new Map<string, Swatch>();
    products.forEach((p) => p.colors.forEach((c) => map.set(c.name, c)));
    return [...map.values()].filter((c) => c.name !== "Multicoloured").slice(0, 18);
  }, [products]);

  const chipField = chips[0]?.field;

  const visible = useMemo(() => {
    const set = new Set<string>();
    for (const p of products) {
      if (chip !== "all" && chipField && p[chipField] !== chip) continue;
      if (!matchesQuery(p, query)) continue;
      if (color && !p.colors.some((c) => c.name === color)) continue;
      if (availability === "available" && p.status !== "available") continue;
      if (availability === "priced" && (p.price === null || p.status !== "available")) continue;
      if (availability === "on-request" && (p.price !== null || p.status !== "available")) continue;
      if (availability === "sold" && p.status !== "sold") continue;
      set.add(p.slug);
    }
    return set;
  }, [products, chip, chipField, query, color, availability]);

  const ordered = useMemo(() => {
    const list = [...products];
    if (sort === "price-asc" || sort === "price-desc") {
      const dir = sort === "price-asc" ? 1 : -1;
      list.sort((a, b) => {
        if (a.price === null && b.price === null) return 0;
        if (a.price === null) return 1;
        if (b.price === null) return -1;
        return (a.price - b.price) * dir;
      });
    } else if (sort === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }, [products, sort]);

  const shown = useMemo(() => {
    const slugs = ordered.filter((p) => visible.has(p.slug)).map((p) => p.slug);
    return new Set(limit ? slugs.slice(0, limit) : slugs);
  }, [ordered, visible, limit]);

  /** Called from event handlers: capture layout so Flip can animate to the next one. */
  function captureFlip() {
    const grid = gridRef.current;
    if (!grid) return;
    if (!interacted.current) {
      interacted.current = true;
      grid.querySelectorAll<HTMLElement>("[data-flip-item]").forEach((el) => {
        el.setAttribute("data-revealed", "");
        gsap.set(el, { clearProps: "opacity,visibility,transform" });
      });
    }
    flipState.current = Flip.getState(grid.querySelectorAll("[data-flip-item]"));
  }

  useLayoutEffect(() => {
    const state = flipState.current;
    if (!state) return;
    flipState.current = null;
    if (prefersReducedMotion()) return;
    Flip.from(state, {
      duration: 0.7,
      ease: EASE,
      scale: true,
      absolute: true,
      nested: true,
      onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, scale: 0.88 }, { autoAlpha: 1, scale: 1, duration: 0.6, ease: EASE }),
      onLeave: (els) => gsap.to(els, { autoAlpha: 0, scale: 0.88, duration: 0.3 }),
      onComplete: () => ScrollTrigger.refresh(),
    });
  }, [shown, ordered]);

  /* Scroll-batched entrance for the first view. */
  useGSAP(
    () => {
      const grid = gridRef.current;
      if (!grid) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const items = gsap.utils.toArray<HTMLElement>(grid.querySelectorAll("[data-flip-item]"));
        const triggers = ScrollTrigger.batch(items, {
          start: "top 92%",
          once: true,
          onEnter: (batch) => {
            if (interacted.current) return;
            batch.forEach((el) => (el as HTMLElement).setAttribute("data-revealed", ""));
            gsap.fromTo(batch, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, stagger: 0.07, duration: 0.9, ease: EASE, clearProps: "transform" });
          },
        });
        return () => triggers.forEach((t) => t.kill());
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        grid.querySelectorAll("[data-flip-item]").forEach((el) => el.setAttribute("data-revealed", ""));
      });
      return () => mm.revert();
    },
    { scope: gridRef },
  );

  /* Active chip pill slides to the selected chip. */
  useGSAP(
    () => {
      const wrap = chipsRef.current;
      const pill = pillRef.current;
      const active = wrap?.querySelector<HTMLElement>(`[data-chip="${chip}"]`);
      if (!wrap || !pill || !active) return;
      gsap.to(pill, { x: active.offsetLeft, width: active.offsetWidth, height: active.offsetHeight, y: active.offsetTop, duration: prefersReducedMotion() ? 0 : 0.5, ease: EASE });
    },
    { dependencies: [chip, chips.length] },
  );

  const activeFilters = Number(Boolean(color)) + Number(availability !== "all") + Number(Boolean(query));
  function clearAll() {
    captureFlip();
    setQuery("");
    setColor(null);
    setAvailability("all");
    setChip("all");
  }

  return (
    <div>
      {chips.length || toolbar ? (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          {chips.length ? (
            <div ref={chipsRef} className="relative flex flex-wrap items-center gap-1 rounded-full border border-line bg-white p-1" role="tablist" aria-label="Filter by category">
              <span ref={pillRef} className="absolute top-0 left-0 h-0 w-0 rounded-full bg-ink" aria-hidden="true" />
              {[{ label: "All", value: "all" }, ...chips].map((c) => (
                <button
                  key={c.value}
                  data-chip={c.value}
                  type="button"
                  role="tab"
                  aria-selected={chip === c.value}
                  onClick={() => {
                    captureFlip();
                    setChip(c.value);
                  }}
                  className={`${chipClass} ${chip === c.value ? "text-white" : "text-muted hover:text-ink"}`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          ) : (
            <span />
          )}
          {toolbar ? (
            <div className="flex flex-1 flex-wrap items-center justify-end gap-2">
              <label className="flex h-10 min-w-[200px] flex-1 items-center gap-2 rounded-full border border-line bg-white px-4 sm:max-w-[300px]">
                <Search size={14} className="text-muted" />
                <input value={query} onChange={(e) => {
                    captureFlip();
                    setQuery(e.target.value);
                  }} placeholder="Search name, SKU, pattern…" className="min-w-0 flex-1 bg-transparent text-[12px] outline-none placeholder:text-muted/70" aria-label="Search within results" />
                {query ? (
                  <button type="button" onClick={() => {
                      captureFlip();
                      setQuery("");
                    }} aria-label="Clear search" className="text-muted">
                    <X size={13} />
                  </button>
                ) : null}
              </label>
              <button type="button" onClick={() => setFiltersOpen((v) => !v)} aria-expanded={filtersOpen} className={`inline-flex h-10 items-center gap-2 rounded-full border px-4 font-display text-[10px] tracking-[0.14em] uppercase transition-colors ${filtersOpen ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:border-ink"}`}>
                <SlidersHorizontal size={13} /> Filters
                {activeFilters ? <span className="grid size-4 place-items-center rounded-full bg-stitch font-sans text-[9px] text-white">{activeFilters}</span> : null}
              </button>
              <select value={sort} onChange={(e) => {
                  captureFlip();
                  setSort(e.target.value as Sort);
                }} className="h-10 rounded-full border border-line bg-white px-4 font-display text-[10px] tracking-[0.12em] uppercase outline-none" aria-label="Sort products">
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          ) : null}
        </div>
      ) : null}

      {toolbar && filtersOpen ? (
        <div className="animate-toast-in mb-6 grid gap-5 rounded-[20px] border border-line bg-white p-5 md:grid-cols-[1fr_auto]">
          <div>
            <p className="mb-3 font-display text-[10px] tracking-[0.16em] text-muted uppercase">Colour {color ? `— ${color}` : ""}</p>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((c) => (
                <button key={c.name} type="button" onClick={() => {
                  captureFlip();
                  setColor(color === c.name ? null : c.name);
                }} aria-pressed={color === c.name} className={`inline-flex items-center gap-2 rounded-full border py-1.5 pr-3 pl-1.5 text-[11px] transition-colors ${color === c.name ? "border-ink bg-ink text-white" : "border-line text-steel hover:border-ink"}`}>
                  <SwatchDot swatch={c} className="size-4" />
                  {c.name}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 font-display text-[10px] tracking-[0.16em] text-muted uppercase">Availability</p>
            <div className="flex flex-wrap gap-2">
              {availabilityOptions.map((o) => (
                <button key={o.value} type="button" onClick={() => {
                  captureFlip();
                  setAvailability(o.value);
                }} aria-pressed={availability === o.value} className={`rounded-full border px-3 py-1.5 text-[11px] transition-colors ${availability === o.value ? "border-accent bg-accent text-white" : "border-line text-steel hover:border-ink"}`}>
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {toolbar ? (
        <div className="mb-4 flex items-center justify-between text-[11px] text-muted">
          <span className="tabular-nums" aria-live="polite">
            {shown.size} {shown.size === 1 ? "piece" : "pieces"}
          </span>
          {activeFilters || chip !== "all" ? (
            <button type="button" onClick={clearAll} className="underline underline-offset-2 hover:text-ink">
              Clear filters
            </button>
          ) : null}
        </div>
      ) : null}

      <div ref={gridRef} data-grid-reveal className={`grid gap-(--grid-gap) ${columns}`}>
        {ordered.map((p, i) => (
          <div key={p.slug} data-flip-id={p.slug} data-flip-item className="min-w-0" style={{ display: shown.has(p.slug) ? undefined : "none" }}>
            <ProductCard product={p} priority={i < 4} />
          </div>
        ))}
      </div>

      {shown.size === 0 ? (
        <div className="stitch grid min-h-[260px] place-items-center content-center gap-2 rounded-[var(--card-radius)] bg-white text-center">
          <Search className="mx-auto text-muted" />
          <p className="m-0 font-display text-[24px] tracking-[0.02em] text-ink uppercase">{emptyLabel}</p>
          <button type="button" onClick={clearAll} className="text-[12px] text-accent underline underline-offset-2">
            Clear filters
          </button>
        </div>
      ) : null}
    </div>
  );
}
