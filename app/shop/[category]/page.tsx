import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShopView } from "@/components/shop/ShopView";
import { getCategories, getCategory, getProducts, toSummary } from "@/lib/data";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/shop/[category]">): Promise<Metadata> {
  const { category } = await params;
  const found = await getCategory(category);
  if (!found) return { title: "Category not found" };
  return { title: found.category.name, description: found.category.description };
}

export default async function CategoryPage({ params }: PageProps<"/shop/[category]">) {
  const { category: slug } = await params;
  const found = await getCategory(slug);
  if (!found) notFound();
  const { category, parent, children } = found;
  const [products, siblingsInfo] = await Promise.all([
    getProducts({ category: slug }),
    parent ? getCategory(parent.slug) : Promise.resolve(null),
  ]);
  const summaries = products.map(toSummary);
  const chips = children
    .filter((c) => summaries.some((p) => p.category === c.slug))
    .map((c) => ({ label: c.name, value: c.slug, field: "category" as const }));

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    ...(parent ? [{ label: parent.name, href: `/shop/${parent.slug}` }] : []),
    { label: category.name, href: `/shop/${category.slug}` },
  ];

  return (
    <ShopView
      title={category.name}
      kicker={category.tagline}
      description={category.description}
      crumbs={crumbs}
      products={summaries}
      chips={chips}
      siblings={parent ? (siblingsInfo?.children ?? []) : children}
      activeSlug={slug}
      heroImage={category.image ?? summaries.find((p) => p.image)?.image ?? null}
      category={category}
    />
  );
}
