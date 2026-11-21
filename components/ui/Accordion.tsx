"use client";

import { Plus } from "lucide-react";
import { type ReactNode, useRef, useState } from "react";
import { EASE, gsap, useGSAP } from "@/lib/gsap";

export type AccordionItem = { title: string; content: ReactNode };

function Panel({ open, children, compact }: { open: boolean; children: ReactNode; compact: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (first.current) {
        first.current = false;
        gsap.set(el, { height: open ? "auto" : 0, opacity: open ? 1 : 0 });
        return;
      }
      gsap.to(el, { height: open ? "auto" : 0, opacity: open ? 1 : 0, duration: 0.5, ease: EASE });
    },
    { dependencies: [open], scope: ref },
  );
  return (
    <div ref={ref} className="overflow-hidden" style={{ height: open ? undefined : 0 }}>
      <div className={compact ? "px-3 pb-3 text-[11px] leading-[1.6] text-steel" : "px-4 pb-5 text-[12px] leading-[1.75] text-steel"}>
        {children}
      </div>
    </div>
  );
}

export function Accordion({
  items,
  defaultOpen = 0,
  compact = false,
}: {
  items: AccordionItem[];
  defaultOpen?: number | null;
  compact?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  return (
    <div className={`overflow-hidden border border-line ${compact ? "rounded-[14px]" : "rounded-[18px]"}`}>
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.title} className="border-b border-line bg-white last:border-b-0">
            <button
              type="button"
              className={`group flex w-full items-center justify-between text-left font-display font-medium tracking-[0.12em] text-ink uppercase ${compact ? "px-3 py-2.5 text-[10px]" : "px-4 py-4 text-[11px]"}`}
              onClick={() => setOpen(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              {item.title}
              <span className={`grid size-6 place-items-center rounded-full transition-[transform,background-color,color] duration-300 ease-store group-hover:bg-ink group-hover:text-white ${isOpen ? "rotate-45" : ""}`}>
                <Plus size={13} />
              </span>
            </button>
            <Panel open={isOpen} compact={compact}>
              {item.content}
            </Panel>
          </div>
        );
      })}
    </div>
  );
}
