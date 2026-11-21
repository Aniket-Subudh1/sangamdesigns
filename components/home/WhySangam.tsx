import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { contentClass, kickerClass, sectionTitleClass } from "@/lib/styles";

/* gumana LifestyleBand → Sangam values, taken from the Instagram bio. */
const principles = [
  { title: "#Handcrafted", detail: "Every quilt, dohar and bag is made by hand, piece by piece", href: "/shop" },
  { title: "Upcycle & recycle", detail: "Planet-friendly products crafted from saved fabric", href: "/zero-waste" },
  { title: "Empowering differently abled", detail: "Craft that creates opportunity", href: "/about" },
];

export function WhySangam() {
  return (
    <section className={`${contentClass} pb-(--grid-gap)`}>
      <Reveal className="grid overflow-hidden rounded-[var(--card-radius)] bg-white lg:grid-cols-[0.85fr_1.15fr]">
        <div className="flex flex-col justify-center p-[clamp(28px,5vw,76px)]">
          <p className={`${kickerClass} mb-5 w-fit`}>Why Sangam</p>
          <SplitReveal className={`${sectionTitleClass} max-w-[10ch] text-[clamp(42px,5vw,70px)]`}>Crafted from what others leave behind.</SplitReveal>
          <p className="mt-5 mb-8 max-w-[48ch] text-[13px] leading-[1.75] text-steel">
            Sangam means a confluence — a meeting point. Ours is where saved fabric, traditional prints like Ajrakh, Kalamkari and Sambalpuri, and patient handwork meet.
          </p>
          <div className="border-t border-line">
            {principles.map((p) => (
              <Link key={p.title} href={p.href} className="group flex items-center justify-between gap-5 border-b border-line py-4">
                <div>
                  <p className="m-0 font-display text-[15px] font-medium tracking-[0.04em] uppercase transition-colors group-hover:text-accent">{p.title}</p>
                  <p className="mt-1 mb-0 text-[11px] text-muted">{p.detail}</p>
                </div>
                <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line transition-[background-color,color,border-color,transform] duration-300 group-hover:rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                  <ArrowUpRight size={13} />
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div className="relative min-h-[480px] overflow-hidden max-[767px]:min-h-[380px]">
          <Parallax amount={12}>
            <Image src="/products/be25/1.webp" alt="Jaipuri prints house appliqué bedspread in aqua and khaki" fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover" />
          </Parallax>
          <span className="absolute bottom-5 left-5 rounded-full bg-white/92 px-3 py-1.5 font-display text-[10px] tracking-[0.12em] uppercase backdrop-blur">BE25 · Houses in aqua & khaki</span>
        </div>
      </Reveal>
    </section>
  );
}
