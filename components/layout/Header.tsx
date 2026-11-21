"use client";

import { ArrowRight, ChevronDown, Search, ShoppingBag, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Logo } from "@/components/ui/Logo";
import { InstagramIcon } from "@/components/ui/SocialIcons";
import { EASE, gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useScrollLock } from "@/lib/lenis";
import { useStore } from "@/lib/store";
import { canvasCloseClass } from "@/lib/styles";
import type { CategoryNode, ProductSummary, SiteContent } from "@/lib/types";
import { SearchOverlay } from "./SearchOverlay";

const navLinks = [
  { href: "/shop", label: "Shop", mega: true },
  { href: "/gallery", label: "Gallery" },
  { href: "/zero-waste", label: "Zero Waste" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const iconButtonClass =
  "relative grid size-9 place-items-center rounded-[8px] text-ink transition-colors duration-200 hover:bg-ink hover:text-white";

export function Header({
  tree,
  searchIndex,
  site,
}: {
  tree: CategoryNode[];
  searchIndex: ProductSummary[];
  site: SiteContent;
}) {
  const pathname = usePathname();
  const { cartCount, setCartOpen, isSearchOpen, setSearchOpen } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const megaRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const closeTimer = useRef<number | null>(null);

  useScrollLock(menuOpen);

  /* Close overlays on navigation (search closes itself when a result is chosen). */
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
    setMegaOpen(false);
  }

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setMegaOpen(false);
        setSearchOpen(false);
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSearchOpen]);

  /* Compact on scroll; hide when scrolling down, reveal when scrolling up. */
  useGSAP(
    () => {
      const header = headerRef.current;
      if (!header) return;
      const st = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate(self) {
          const y = self.scroll();
          setCompact(y > 14);
          const hide = self.direction === 1 && y > 520;
          gsap.to(header, { yPercent: hide ? -140 : 0, duration: 0.5, ease: EASE, overwrite: "auto" });
        },
      });
      return () => st.kill();
    },
    { scope: headerRef },
  );

  /* Nav hover pill slides between links. */
  const movePill = (target: HTMLElement | null) => {
    const pill = pillRef.current;
    const nav = navRef.current;
    if (!pill || !nav) return;
    if (!target) {
      gsap.to(pill, { opacity: 0, duration: 0.25 });
      return;
    }
    const navBox = nav.getBoundingClientRect();
    const box = target.getBoundingClientRect();
    const reduce = !window.matchMedia(MOTION_OK).matches;
    gsap.to(pill, {
      x: box.left - navBox.left,
      width: box.width,
      opacity: 1,
      duration: reduce ? 0 : 0.45,
      ease: EASE,
    });
  };

  /* Mega menu entrance. */
  useGSAP(
    () => {
      const panel = megaRef.current;
      if (!panel) return;
      const cols = panel.querySelectorAll("[data-mega-col]");
      if (megaOpen) {
        gsap.set(panel, { display: "block" });
        gsap.fromTo(panel, { autoAlpha: 0, y: -10, clipPath: "inset(0 0 100% 0 round 18px)" }, { autoAlpha: 1, y: 0, clipPath: "inset(0 0 0% 0 round 18px)", duration: 0.55, ease: EASE });
        gsap.fromTo(cols, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.05, delay: 0.08, ease: EASE });
      } else {
        gsap.to(panel, { autoAlpha: 0, y: -6, duration: 0.25, ease: "power2.in", onComplete: () => { gsap.set(panel, { display: "none" }); } });
      }
    },
    { dependencies: [megaOpen], scope: headerRef },
  );

  /* Mobile drawer. */
  useGSAP(
    () => {
      const drawer = drawerRef.current;
      if (!drawer) return;
      const links = drawer.querySelectorAll("[data-drawer-link]");
      if (menuOpen) {
        gsap.to(drawer, { x: 0, xPercent: 0, autoAlpha: 1, duration: 0.6, ease: EASE });
        gsap.fromTo(links, { x: -24, autoAlpha: 0 }, { x: 0, autoAlpha: 1, stagger: 0.04, delay: 0.12, duration: 0.6, ease: EASE });
      } else {
        gsap.to(drawer, { x: 0, xPercent: -106, autoAlpha: 0, duration: 0.45, ease: "power3.in" });
      }
    },
    { dependencies: [menuOpen] },
  );

  /* Cart badge number roll + pop when count changes. */
  useGSAP(
    () => {
      if (!badgeRef.current || cartCount === 0) return;
      gsap.fromTo(badgeRef.current, { yPercent: 60, scale: 0.4 }, { yPercent: 0, scale: 1, duration: 0.55, ease: "back.out(2.4)" });
    },
    { dependencies: [cartCount] },
  );

  const openMega = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const scheduleCloseMega = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 160);
  };

  const isActive = (href: string) => (href === "/shop" ? pathname.startsWith("/shop") || pathname.startsWith("/product") : pathname.startsWith(href));
  const visibleTree = tree.filter((node) => node.productCount > 0 || node.children.length);

  return (
    <>
      <header ref={headerRef} className={`fixed inset-x-0 z-[50] px-(--page-gutter) text-ink transition-[top] duration-300 ease-store ${compact ? "top-2" : "top-0"}`}>
        <div
          className={`relative mx-auto grid grid-cols-[minmax(0,1fr)_auto] items-center rounded-[12px] border px-3 transition-[max-width,height,box-shadow,background-color,border-color] duration-500 ease-store sm:px-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] ${
            compact || megaOpen
              ? "h-[60px] max-w-[1180px] border-black/8 bg-white/92 shadow-[0_14px_42px_rgb(21_22_18/0.13)] backdrop-blur-xl"
              : "h-[var(--header-h)] max-w-[var(--content-max)] border-transparent bg-paper-warm/0"
          }`}
          onMouseLeave={scheduleCloseMega}
        >
          <div className="flex min-w-0 items-center gap-2">
            <button
              className="grid size-9 place-items-center rounded-[8px] transition-colors hover:bg-canvas lg:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation"
              aria-expanded={menuOpen}
            >
              <span className="flex w-4 flex-col gap-[5px]">
                <span className="block h-px w-full bg-current" />
                <span className="block h-px w-2.5 bg-current" />
                <span className="block h-px w-full bg-current" />
              </span>
            </button>
            <Logo size={compact ? 38 : 42} />
          </div>

          <nav
            ref={navRef}
            className="relative hidden items-center gap-0.5 rounded-[10px] bg-paper-warm/80 p-1 lg:flex"
            aria-label="Main navigation"
            onMouseLeave={() => movePill(null)}
          >
            <span ref={pillRef} className="pointer-events-none absolute top-1 bottom-1 left-0 w-0 rounded-[7px] bg-white opacity-0 shadow-[0_2px_8px_rgb(0_0_0/0.06)]" aria-hidden="true" />
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative z-[1] inline-flex items-center gap-1 rounded-[7px] px-3.5 py-2 font-display text-[11px] font-medium tracking-[0.14em] uppercase transition-colors duration-200 ${isActive(link.href) ? "text-accent" : "text-ink"}`}
                onMouseEnter={(e) => {
                  movePill(e.currentTarget);
                  if (link.mega) openMega();
                  else scheduleCloseMega();
                }}
                onFocus={(e) => {
                  movePill(e.currentTarget);
                  if (link.mega) openMega();
                }}
                aria-expanded={link.mega ? megaOpen : undefined}
                aria-haspopup={link.mega ? "true" : undefined}
              >
                {link.label}
                {link.mega ? <ChevronDown size={12} className={`transition-transform duration-300 ${megaOpen ? "rotate-180" : ""}`} /> : null}
                {isActive(link.href) ? <span className="absolute right-3.5 bottom-1 left-3.5 h-px bg-stitch [mask:repeating-linear-gradient(90deg,#000_0_4px,transparent_4px_7px)]" /> : null}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-0.5">
            <MagneticButton strength={0.5}>
              <button type="button" className={iconButtonClass} onClick={() => setSearchOpen(!isSearchOpen)} aria-label={isSearchOpen ? "Close search" : "Search products"} aria-expanded={isSearchOpen}>
                {isSearchOpen ? <X size={16} /> : <Search size={16} />}
              </button>
            </MagneticButton>
            <MagneticButton strength={0.5} className="hidden sm:inline-block">
              <a className={iconButtonClass} href={site.instagramUrl} target="_blank" rel="noreferrer" aria-label="Sangam Designs on Instagram">
                <InstagramIcon />
              </a>
            </MagneticButton>
            <MagneticButton strength={0.5}>
              <button type="button" data-cart-target className={iconButtonClass} onClick={() => setCartOpen(true)} aria-label={`Open bag with ${cartCount} ${cartCount === 1 ? "item" : "items"}`}>
                <ShoppingBag size={16} />
                {cartCount > 0 ? (
                  <span ref={badgeRef} key={cartCount} className="absolute -top-0.5 -right-0.5 grid min-w-[16px] place-items-center rounded-full bg-stitch px-1 font-sans text-[9px] leading-4 font-semibold text-white tabular-nums">
                    {cartCount}
                  </span>
                ) : null}
              </button>
            </MagneticButton>
          </div>

          {/* Mega menu */}
          <div
            ref={megaRef}
            className="absolute top-[calc(100%+8px)] right-0 left-0 rounded-[18px] border border-black/6 bg-white p-4 shadow-[0_24px_70px_rgb(21_22_18/0.16)] lg:p-5"
            style={{ display: "none" }}
            onMouseEnter={openMega}
            onMouseLeave={scheduleCloseMega}
          >
            <div className="grid grid-cols-[repeat(4,minmax(0,1fr))_minmax(0,1.2fr)] gap-4">
              {visibleTree.map((node) => (
                <div key={node.slug} data-mega-col className="flex flex-col">
                  <Link href={`/shop/${node.slug}`} className="group relative mb-3 block aspect-[5/4] overflow-hidden rounded-[12px] bg-canvas">
                    {node.image ? <Image src={node.image} alt="" fill sizes="220px" className="object-cover transition-transform duration-700 ease-store group-hover:scale-[1.06]" /> : null}
                    <span className="absolute inset-0 bg-[linear-gradient(0deg,rgb(0_0_0/0.55),transparent_60%)]" />
                    <span className="absolute bottom-2.5 left-3 font-display text-[15px] font-medium tracking-[0.06em] text-white uppercase">{node.name}</span>
                    <span className="absolute top-2.5 right-2.5 rounded-full bg-white/90 px-2 py-0.5 font-sans text-[9px] font-semibold tabular-nums">{node.productCount}</span>
                  </Link>
                  <ul className="grid gap-0.5">
                    {node.children.map((child) => (
                      <li key={child.slug}>
                        <Link href={`/shop/${child.slug}`} className="group flex items-center justify-between rounded-[8px] px-2 py-1.5 text-[12px] text-steel transition-colors hover:bg-paper-warm hover:text-ink">
                          {child.name}
                          <ArrowRight size={12} className="-translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div data-mega-col className="stitch flex flex-col justify-between rounded-[14px] bg-accent p-5 text-white">
                <span className="font-script text-[26px] leading-none text-white/90">handmade</span>
                <div>
                  <p className="m-0 font-display text-[26px] leading-[0.98] font-medium uppercase">Every piece, one of a kind.</p>
                  <Link href="/shop" className="group mt-4 inline-flex items-center gap-2 font-display text-[11px] tracking-[0.14em] uppercase">
                    Shop everything <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <SearchOverlay index={searchIndex} open={isSearchOpen} onClose={() => setSearchOpen(false)} compact={compact} />
      </header>

      {/* Mobile drawer (gumana) */}
      <div
        ref={drawerRef}
        className="fixed inset-y-3 left-3 z-[80] flex h-[calc(100dvh-24px)] w-[min(400px,calc(100vw-24px))] flex-col overflow-hidden rounded-[24px] bg-white text-ink shadow-[0_24px_80px_rgb(0_0_0/0.22)]"
        style={{ transform: "translateX(-106%)", visibility: "hidden" }}
        aria-hidden={!menuOpen}
        data-lenis-prevent
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <Logo />
          <button className={canvasCloseClass} onClick={() => setMenuOpen(false)} aria-label="Close navigation" tabIndex={menuOpen ? 0 : -1}>
            <X size={18} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-5 pt-4 pb-6" aria-label="Mobile navigation">
          {visibleTree.map((node) => (
            <div key={node.slug} data-drawer-link className="border-b border-line py-3">
              <Link href={`/shop/${node.slug}`} className="flex items-center justify-between font-display text-[16px] font-medium tracking-[0.12em] uppercase" tabIndex={menuOpen ? 0 : -1}>
                {node.name}
                <span className="font-sans text-[10px] text-muted tabular-nums">{node.productCount}</span>
              </Link>
              {node.children.length ? (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {node.children.map((child) => (
                    <Link key={child.slug} href={`/shop/${child.slug}`} className="rounded-full border border-line px-3 py-1.5 text-[11px] text-steel" tabIndex={menuOpen ? 0 : -1}>
                      {child.name}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
          {navLinks.slice(1).map((link) => (
            <Link key={link.href} data-drawer-link href={link.href} className="flex items-center justify-between border-b border-line py-4 font-display text-[16px] font-medium tracking-[0.12em] uppercase" tabIndex={menuOpen ? 0 : -1}>
              {link.label}
              <ArrowRight size={16} className="opacity-40" />
            </Link>
          ))}
          <a data-drawer-link href={site.instagramUrl} target="_blank" rel="noreferrer" className="mt-6 flex items-center gap-3 rounded-[16px] bg-paper-warm p-4" tabIndex={menuOpen ? 0 : -1}>
            <InstagramIcon className="size-5 text-stitch" />
            <span>
              <small className="block text-[10px] tracking-[0.16em] text-muted uppercase">Follow along</small>
              <span className="font-display text-[14px] tracking-[0.08em] uppercase">@{site.instagramHandle}</span>
            </span>
          </a>
        </nav>
      </div>
      <button
        className={`fixed inset-0 z-[77] border-0 bg-black/40 backdrop-blur-[2px] transition-all duration-300 ${menuOpen ? "visible opacity-100" : "invisible opacity-0"}`}
        onClick={() => setMenuOpen(false)}
        aria-label="Close menu"
        tabIndex={menuOpen ? 0 : -1}
      />
    </>
  );
}
