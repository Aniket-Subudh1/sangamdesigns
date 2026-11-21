import { ArrowUpRight, Mail } from "lucide-react";
import Link from "next/link";
import { StitchLine } from "@/components/motion/StitchLine";
import { Logo } from "@/components/ui/Logo";
import { FacebookIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import { contentClass } from "@/lib/styles";
import type { CategoryNode, SiteContent } from "@/lib/types";

export function Footer({ tree, site }: { tree: CategoryNode[]; site: SiteContent }) {
  const linkClass = "group inline-flex items-center gap-1.5 text-[13px] text-steel transition-colors hover:text-ink";
  return (
    <footer className={`${contentClass} pt-(--grid-gap) pb-(--grid-gap)`}>
      <div className="linen relative overflow-hidden rounded-[var(--card-radius)] border border-line p-[clamp(24px,5vw,72px)]">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-[460px]">
            <Logo size={56} />
            <p className="mt-7 font-display text-[clamp(32px,4vw,56px)] leading-[0.96] font-medium tracking-[0.01em] text-ink uppercase">
              Made by hand.
              <br />
              <span className="text-accent">Made to last.</span>
            </p>
            <p className="mt-4 max-w-[42ch] text-[13px] leading-[1.7] text-steel">{site.bio.slice(2).join(" ")}</p>
          </div>
          <div className="grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-3 sm:gap-x-16">
            <div>
              <p className="mb-4 font-display text-[11px] tracking-[0.18em] text-muted uppercase">Shop</p>
              <nav className="flex flex-col gap-3" aria-label="Shop footer navigation">
                {tree.map((node) => (
                  <Link key={node.slug} href={`/shop/${node.slug}`} className={linkClass}>
                    {node.name}
                  </Link>
                ))}
                <Link href="/shop" className={linkClass}>
                  Shop all
                </Link>
              </nav>
            </div>
            <div>
              <p className="mb-4 font-display text-[11px] tracking-[0.18em] text-muted uppercase">Studio</p>
              <nav className="flex flex-col gap-3" aria-label="Studio footer navigation">
                <Link href="/gallery" className={linkClass}>Photo gallery</Link>
                <Link href="/zero-waste" className={linkClass}>Zero waste</Link>
                <Link href="/about" className={linkClass}>About</Link>
                <Link href="/contact" className={linkClass}>Contact & custom orders</Link>
              </nav>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="mb-4 font-display text-[11px] tracking-[0.18em] text-muted uppercase">Connect</p>
              <div className="flex flex-col gap-3">
                <a href={site.instagramUrl} target="_blank" rel="noreferrer" className={linkClass}>
                  <InstagramIcon /> @{site.instagramHandle}
                  <ArrowUpRight size={12} className="opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
                {site.facebookUrl ? (
                  <a href={site.facebookUrl} target="_blank" rel="noreferrer" className={linkClass}>
                    <FacebookIcon /> Facebook
                  </a>
                ) : null}
                <a href={`mailto:${site.email}`} className={linkClass}>
                  <Mail size={15} /> {site.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <StitchLine className="mt-14" />

        <div className="mt-6 flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
          <span className="font-sans text-[10px] font-medium tracking-[0.1em] text-muted uppercase tabular-nums">
            © {site.copyrightYear} {site.name}
          </span>
          <span className="font-display text-[10px] tracking-[0.18em] text-muted uppercase">
            Handcrafted · Upcycled · Planet-friendly
          </span>
        </div>

        <p aria-hidden="true" className="pointer-events-none mt-8 -mb-[0.2em] text-center font-display text-[clamp(64px,17vw,300px)] leading-[0.8] font-medium tracking-[0.04em] text-transparent uppercase select-none [-webkit-text-stroke:1px_var(--line)]">
          Sangam
        </p>
      </div>
    </footer>
  );
}
