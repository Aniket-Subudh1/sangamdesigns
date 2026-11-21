import { product } from "../build";

/*
 * Notebook: Table mat sets (TM1–TM26). Repeated entries ("ditto" marks) are
 * grouped into one product with stock = count. "6+1" / "4+1" kept as written.
 * "◇" in the notebook is read as a diamond shape — please confirm.
 */
const base = { category: "table-mat-sets", noun: "table mat set" } as const;

export const tableMats = [
  product({ ...base, skus: ["TM1", "TM2", "TM3", "TM4"], name: "Blue Fish Table Mats", price: 1500, setComposition: "Set of 6", colors: ["blue", "navy"] }),
  /* Price not written beside TM5 → Price on request. */
  product({ ...base, skus: ["TM5"], name: "Black & Grey Table Mats", price: null, setComposition: "Set of 6" }),
  product({ ...base, skus: ["TM6", "TM7", "TM8"], name: "Maroon Mango Table Mats", price: 1500, setComposition: "Set of 6", colors: ["maroon", "navy"], featured: true }),
  product({ ...base, skus: ["TM9", "TM10"], name: "Green Jaipur Table Mats", price: null, colors: ["green", "grey"], patterns: ["Jaipur Prints"] }),
  product({ ...base, skus: ["TM11"], name: "Green Print Table Mats", price: null, colors: ["green", "grey"], variantGroup: "green-print-mats", variantLabel: "Standard" }),
  product({ ...base, skus: ["TM12"], name: "Green Print Table Mats (4 + 1)", price: 1200, setComposition: "4 + 1 set", colors: ["green", "grey"], variantGroup: "green-print-mats", variantLabel: "4 + 1" }),
  product({ ...base, skus: ["TM13"], name: "Blue Print Table Mats", price: null }),
  product({ ...base, skus: ["TM14"], name: "Brown Madhubani Table Mats on Tussar-Cotton (Diamond)", price: 2500, setComposition: "6 + 1 set", colors: ["brown"], variantGroup: "madhubani-mats", variantLabel: "Brown tussar ◇" }),
  product({ ...base, skus: ["TM15"], name: "Brown Madhubani Table Mats", price: 2500, setComposition: "6 + 1 set", variantGroup: "madhubani-mats", variantLabel: "Brown" }),
  product({ ...base, skus: ["TM16"], name: "Magenta Table Mats", price: 2500, setComposition: "6 + 1 set", variantGroup: "madhubani-mats", variantLabel: "Magenta" }),
  product({ ...base, skus: ["TM17", "TM19", "TM20", "TM21"], name: "Blue Madhubani Table Mats", price: 2500, setComposition: "6 + 1 set", variantGroup: "madhubani-mats", variantLabel: "Blue" }),
  product({ ...base, skus: ["TM18"], name: "Blue Madhubani Table Mats (Diamond)", price: 2500, setComposition: "6 + 1 set", colors: ["blue"], variantGroup: "madhubani-mats", variantLabel: "Blue ◇" }),
  product({ ...base, skus: ["TM22"], name: "Maroon & Beige Madhubani Table Mats", price: null, variantGroup: "madhubani-mats", variantLabel: "Maroon & beige" }),
  product({ ...base, skus: ["TM23"], name: "Golden Table Mats (4 + 1)", price: 2000, setComposition: "4 + 1 set", photoKey: "tm24", variantGroup: "golden-mats", variantLabel: "4 + 1" }),
  product({ ...base, skus: ["TM24", "TM25"], name: "Golden Table Mats (6 + 1)", price: 2500, setComposition: "6 + 1 set", variantGroup: "golden-mats", variantLabel: "6 + 1" }),
  product({ ...base, skus: ["TM26"], name: "Maroon Diamond Table Mats (4 + 1)", price: 2000, setComposition: "4 + 1 set", colors: ["maroon"] }),
];
