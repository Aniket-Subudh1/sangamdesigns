const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatPrice(value: number) {
  return inr.format(value);
}

export function inchesToCm(inches: number) {
  return Math.round(inches * 2.54);
}

export function formatDimensions(d: { w: number; l: number }) {
  return `${d.w}″ × ${d.l}″ (${inchesToCm(d.w)} × ${inchesToCm(d.l)} cm)`;
}

export function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function pad2(n: number) {
  return n.toString().padStart(2, "0");
}
