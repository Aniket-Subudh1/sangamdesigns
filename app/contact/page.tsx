import { ArrowUpRight, Mail } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { ContactForm } from "@/components/pages/ContactForm";
import { FacebookIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import { getSite } from "@/lib/data";
import { contentClass, kickerClass, sectionTitleClass } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Contact & custom orders",
  description: "Message Sangam Designs on Instagram or by email about a piece, a custom size, or a bulk/corporate order.",
};

const customShots = ["/gallery/b078.webp", "/gallery/b072.webp", "/gallery/a087.webp"];

export default async function ContactPage() {
  const site = await getSite();
  const card = "group flex items-center justify-between gap-4 rounded-[20px] bg-white p-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgb(0_0_0/0.08)]";
  return (
    <div className={`${contentClass} pt-[110px] pb-(--section-space)`}>
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className={`${kickerClass} mb-4`}>Contact & custom orders</p>
          <SplitReveal as="h1" className={`${sectionTitleClass} max-w-[9ch] text-[clamp(48px,7vw,104px)]`}>Let&apos;s make something together.</SplitReveal>
          <p className="mt-6 mb-8 max-w-[46ch] text-[14px] leading-[1.75] text-steel">
            Ask about a piece, request any size or colourway, or plan a bulk order for an event. Quote the item code (like QU9 or BE25) and we&apos;ll get back to you.
          </p>
          <Reveal stagger={0.08} className="grid gap-3">
            <a data-reveal-item href={site.instagramDm} target="_blank" rel="noreferrer" className={card}>
              <span className="flex items-center gap-4">
                <span className="grid size-12 place-items-center rounded-full bg-[linear-gradient(120deg,#d4588f,#e06a3b_55%,#e8c450)] text-white"><InstagramIcon className="size-5" /></span>
                <span>
                  <span className="block font-display text-[15px] tracking-[0.06em] uppercase">Instagram DM</span>
                  <span className="text-[12px] text-muted">@{site.instagramHandle}</span>
                </span>
              </span>
              <ArrowUpRight size={18} className="transition-transform group-hover:rotate-45" />
            </a>
            <a data-reveal-item href={`mailto:${site.email}`} className={card}>
              <span className="flex items-center gap-4">
                <span className="grid size-12 place-items-center rounded-full bg-ink text-white"><Mail size={19} /></span>
                <span>
                  <span className="block font-display text-[15px] tracking-[0.06em] uppercase">Email</span>
                  <span className="text-[12px] text-muted">{site.email}</span>
                </span>
              </span>
              <ArrowUpRight size={18} className="transition-transform group-hover:rotate-45" />
            </a>
            {site.facebookUrl ? (
              <a data-reveal-item href={site.facebookUrl} target="_blank" rel="noreferrer" className={card}>
                <span className="flex items-center gap-4">
                  <span className="grid size-12 place-items-center rounded-full bg-[#1877f2] text-white"><FacebookIcon className="size-5" /></span>
                  <span className="block font-display text-[15px] tracking-[0.06em] uppercase">Facebook</span>
                </span>
                <ArrowUpRight size={18} className="transition-transform group-hover:rotate-45" />
              </a>
            ) : null}
          </Reveal>
        </div>
        <Reveal className="stitch rounded-[var(--card-radius)] bg-white p-[clamp(22px,4vw,48px)]">
          <h2 className="mt-0 mb-6 font-display text-[clamp(26px,3vw,38px)] font-medium uppercase">Send us a message</h2>
          <ContactForm email={site.email} />
        </Reveal>
      </div>

      <section className="mt-(--section-space)">
        <div className="mb-6 flex items-end justify-between gap-6">
          <div>
            <p className={`${kickerClass} mb-4`}>Custom & corporate</p>
            <h2 className="m-0 font-display text-[clamp(36px,4.4vw,60px)] leading-[0.95] font-medium uppercase">Made for your event</h2>
          </div>
          <p className="m-0 hidden max-w-[36ch] text-right text-[13px] leading-[1.6] text-steel sm:block">Branded totes, conference bags and woven stoles — made to order.</p>
        </div>
        <Reveal stagger={0.08} className="grid grid-cols-3 gap-(--grid-gap)">
          {customShots.map((src) => (
            <div key={src} data-reveal-item className="group relative aspect-[4/3] overflow-hidden rounded-[var(--card-radius)] bg-white">
              <Image src={src} alt="Custom order by Sangam Designs" fill sizes="33vw" className="object-cover transition-transform duration-700 ease-store group-hover:scale-[1.05]" />
            </div>
          ))}
        </Reveal>
      </section>
    </div>
  );
}
