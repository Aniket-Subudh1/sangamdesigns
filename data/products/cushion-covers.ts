import { product } from "../build";

/*
 * Not in the notebook — photographed in the "Product Photography" album.
 * Prices not recorded → Price on request.
 */
const base = { category: "cushion-covers", noun: "cushion cover", price: null, variantGroup: "cushion-covers", patterns: [] as string[] } as const;

export const cushionCovers = [
  product({ ...base, skus: ["CC-CORAL"], photoKey: "cc-coral", name: "Cushion Covers — Coral", variantLabel: "Coral", description: "Solid coral cushion covers." }),
  product({ ...base, skus: ["CC-OLIVE"], photoKey: "cc-olive", name: "Cushion Covers — Olive", variantLabel: "Olive", description: "Solid olive-green cushion covers." }),
  product({ ...base, skus: ["CC-ORANGE"], photoKey: "cc-orange", name: "Cushion Covers — Orange", variantLabel: "Orange", description: "Solid orange cushion covers." }),
  product({ ...base, skus: ["CC-IKAT-CREAM"], photoKey: "cc-ikat-cream", name: "Cushion Covers — Cream Ikat", variantLabel: "Cream ikat", colors: ["cream", "navy"], patterns: ["Ikat"], description: "Cream ikat cushion covers with a navy pattern." }),
  product({ ...base, skus: ["CC-NAVY"], photoKey: "cc-navy", name: "Cushion Covers — Navy Print", variantLabel: "Navy print", colors: ["navy", "white"], description: "Navy block-print cushion covers." }),
];
