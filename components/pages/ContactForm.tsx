"use client";

import { Send } from "lucide-react";
import { type FormEvent, useState } from "react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { inkCtaClass, inputClass } from "@/lib/styles";

const topics = ["General question", "Custom order (any size / colour)", "Bulk or corporate order", "Question about a piece"];

/** Composes an email to the studio (no backend yet — the admin phase adds one). */
export function ContactForm({ email }: { email: string }) {
  const [topic, setTopic] = useState(topics[0]);
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = [
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone") || "—"}`,
      `Reply to: ${data.get("email")}`,
      "",
      String(data.get("message") ?? ""),
    ].join("\n");
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(`${topic} — website`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form onSubmit={submit} className="grid gap-4">
      <fieldset className="m-0 flex flex-wrap gap-2 border-0 p-0">
        <legend className="mb-3 font-display text-[10px] tracking-[0.16em] text-muted uppercase">I&apos;d like to talk about</legend>
        {topics.map((t) => (
          <button key={t} type="button" onClick={() => setTopic(t)} aria-pressed={topic === t} className={`rounded-full border px-3.5 py-2 text-[12px] transition-colors ${topic === t ? "border-accent bg-accent text-white" : "border-line bg-white text-steel hover:border-ink"}`}>
            {t}
          </button>
        ))}
      </fieldset>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5">
          <span className="font-display text-[10px] tracking-[0.16em] text-muted uppercase">Name</span>
          <input name="name" required autoComplete="name" className={inputClass} />
        </label>
        <label className="grid gap-1.5">
          <span className="font-display text-[10px] tracking-[0.16em] text-muted uppercase">Phone (optional)</span>
          <input name="phone" type="tel" autoComplete="tel" className={inputClass} />
        </label>
      </div>
      <label className="grid gap-1.5">
        <span className="font-display text-[10px] tracking-[0.16em] text-muted uppercase">Email</span>
        <input name="email" type="email" required autoComplete="email" className={inputClass} />
      </label>
      <label className="grid gap-1.5">
        <span className="font-display text-[10px] tracking-[0.16em] text-muted uppercase">Message</span>
        <textarea name="message" required rows={5} placeholder="Sizes, colours, quantities, item codes (e.g. BE25)…" className={`${inputClass} h-auto resize-y py-3 leading-[1.6]`} />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <MagneticButton>
          <button type="submit" className={inkCtaClass}>
            <Send size={14} /> Send message
          </button>
        </MagneticButton>
        {sent ? <span className="animate-toast-in text-[12px] text-accent">Your email app should open with the message ready to send.</span> : null}
      </div>
    </form>
  );
}
