import { product } from "../build";

/* Notebook: Duvet covers (DU). Dimensions in inches. */
const base = { category: "duvet-covers", noun: "duvet cover" } as const;

export const duvetCovers = [
  product({ ...base, skus: ["DU1"], name: "Leaf Duvet", price: 5500, dimensionsIn: { w: 96.5, l: 96.5 }, colors: ["blue", "yellow", "green"], patterns: ["Appliqué"], featured: true }),
  product({ ...base, skus: ["DU2"], name: "Multicoloured Pinwheel", price: 6500, dimensionsIn: { w: 101, l: 98 } }),
  /* DU3 and DU4 are identical entries → one product, stock 2. */
  product({ ...base, skus: ["DU3", "DU4"], name: "Crazy Quilt Duvet", price: 5500, dimensionsIn: { w: 100, l: 93.5 }, colors: ["multicoloured", "red"] }),
  product({ ...base, skus: ["DU5"], name: "Orange Jaipur Block Prints", price: 5500, dimensionsIn: { w: 98, l: 96 } }),
  product({ ...base, skus: ["DU18"], name: "Ajrakh Squares in Green", price: 6500, dimensionsIn: { w: 96, l: 98 }, colors: ["green", "navy"] }),
  product({ ...base, skus: ["DU19"], name: "Aqua Fan", price: 6500, dimensionsIn: { w: 90, l: 91 }, colors: ["aqua", "white"], featured: true }),
  product({ ...base, skus: ["DU20"], name: "Pink & Blue Flower Appliqué", price: 6500, dimensionsIn: { w: 88, l: 95 } }),
  product({ ...base, skus: ["DU23"], name: "1930s Design — Blue & Khaki", price: 6000, dimensionsIn: { w: 92, l: 99 } }),
  product({ ...base, skus: ["DU25"], name: "1930s Design — Black & Brown Diamond", price: 6000, dimensionsIn: { w: 90, l: 88 } }),
  product({ ...base, skus: ["DU27"], name: "Purple Block Prints", price: 6000, dimensionsIn: { w: 103, l: 87 }, colors: ["purple", "lilac", "white"] }),
  product({ ...base, skus: ["DU28"], name: "Pink & Purple Miniature My Flower Garden", price: 6000, dimensionsIn: { w: 92, l: 82 } }),
  product({ ...base, skus: ["DU29"], name: "Green Ajrakh & Orange Jaipur Flowers", price: 6500, dimensionsIn: { w: 97, l: 95 } }),
  product({ ...base, skus: ["DU30"], name: "Aqua & Blue Appliqué Flowers", price: 6500, dimensionsIn: { w: 100, l: 98 }, featured: true }),
  product({ ...base, skus: ["DU31"], name: "Blue Patch (X-Box)", price: 6000, dimensionsIn: { w: 100, l: 99 }, colors: ["blue", "white"] }),
  product({ ...base, skus: ["DU33"], name: "1930s Design in Pink", price: 6000, dimensionsIn: { w: 95, l: 99 }, colors: ["pink", "black"] }),
  product({ ...base, skus: ["DU34"], name: "Jaipur Prints in Green & Yellow", price: 6500, dimensionsIn: { w: 98, l: 98 } }),
  product({ ...base, skus: ["DU36"], name: "Miniature My Flower Garden in Peach & Brown", price: 6000, dimensionsIn: { w: 94, l: 91 } }),
  product({ ...base, skus: ["DU37"], name: "Black & Grey Appliqué Flowers", price: 6500, dimensionsIn: { w: 92, l: 98 } }),
  product({ ...base, skus: ["DU38"], name: "Off-white Crochet on Grey & Ajrakh", price: 7500, dimensionsIn: { w: 102, l: 101 } }),
  product({ ...base, skus: ["DU39"], name: "Kalamkari Butterflies", price: 8500, dimensionsIn: { w: 96, l: 96 }, colors: ["multicoloured", "black"] }),
  product({ ...base, skus: ["DU40"], name: "Copper Sulphate Flowers on Off-white & Green Ajrakh", price: 8000, dimensionsIn: { w: 100, l: 99 } }),
];
