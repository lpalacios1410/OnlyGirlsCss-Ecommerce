import { useEffect, useState } from "react";
import { useFavoritesStore } from "../store/favoritesStore";
import { useAuthStore } from "../store/authStore";
import { ProductListing } from "../assets/components/ProductListing";
import { SpinnerLoading } from "../assets/components/SpinnerLoading";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { getProducts } from "../lib/api";
import type { Product } from "../types";

export default function FavoritesPage() {
  const { favorites } = useFavoritesStore();
  const { user } = useAuthStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useDocumentTitle("OnlyGirlsCcs - Favoritos");

  useEffect(() => {
    const controller = new AbortController();

    async function loadFavorites() {
      if (favorites.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // Se pide al backend en lugar de consultar Supabase directamente:
        // asi respeta las politicas RLS del rol authenticated y usa el
        // mismo mapeo de productos que el resto de la tienda.
        const { data } = await getProducts(
          { ids: favorites, limit: favorites.length, offset: 0 },
          controller.signal,
        );
        setProducts(data);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Error loading favorites:", error);
          setProducts([]);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadFavorites();
    return () => controller.abort();
  }, [favorites]);

  return (
    <main className="px-4 sm:px-6 lg:px-8 py-8 bg-soft-gray min-h-[60vh]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-dark mb-6">Tus Favoritos</h1>

        {!user && favorites.length > 0 && (
          <p className="text-muted mb-6">
            Inicia sesión para guardar tus favoritos en tu cuenta.
          </p>
        )}

        {loading ? (
          <SpinnerLoading />
        ) : favorites.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-pinklight/30 shadow-sm">
            <p className="text-muted text-lg">
              No tienes productos en favoritos.
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-pinklight/30 shadow-sm">
            <p className="text-muted text-lg">
              No se pudieron cargar tus favoritos. Revisa que el servidor
              este en marcha o recarga la pagina.
            </p>
          </div>
        ) : (
          <ProductListing products={products} />
        )}
      </div>
    </main>
  );
}
