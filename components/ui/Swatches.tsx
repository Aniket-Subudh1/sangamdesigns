import type { Swatch } from "@/lib/types";

export function SwatchDot({ swatch, className = "size-[10px]" }: { swatch: Swatch; className?: string }) {
  return (
    <span
      className={`inline-block shrink-0 rounded-full ring-1 ring-black/10 ${className}`}
      style={{ background: swatch.value }}
      title={swatch.name}
    />
  );
}

/** Compact swatch row; dots spread apart on card hover. */
export function Swatches({ colors, max = 4 }: { colors: Swatch[]; max?: number }) {
  const shown = colors.slice(0, max);
  return (
    <span className="flex items-center gap-1 transition-[gap] duration-300 ease-store group-hover:gap-1.5" aria-label={`Colours: ${colors.map((c) => c.name).join(", ")}`}>
      {shown.map((c) => (
        <SwatchDot key={c.name} swatch={c} />
      ))}
      {colors.length > max ? <span className="text-[9px] text-muted">+{colors.length - max}</span> : null}
    </span>
  );
}
