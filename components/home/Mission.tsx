import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { contentClass, kickerClass } from "@/lib/styles";

const fanClass =
  "absolute top-1/2 -translate-y-1/2 overflow-hidden rounded-[18px] border-white shadow-[0_15px_35px_rgb(0_0_0/0.12)] transition-[z-index,transform,box-shadow] duration-[400ms] ease-store hover:z-[4] hover:-translate-y-[52%] hover:scale-[1.035] hover:shadow-[0_24px_52px_rgb(0_0_0/0.24)] [border-width:clamp(3px,0.4vw,7px)]";

/* gumana Mission (three fanned images). */
export function Mission() {
  return (
    <section className={`${contentClass} mt-(--section-space) mb-(--grid-gap)`} id="mission">
      <div className="overflow-hidden rounded-[var(--card-radius)] bg-white px-[clamp(18px,4vw,54px)] pt-[clamp(38px,5vw,68px)]">
        <div className="mb-[clamp(32px,4vw,48px)] grid gap-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-end md:gap-10">
          <div className="min-w-0">
            <span className={`${kickerClass} mb-4`}>Our mission</span>
            <SplitReveal className="m-0 max-w-[13ch] font-display text-[clamp(38px,5vw,70px)] leading-[0.94] font-medium uppercase">Waste to wealth, one block at a time.</SplitReveal>
          </div>
          <p className="m-0 max-w-[40ch] border-l-2 border-stitch/40 pl-4 text-[14px] leading-[1.7] text-steel md:justify-self-end">Upcycle & recycle to craft planet-friendly products — and empower the differently abled while we do it.</p>
        </div>
        <div className="relative mx-auto h-[clamp(280px,34vw,510px)] max-w-[880px] max-[767px]:h-[280px]">
          <Reveal className={`${fanClass} left-[3%] h-[68%] w-[42%] max-[767px]:left-0 max-[767px]:h-[64%] max-[767px]:w-[53%]`}>
            <Image src="/products/be9/2.webp" alt="Red butterfly appliqué detail" fill sizes="45vw" className="object-cover" />
          </Reveal>
          <Reveal delay={0.08} className={`${fanClass} left-[29%] z-[2] h-[86%] w-[45%] max-[767px]:left-[23%] max-[767px]:h-[82%] max-[767px]:w-[55%]`}>
            <Image src="/products/qu10/2.webp" alt="Fans of Love quilt detail" fill sizes="50vw" className="object-cover" />
          </Reveal>
          <Reveal delay={0.16} className={`${fanClass} right-[3%] h-[68%] w-[42%] max-[767px]:right-0 max-[767px]:h-[64%] max-[767px]:w-[53%]`}>
            <Image src="/products/be30/2.webp" alt="Purple diyas on mehendi bedspread detail" fill sizes="45vw" className="object-cover" />
          </Reveal>
        </div>
        <Reveal className="mx-auto mt-10 mb-[clamp(42px,5vw,68px)] flex max-w-[720px] flex-col items-center gap-3 text-center">
          <span className="font-script text-[28px] leading-none text-stitch">Sangam Designs</span>
          <p className="m-0 max-w-[600px] font-display text-[clamp(24px,3vw,38px)] leading-[1.08] font-medium tracking-[0.01em] text-charcoal uppercase">Handmade. Upcycled. Made to be loved.</p>
        </Reveal>
      </div>
    </section>
  );
}
