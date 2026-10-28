import { useEffect, useMemo, useState } from "react";
import { getProducts } from "../../../lib/api";
import type { MedidaOption, Product } from "../../../types";
import { SearchInput } from "../SearchInput";
import { SpinnerLoading } from "../SpinnerLoading";
import { EmptyResults } from "../EmptyResults";
import { EditProductModal } from "./EditProductModal";
import { DeleteProductModal } from "./DeleteProductModal";

// Secciones del catálogo en el orden de la tienda.
const SECCIONES: { tipo: string; label: string; icon: string }[] = [
  { tipo: "Bolso", label: "Bolsos", icon: "👜" },
  { tipo: "Termo", label: "Termos", icon: "🎀" },
  { tipo: "Juguete", label: "Juguetes", icon: "🎮" },
  { tipo: "Peluche", label: "Peluches", icon: "🧸" },
];

interface ProductGroup {
  key: string;
  titulo: string;
  icon: string;
  productos: Product[];
}

const ADMIN_PAGE_SIZE = 500;
const TIPO_ALL = "all";

export function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  // Solo cubre la primera carga: en filtros/editados posteriores se mantiene
  // el listado visible hasta que llegan los datos nuevos.
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [tipoFilter, setTipoFilter] = useState<string>(TIPO_ALL);

  const [editing, setEditing] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState<Product | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  // Debounce del buscador: evita una petición por cada tecla.
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(t);
  }, [searchTerm]);

  // La búsqueda se resuelve en el backend (parámetro `q`), no en el cliente.
  useEffect(() => {
    const controller = new AbortController();

    getProducts(
      {
        limit: ADMIN_PAGE_SIZE,
        q: debouncedSearch.trim() || undefined,
        tipo: tipoFilter !== TIPO_ALL ? tipoFilter : undefined,
      },
      controller.signal,
    )
      .then((res) => {
        setProducts(res.data);
        setError("");
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        setError(
          err instanceof Error ? err.message : "Error al cargar los productos",
        );
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [debouncedSearch, tipoFilter, reloadKey]);

  // Agrupar por sección (Bolsos, Termos, Juguetes, Peluches + Otros).
  const grupos = useMemo<ProductGroup[]>(() => {
    const porTipo = (tipo: string) =>
      products.filter((p) => p.tipo?.toLowerCase() === tipo.toLowerCase());

    const resultado: ProductGroup[] = SECCIONES.filter(
      (s) => porTipo(s.tipo).length > 0,
    ).map((s) => ({
      key: s.tipo,
      titulo: s.label,
      icon: s.icon,
      productos: porTipo(s.tipo),
    }));

    const otros = products.filter(
      (p) =>
        !SECCIONES.some((s) => s.tipo.toLowerCase() === p.tipo?.toLowerCase()),
    );
    if (otros.length > 0) {
      resultado.push({
        key: "otros",
        titulo: "Otros",
        icon: "📦",
        productos: otros,
      });
    }

    return resultado;
  }, [products]);

  const hayFiltros =
    debouncedSearch.trim() !== "" || tipoFilter !== TIPO_ALL;

  const limpiarFiltros = () => {
    setSearchTerm("");
    setTipoFilter(TIPO_ALL);
  };

  return (
    <section aria-label="Gestión de productos">
      <div className="mb-4">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Buscar producto por nombre, tipo o descripción..."
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          type="button"
          onClick={() => setTipoFilter(TIPO_ALL)}
          aria-pressed={tipoFilter === TIPO_ALL}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            tipoFilter === TIPO_ALL
              ? "bg-primary text-white shadow"
              : "bg-white text-muted border border-pinklight/40 hover:bg-pinklight/40 hover:text-dark"
          }`}
        >
          Todos
        </button>
        {SECCIONES.map((s) => (
          <button
            key={s.tipo}
            type="button"
            onClick={() => setTipoFilter(s.tipo)}
            aria-pressed={tipoFilter === s.tipo}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              tipoFilter === s.tipo
                ? "bg-primary text-white shadow"
                : "bg-white text-muted border border-pinklight/40 hover:bg-pinklight/40 hover:text-dark"
            }`}
          >
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <SpinnerLoading />
        </div>
      ) : error ? (
        <div
          role="alert"
          className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-6 text-center"
        >
          <p className="font-semibold mb-2">No se pudieron cargar los productos</p>
          <p className="text-sm mb-4">{error}</p>
          <button
            type="button"
            onClick={() => setReloadKey((k) => k + 1)}
            className="px-6 py-2.5 bg-primary text-white rounded-full font-medium hover:bg-wine transition-colors"
          >
            Reintentar
          </button>
        </div>
      ) : products.length === 0 ? (
        <EmptyResults
          query={hayFiltros ? debouncedSearch : undefined}
          onClear={hayFiltros ? limpiarFiltros : undefined}
        />
      ) : (
        <div className="space-y-10">
          {grupos.map((grupo) => (
            <div key={grupo.key}>
              <h3 className="text-lg font-bold text-dark mb-4 flex items-center gap-2">
                <span aria-hidden="true">{grupo.icon}</span>
                {grupo.titulo}
                <span className="text-sm font-medium text-muted">
                  ({grupo.productos.length})
                </span>
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {grupo.productos.map((product) => (
                  <AdminProductCard
                    key={product.id}
                    product={product}
                    onEdit={() => setEditing(product)}
                    onDelete={() => setDeleting(product)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <EditProductModal
          product={editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            setReloadKey((k) => k + 1);
          }}
        />
      )}

      {deleting && (
        <DeleteProductModal
          product={deleting}
          onClose={() => setDeleting(null)}
          onDeleted={() => {
            setDeleting(null);
            setReloadKey((k) => k + 1);
          }}
        />
      )}
    </section>
  );
}

interface AdminProductCardProps {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
}

function AdminProductCard({ product, onEdit, onDelete }: AdminProductCardProps) {
  const medidas = (product.medidas ?? []).filter(
    (m: MedidaOption) => m.precio > 0,
  );
  const precios =
    medidas.length > 0 ? medidas.map((m) => m.precio) : [product.precio];
  const minPrecio = Math.min(...precios);
  const maxPrecio = Math.max(...precios);

  return (
    <article
      data-testid="admin-product-card"
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-pinklight/30 flex flex-col transition-shadow hover:shadow-lg hover:shadow-primary/10"
    >
      <div className="relative aspect-square bg-soft-gray">
        <img
          src={product.image}
          alt={product.nombre || "Producto"}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <span
          className={`absolute top-2 left-2 text-xs px-2 py-1 rounded-full font-medium ${
            product.disponible
              ? "text-green-700 bg-green-100"
              : "text-red-600 bg-red-100"
          }`}
        >
          {product.disponible ? "Disponible" : "No disponible"}
        </span>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <h4 className="font-bold text-dark line-clamp-1">{product.nombre}</h4>
        <p className="text-lg font-black text-primary">
          {minPrecio !== maxPrecio
            ? `$${minPrecio} - $${maxPrecio}`
            : `$${minPrecio}`}
        </p>

        {medidas.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {medidas.map((m) => (
              <span
                key={m.medida}
                className="text-xs bg-pink-50 text-pink-800 px-2 py-0.5 rounded-full border border-pink-200"
              >
                {m.medida}
                <span className="font-semibold ml-1">${m.precio}</span>
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex gap-2 pt-2">
          <button
            type="button"
            onClick={onEdit}
            className="flex-1 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-wine transition-colors"
          >
            ✏️ Editar
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="flex-1 px-4 py-2.5 rounded-lg bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors"
          >
            🗑️ Eliminar
          </button>
        </div>
      </div>
    </article>
  );
}
