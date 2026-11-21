import { Recycle, Ruler, Sparkles } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { contentClass } from "@/lib/styles";

const services = [
  { icon: Sparkles, title: "One of a kind", detail: "Most pieces are single, unrepeatable designs" },
  { icon: Ruler, title: "Any size, on request", detail: "Custom sizes and colours made to order" },
  { icon: Recycle, title: "Planet-friendly", detail: "Upcycled & recycled, zero-waste making" },
];

export function ServiceStrip() {
  return (
    <section className={`${contentClass} pb-(--grid-gap)`}>
      <Reveal stagger={0.08} className="grid gap-px overflow-hidden rounded-[var(--card-radius)] border border-line bg-line sm:grid-cols-3">
        {services.map(({ icon: Icon, title, detail }) => (
          <div key={title} data-reveal-item className="group flex items-center gap-4 bg-peach px-6 py-6 sm:justify-center sm:px-5 sm:py-7">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-accent transition-transform duration-500 ease-store group-hover:rotate-[20deg] group-hover:scale-110">
              <Icon size={18} strokeWidth={1.7} />
            </span>
            <div>
              <p className="m-0 font-display text-[14px] font-medium tracking-[0.08em] uppercase">{title}</p>
              <p className="mt-1 mb-0 text-[12px] leading-[1.45] text-muted">{detail}</p>
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
