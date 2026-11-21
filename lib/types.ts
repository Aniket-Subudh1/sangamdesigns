export type Swatch = {
  name: string;
  /** Any CSS background value: a hex colour or a gradient. */
  value: string;
};

export type Category = {
  slug: string;
  name: string;
  parent?: string;
  /** Short line shown on cards and category headers. */
  tagline: string;
  description: string;
  /** Representative image; falls back to the first product image. */
  image?: string;
  /** Sizes offered for garments (Menswear). */
  sizes?: string[];
};

export type CategoryNode = Omit<Category, "image"> & {
  children: Category[];
  productCount: number;
  image: string | null;
};

export type ProductStatus = "available" | "sold";

export type Product = {
  slug: string;
  /** Notebook item codes. Several codes = identical pieces grouped as stock. */
  skus: string[];
  name: string;
  category: string;
  patterns: string[];
  description: string;
  /** "notebook" descriptions are placeholders until Instagram captions are added. */
  descriptionSource: "instagram" | "notebook" | "photo";
  /** null = "Price on request". */
  price: number | null;
  status: ProductStatus;
  stock: number;
  dimensionsIn?: { w: number; l: number };
  sizeLabel?: "Single" | "Queen" | "King";
  setComposition?: string;
  sizes?: string[];
  colors: Swatch[];
  variantGroup?: string;
  variantLabel?: string;
  images: string[];
  featured?: boolean;
};

/** Lightweight shape sent to the client for search and cart. */
export type ProductSummary = Pick<
  Product,
  | "slug"
  | "skus"
  | "name"
  | "category"
  | "price"
  | "status"
  | "stock"
  | "colors"
  | "patterns"
> & {
  image: string | null;
  hoverImage: string | null;
  categoryName: string;
  rootCategory: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
  tag: string;
  /** Product page this photo belongs to, if any. */
  href?: string;
};

export type SiteContent = {
  name: string;
  shortName: string;
  tagline: string;
  instagramHandle: string;
  instagramUrl: string;
  instagramDm: string;
  facebookUrl: string;
  email: string;
  bio: string[];
  copyrightYear: number;
};
