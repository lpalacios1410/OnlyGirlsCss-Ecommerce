import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  favorites: number[];
  isLoading: boolean;
  clearFavorites: () => void;
  addFavorite: (productId: number) => void;
  removeFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  toggleFavorite: (productId: number) => void;
  countFavorites: () => number;
  resetFavorites: (productIds: number[]) => void;
  setLoading: (loading: boolean) => void;
}

const GUEST_STORAGE_KEY = "ogc:favorites:guest";

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      isLoading: false,

      clearFavorites: () => set({ favorites: [] }),

      addFavorite: (productId) => {
        set((state) => ({
          favorites: state.favorites.includes(productId)
            ? state.favorites
            : [...state.favorites, productId],
        }));
      },

      removeFavorite: (productId) => {
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav !== productId),
        }));
      },

      isFavorite: (productId) => {
        return get().favorites.includes(productId);
      },

      toggleFavorite: (productId) => {
        const { addFavorite, removeFavorite, isFavorite } = get();
        const isFav = isFavorite(productId);
        isFav ? removeFavorite(productId) : addFavorite(productId);
      },

      countFavorites: () => {
        return get().favorites.length;
      },

      resetFavorites: (productIds) => set({ favorites: productIds }),

      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: GUEST_STORAGE_KEY,
      partialize: (state) => ({ favorites: state.favorites }),
    },
  ),
);
