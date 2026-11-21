import { product } from "../build";

/* Notebook: QUILTS (QU1–QU13). No selling prices recorded → Price on request. */
const base = { category: "quilts", noun: "patchwork quilt", price: null } as const;

export const quilts = [
  product({ ...base, skus: ["QU1"], name: "Indigo Ajrakh Appliqué on Red Squares", status: "sold", colors: ["indigo", "red"] }),
  product({ ...base, skus: ["QU2"], name: "My Flower Garden — Red", status: "sold", dimensionsIn: { w: 89, l: 90.5 } }),
  product({ ...base, skus: ["QU3"], name: "Blue Diagonal Squares", status: "sold", dimensionsIn: { w: 96.5, l: 92.5 }, variantGroup: "diagonal-squares", variantLabel: "Blue" }),
  product({ ...base, skus: ["QU4"], name: "Purple Diagonal Squares", sizeLabel: "Queen", variantGroup: "diagonal-squares", variantLabel: "Purple", featured: true }),
  product({ ...base, skus: ["QU5"], name: "Pink Crochet Quilt", sizeLabel: "Queen" }),
  product({ ...base, skus: ["QU6"], name: "Brown & Yellow X-Box", variantGroup: "x-box-quilt", variantLabel: "Brown & Yellow" }),
  product({ ...base, skus: ["QU7"], name: "X-Box Quilt in Red", colors: ["red", "white"], variantGroup: "x-box-quilt", variantLabel: "Red" }),
  product({ ...base, skus: ["QU8"], name: "Sunflower Fields — Yellow Jaipuri Squares", colors: ["yellow", "mustard", "white"], patterns: ["Jaipur Prints"] }),
  product({ ...base, skus: ["QU9"], name: "Waves of the Ocean (White Border)", sizeLabel: "Queen", colors: ["blue", "black", "white"], featured: true }),
  product({ ...base, skus: ["QU10"], name: "Fans of Love — Fans on Red Squares", sizeLabel: "King", colors: ["red", "white"], patterns: ["Fans"], featured: true }),
  product({ ...base, skus: ["QU11"], name: "Leaves in the Monsoon", colors: ["black", "peach", "red"] }),
  product({ ...base, skus: ["QU12"], name: "Spring — Green & Yellow Squares in Jaipur Print", sizeLabel: "King", status: "sold" }),
  product({ ...base, skus: ["QU13"], name: "X-Box in Pink", colors: ["pink", "white"], variantGroup: "x-box-quilt", variantLabel: "Pink" }),
];
