import { cacheLife, cacheTag } from "next/cache";
import { categories } from "@/data/categories";
import { galleryExtras } from "@/data/gallery";
import { products } from "@/data/products";
import { site } from "@/data/site";
import type {
  Category,
  CategoryNode,
  GalleryImage,
  Product,
  ProductSummary,
} from "@/lib/types";

/*
 * Storefront data access. Reads the seed today; the admin phase swaps the
 * bodies for DB queries and calls updateTag("catalog") after edits.
 */

function categoryName(slug: string) {
  return categories.find((c) => c.slug === slug)?.name ?? slug;
}

function rootCategoryName(slug: string) {
  const category = categories.find((c) => c.slug === slug);
  return categoryName(category?.parent ?? slug);
}

/** Slugs of a category and all its descendants. */
function categoryScope(slug: string) {
  return [slug, ...categories.filter((c) => c.parent === slug).map((c) => c.slug)];
}

function firstImage(list: Product[]) {
  return list.find((p) => p.images.length)?.images[0] ?? null;
}

export function toSummary(p: Product): ProductSummary {
  return {
    slug: p.slug,
    skus: p.skus,
    name: p.name,
    category: p.category,
    categoryName: categoryName(p.category),
    price: p.price,
    status: p.status,
    stock: p.stock,
    colors: p.colors,
    patterns: p.patterns,
    image: p.images[0] ?? null,
    hoverImage: p.images[1] ?? null,
    rootCategory: categories.find((c) => c.slug === p.category)?.parent ?? p.category,
  };
}

/** Available first, then pieces with photos, then sold. */
function storefrontOrder(a: Product, b: Product) {
  const rank = (p: Product) =>
    (p.status === "sold" ? 2 : 0) + (p.images.length ? 0 : 1);
  return rank(a) - rank(b);
}

export async function getSite() {
  "use cache";
  cacheLife("max");
  cacheTag("site");
  return site;
}

export async function getCategories(): Promise<Category[]> {
  "use cache";
  cacheLife("max");
  cacheTag("catalog");
  return categories;
}

export async function getCategoryTree(): Promise<CategoryNode[]> {
  "use cache";
  cacheLife("max");
  cacheTag("catalog");
  return categories
    .filter((c) => !c.parent)
    .map((root) => {
      const scope = categoryScope(root.slug);
      const scoped = products.filter((p) => scope.includes(p.category));
      return {
        ...root,
        children: categories.filter((c) => c.parent === root.slug),
        productCount: scoped.length,
        image: root.image ?? firstImage(scoped),
      };
    });
}

export async function getCategory(slug: string) {
  "use cache";
  cacheLife("max");
  cacheTag("catalog");
  const category = categories.find((c) => c.slug === slug);
  if (!category) return null;
  const parent = category.parent
    ? (categories.find((c) => c.slug === category.parent) ?? null)
    : null;
  const children = categories.filter((c) => c.parent === slug);
  return { category, parent, children };
}

export async function getProducts(opts: { category?: string } = {}) {
  "use cache";
  cacheLife("max");
  cacheTag("catalog");
  const scope = opts.category ? categoryScope(opts.category) : null;
  return products
    .filter((p) => !scope || scope.includes(p.category))
    .sort(storefrontOrder);
}

export async function getFeaturedProducts() {
  "use cache";
  cacheLife("max");
  cacheTag("catalog");
  return products.filter((p) => p.featured && p.images.length);
}

export async function getProduct(slug: string) {
  "use cache";
  cacheLife("max");
  cacheTag("catalog");
  return products.find((p) => p.slug === slug) ?? null;
}

export async function getProductSlugs() {
  "use cache";
  cacheLife("max");
  cacheTag("catalog");
  return products.map((p) => p.slug);
}

export async function getVariantSiblings(product: Product) {
  "use cache";
  cacheLife("max");
  cacheTag("catalog");
  if (!product.variantGroup) return [];
  return products.filter((p) => p.variantGroup === product.variantGroup);
}

export async function getRelatedProducts(product: Product, limit = 4) {
  "use cache";
  cacheLife("max");
  cacheTag("catalog");
  const sharesPattern = (p: Product) =>
    p.patterns.some((pattern) => product.patterns.includes(pattern));
  return products
    .filter(
      (p) =>
        p.slug !== product.slug &&
        !(product.variantGroup && p.variantGroup === product.variantGroup) &&
        p.images.length > 0 &&
        p.status === "available",
    )
    .sort(
      (a, b) =>
        Number(b.category === product.category) * 2 +
        Number(sharesPattern(b)) -
        (Number(a.category === product.category) * 2 + Number(sharesPattern(a))),
    )
    .slice(0, limit);
}

export async function getSearchIndex(): Promise<ProductSummary[]> {
  "use cache";
  cacheLife("max");
  cacheTag("catalog");
  return [...products].sort(storefrontOrder).map(toSummary);
}

export async function getPatterns() {
  "use cache";
  cacheLife("max");
  cacheTag("catalog");
  const counts = new Map<string, { count: number; image: string | null }>();
  for (const p of products) {
    for (const pattern of p.patterns) {
      const entry = counts.get(pattern) ?? { count: 0, image: null };
      entry.count += 1;
      entry.image ??= p.images[0] ?? null;
      counts.set(pattern, entry);
    }
  }
  return [...counts.entries()]
    .map(([name, v]) => ({ name, ...v }))
    .filter((p) => p.count > 1 && p.image)
    .sort((a, b) => b.count - a.count);
}

export async function getGallery(): Promise<GalleryImage[]> {
  "use cache";
  cacheLife("max");
  cacheTag("catalog");
  const fromProducts: GalleryImage[] = products.flatMap((p) =>
    p.images.slice(0, 2).map((src) => ({
      src,
      alt: `${p.name} — ${categoryName(p.category)}`,
      tag: rootCategoryName(p.category),
      href: `/product/${p.slug}`,
    })),
  );
  return [...fromProducts, ...galleryExtras];
}
