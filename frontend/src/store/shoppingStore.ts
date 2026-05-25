import { create } from 'zustand'
import type { Product } from '../types'

interface ShoppingState {
  shoppingCart: Product[]
  clearToCart: () => void
  addToCart: (product: Product) => void
  removeToCart: (product: Product) => void
  inCart: (product: Product) => boolean
  toggleCart: (product: Product) => void
  countShoppingCart: () => number
}

export const useShoppingStore = create<ShoppingState>((set, get) => ({
  shoppingCart: [],

  clearToCart: () => set({ shoppingCart: [] }),

  addToCart: (product) => {
    set((state) => ({
      shoppingCart: state.shoppingCart.includes(product)
        ? state.shoppingCart
        : [...state.shoppingCart, product]
    }))
  },

  removeToCart: (product) => {
    set((state) => ({
      shoppingCart: state.shoppingCart.filter((fav) => fav !== product)
    }))
  },

  inCart: (product) => {
    return get().shoppingCart.includes(product)
  },

  toggleCart: (product) => {
    const { addToCart, removeToCart, inCart } = get()
    const isInCart = inCart(product)
    isInCart
      ? removeToCart(product)
      : addToCart(product)
  },

  countShoppingCart: () => {
    return get().shoppingCart.length
  }
}))
