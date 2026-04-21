import { create } from 'zustand';

export const useShoppingStore = create((set, get) =>({

    shoppingCart: [],
    
    clearToCart: () => set({ shoppingCart: [] }),

    addToCart: (product) => {
        set((state) => ({
            shoppingCart: state.shoppingCart.includes(product)
                ? state.shoppingCart
                : [...state.shoppingCart, product]
        }));
    },
    removeToCart: (product) => {
        set((state) => ({
            shoppingCart: state.shoppingCart.filter((fav) => fav !== product)
        }));
    },

    inCart: (product) =>{
        return get().shoppingCart.includes(product);
    },

    toggleCart: (product) => {
        const { addToCart, removeToCart, inCart } = get();

        const isInCart = inCart(product)
        isInCart 
        ? removeToCart(product) 
        : addToCart(product);
    },

    countShoppingCart: () => {
        return get().shoppingCart.length
    }
}));