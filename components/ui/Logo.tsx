import Image from "next/image";
import Link from "next/link";

/** The Instagram profile patch as the mark, with an Oswald wordmark. */
export function Logo({
  className = "",
  wordmark = true,
  size = 44,
}: {
  className?: string;
  wordmark?: boolean;
  size?: number;
}) {
  return (
    <Link
      href="/"
      aria-label="Sangam Designs — home"
      className={`group inline-flex items-center gap-2.5 text-ink no-underline ${className}`}
    >
      <span
        className="relative block shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-black/5 transition-transform duration-500 ease-store group-hover:rotate-[-8deg] group-hover:scale-105"
        style={{ width: size, height: size }}
      >
        <Image src="/brand/logo.jpg" alt="" fill sizes={`${size * 2}px`} className="object-cover" priority />
      </span>
      {wordmark ? (
        <span className="flex flex-col leading-none max-[360px]:hidden">
          <span className="font-display text-[clamp(15px,1.5vw,19px)] font-medium tracking-[0.22em] uppercase">
            Sangam
          </span>
          <span className="mt-1 font-display text-[9px] tracking-[0.42em] text-muted uppercase">
            Designs
          </span>
        </span>
      ) : null}
    </Link>
  );
}
