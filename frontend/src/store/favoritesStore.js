import { create } from 'zustand';

export const useFavoritesStore = create((set, get) => ({
    favorites: [],

    clearFavorites: () => set({ favorites: [] }),

    addFavorite: (product) => {
        set((state) => ({
            favorites: state.favorites.includes(product)
                ? state.favorites
                : [...state.favorites, product]
        }));
    },

    removeFavorite: (product) => {
        set((state) => ({
            favorites: state.favorites.filter((fav) => fav !== product)
        }));
    },

    isFavorite: (product) =>{
        return get().favorites.includes(product);
    },

    toggleFavorite: (product) => {
        const { addFavorite, removeFavorite, isFavorite } = get();

        const isFav = isFavorite(product)

        isFav ? removeFavorite(product) : addFavorite(product);
    },

    countFavorites:  () => {
        return get().favorites.length
    }
}));