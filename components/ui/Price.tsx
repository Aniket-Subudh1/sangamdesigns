import { formatPrice } from "@/lib/format";
import type { Product, ProductSummary } from "@/lib/types";

type PriceLike = Pick<Product | ProductSummary, "price" | "status">;

export function priceLabel(p: PriceLike) {
  if (p.status === "sold") return "Sold";
  return p.price === null ? "Price on request" : formatPrice(p.price);
}

export function Price({ product, className = "" }: { product: PriceLike; className?: string }) {
  const onRequest = product.price === null || product.status === "sold";
  return (
    <span
      className={`${onRequest ? "font-display text-[10px] tracking-[0.14em] uppercase text-accent" : "font-sans font-semibold tabular-nums text-ink"} ${className}`}
    >
      {product.status === "sold" && product.price !== null ? (
        <>
          <s className="mr-1.5 font-sans text-muted tabular-nums">{formatPrice(product.price)}</s>
          Sold
        </>
      ) : (
        priceLabel(product)
      )}
    </span>
  );
}
