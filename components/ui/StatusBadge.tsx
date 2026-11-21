import type { Product, ProductSummary } from "@/lib/types";

export function StatusBadge({
  product,
  featured = false,
  className = "",
}: {
  product: Pick<Product | ProductSummary, "status" | "price" | "stock">;
  featured?: boolean;
  className?: string;
}) {
  let label: string | null = null;
  let tone = "bg-ink text-white";
  if (product.status === "sold") {
    label = "Sold";
    tone = "bg-stitch text-white";
  } else if (product.price === null) {
    label = "On request";
    tone = "bg-white/92 text-accent";
  } else if (product.stock > 1) {
    label = `${product.stock} available`;
    tone = "bg-white/92 text-ink";
  } else if (featured) {
    label = "One of a kind";
    tone = "bg-ink text-white";
  }
  if (!label) return null;
  return (
    <span
      className={`pointer-events-none inline-flex rounded-full px-3 py-1.5 font-display text-[9px] font-medium tracking-[0.14em] uppercase backdrop-blur ${tone} ${className}`}
    >
      {label}
    </span>
  );
}
