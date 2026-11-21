/* Shared class strings, ported from the gumana storefront. */

export const contentClass =
  "mx-auto w-full max-w-[var(--content-max)] px-(--page-gutter)";

export const sectionClass = `${contentClass} py-(--section-space)`;

export const trackClass =
  "overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth [scroll-padding-inline:2px] no-scrollbar touch-pan-x snap-x snap-mandatory [&>*]:snap-start";

const ctaBase =
  "group inline-flex h-11 items-center justify-center gap-2.5 rounded-full px-5 font-display text-[12px] font-medium tracking-[0.13em] uppercase transition-[transform,background,box-shadow,color] duration-[180ms] ease-in-out hover:-translate-y-0.5 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-45 [&_svg]:transition-transform [&_svg]:duration-[220ms] hover:[&_svg]:translate-x-[3px]";

export const paperCtaClass = `${ctaBase} bg-paper text-ink hover:shadow-[0_10px_24px_rgb(0_0_0/0.14)]`;

export const inkCtaClass = `${ctaBase} border-0 bg-ink text-white hover:bg-ink-deep hover:shadow-[0_10px_24px_rgb(0_0_0/0.2)]`;

export const accentCtaClass = `${ctaBase} border-0 bg-accent text-white hover:bg-accent-deep hover:shadow-[0_10px_24px_rgb(15_112_120/0.28)]`;

export const outlineCtaClass = `${ctaBase} border border-ink/15 bg-white text-ink hover:border-ink hover:shadow-[0_10px_24px_rgb(0_0_0/0.08)]`;

export const canvasCloseClass =
  "grid size-10 place-items-center rounded-full border border-line bg-white text-charcoal transition-[background-color,color,border-color,transform] duration-200 hover:rotate-90 hover:border-ink hover:bg-ink hover:text-white";

/** Minimal underline text-link for secondary actions. */
export const textLinkCtaClass =
  "group inline-flex items-center gap-2 font-display text-[12px] font-medium tracking-[0.14em] uppercase";

export const textLinkLabelClass =
  "relative pb-[3px] after:absolute after:inset-x-0 after:-bottom-px after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-[320ms] after:ease-store group-hover:after:scale-x-100";

export const kickerClass =
  "inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-3 py-1.5 font-display text-[10px] font-medium tracking-[0.16em] text-muted uppercase";

export const sectionTitleClass =
  "m-0 font-display font-medium leading-[0.94] tracking-[0.01em] text-ink uppercase";

export const numeralClass =
  "font-sans text-[12px] font-medium tracking-normal text-muted tabular-nums";

export const chipClass =
  "relative z-[1] rounded-full px-4 py-2 font-display text-[10px] font-medium tracking-[0.14em] uppercase transition-colors duration-200";

export const inputClass =
  "h-12 w-full rounded-[14px] border border-line bg-white px-4 text-[13px] text-ink outline-none transition-[border-color,box-shadow] placeholder:text-muted/70 focus:border-accent focus:shadow-[0_0_0_4px_rgb(15_112_120/0.12)]";
