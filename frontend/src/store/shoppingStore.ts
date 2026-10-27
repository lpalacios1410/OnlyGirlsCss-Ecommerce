import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "../types";

interface ShoppingState {
  shoppingCart: CartItem[];
  isLoading: boolean;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  inCart: (key: string) => boolean;
  countShoppingCart: () => number;
  totalCart: () => number;
  setLoading: (loading: boolean) => void;
  resetCart: (items: CartItem[]) => void;
}

const GUEST_STORAGE_KEY = "ogc:cart:guest";

export const useShoppingStore = create<ShoppingState>()(
  persist(
    (set, get) => ({
      shoppingCart: [],
      isLoading: false,

      addToCart: (item) => {
        set((state) => {
          const existing = state.shoppingCart.find((i) => i.key === item.key);
          if (existing) {
            return {
              shoppingCart: state.shoppingCart.map((i) =>
                i.key === item.key ? { ...i, quantity: i.quantity + 1 } : i,
              ),
            };
          }
          return {
            shoppingCart: [...state.shoppingCart, { ...item, quantity: 1 }],
          };
        });
      },

      removeFromCart: (key) => {
        set((state) => ({
          shoppingCart: state.shoppingCart.filter((i) => i.key !== key),
        }));
      },

      updateQuantity: (key, quantity) => {
        if (quantity < 1) {
          get().removeFromCart(key);
          return;
        }
        set((state) => ({
          shoppingCart: state.shoppingCart.map((i) =>
            i.key === key ? { ...i, quantity } : i,
          ),
        }));
      },

      clearCart: () => set({ shoppingCart: [] }),

      inCart: (key) => {
        return get().shoppingCart.some((i) => i.key === key);
      },

      countShoppingCart: () => {
        return get().shoppingCart.reduce((sum, item) => sum + item.quantity, 0);
      },

      totalCart: () => {
        return get().shoppingCart.reduce(
          (sum, item) => sum + item.precio * item.quantity,
          0,
        );
      },

      setLoading: (loading) => set({ isLoading: loading }),

      resetCart: (items) => set({ shoppingCart: items }),
    }),
    {
      name: GUEST_STORAGE_KEY,
      partialize: (state) => ({ shoppingCart: state.shoppingCart }),
    },
  ),
);
