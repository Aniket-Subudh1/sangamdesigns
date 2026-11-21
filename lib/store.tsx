"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ProductSummary } from "./types";

const CART_KEY = "sangam-cart-v1";

export type CartLine = {
  slug: string;
  sku: string;
  name: string;
  categoryName: string;
  price: number;
  image: string | null;
  stock: number;
  quantity: number;
};

export type EnquiryKind = "price" | "similar" | "general" | "custom";

export type EnquiryProduct = Pick<ProductSummary, "slug" | "name" | "skus" | "image">;

export type Enquiry = { kind: EnquiryKind; product?: EnquiryProduct };

export type Toast = {
  id: number;
  title: string;
  detail?: string;
  image?: string | null;
  action?: { label: string; onClick: () => void };
};

type StoreValue = {
  hydrated: boolean;
  cart: CartLine[];
  cartCount: number;
  subtotal: number;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  /** Returns false when the item can't be added (sold out / on request / at stock limit). */
  addToCart: (product: ProductSummary, quantity?: number) => boolean;
  removeFromCart: (slug: string) => void;
  updateQuantity: (slug: string, delta: number) => void;
  clearCart: () => void;
  enquiry: Enquiry | null;
  openEnquiry: (enquiry: Enquiry) => void;
  closeEnquiry: () => void;
  toasts: Toast[];
  pushToast: (toast: Omit<Toast, "id">) => void;
  dismissToast: (id: number) => void;
};

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [enquiry, setEnquiry] = useState<Enquiry | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(CART_KEY);
      // Hydrating from an external store (localStorage) after mount, so SSR markup matches.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved) setCart(JSON.parse(saved) as CartLine[]);
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      /* storage full or disabled */
    }
  }, [cart, hydrated]);

  const dismissToast = useCallback((id: number) => {
    setToasts((current) => current.filter((t) => t.id !== id));
  }, []);

  const pushToast = useCallback(
    (toast: Omit<Toast, "id">) => {
      toastId.current += 1;
      const id = toastId.current;
      setToasts((current) => [...current.slice(-2), { ...toast, id }]);
      window.setTimeout(() => dismissToast(id), 4200);
    },
    [dismissToast],
  );

  const addToCart = useCallback((product: ProductSummary, quantity = 1) => {
    if (product.price === null || product.status !== "available") return false;
    const price = product.price;
    const existing = cart.find((l) => l.slug === product.slug);
    const room = product.stock - (existing?.quantity ?? 0);
    if (room <= 0) return false;
    const add = Math.min(room, quantity);
    setCart((current) => {
      const line = current.find((l) => l.slug === product.slug);
      if (line) {
        return current.map((l) =>
          l.slug === product.slug ? { ...l, quantity: l.quantity + add } : l,
        );
      }
      return [
        ...current,
        {
          slug: product.slug,
          sku: product.skus[0],
          name: product.name,
          categoryName: product.categoryName,
          price,
          image: product.image,
          stock: product.stock,
          quantity: add,
        },
      ];
    });
    return true;
  }, [cart]);

  const value = useMemo<StoreValue>(
    () => ({
      hydrated,
      cart,
      cartCount: cart.reduce((sum, l) => sum + l.quantity, 0),
      subtotal: cart.reduce((sum, l) => sum + l.quantity * l.price, 0),
      isCartOpen,
      setCartOpen,
      isSearchOpen,
      setSearchOpen,
      addToCart,
      removeFromCart(slug) {
        setCart((current) => current.filter((l) => l.slug !== slug));
      },
      updateQuantity(slug, delta) {
        setCart((current) =>
          current
            .map((l) =>
              l.slug === slug
                ? { ...l, quantity: Math.min(l.stock, Math.max(0, l.quantity + delta)) }
                : l,
            )
            .filter((l) => l.quantity > 0),
        );
      },
      clearCart() {
        setCart([]);
      },
      enquiry,
      openEnquiry: setEnquiry,
      closeEnquiry() {
        setEnquiry(null);
      },
      toasts,
      pushToast,
      dismissToast,
    }),
    [hydrated, cart, isCartOpen, isSearchOpen, addToCart, enquiry, toasts, pushToast, dismissToast],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used inside StoreProvider");
  return context;
}
