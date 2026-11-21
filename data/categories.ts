import type { Category } from "@/lib/types";

/** Dynamic category tree — will be managed from the admin panel. */
export const categories: Category[] = [
  {
    slug: "bedding",
    name: "Bedding",
    tagline: "Quilts, duvets, bedspreads & dohars",
    description:
      "Handcrafted patchwork and appliqué bedding — quilts, duvet covers, bedspreads and dohars.",
    image: "/products/qu10/1.webp",
  },
  {
    slug: "quilts",
    name: "Quilts",
    parent: "bedding",
    tagline: "Queen & king patchwork quilts",
    description: "Batted, quilted and bordered — our signature patchwork quilts.",
  },
  {
    slug: "duvet-covers",
    name: "Duvet Covers",
    parent: "bedding",
    tagline: "Patchwork & appliqué duvet covers",
    description: "Duvet covers in Ajrakh, Kalamkari, Jaipur prints and 1930s-style patchwork.",
  },
  {
    slug: "bedspreads",
    name: "Bedspreads",
    parent: "bedding",
    tagline: "Large-format appliqué bedspreads",
    description: "Log cabins, fans dohars, houses and butterflies — bedspreads with a story in every block.",
  },
  {
    slug: "single-dohars",
    name: "Single Dohars",
    parent: "bedding",
    tagline: "Light single-bed dohars",
    description: "Lightweight single dohars in crazy-quilt and patchwork designs.",
  },
  {
    slug: "living",
    name: "Living",
    tagline: "Diwan sets, cushions & table linen",
    description: "Handcrafted pieces for the living and dining room.",
    image: "/products/tm6/1.webp",
  },
  {
    slug: "diwan-covers",
    name: "Diwan Covers with Cushions",
    parent: "living",
    tagline: "Diwan covers with matching cushions",
    description: "Diwan covers sold together with matching cushion covers.",
  },
  {
    slug: "cushion-covers",
    name: "Cushion Covers",
    parent: "living",
    tagline: "Solid & ikat cushion covers",
    description: "Cushion covers in solid colours and handloom ikat.",
  },
  {
    slug: "table-mat-sets",
    name: "Table Mat Sets",
    parent: "living",
    tagline: "Madhubani, Jaipur & block-print mats",
    description: "Table mat sets in Madhubani, Jaipur and block prints.",
  },
  {
    slug: "bags",
    name: "Bags",
    tagline: "Totes & pouches with appliqué",
    description: "Cotton totes and pouches finished with appliqué, ikat and print panels.",
    image: "/products/bag-ikat-blue/1.webp",
  },
  {
    slug: "menswear",
    name: "Menswear",
    tagline: "Kurtas, half-kurtas & half-shirts",
    description:
      "Kurtas, half-kurtas and half-shirts — readymade in S to XXL, and any size made on request.",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    slug: "kurtas",
    name: "Kurtas",
    parent: "menswear",
    tagline: "Readymade S–XXL · any size on request",
    description: "Handcrafted kurtas.",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    slug: "half-kurtas",
    name: "Half-Kurtas",
    parent: "menswear",
    tagline: "Readymade S–XXL · any size on request",
    description: "Handcrafted half-kurtas.",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    slug: "half-shirts",
    name: "Half-Shirts",
    parent: "menswear",
    tagline: "Readymade S–XXL · any size on request",
    description: "Handcrafted half-shirts.",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
];
