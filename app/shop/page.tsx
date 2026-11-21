import type { Metadata } from "next";
import { ShopView } from "@/components/shop/ShopView";
import { getCategoryTree, getSearchIndex } from "@/lib/data";

export const metadata: Metadata = {
  title: "Shop all",
  description: "Every handcrafted quilt, duvet cover, bedspread, dohar, diwan set, table mat set, cushion cover and bag from Sangam Designs.",
};

export default async function ShopPage() {
  const [tree, products] = await Promise.all([getCategoryTree(), getSearchIndex()]);
  const chips = tree
    .filter((n) => n.productCount > 0)
    .map((n) => ({ label: n.name, value: n.slug, field: "rootCategory" as const }));
  return (
    <ShopView
      title="Shop all pieces"
      kicker="The full collection"
      description="Quilts, duvet covers, bedspreads and dohars; diwan sets, table mats and cushion covers; and bags. Pieces marked “Price on request” are best discussed with us directly."
      crumbs={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }]}
      products={products}
      chips={chips}
      siblings={tree}
      heroImage="/products/be35/1.webp"
    />
  );
}
