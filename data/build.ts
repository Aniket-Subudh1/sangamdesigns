import { slugify } from "@/lib/format";
import type { Product, Swatch } from "@/lib/types";
import { productPhotoCount } from "./photo-index";

/* Colour words used in the notebook names → swatch values. */
const COLOR_VALUES: Record<string, string> = {
  "copper sulphate": "#2b8fa6",
  "off-white": "#efe9dc",
  multicoloured: "conic-gradient(#d4588f, #e8c450, #3bbacc, #648b70, #e06a3b, #d4588f)",
  red: "#b8322a",
  blue: "#2f5d9e",
  purple: "#6b3f8f",
  pink: "#e48aae",
  brown: "#6e4630",
  yellow: "#e8c33f",
  green: "#5f8f45",
  aqua: "#3bbacc",
  khaki: "#b5a274",
  orange: "#e07a2c",
  mustard: "#cf9f25",
  black: "#1d1d1b",
  grey: "#8b8d8c",
  white: "#f7f5f0",
  maroon: "#6d1f2a",
  mauve: "#b98fae",
  peach: "#f0b494",
  biscuit: "#d9b98f",
  navy: "#22305a",
  magenta: "#b0306f",
  golden: "#c9a043",
  beige: "#dccbb0",
  indigo: "#2f3f74",
  teal: "#1f8c8c",
  mehendi: "#7d8a3a",
  coral: "#ec7a64",
  olive: "#6f7a34",
  cream: "#efe6cf",
  lilac: "#b7a3d6",
};

const COLOR_ORDER = Object.keys(COLOR_VALUES);

function titleCase(word: string) {
  return word.replace(/(^|[\s-])([a-z])/g, (_, a, b) => a + b.toUpperCase());
}

export function swatch(name: string): Swatch {
  const key = name.toLowerCase();
  return { name: titleCase(key), value: COLOR_VALUES[key] ?? "#cccccc" };
}

/** Colour swatches in the order the colours appear in the product name. */
export function colorsFromName(name: string): Swatch[] {
  let text = ` ${name.toLowerCase().replace(/multicolored/g, "multicoloured")} `;
  const hits: { key: string; at: number }[] = [];
  for (const key of COLOR_ORDER) {
    const re = new RegExp(`(^|[^a-z-])${key.replace(/[-]/g, "\\-")}(?![a-z])`);
    const m = re.exec(text);
    if (m) {
      hits.push({ key, at: m.index });
      text = text.replace(m[0], m[0].replace(/[a-z-]/g, " "));
    }
  }
  return hits.sort((a, b) => a.at - b.at).map((h) => swatch(h.key));
}

const PATTERN_RULES: [RegExp, string][] = [
  [/flower garden/i, "My Flower Garden"],
  [/log cabin/i, "Log Cabin"],
  [/x-?\s?box/i, "X-Box"],
  [/crazy quilt/i, "Crazy Quilt"],
  [/1930/i, "1930s Designs"],
  [/ajrakh/i, "Ajrakh"],
  [/kalamkari/i, "Kalamkari"],
  [/jaipur/i, "Jaipur Prints"],
  [/sambalpuri/i, "Sambalpuri"],
  [/madhubani/i, "Madhubani"],
  [/copper sulphate/i, "Copper Sulphate Flowers"],
  [/\bfans?\b|pankha|pinwheel/i, "Fans"],
  [/house/i, "Houses"],
  [/umbrella/i, "Umbrellas"],
  [/butterfl/i, "Butterflies"],
  [/crochet/i, "Crochet"],
  [/appliqu/i, "Appliqué"],
  [/polka/i, "Polka Dots"],
  [/squares/i, "Squares"],
  [/ikat/i, "Ikat"],
];

export function patternsFromName(name: string, extra: string[] = []) {
  const found = PATTERN_RULES.filter(([re]) => re.test(name)).map(([, p]) => p);
  return Array.from(new Set([...found, ...extra]));
}

export function photos(key: string): string[] {
  const count = productPhotoCount[key] ?? 0;
  return Array.from({ length: count }, (_, i) => `/products/${key}/${i + 1}.webp`);
}

type Seed = Omit<
  Product,
  "slug" | "patterns" | "colors" | "images" | "description" | "descriptionSource" | "stock" | "status"
> & {
  /** Folder under public/products. Defaults to the first SKU, lower-cased. */
  photoKey?: string;
  colors?: string[];
  patterns?: string[];
  description?: string;
  stock?: number;
  status?: Product["status"];
  noun: string;
};

/**
 * Placeholder copy written from the notebook entry. Flagged as
 * descriptionSource "notebook" so the admin panel can swap in the
 * Instagram caption for each piece.
 */
function notebookDescription(seed: Seed, colors: Swatch[]) {
  const parts: string[] = [];
  parts.push(`${seed.name} — a handcrafted ${seed.noun} from Sangam Designs.`);
  if (colors.length > 1) {
    const names = colors.map((c) => c.name.toLowerCase());
    parts.push(
      `Pieced in ${names.slice(0, -1).join(", ")} and ${names.at(-1)}.`,
    );
  }
  if (seed.setComposition) parts.push(`Sold as a ${seed.setComposition.toLowerCase()}.`);
  if (seed.status === "sold") {
    parts.push("This piece has found its home — ask us about making a similar one for you.");
  } else if ((seed.stock ?? 1) === 1 && seed.noun !== "cushion cover" && seed.noun !== "bag") {
    parts.push("A single, one-of-a-kind piece.");
  }
  return parts.join(" ");
}

export function product(seed: Seed): Product {
  const colors = seed.colors ? seed.colors.map(swatch) : colorsFromName(seed.name);
  const key = seed.photoKey ?? seed.skus[0].toLowerCase();
  const { photoKey: _p, noun: _n, ...rest } = seed;
  void _p;
  void _n;
  return {
    ...rest,
    slug: slugify(`${seed.name} ${seed.skus[0]}`),
    colors,
    patterns: patternsFromName(seed.name, seed.patterns),
    images: photos(key),
    status: seed.status ?? "available",
    stock: seed.status === "sold" ? 0 : (seed.stock ?? seed.skus.length),
    description: seed.description ?? notebookDescription(seed, colors),
    descriptionSource: seed.description ? "photo" : "notebook",
  };
}
