import { useState } from "react";

interface DashboardFormData {
  nombre: string;
  tipo: string;
  precio: string;
  descripcion: string;
  disponible: boolean;
  medidas: string[];
  image_url: string;
}

export default function DashboardOg() {
  const [formData, setFormData] = useState<DashboardFormData>({
    nombre: "",
    tipo: "Selecciona una categoría",
    precio: "",
    descripcion: "",
    disponible: true,
    medidas: [],
    image_url: "",
  });

  const [medidaInput, setMedidaInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === "checkbox";
    const checked = isCheckbox ? (e.target as HTMLInputElement).checked : false;
    const val =
      type === "checkbox"
        ? checked
        : name === "precio"
          ? Number(value)
          : value;

    const newData = { ...formData, [name]: val };
    if (name === "tipo" && value !== "Peluche") {
      newData.medidas = [];
    }
    setFormData(newData);
  };

  const agregarMedida = () => {
    const m = medidaInput.trim().toUpperCase();
    if (m && !formData.medidas.includes(m)) {
      setFormData({ ...formData, medidas: [...formData.medidas, m] });
    }
    setMedidaInput("");
  };

  const eliminarMedida = (idx: number) => {
    setFormData({
      ...formData,
      medidas: formData.medidas.filter((_, i) => i !== idx),
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      precio: Number(formData.precio),
    };

    try {
      const response = await fetch(
        "https://onlygirlsccs-ecommerce-backend.vercel.app/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-admin-key": import.meta.env.VITE_ADMIN_SECRET_KEY as string,
          },
          body: JSON.stringify(payload),
        },
      );

      if (response.ok) {
        alert("Producto creado con éxito en OnlyGirlsCcs!");
        (e.target as HTMLFormElement).reset();
        setFormData({
          nombre: "",
          tipo: "",
          precio: "",
          descripcion: "",
          disponible: true,
          medidas: [],
          image_url: "",
        });
      } else {
        const err = await response.json();
        alert("Error: " + (err.error?.message || "Revisa los campos"));
      }
    } catch (error) {
      alert("Hubo un problema con la conexión al servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-6 font-sans">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 bg-pink-100 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-pink-200">
          <h2 className="text-pink-600 font-bold mb-4 uppercase tracking-wider text-sm">
            Vista Previa
          </h2>
          <div className="bg-white p-4 rounded-xl shadow-sm w-full aspect-square flex items-center justify-center overflow-hidden border-4 border-white">
            {formData.image_url ? (
              <img
                src={formData.image_url}
                alt="Preview"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="text-pink-300 text-center text-sm">
                <p className="text-4xl mb-2">🧸</p>
                Añade una URL para ver el peluche
              </div>
            )}
          </div>
          <div className="mt-4 text-center">
            <p className="text-xl font-bold text-gray-800">
              {formData.nombre || "Nombre del Producto"}
            </p>
            <p className="text-pink-500 font-semibold text-lg">
              {formData.precio ? `$${formData.precio}` : "$0.00"}
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8">
          <header className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">
              Panel de Inventario
            </h1>
            <p className="text-gray-500 text-sm">
              Agrega nuevos productos a OnlyGirlsCcs
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del Producto
              </label>
              <input
                required
                name="nombre"
                type="text"
                onChange={handleChange}
                className="w-full border-gray-200 border p-2.5 rounded-lg focus:ring-2 focus:ring-pink-300 outline-none transition-all"
                placeholder="Ej: Stitch con Cobija"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoría del Producto
              </label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                className="w-full border-gray-200 border p-2.5 rounded-lg focus:ring-2 focus:ring-pink-300 outline-none bg-white transition-all"
              >
                <option value="Bolso">👜 Bolso</option>
                <option value="Juguete">🎮 Juguete</option>
                <option value="Peluche">🧸 Peluche</option>
                <option value="Termo">🎀 Termo</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Precio ($)
                </label>
                <input
                  required
                  name="precio"
                  type="number"
                  step="0.01"
                  onChange={handleChange}
                  className="w-full border-gray-200 border p-2.5 rounded-lg focus:ring-2 focus:ring-pink-300 outline-none"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 mt-6">
                  <input
                    name="disponible"
                    type="checkbox"
                    checked={formData.disponible}
                    onChange={handleChange}
                    className="w-5 h-5 accent-pink-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Disponible
                  </span>
                </label>
              </div>
            </div>

            {formData.tipo === "Peluche" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Medidas disponibles
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={medidaInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setMedidaInput(e.target.value)
                    }
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        agregarMedida();
                      }
                    }}
                    className="flex-1 border-gray-200 border p-2.5 rounded-lg focus:ring-2 focus:ring-pink-300 outline-none"
                    placeholder="Ej: 50CM, 70CM, 100CM"
                  />
                  <button
                    type="button"
                    onClick={agregarMedida}
                    className="px-4 py-2.5 bg-pink-100 text-pink-700 rounded-lg font-medium hover:bg-pink-200 transition-colors"
                  >
                    Agregar
                  </button>
                </div>
                {formData.medidas.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.medidas.map((m: string, i: number) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm"
                      >
                        {m}
                        <button
                          type="button"
                          onClick={() => eliminarMedida(i)}
                          className="text-pink-600 hover:text-pink-900 font-bold leading-none"
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL de la Imagen (Supabase)
              </label>
              <input
                required
                name="image_url"
                type="text"
                onChange={handleChange}
                className="w-full border-gray-200 border p-2.5 rounded-lg focus:ring-2 focus:ring-pink-300 outline-none text-xs"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                name="descripcion"
                rows={3}
                onChange={handleChange}
                className="w-full border-gray-200 border p-2.5 rounded-lg focus:ring-2 focus:ring-pink-300 outline-none"
                placeholder="Detalles del peluche..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-bold text-white transition-all shadow-lg ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-pink-500 hover:bg-pink-600 active:scale-95"}`}
            >
              {loading ? "Guardando..." : "Publicar Producto"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
