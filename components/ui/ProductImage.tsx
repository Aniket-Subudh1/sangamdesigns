import Image from "next/image";
import type { Swatch } from "@/lib/types";
import { PatchworkPlaceholder } from "./PatchworkPlaceholder";

export function ProductImage({
  src,
  alt,
  seed,
  colors,
  sizes,
  priority = false,
  className = "object-cover",
  placeholderLabel,
}: {
  src: string | null | undefined;
  alt: string;
  seed: string;
  colors: Swatch[];
  sizes: string;
  priority?: boolean;
  className?: string;
  placeholderLabel?: string;
}) {
  if (!src) return <PatchworkPlaceholder seed={seed} colors={colors} label={placeholderLabel} />;
  return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={className} />;
}
