import type { Metadata, Viewport } from "next";
import { Dancing_Script, Inter, Oswald } from "next/font/google";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { EnquiryDialog } from "@/components/layout/EnquiryDialog";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Preloader } from "@/components/layout/Preloader";
import { Toaster } from "@/components/layout/Toaster";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { getCategoryTree, getSearchIndex, getSite } from "@/lib/data";
import { StoreProvider } from "@/lib/store";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const oswald = Oswald({ variable: "--font-oswald", subsets: ["latin"] });
const script = Dancing_Script({ variable: "--font-script", subsets: ["latin"], weight: ["500", "600"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://sangamdesigns.vercel.app"),
  title: {
    default: "Sangam Designs — Handcrafted & Upcycled",
    template: "%s — Sangam Designs",
  },
  description:
    "Handcrafted patchwork quilts, bedspreads, dohars, table linen and bags. Upcycle & recycle to craft planet-friendly products — empowering the differently abled.",
  openGraph: {
    siteName: "Sangam Designs",
    images: [{ url: "/products/du19/1.webp" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f1ea",
  colorScheme: "light",
};

/* Runs before paint: enables motion-ready CSS and skips the intro for returning visitors. */
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(sessionStorage.getItem('sangam-intro')||matchMedia('(prefers-reduced-motion: reduce)').matches){d.dataset.intro='seen'}}catch(e){d.dataset.intro='seen'}})();`;

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [site, tree, searchIndex] = await Promise.all([getSite(), getCategoryTree(), getSearchIndex()]);

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${oswald.variable} ${script.variable} overflow-x-hidden`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="m-0 overflow-x-hidden bg-paper-warm font-sans text-charcoal antialiased">
        <StoreProvider>
          <Preloader />
          <SmoothScroll />
          <Header tree={tree} searchIndex={searchIndex} site={site} />
          <main className="overflow-hidden">{children}</main>
          <Footer tree={tree} site={site} />
          <CartDrawer />
          <EnquiryDialog site={site} />
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}
