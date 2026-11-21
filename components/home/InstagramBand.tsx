import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import { InstagramIcon } from "@/components/ui/SocialIcons";
import { contentClass } from "@/lib/styles";
import type { SiteContent } from "@/lib/types";

/* Replaces gumana's testimonials: the Instagram bio, verbatim, plus recent work. */
export function InstagramBand({ site, images }: { site: SiteContent; images: string[] }) {
  return (
    <section className={contentClass}>
      <Reveal className="grid grid-cols-[minmax(240px,0.8fr)_minmax(0,2.2fr)] gap-[clamp(28px,4vw,70px)] rounded-[var(--card-radius)] bg-peach p-[clamp(24px,5vw,72px)] max-[900px]:grid-cols-1">
        <div className="flex flex-col items-start">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 font-display text-[10px] tracking-[0.15em] text-muted uppercase">
            <InstagramIcon className="size-3.5 text-stitch" /> @{site.instagramHandle}
          </span>
          <p className="m-0 font-display text-[clamp(36px,4vw,56px)] leading-[0.94] font-medium uppercase">Follow the making.</p>
          <blockquote className="stitch mt-6 mb-7 rounded-[18px] bg-white p-5 text-[13px] leading-[1.7] text-charcoal">
            {site.bio.map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
          </blockquote>
          <MagneticButton>
            <a href={site.instagramUrl} target="_blank" rel="noreferrer" className="group inline-flex h-11 items-center gap-2.5 rounded-full bg-[linear-gradient(120deg,#d4588f,#e06a3b_55%,#e8c450)] px-5 font-display text-[12px] font-medium tracking-[0.13em] text-white uppercase shadow-[0_10px_24px_rgb(212_88_143/0.3)] transition-transform hover:-translate-y-0.5">
              Follow on Instagram <ArrowUpRight size={15} className="transition-transform group-hover:rotate-45" />
            </a>
          </MagneticButton>
        </div>
        <Reveal stagger={0.06} className="grid grid-cols-3 gap-(--grid-gap)">
          {images.slice(0, 6).map((src) => (
            <a key={src} data-reveal-item href={site.instagramUrl} target="_blank" rel="noreferrer" className="group relative aspect-square overflow-hidden rounded-[18px] bg-white" aria-label="View on Instagram">
              <Image src={src} alt="" fill sizes="(max-width: 900px) 30vw, 18vw" className="object-cover transition-transform duration-700 ease-store group-hover:scale-110" />
              <span className="absolute inset-0 grid place-items-center bg-stitch/0 text-white opacity-0 transition-all duration-300 group-hover:bg-stitch/35 group-hover:opacity-100">
                <InstagramIcon className="size-7" />
              </span>
            </a>
          ))}
        </Reveal>
      </Reveal>
    </section>
  );
}
