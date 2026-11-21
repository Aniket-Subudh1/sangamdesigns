"use client";

import { Check, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { ProductImage } from "@/components/ui/ProductImage";

export function Toaster() {
  const { toasts, dismissToast } = useStore();
  return (
    <div className="pointer-events-none fixed right-3 bottom-3 z-[120] flex w-[min(360px,calc(100%-24px))] flex-col gap-2" role="status" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className="animate-toast-in pointer-events-auto grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-[16px] bg-ink p-3 text-white shadow-[0_14px_34px_rgb(0_0_0/0.26)]">
          {t.image !== undefined ? (
            <span className="relative size-11 overflow-hidden rounded-[10px] bg-white/10">
              <ProductImage src={t.image} alt="" seed={t.title} colors={[]} sizes="44px" placeholderLabel="" />
            </span>
          ) : (
            <span className="grid size-9 place-items-center rounded-full bg-accent">
              <Check size={16} />
            </span>
          )}
          <div className="grid min-w-0 gap-0.5">
            <strong className="truncate text-[12px]">{t.title}</strong>
            {t.detail ? <span className="truncate text-[11px] text-white/70">{t.detail}</span> : null}
          </div>
          <div className="flex items-center gap-1">
            {t.action ? (
              <button className="rounded-full bg-white px-3 py-1.5 font-display text-[10px] tracking-[0.12em] text-ink uppercase" onClick={() => { t.action?.onClick(); dismissToast(t.id); }}>
                {t.action.label}
              </button>
            ) : null}
            <button className="grid size-7 place-items-center rounded-full text-white/70 hover:text-white" onClick={() => dismissToast(t.id)} aria-label="Dismiss">
              <X size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
