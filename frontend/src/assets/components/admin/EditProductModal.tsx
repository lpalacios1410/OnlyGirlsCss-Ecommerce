import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { updateProduct } from "../../../lib/api";
import {
  CATEGORIAS,
  tipoUsaMedidas,
  unidadMedida,
} from "../../../lib/categorias";
import {
  safeDeleteProductImage,
  uploadProductImage,
} from "../../../lib/storage";
import type { MedidaOption, Product } from "../../../types";

const CATEGORIAS = [
  { value: "Bolso", label: "👜 Bolso" },
  { value: "Juguete", label: "🎮 Juguete" },
  { value: "Peluche", label: "🧸 Peluche" },
  { value: "Termo", label: "🎀 Termo" },
];

// Misma regla que el schema del backend (backend/schemas/products.ts)
const NOMBRE_REGEX = /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ0-9\s\-_.'"]+$/;

interface EditProductModalProps {
  product: Product;
  onClose: () => void;
  onSaved: (product: Product) => void;
}

interface EditFormData {
  nombre: string;
  tipo: string;
  precio: string;
  descripcion: string;
  disponible: boolean;
  medidas: MedidaOption[];
  image_url: string;
}

export function EditProductModal({
  product,
  onClose,
  onSaved,
}: EditProductModalProps) {
  const [formData, setFormData] = useState<EditFormData>({
    nombre: product.nombre,
    tipo: product.tipo,
    precio: String(product.precio ?? ""),
    descripcion: product.descripcion ?? "",
    disponible: product.disponible,
    medidas: product.medidas ?? [],
    image_url: product.image_url ?? product.image,
  });
  const [medidaInput, setMedidaInput] = useState("");
  const [medidaPrecioInput, setMedidaPrecioInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Cerrar con Escape (si no hay una operación en curso)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !loading) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [loading, onClose]);

  // Liberar el object URL de la previsualización al cambiar/desmontar
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === "checkbox";
    const val = isCheckbox ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => {
      const next = { ...prev, [name]: val };
      // Al cambiar de categoría se limpian las medidas: cada categoría usa
      // su propia unidad (CM para peluches, ML para termos).
      if (name === "tipo") next.medidas = [];
      return next;
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : "");
  };

  const agregarMedida = () => {
    const m = medidaInput.trim().toUpperCase();
    const p = Number(medidaPrecioInput);
    if (m && p > 0 && !formData.medidas.find((e) => e.medida === m)) {
      setFormData({
        ...formData,
        medidas: [...formData.medidas, { medida: m, precio: p }],
      });
    }
    setMedidaInput("");
    setMedidaPrecioInput("");
  };

  const eliminarMedida = (idx: number) => {
    setFormData({
      ...formData,
      medidas: formData.medidas.filter((_, i) => i !== idx),
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const nombre = formData.nombre.trim();

    // Validaciones espejo del schema Zod del backend
    if (!nombre) {
      setError("El nombre es requerido.");
      return;
    }
    if (nombre.length > 100) {
      setError("El nombre no puede exceder 100 caracteres.");
      return;
    }
    if (!NOMBRE_REGEX.test(nombre)) {
      setError(
        "El nombre contiene caracteres no permitidos (solo letras, números, espacios y - _ . ' \").",
      );
      return;
    }

    if (tipoUsaMedidas(formData.tipo)) {
      if (formData.medidas.length === 0) {
        setError("Debes agregar al menos una medida con su precio.");
        return;
      }
    } else {
      const precioVal = Number(formData.precio);
      if (!precioVal || precioVal <= 0) {
        setError("Debes ingresar un precio válido.");
        return;
      }
    }

    if (formData.descripcion.length > 500) {
      setError("La descripción no puede exceder 500 caracteres.");
      return;
    }

    setLoading(true);

    try {
      let image_url = formData.image_url;
      if (selectedFile) {
        image_url = await uploadProductImage(selectedFile);
      }

      const precio = tipoUsaMedidas(formData.tipo)
        ? Math.min(...formData.medidas.map((m) => m.precio))
        : Number(formData.precio);

      const updated = await updateProduct(product.id, {
        nombre,
        tipo: formData.tipo,
        precio,
        descripcion: formData.descripcion.trim(),
        disponible: formData.disponible,
        medidas: tipoUsaMedidas(formData.tipo) ? formData.medidas : [],
        image_url,
      });

      // Si se reemplazó la imagen, se borra la anterior del bucket (best-effort)
      if (selectedFile) {
        await safeDeleteProductImage(product.image_url ?? product.image);
      }

      onSaved(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error del servidor");
    } finally {
      setLoading(false);
    }
  };

  const imagenActual = previewUrl || formData.image_url;

  // Renderizado en document.body con portal: evita el "containing block"
  // del header con backdrop-blur (mismo motivo que CartModal).
  return createPortal(
    <>
      <div
        className="fixed inset-0 bg-black/50 z-[70]"
        onClick={loading ? undefined : onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Editar producto ${product.nombre}`}
        className="fixed z-[80] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="p-5 flex items-center justify-between border-b border-pinklight/30">
          <h2 className="font-bold text-dark text-lg">Editar producto</h2>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="p-2 hover:bg-pinklight/30 rounded-full text-muted hover:text-dark transition-colors disabled:opacity-50"
            aria-label="Cerrar editor"
          >
            <span className="text-2xl leading-none">&times;</span>
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto p-6 space-y-4"
        >
          <div className="flex items-center gap-4">
            <div className="size-24 rounded-xl overflow-hidden bg-soft-gray border border-pinklight/40 shrink-0">
              {imagenActual ? (
                <img
                  src={imagenActual}
                  alt="Imagen actual del producto"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl">
                  🧸
                </div>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-dark mb-1">
                Imagen del producto
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={loading}
                className="w-full border border-pinklight/40 p-2 rounded-lg text-sm file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:bg-pinklight/60 file:text-dark file:font-medium hover:file:bg-pinklight transition-all cursor-pointer"
              />
              <p className="text-xs text-muted mt-1">
                Opcional: si no eliges un archivo, se conserva la imagen actual.
              </p>
            </div>
          </div>

          <div>
            <label
              htmlFor="edit-nombre"
              className="block text-sm font-medium text-dark mb-1"
            >
              Nombre del Producto
            </label>
            <input
              id="edit-nombre"
              required
              name="nombre"
              type="text"
              value={formData.nombre}
              onChange={handleChange}
              disabled={loading}
              maxLength={100}
              className="w-full border border-pinklight/40 p-2.5 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all disabled:bg-soft-gray"
              placeholder="Ej: Stitch con Cobija"
            />
          </div>

          <div>
            <label
              htmlFor="edit-tipo"
              className="block text-sm font-medium text-dark mb-1"
            >
              Categoría del Producto
            </label>
            <select
              id="edit-tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              disabled={loading}
              className="w-full border border-pinklight/40 p-2.5 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white transition-all disabled:bg-soft-gray"
            >
              {/* Categoría existente que no está en el catálogo actual */}
              {!CATEGORIAS.some((c) => c.value === formData.tipo) && (
                <option value={formData.tipo}>{formData.tipo}</option>
              )}
              {CATEGORIAS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {!tipoUsaMedidas(formData.tipo) && (
              <div>
                <label
                  htmlFor="edit-precio"
                  className="block text-sm font-medium text-dark mb-1"
                >
                  Precio ($)
                </label>
                <input
                  id="edit-precio"
                  required
                  name="precio"
                  type="number"
                  step="0.01"
                  value={formData.precio}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full border border-pinklight/40 p-2.5 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all disabled:bg-soft-gray"
                  placeholder="0.00"
                />
              </div>
            )}
            <div className="flex items-end">
              <label className="flex items-center gap-2 pb-2.5">
                <input
                  name="disponible"
                  type="checkbox"
                  checked={formData.disponible}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-5 h-5 accent-pink-500"
                />
                <span className="text-sm font-medium text-dark">
                  Disponible
                </span>
              </label>
            </div>
          </div>

          {tipoUsaMedidas(formData.tipo) && (
            <div>
              <label className="block text-sm font-medium text-dark mb-1">
                Medidas disponibles ({unidadMedida(formData.tipo)})
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={medidaInput}
                  onChange={(e) => setMedidaInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      agregarMedida();
                    }
                  }}
                  disabled={loading}
                  className="flex-1 border border-pinklight/40 p-2.5 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  placeholder={`Ej: ${
                    unidadMedida(formData.tipo) === "ML" ? "500ML" : "50CM"
                  }`}
                />
                <input
                  type="number"
                  step="0.01"
                  value={medidaPrecioInput}
                  onChange={(e) => setMedidaPrecioInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      agregarMedida();
                    }
                  }}
                  disabled={loading}
                  className="w-24 border border-pinklight/40 p-2.5 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  placeholder="$"
                />
                <button
                  type="button"
                  onClick={agregarMedida}
                  disabled={loading}
                  className="px-4 py-2.5 bg-pinklight/60 text-dark rounded-lg font-medium hover:bg-pinklight transition-colors whitespace-nowrap disabled:opacity-50"
                >
                  Agregar
                </button>
              </div>
              {formData.medidas.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.medidas.map((m, i) => (
                    <span
                      key={m.medida}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-pink-50 text-pink-800 rounded-full text-sm border border-pink-200"
                    >
                      {m.medida} - ${m.precio}
                      <button
                        type="button"
                        onClick={() => eliminarMedida(i)}
                        className="text-pink-600 hover:text-pink-900 font-bold leading-none"
                        aria-label={`Eliminar medida ${m.medida}`}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          <div>
            <label
              htmlFor="edit-descripcion"
              className="block text-sm font-medium text-dark mb-1"
            >
              Descripción
            </label>
            <textarea
              id="edit-descripcion"
              name="descripcion"
              rows={3}
              value={formData.descripcion}
              onChange={handleChange}
              disabled={loading}
              maxLength={500}
              className="w-full border border-pinklight/40 p-2.5 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all disabled:bg-soft-gray"
              placeholder="Detalles del producto..."
            ></textarea>
          </div>

          {error && (
            <p
              role="alert"
              className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3"
            >
              {error}
            </p>
          )}

          <div className="flex gap-3 pt-2">
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
              disabled={loading}
              className={`flex-1 py-3 rounded-lg font-bold text-white transition-all shadow-lg ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-wine active:scale-95"
              }`}
            >
              {loading ? "Guardando cambios..." : "Guardar cambios"}
            </button>
          </div>
        </form>
      </div>
    </>,
    document.body,
  );
}
