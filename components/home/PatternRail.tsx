import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { contentClass, kickerClass, trackClass } from "@/lib/styles";

/* Shop by pattern — story-style rings with a running-stitch hover. */
export function PatternRail({ patterns }: { patterns: { name: string; count: number; image: string | null }[] }) {
  return (
    <section className={`${contentClass} pb-(--section-space)`}>
      <div className="mb-5 flex items-center justify-between">
        <p className={kickerClass}>Shop by pattern</p>
        <span className="font-display text-[10px] tracking-[0.15em] text-muted uppercase">Scroll →</span>
      </div>
      <Reveal stagger={0.04} className={`${trackClass} flex gap-[clamp(14px,2vw,26px)] pb-2`}>
        {patterns.map((p) => (
          <Link key={p.name} data-reveal-item href={`/shop?q=${encodeURIComponent(p.name)}`} className="group flex w-[clamp(92px,9vw,124px)] shrink-0 flex-col items-center text-center">
            <span className="relative grid aspect-square w-full place-items-center rounded-full p-[5px]">
              <span className="absolute inset-0 rounded-full border-[1.5px] border-dashed border-line transition-[border-color,transform] duration-700 ease-store group-hover:rotate-90 group-hover:border-stitch" />
              <span className="relative size-full overflow-hidden rounded-full bg-canvas">
                {p.image ? <Image src={p.image} alt="" fill sizes="124px" className="object-cover transition-transform duration-700 ease-store group-hover:scale-[1.15]" /> : null}
              </span>
            </span>
            <span className="mt-3 font-display text-[11px] leading-tight tracking-[0.08em] uppercase transition-colors group-hover:text-accent">{p.name}</span>
            <span className="mt-0.5 font-sans text-[10px] text-muted tabular-nums">{p.count}</span>
          </Link>
        ))}
      </Reveal>
    </section>
  );
}
