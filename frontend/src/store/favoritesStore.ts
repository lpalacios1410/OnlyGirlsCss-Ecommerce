import { create } from 'zustand'

interface FavoritesState {
  favorites: number[]
  clearFavorites: () => void
  addFavorite: (productId: number) => void
  removeFavorite: (productId: number) => void
  isFavorite: (productId: number) => boolean
  toggleFavorite: (productId: number) => void
  countFavorites: () => number
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],

  clearFavorites: () => set({ favorites: [] }),

  addFavorite: (productId) => {
    set((state) => ({
      favorites: state.favorites.includes(productId)
        ? state.favorites
        : [...state.favorites, productId]
    }))
  },

  removeFavorite: (productId) => {
    set((state) => ({
      favorites: state.favorites.filter((fav) => fav !== productId)
    }))
  },

  isFavorite: (productId) => {
    return get().favorites.includes(productId)
  },

  toggleFavorite: (productId) => {
    const { addFavorite, removeFavorite, isFavorite } = get()
    const isFav = isFavorite(productId)
    isFav ? removeFavorite(productId) : addFavorite(productId)
  },

  countFavorites: () => {
    return get().favorites.length
  }
}))
