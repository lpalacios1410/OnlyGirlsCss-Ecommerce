import { useEffect, useState } from "react";
import { useFavoritesStore } from "../store/favoritesStore";
import { useAuthStore } from "../store/authStore";
import { ProductListing } from "../assets/components/ProductListing";
import { SpinnerLoading } from "../assets/components/SpinnerLoading";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { supabase } from "../lib/supabase";
import type { Product } from "../types";

export default function FavoritesPage() {
  const { favorites } = useFavoritesStore();
  const { user } = useAuthStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useDocumentTitle("OnlyGirlsCcs - Favoritos");

  useEffect(() => {
    async function loadFavorites() {
      if (favorites.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .in("id", favorites);

      if (error) {
        console.error("Error loading favorites:", error.message);
        setProducts([]);
      } else {
        const mapped: Product[] = (data ?? []).map((p) => ({
          id: p.id,
          nombre: p.nombre,
          tipo: p.tipo,
          precio: p.precio,
          descripcion: p.descripcion,
          disponible: p.disponible,
          medidas: Array.isArray(p.medidas) ? p.medidas : [],
          image: p.image_url,
        }));
        setProducts(mapped);
      }
      setLoading(false);
    }

    loadFavorites();
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
        ) : (
          <ProductListing products={products} />
        )}
      </div>
    </main>
  );
}
