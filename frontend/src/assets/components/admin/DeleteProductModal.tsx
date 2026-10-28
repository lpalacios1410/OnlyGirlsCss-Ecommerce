import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { deleteProduct } from "../../../lib/api";
import { safeDeleteProductImage } from "../../../lib/storage";
import type { Product } from "../../../types";

interface DeleteProductModalProps {
  product: Product;
  onClose: () => void;
  onDeleted: (product: Product) => void;
}

export function DeleteProductModal({
  product,
  onClose,
  onDeleted,
}: DeleteProductModalProps) {
  const [confirmName, setConfirmName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Solo se habilita el borrado si el nombre escrito coincide exactamente
  // (ignorando mayúsculas/minúsculas y espacios de más) con el del producto.
  const nombreCoincide =
    confirmName.trim().toLowerCase() === product.nombre.trim().toLowerCase();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !loading) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [loading, onClose]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nombreCoincide || loading) return;

    setLoading(true);
    setError("");

    try {
      await deleteProduct(product.id);

      // Best-effort: si falla, el producto ya se eliminó y no se bloquea el flujo.
      await safeDeleteProductImage(product.image_url ?? product.image);

      onDeleted(product);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error del servidor");
      setLoading(false);
    }
  };

  return createPortal(
    <>
      <div
        className="fixed inset-0 bg-black/50 z-[70]"
        onClick={loading ? undefined : onClose}
        aria-hidden="true"
      />

      <div
        role="alertdialog"
        aria-modal="true"
        aria-label={`Eliminar producto ${product.nombre}`}
        className="fixed z-[80] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="p-5 flex items-center justify-between border-b border-pinklight/30">
          <h2 className="font-bold text-dark text-lg">Eliminar producto</h2>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="p-2 hover:bg-pinklight/30 rounded-full text-muted hover:text-dark transition-colors disabled:opacity-50"
            aria-label="Cerrar confirmación"
          >
            <span className="text-2xl leading-none">&times;</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="size-20 rounded-xl overflow-hidden bg-soft-gray border border-pinklight/40 shrink-0">
              <img
                src={product.image}
                alt={product.nombre || "Producto"}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-bold text-dark">{product.nombre}</p>
              <p className="text-primary font-black">${product.precio}</p>
              <p className="text-xs text-muted mt-0.5">
                {product.tipo} · #{product.id}
              </p>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">
            <p className="font-semibold">
              ⚠️ Esta acción es permanente e irreversible.
            </p>
            <p className="mt-1">
              El producto y su imagen se eliminarán de la tienda. Para
              confirmar, escribe el nombre exacto del producto:
            </p>
            <p className="mt-1 font-bold select-all">{product.nombre}</p>
          </div>

          <div>
            <label
              htmlFor="delete-confirm"
              className="block text-sm font-medium text-dark mb-1"
            >
              Nombre del producto
            </label>
            <input
              id="delete-confirm"
              type="text"
              value={confirmName}
              onChange={(e) => setConfirmName(e.target.value)}
              disabled={loading}
              autoComplete="off"
              className="w-full border border-pinklight/40 p-2.5 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-red-400 outline-none transition-all disabled:bg-soft-gray"
              placeholder={product.nombre}
            />
          </div>

          {error && (
            <p
              role="alert"
              className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3"
            >
              {error}
            </p>
          )}

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 py-3 rounded-lg font-bold border border-pinklight/40 text-dark hover:bg-pinklight/30 transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!nombreCoincide || loading}
              className={`flex-1 py-3 rounded-lg font-bold text-white transition-all shadow-lg ${
                !nombreCoincide || loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600 active:scale-95"
              }`}
            >
              {loading ? "Eliminando..." : "Eliminar definitivamente"}
            </button>
          </div>
        </form>
      </div>
    </>,
    document.body,
  );
}
