import { product } from "../build";

/* Notebook: Single dohars (DU1a–DU8h). DU9i was struck out. */
const base = { category: "single-dohars", noun: "single dohar", sizeLabel: "Single" } as const;

export const singleDohars = [
  product({ ...base, skus: ["DU1a"], name: "Crazy Quilt with Red Diagonal Squares & Red Border", price: 2200, dimensionsIn: { w: 93, l: 55 }, colors: ["red", "multicoloured"], variantGroup: "crazy-quilt-dohar", variantLabel: "Red" }),
  product({ ...base, skus: ["DU2b"], name: "Green & Purple Patchwork", price: 2200, dimensionsIn: { w: 91, l: 55 }, colors: ["aqua", "green", "purple"] }),
  product({ ...base, skus: ["DU3c"], name: "Purple with Maroon Border", price: 2200, dimensionsIn: { w: 88, l: 55 } }),
  product({ ...base, skus: ["DU4d"], name: "Purple, Pink & Mauve", price: 2200, dimensionsIn: { w: 91, l: 55 } }),
  /* No price written in the notebook → Price on request. */
  product({ ...base, skus: ["DU5e"], name: "My Flower Garden in Purple, Pink & Blue", price: null, dimensionsIn: { w: 90, l: 54 } }),
  product({ ...base, skus: ["DU6f"], name: "Brown Patchwork", price: 2200, dimensionsIn: { w: 55, l: 88 }, colors: ["brown", "peach", "pink"] }),
  product({ ...base, skus: ["DU7g"], name: "Bars in Red", price: 2200, dimensionsIn: { w: 90, l: 56 }, colors: ["red", "maroon", "orange"] }),
  product({ ...base, skus: ["DU8h"], name: "Crazy Quilt in Purple", price: 2200, dimensionsIn: { w: 95, l: 56 }, colors: ["purple", "multicoloured"], variantGroup: "crazy-quilt-dohar", variantLabel: "Purple" }),
];
