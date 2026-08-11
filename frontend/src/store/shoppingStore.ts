import { create } from 'zustand'
import type { CartItem } from '../types'

interface ShoppingState {
  shoppingCart: CartItem[]
  clearToCart: () => void
  addToCart: (item: CartItem) => void
  removeToCart: (item: CartItem) => void
  inCart: (item: CartItem) => boolean
  countShoppingCart: () => number
}

export const useShoppingStore = create<ShoppingState>((set, get) => ({
  shoppingCart: [],

  clearToCart: () => set({ shoppingCart: [] }),

  addToCart: (item) => {
    set((state) => ({
      shoppingCart: state.shoppingCart.some((i) => i.key === item.key)
        ? state.shoppingCart
        : [...state.shoppingCart, item]
    }))
  },

  removeToCart: (item) => {
    set((state) => ({
      shoppingCart: state.shoppingCart.filter((i) => i.key !== item.key)
    }))
  },

  inCart: (item) => {
    return get().shoppingCart.some((i) => i.key === item.key)
  },

  countShoppingCart: () => {
    return get().shoppingCart.length
  }
}))
