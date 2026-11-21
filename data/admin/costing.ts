/*
 * INTERNAL — for the admin panel only. Never import from storefront code.
 *
 * Cost sheets and raw marks transcribed from the quilt notebook. Line items:
 * F-1 / F-2 = fabric 1 / fabric 2, Batting, CMT (cut-make-trim), Tailoring,
 * Border, Poplin. Values in ₹.
 */
export const quiltCostSheets = {
  QU1: { "F-1 (5×400)": 2000, "F-2": 600, Batting: 2000, CMT: 200, Tailoring: 1000, "Border (3×120)": 360, "Poplin (3×120)": 360, total: 6520, sold: true },
  QU2: { "F-1 prints (8×120)": 960, "F-2 Bombay Dyeing": 600, "Border fabric (3×120)": 360, Batting: 2000, CMT: 200, Tailoring: 1000, total: 5320, sold: true, size: "89″ × 90.5″" },
  QU3: { "F-1 (8×120)": 960, "F-2": 800, Batting: 2000, CMT: 200, Tailoring: 1000, "Border (3×120)": 360, total: 5330, sold: true, size: "96.5″ × 92.5″" },
} as const;

/* Marks written beside entries; meaning to be confirmed with the owner. */
export const notebookMarks: Record<string, string[]> = {
  QU1: ["✓", "SOLD"], QU2: ["✓", "SOLD"], QU3: ["✓", "SOLD"],
  QU4: ["✓", "D (circled)"], QU5: ["D (struck)", "?"], QU6: ["✓", "D (circled)"],
  QU7: ["✓", "D", "'Pink' struck → Red"], QU8: [], QU9: ["✓", "D (circled)"],
  QU10: ["✓", "D"], QU11: ["✓", "P (circled)"], QU12: ["Sold", "entry struck through"],
  QU13: ["✓"],
};

/* Readings to confirm with the owner. */
export const uncertainReadings = [
  "DU2 width: 101 or 104?",
  "BE10 length: 97?",
  "BE31: 'sam fans' read as Sambalpuri fans",
  "BE35 length: 94 (84 struck?)",
  "TM6–TM8 name read as 'Maroon Mango'",
  "TM14 'Tas+Cot' read as Tussar-Cotton",
  "◇ read as diamond-shaped mats",
  "TM5 and DU5e: no price written",
];
