import type { Swatch } from "@/lib/types";

function hash(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const LINEN = ["#efe9dc", "#f6f1e7", "#e6dece"];

/**
 * On-brand stand-in for pieces that haven't been photographed yet: a
 * patchwork of the item's own colours with running-stitch seams.
 */
export function PatchworkPlaceholder({
  seed,
  colors,
  label = "Photo coming soon",
  className = "",
}: {
  seed: string;
  colors: Swatch[];
  label?: string;
  className?: string;
}) {
  const solids = colors.map((c) => c.value).filter((v) => v.startsWith("#"));
  const palette = [...(solids.length ? solids : ["#3bbacc", "#d4588f"]), ...LINEN];
  const cols = 4;
  const rows = 5;
  const cells = Array.from({ length: cols * rows }, (_, i) => {
    const h = hash(`${seed}:${i}`);
    const diagonal = (i % cols) + Math.floor(i / cols);
    const pick = diagonal % 2 === 0 ? palette[h % palette.length] : LINEN[h % LINEN.length];
    return { x: i % cols, y: Math.floor(i / cols), fill: pick, tri: h % 5 === 0 };
  });
  const accent = solids[0] ?? "#3bbacc";
  return (
    <div className={`relative size-full overflow-hidden bg-canvas ${className}`}>
      <svg viewBox={`0 0 ${cols * 10} ${rows * 10}`} preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden="true">
        {cells.map((c, i) => (
          <g key={i}>
            <rect x={c.x * 10} y={c.y * 10} width="10" height="10" fill={c.fill} />
            {c.tri ? <path d={`M${c.x * 10} ${c.y * 10 + 10}L${c.x * 10 + 10} ${c.y * 10}V${c.y * 10 + 10}Z`} fill={accent} opacity="0.85" /> : null}
          </g>
        ))}
        {Array.from({ length: cols - 1 }, (_, i) => (
          <line key={`v${i}`} x1={(i + 1) * 10} y1="0" x2={(i + 1) * 10} y2={rows * 10} stroke="#fff" strokeOpacity="0.75" strokeWidth="0.35" strokeDasharray="1.4 1" />
        ))}
        {Array.from({ length: rows - 1 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={(i + 1) * 10} x2={cols * 10} y2={(i + 1) * 10} stroke="#fff" strokeOpacity="0.75" strokeWidth="0.35" strokeDasharray="1.4 1" />
        ))}
      </svg>
      {label ? (
        <span className="absolute inset-x-0 bottom-3 mx-auto w-fit rounded-full bg-white/90 px-3 py-1.5 font-display text-[9px] tracking-[0.16em] text-muted uppercase backdrop-blur">
          {label}
        </span>
      ) : null}
    </div>
  );
}
