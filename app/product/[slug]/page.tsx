import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product/ProductDetail";
import { priceLabel } from "@/components/ui/Price";
import { getCategory, getProduct, getProductSlugs, getRelatedProducts, getSite, getVariantSiblings, toSummary } from "@/lib/data";

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Piece not found" };
  const description = `${product.description} ${priceLabel(product)}.`;
  return {
    title: `${product.name} (${product.skus[0]})`,
    description,
    openGraph: { title: product.name, description, images: product.images[0] ? [{ url: product.images[0] }] : undefined },
  };
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();
  const [siblings, related, site, category] = await Promise.all([
    getVariantSiblings(product),
    getRelatedProducts(product),
    getSite(),
    getCategory(product.category),
  ]);
  return (
    <ProductDetail
      product={product}
      summary={toSummary(product)}
      siblings={siblings}
      related={related.map(toSummary)}
      site={site}
      categoryName={category?.category.name ?? "Shop"}
    />
  );
}
