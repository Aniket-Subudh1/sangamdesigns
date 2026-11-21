"use client";

import { ArrowLeft, Lock, Mail, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { type FormEvent, useState } from "react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ProductImage } from "@/components/ui/ProductImage";
import { InstagramIcon } from "@/components/ui/SocialIcons";
import { formatPrice } from "@/lib/format";
import { useStore } from "@/lib/store";
import { inkCtaClass, inputClass } from "@/lib/styles";
import type { SiteContent } from "@/lib/types";

const states = ["Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Odisha", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Other"];

/**
 * Checkout UI. Online payment (Razorpay) arrives with the admin phase; until
 * then the order is sent to the studio by email or Instagram.
 */
export function CheckoutView({ site }: { site: SiteContent }) {
  const { cart, subtotal, hydrated, pushToast } = useStore();
  const [orderText, setOrderText] = useState<string | null>(null);

  const compose = (form: HTMLFormElement) => {
    const d = new FormData(form);
    const lines = cart.map((l) => `• ${l.sku} — ${l.name} × ${l.quantity} = ${formatPrice(l.price * l.quantity)}`);
    return [
      "New order request from sangamdesigns website",
      "",
      ...lines,
      "",
      `Subtotal: ${formatPrice(subtotal)} (shipping to be confirmed)`,
      "",
      `Name: ${d.get("name")}`,
      `Phone: ${d.get("phone")}`,
      `Email: ${d.get("email")}`,
      `Address: ${d.get("address")}, ${d.get("city")}, ${d.get("state")} — ${d.get("pin")}`,
      d.get("notes") ? `Notes: ${d.get("notes")}` : "",
    ].join("\n");
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = compose(e.currentTarget);
    setOrderText(text);
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Order request — website")}&body=${encodeURIComponent(text)}`;
  };

  const viaInstagram = async () => {
    const form = document.getElementById("checkout-form") as HTMLFormElement | null;
    if (!form?.reportValidity()) return;
    const text = compose(form);
    setOrderText(text);
    try {
      await navigator.clipboard.writeText(text);
      pushToast({ title: "Order copied", detail: "Paste it into your Instagram DM to us." });
    } catch {
      /* ignore */
    }
    window.open(site.instagramDm, "_blank", "noopener,noreferrer");
  };

  if (hydrated && cart.length === 0) {
    return (
      <div className="stitch mx-auto grid max-w-[640px] place-items-center gap-4 rounded-[var(--card-radius)] bg-white p-12 text-center">
        <ShoppingBag size={28} className="text-muted" />
        <h1 className="m-0 font-display text-[36px] font-medium uppercase">Your bag is empty</h1>
        <p className="m-0 text-[13px] text-steel">Add a piece or two, then come back to check out.</p>
        <Link href="/shop" className={inkCtaClass}>Explore the shop</Link>
      </div>
    );
  }

  return (
    <div className="grid items-start gap-(--grid-gap) lg:grid-cols-[1.2fr_0.8fr]">
      <form id="checkout-form" onSubmit={submit} className="grid gap-5 rounded-[var(--card-radius)] bg-white p-[clamp(22px,4vw,48px)]">
        <Link href="/shop" className="inline-flex w-fit items-center gap-2 font-display text-[10px] tracking-[0.14em] text-muted uppercase hover:text-ink">
          <ArrowLeft size={13} /> Continue shopping
        </Link>
        <h1 className="m-0 font-display text-[clamp(36px,4.4vw,56px)] leading-[0.95] font-medium uppercase">Checkout</h1>
        <section className="grid gap-4">
          <p className="m-0 font-display text-[11px] tracking-[0.16em] text-muted uppercase">01 · Contact</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <input name="name" required placeholder="Full name" autoComplete="name" className={inputClass} />
            <input name="phone" required type="tel" placeholder="Phone" autoComplete="tel" className={inputClass} />
          </div>
          <input name="email" required type="email" placeholder="Email" autoComplete="email" className={inputClass} />
        </section>
        <section className="grid gap-4">
          <p className="m-0 font-display text-[11px] tracking-[0.16em] text-muted uppercase">02 · Delivery address</p>
          <input name="address" required placeholder="House, street, area" autoComplete="street-address" className={inputClass} />
          <div className="grid gap-4 sm:grid-cols-3">
            <input name="city" required placeholder="City" autoComplete="address-level2" className={inputClass} />
            <select name="state" required defaultValue="" className={inputClass}>
              <option value="" disabled>State</option>
              {states.map((s) => <option key={s}>{s}</option>)}
            </select>
            <input name="pin" required inputMode="numeric" pattern="[0-9]{6}" placeholder="PIN code" autoComplete="postal-code" className={inputClass} />
          </div>
          <textarea name="notes" rows={3} placeholder="Notes (gift message, custom size…)" className={`${inputClass} h-auto resize-y py-3`} />
        </section>
        <section className="grid gap-3">
          <p className="m-0 font-display text-[11px] tracking-[0.16em] text-muted uppercase">03 · Payment</p>
          <button type="button" disabled className="flex h-14 items-center justify-between rounded-[14px] border border-dashed border-line px-4 text-left text-[13px] text-muted">
            <span className="inline-flex items-center gap-2"><Lock size={14} /> Pay online with Razorpay</span>
            <span className="rounded-full bg-paper-warm px-2.5 py-1 font-display text-[9px] tracking-[0.14em] uppercase">Coming soon</span>
          </button>
          <p className="m-0 text-[12px] leading-[1.6] text-steel">Until online payments are live, send your order to us and we&apos;ll confirm availability, shipping and payment details.</p>
          <div className="grid gap-2 sm:grid-cols-2">
            <MagneticButton className="block" strength={0.15}>
              <button type="submit" className={`${inkCtaClass} h-12 w-full`}>
                <Mail size={15} /> Send order by email
              </button>
            </MagneticButton>
            <button type="button" onClick={viaInstagram} className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[linear-gradient(120deg,#d4588f,#e06a3b_55%,#e8c450)] font-display text-[12px] tracking-[0.13em] text-white uppercase transition-transform hover:-translate-y-0.5">
              <InstagramIcon /> Send via Instagram
            </button>
          </div>
          {orderText ? <p className="animate-toast-in m-0 text-[12px] text-accent">Your order details are ready — send them and we&apos;ll be in touch.</p> : null}
        </section>
      </form>

      <aside className="linen sticky top-24 rounded-[var(--card-radius)] border border-line p-[clamp(20px,3vw,36px)]">
        <p className="mt-0 mb-4 font-display text-[11px] tracking-[0.16em] text-muted uppercase">Order summary</p>
        <div className="grid gap-3">
          {cart.map((l) => (
            <div key={l.slug} className="grid grid-cols-[64px_1fr_auto] items-center gap-3">
              <span className="relative size-16 overflow-hidden rounded-[12px] bg-canvas">
                <ProductImage src={l.image} alt={l.name} seed={l.slug} colors={[]} sizes="64px" placeholderLabel="" />
                <span className="absolute top-1 right-1 grid size-5 place-items-center rounded-full bg-ink font-sans text-[9px] text-white">{l.quantity}</span>
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[13px] font-medium">{l.name}</span>
                <span className="text-[11px] text-muted">{l.sku}</span>
              </span>
              <span className="text-[13px] font-semibold tabular-nums">{formatPrice(l.price * l.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-2 border-t border-line pt-4 text-[13px]">
          <div className="flex justify-between"><span className="text-steel">Subtotal</span><span className="tabular-nums">{formatPrice(subtotal)}</span></div>
          <div className="flex justify-between"><span className="text-steel">Shipping</span><span className="text-muted">Confirmed after order</span></div>
          <div className="mt-2 flex justify-between font-display text-[18px] uppercase"><span>Total</span><span className="font-sans font-semibold tabular-nums">{formatPrice(subtotal)}</span></div>
        </div>
      </aside>
    </div>
  );
}
