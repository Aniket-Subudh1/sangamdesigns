import { product } from "../build";

/* Notebook: BE series → "Bedspreads". Dimensions in inches. */
const base = { category: "bedspreads", noun: "bedspread" } as const;

export const bedspreads = [
  product({ ...base, skus: ["BE1"], name: "My Flower Garden in Mauve", price: 5000, dimensionsIn: { w: 99, l: 101 } }),
  product({ ...base, skus: ["BE7"], name: "Ajrakh Appliqué House", price: 5500, dimensionsIn: { w: 114, l: 112 }, colors: ["indigo", "red"] }),
  product({ ...base, skus: ["BE8"], name: "Brown & Pink Flowers", price: 6500, dimensionsIn: { w: 95, l: 96 }, patterns: ["Appliqué"] }),
  product({ ...base, skus: ["BE9"], name: "Red Butterfly Appliqué", price: 6500, dimensionsIn: { w: 102, l: 90 }, colors: ["red", "white"], featured: true }),
  product({ ...base, skus: ["BE10"], name: "Copper Sulphate Flowers on Black", price: 6500, dimensionsIn: { w: 107, l: 97 } }),
  product({ ...base, skus: ["BE11"], name: "Biscuit Crochet on Black", price: 6500, dimensionsIn: { w: 100, l: 97 } }),
  product({ ...base, skus: ["BE18"], name: "Polka Dots in Red & Blue", price: 6500, dimensionsIn: { w: 99, l: 105 } }),
  product({ ...base, skus: ["BE19"], name: "Purple Log Cabin", price: 5500, dimensionsIn: { w: 101, l: 94 }, variantGroup: "log-cabin", variantLabel: "Purple" }),
  product({ ...base, skus: ["BE21"], name: "Pink & Grey Houses", price: 6500, dimensionsIn: { w: 101, l: 96 }, patterns: ["Appliqué"], featured: true }),
  product({ ...base, skus: ["BE22"], name: "Sambalpuri Fans Dohar", price: 11000, dimensionsIn: { w: 101, l: 96 }, colors: ["maroon", "red", "multicoloured"], variantGroup: "fans-dohar", variantLabel: "Sambalpuri" }),
  product({ ...base, skus: ["BE23"], name: "Sambalpuri Blue Hand Pankha", price: 8500, dimensionsIn: { w: 101, l: 98 }, colors: ["blue", "lilac"] }),
  product({ ...base, skus: ["BE24"], name: "Kalamkari House Appliqué", price: 7500, dimensionsIn: { w: 104, l: 103 }, colors: ["brown", "maroon"] }),
  product({ ...base, skus: ["BE25"], name: "Jaipuri Prints House in Aqua & Khaki", price: 7500, dimensionsIn: { w: 102, l: 99 }, patterns: ["Appliqué"], featured: true }),
  product({ ...base, skus: ["BE26"], name: "Ajrakh Fans Dohar with Blue Border", price: 7500, dimensionsIn: { w: 97, l: 102 }, colors: ["blue", "maroon", "multicoloured"], variantGroup: "fans-dohar", variantLabel: "Ajrakh, blue border", featured: true }),
  product({ ...base, skus: ["BE27"], name: "Pink Log Cabin", price: 5500, dimensionsIn: { w: 101, l: 96 }, colors: ["pink", "coral"], variantGroup: "log-cabin", variantLabel: "Pink" }),
  product({ ...base, skus: ["BE28"], name: "Brown Butterflies on Khaki with Mangalagiri Khadi Print", price: 7500, dimensionsIn: { w: 100, l: 104 }, patterns: ["Appliqué"], featured: true }),
  product({ ...base, skus: ["BE30"], name: "Purple Diyas on Mehendi & Purple Polka Dots", price: 6500, dimensionsIn: { w: 100, l: 100 }, patterns: ["Appliqué"], featured: true }),
  product({ ...base, skus: ["BE31"], name: "Blue Bombay Dyeing with Sambalpuri Fans", price: 6000, sizeLabel: "King", colors: ["navy", "multicoloured"] }),
  product({ ...base, skus: ["BE32"], name: "Mustard & Orange Flowers with Jaipur Prints", price: 6500, dimensionsIn: { w: 102, l: 95 } }),
  product({ ...base, skus: ["BE33"], name: "Pink Houses in Brown", price: 6500, dimensionsIn: { w: 106, l: 100 }, patterns: ["Appliqué"] }),
  product({ ...base, skus: ["BE34"], name: "Orange Jaipur Flowers on Brown & Mustard", price: 6500, dimensionsIn: { w: 100, l: 100 } }),
  product({ ...base, skus: ["BE35"], name: "Multicoloured Umbrellas", price: 7000, dimensionsIn: { w: 102, l: 94 }, colors: ["multicoloured", "black", "aqua"], variantGroup: "umbrellas", variantLabel: "Multicoloured on black", featured: true }),
  product({ ...base, skus: ["BE36"], name: "Orange Log Cabin", price: 5500, dimensionsIn: { w: 102, l: 93 }, variantGroup: "log-cabin", variantLabel: "Orange" }),
  product({ ...base, skus: ["BE38"], name: "Pink & Grey Ajrakh Squares with Pink Crochet", price: 7500 }),
  product({ ...base, skus: ["BE40"], name: "Black & Grey Flowers on Biscuit", price: 6500, dimensionsIn: { w: 95, l: 95 } }),
  product({ ...base, skus: ["BE41"], name: "Umbrellas on Khaki", price: 6500, dimensionsIn: { w: 109, l: 98 }, colors: ["khaki", "white", "multicoloured"], variantGroup: "umbrellas", variantLabel: "On khaki", featured: true }),
  product({ ...base, skus: ["BE43"], name: "Ajrakh Fans Dohar", price: 7500, dimensionsIn: { w: 102, l: 97 }, colors: ["black", "blue", "multicoloured"], variantGroup: "fans-dohar", variantLabel: "Ajrakh on black" }),
  product({ ...base, skus: ["BE47"], name: "Brown Flowers on Off-white", price: 7000, dimensionsIn: { w: 106, l: 104 }, patterns: ["Appliqué"] }),
  product({ ...base, skus: ["BE48"], name: "Ajrakh Squares in Grey & Black", price: 6500, dimensionsIn: { w: 85, l: 85 } }),
];
