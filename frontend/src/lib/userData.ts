import { supabase } from "./supabase";
import type { CartItem } from "../types";

export async function loadCartItems(userId: string): Promise<CartItem[]> {
  const { data, error } = await supabase
    .from("user_cart_items")
    .select("items")
    .eq("user_id", userId)
    .single();

  if (error) {
    if (error.code === "PGRST116") return [];
    throw new Error(error.message);
  }

  return Array.isArray(data?.items) ? (data.items as CartItem[]) : [];
}

export async function saveCartItems(
  userId: string,
  items: CartItem[],
): Promise<void> {
  const { error } = await supabase.from("user_cart_items").upsert(
    {
      user_id: userId,
      items,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  );

  if (error) throw new Error(error.message);
}

export async function loadFavoriteIds(userId: string): Promise<number[]> {
  const { data, error } = await supabase
    .from("user_favorites")
    .select("product_id")
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => Number(row.product_id));
}

export async function addFavorite(userId: string, productId: number): Promise<void> {
  const { error } = await supabase
    .from("user_favorites")
    .insert({ user_id: userId, product_id: productId })
    .select()
    .maybeSingle();

  if (error && error.code !== "23505") throw new Error(error.message);
}

export async function removeFavorite(
  userId: string,
  productId: number,
): Promise<void> {
  const { error } = await supabase
    .from("user_favorites")
    .delete()
    .eq("user_id", userId)
    .eq("product_id", productId);

  if (error) throw new Error(error.message);
}

export async function saveFavoriteIds(
  userId: string,
  favorites: number[],
): Promise<void> {
  const { data: existing, error: fetchError } = await supabase
    .from("user_favorites")
    .select("product_id")
    .eq("user_id", userId);

  if (fetchError) throw new Error(fetchError.message);

  const existingIds = new Set((existing ?? []).map((row) => Number(row.product_id)));
  const newIds = new Set(favorites);

  const toAdd = favorites.filter((id) => !existingIds.has(id));
  const toRemove = Array.from(existingIds).filter((id) => !newIds.has(id));

  if (toAdd.length > 0) {
    const { error: insertError } = await supabase
      .from("user_favorites")
      .insert(toAdd.map((product_id) => ({ user_id: userId, product_id })));
    if (insertError && insertError.code !== "23505") {
      throw new Error(insertError.message);
    }
  }

  if (toRemove.length > 0) {
    const { error: deleteError } = await supabase
      .from("user_favorites")
      .delete()
      .eq("user_id", userId)
      .in("product_id", toRemove);
    if (deleteError) throw new Error(deleteError.message);
  }
}
