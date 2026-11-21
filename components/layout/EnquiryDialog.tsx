"use client";

import { Mail, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { InstagramIcon } from "@/components/ui/SocialIcons";
import { ProductImage } from "@/components/ui/ProductImage";
import { EASE, gsap, useGSAP } from "@/lib/gsap";
import { useScrollLock } from "@/lib/lenis";
import { type Enquiry, useStore } from "@/lib/store";
import { canvasCloseClass, inputClass } from "@/lib/styles";
import type { SiteContent } from "@/lib/types";

const titles: Record<Enquiry["kind"], { kicker: string; title: string }> = {
  price: { kicker: "Price on request", title: "Ask about this piece" },
  similar: { kicker: "Made to order", title: "Request a similar piece" },
  custom: { kicker: "Custom orders", title: "Tell us what you have in mind" },
  general: { kicker: "Say hello", title: "Send us a message" },
};

function draftMessage(enquiry: Enquiry) {
  const p = enquiry.product;
  const ref = p ? `${p.name} (${p.skus.join(", ")})` : "";
  switch (enquiry.kind) {
    case "price":
      return `Hi Sangam Designs! I'd love to know the price and availability of ${ref}.`;
    case "similar":
      return `Hi Sangam Designs! I loved ${ref}. Could you make a similar piece for me? Size / colours I have in mind: `;
    case "custom":
      return "Hi Sangam Designs! I'd like to discuss a custom order: ";
    default:
      return "Hi Sangam Designs! ";
  }
}

export function EnquiryDialog({ site }: { site: SiteContent }) {
  const { enquiry, closeEnquiry, pushToast } = useStore();
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const open = enquiry !== null;
  useScrollLock(open);

  const [draftFor, setDraftFor] = useState<Enquiry | null>(null);
  if (enquiry !== draftFor) {
    setDraftFor(enquiry);
    if (enquiry) setMessage(draftMessage(enquiry));
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeEnquiry();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeEnquiry]);

  useGSAP(
    () => {
      const dialog = dialogRef.current;
      const overlay = overlayRef.current;
      if (!dialog || !overlay) return;
      if (open) {
        gsap.set([overlay, dialog], { display: "grid" });
        gsap.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 });
        // Must be visible before focus(); autoAlpha would hide it for the first frame.
        gsap.set(dialog.firstElementChild, { visibility: "visible" });
        dialog.querySelector("textarea")?.focus({ preventScroll: true });
        gsap.fromTo(dialog.firstElementChild, { y: 40, scale: 0.96, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.6, ease: EASE });
      } else {
        gsap.to(overlay, { autoAlpha: 0, duration: 0.25, onComplete: () => { gsap.set(overlay, { display: "none" }); } });
        gsap.to(dialog.firstElementChild, { y: 20, autoAlpha: 0, duration: 0.25, ease: "power2.in", onComplete: () => { gsap.set(dialog, { display: "none" }); } });
      }
    },
    { dependencies: [open] },
  );

  const fullMessage = () => (name.trim() ? `${message}\n\n— ${name.trim()}` : message);

  const viaInstagram = async () => {
    try {
      await navigator.clipboard.writeText(fullMessage());
      pushToast({ title: "Message copied", detail: "Paste it into your Instagram DM to us." });
    } catch {
      /* clipboard unavailable — the DM still opens */
    }
    window.open(site.instagramDm, "_blank", "noopener,noreferrer");
  };

  const subject = enquiry?.product ? `Enquiry: ${enquiry.product.name} (${enquiry.product.skus[0]})` : "Enquiry from sangamdesigns website";
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(fullMessage())}`;
  const copy = enquiry ? titles[enquiry.kind] : titles.general;

  return (
    <>
      <div ref={overlayRef} className="fixed inset-0 z-[110] bg-black/45 backdrop-blur-[3px]" style={{ display: "none" }} onClick={closeEnquiry} aria-hidden="true" />
      <div ref={dialogRef} className="pointer-events-none fixed inset-0 z-[111] place-items-center p-4" style={{ display: "none" }}>
        <div role="dialog" aria-modal="true" aria-label={copy.title} className="pointer-events-auto relative max-h-full w-[min(520px,100%)] overflow-y-auto overscroll-contain rounded-[26px] bg-white shadow-[0_30px_80px_rgb(0_0_0/0.25)]" data-lenis-prevent>
          <div className="linen stitch relative px-6 pt-7 pb-6 sm:px-8">
            <button className={`${canvasCloseClass} absolute top-4 right-4`} onClick={closeEnquiry} aria-label="Close">
              <X size={18} />
            </button>
            <p className="m-0 font-script text-[24px] leading-none text-stitch">{copy.kicker}</p>
            <h2 className="mt-2 mb-0 max-w-[14ch] font-display text-[clamp(28px,6vw,38px)] leading-[0.95] font-medium uppercase">{copy.title}</h2>
            {enquiry?.product ? (
              <div className="mt-5 flex items-center gap-3 rounded-[14px] bg-white/80 p-2 pr-4">
                <span className="relative size-14 shrink-0 overflow-hidden rounded-[10px] bg-canvas">
                  <ProductImage src={enquiry.product.image} alt="" seed={enquiry.product.slug} colors={[]} sizes="56px" placeholderLabel="" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[13px] font-medium">{enquiry.product.name}</span>
                  <span className="text-[11px] text-muted">{enquiry.product.skus.join(", ")}</span>
                </span>
              </div>
            ) : null}
          </div>
          <div className="grid gap-3 px-6 pt-5 pb-6 sm:px-8">
            <label className="grid gap-1.5">
              <span className="font-display text-[10px] tracking-[0.16em] text-muted uppercase">Your name (optional)</span>
              <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
            </label>
            <label className="grid gap-1.5">
              <span className="font-display text-[10px] tracking-[0.16em] text-muted uppercase">Message</span>
              <textarea className={`${inputClass} h-28 resize-none py-3 leading-[1.6]`} value={message} onChange={(e) => setMessage(e.target.value)} />
            </label>
            <div className="mt-1 grid gap-2 sm:grid-cols-2">
              <button type="button" onClick={viaInstagram} className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[linear-gradient(120deg,#d4588f,#e06a3b_55%,#e8c450)] font-display text-[11px] font-medium tracking-[0.13em] text-white uppercase transition-transform hover:-translate-y-0.5 active:scale-[0.97]">
                <InstagramIcon /> DM on Instagram
              </button>
              <a href={mailto} className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink font-display text-[11px] font-medium tracking-[0.13em] text-white uppercase transition-transform hover:-translate-y-0.5 active:scale-[0.97]">
                <Mail size={15} /> Send email
              </a>
            </div>
            <p className="m-0 text-center text-[10px] text-muted">We reply on Instagram or by email at {site.email}.</p>
          </div>
        </div>
      </div>
    </>
  );
}
