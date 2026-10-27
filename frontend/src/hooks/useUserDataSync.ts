import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/authStore";
import { useShoppingStore } from "../store/shoppingStore";
import { useFavoritesStore } from "../store/favoritesStore";
import {
  loadCartItems,
  saveCartItems,
  loadFavoriteIds,
  saveFavoriteIds,
} from "../lib/userData";
import type { CartItem } from "../types";

function mergeCarts(local: CartItem[], remote: CartItem[]): CartItem[] {
  const map = new Map<string, CartItem>();

  for (const item of remote) {
    map.set(item.key, { ...item });
  }

  for (const item of local) {
    const existing = map.get(item.key);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      map.set(item.key, { ...item });
    }
  }

  return Array.from(map.values());
}

function mergeFavorites(local: number[], remote: number[]): number[] {
  return Array.from(new Set([...remote, ...local]));
}

export function useUserDataSync() {
  const { user, isInitialized } = useAuthStore();
  const { shoppingCart, resetCart } = useShoppingStore();
  const { favorites, resetFavorites } = useFavoritesStore();
  const lastUserId = useRef<string | null>(null);

  // Load / merge on login
  useEffect(() => {
    if (!isInitialized) return;
    const userId = user?.id;

    if (!userId) {
      lastUserId.current = null;
      return;
    }

    if (userId === lastUserId.current) return;

    async function sync() {
      useShoppingStore.setState({ isLoading: true });
      useFavoritesStore.setState({ isLoading: true });

      try {
        const [remoteCart, remoteFavorites] = await Promise.all([
          loadCartItems(userId),
          loadFavoriteIds(userId),
        ]);

        resetCart(mergeCarts(shoppingCart, remoteCart));
        resetFavorites(mergeFavorites(favorites, remoteFavorites));

        lastUserId.current = userId;
      } catch (error) {
        console.error("Error syncing user data:", error);
      } finally {
        useShoppingStore.setState({ isLoading: false });
        useFavoritesStore.setState({ isLoading: false });
      }
    }

    sync();
  }, [isInitialized, user?.id, resetCart, resetFavorites, shoppingCart, favorites]);

  // Save cart changes
  useEffect(() => {
    const userId = user?.id;
    if (!userId || lastUserId.current !== userId) return;

    const timeout = setTimeout(async () => {
      try {
        await saveCartItems(userId, shoppingCart);
      } catch (error) {
        console.error("Error saving cart:", error);
      }
    }, 600);

    return () => clearTimeout(timeout);
  }, [shoppingCart, user?.id]);

  // Save favorites changes
  useEffect(() => {
    const userId = user?.id;
    if (!userId || lastUserId.current !== userId) return;

    const timeout = setTimeout(async () => {
      try {
        await saveFavoriteIds(userId, favorites);
      } catch (error) {
        console.error("Error saving favorites:", error);
      }
    }, 600);

    return () => clearTimeout(timeout);
  }, [favorites, user?.id]);
}
