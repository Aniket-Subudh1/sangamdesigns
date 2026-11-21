import { product } from "../build";

/*
 * Not in the notebook — photographed in the "Product Photography" album.
 * Prices not recorded → Price on request.
 */
const base = { category: "bags", noun: "bag", price: null } as const;

export const bags = [
  product({ ...base, skus: ["BAG-LOTUS"], photoKey: "bag-lotus", name: "Lotus Appliqué Tote", colors: ["cream", "purple"], patterns: ["Appliqué"], description: "Cream tote with a purple patchwork lotus appliqué." }),
  product({ ...base, skus: ["BAG-STAR"], photoKey: "bag-star", name: "Patchwork Star Tote", colors: ["cream", "pink"], patterns: ["Appliqué"], description: "Cream tote with a pink patchwork star." }),
  product({ ...base, skus: ["BAG-BLUE-FLOWER"], photoKey: "bag-blue-flower", name: "Blue Flower Appliqué Bag", colors: ["cream", "blue"], patterns: ["Appliqué"], description: "Cream bag with a blue printed flower appliqué." }),
  product({ ...base, skus: ["BAG-ZIGZAG"], photoKey: "bag-zigzag", name: "Zigzag Strip Bag", colors: ["cream", "pink"], description: "Cream bag with three pink zigzag strips." }),
  product({ ...base, skus: ["BAG-FLORAL-POUCH"], photoKey: "bag-floral-pouch", name: "Striped Floral Pouch", colors: ["pink", "white"], description: "Pouch in pink stripes with a rose-print panel." }),
  product({ ...base, skus: ["BAG-HEART"], photoKey: "bag-heart", name: "Heart Appliqué Bag", colors: ["cream", "blue"], patterns: ["Appliqué"], description: "Cream bag with a checked heart appliqué." }),
  product({ ...base, skus: ["BAG-IKAT-BLUE"], photoKey: "bag-ikat-blue", name: "Ikat Panel Tote — Blue", colors: ["cream", "blue"], patterns: ["Ikat"], variantGroup: "ikat-tote", variantLabel: "Blue", featured: true, description: "Cream tote with a blue ikat base panel." }),
  product({ ...base, skus: ["BAG-IKAT-BLACK"], photoKey: "bag-ikat-black", name: "Ikat Panel Tote — Black", colors: ["cream", "black"], patterns: ["Ikat"], variantGroup: "ikat-tote", variantLabel: "Black", description: "Cream tote with a black ikat base panel." }),
  product({ ...base, skus: ["BAG-TEAL-STRIPE"], photoKey: "bag-teal-stripe", name: "Teal Stripe Tote", colors: ["cream", "teal"], description: "Cream tote with a teal striped base." }),
  product({ ...base, skus: ["BAG-LACE"], photoKey: "bag-lace", name: "Lace Trim Tote", colors: ["cream", "golden"], description: "Cream tote finished with a curving gold lace trim." }),
  product({ ...base, skus: ["BAG-FLORAL-BAND"], photoKey: "bag-floral-band", name: "Floral Band Tote", colors: ["cream", "red", "teal"], description: "Cream tote with a red and teal floral print band." }),
  product({ ...base, skus: ["BAG-PAISLEY"], photoKey: "bag-paisley", name: "Paisley Panel Tote", colors: ["cream", "black"], description: "Cream tote with a black and white paisley panel." }),
];
