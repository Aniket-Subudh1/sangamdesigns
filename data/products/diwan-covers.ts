import { product } from "../build";

/* Notebook: Diwan covers with cushions (DCC). All ₹3,500. */
const base = { category: "diwan-covers", noun: "diwan cover with cushions", price: 3500 } as const;

export const diwanCovers = [
  product({ ...base, skus: ["DCC1"], name: "Orange, Brown & Black Diwan Set (Black Border)" }),
  product({ ...base, skus: ["DCC2"], name: "Orange Mustard Diwan Set (Maroon Border)" }),
  product({ ...base, skus: ["DCC3"], name: "Jaipur Blocks in Orange Diwan Set" }),
  product({ ...base, skus: ["DCC4"], name: "Pink & Blue Diwan Set" }),
  /* DCC5 and DCC6 are identical entries → one product, stock 2. */
  product({ ...base, skus: ["DCC5", "DCC6"], name: "Kalamkari Butterflies Diwan Set", colors: ["multicoloured", "black"] }),
  product({ ...base, skus: ["DCC7"], name: "Ajrakh Brown & Black Diwan Set" }),
];
