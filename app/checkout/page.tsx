import type { Metadata } from "next";
import { CheckoutView } from "@/components/pages/CheckoutView";
import { getSite } from "@/lib/data";
import { contentClass } from "@/lib/styles";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

export default async function CheckoutPage() {
  const site = await getSite();
  return (
    <div className={`${contentClass} pt-[96px] pb-(--section-space)`}>
      <CheckoutView site={site} />
    </div>
  );
}
