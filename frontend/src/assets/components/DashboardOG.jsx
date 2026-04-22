import { useState } from "react";

export default function DashboardOg() {
  const [formData, setFormData] = useState({
    nombre: "",
    tipo: "peluche",
    precio: "",
    descripcion: "",
    stock: "",
    image_url: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const val = name === "precio" || name === "stock" ? Number(value) : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://onlygirlsccs-ecommerce-backend.vercel.app/products",
        {
          // Cambiar url de vercel luego
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ADMIN_SECRET_KEY: import.meta.env.ADMIN_SECRET_KEY,
          },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        alert("✨ ¡Producto creado con éxito en OnlyGirlsCcs!");
        e.target.reset(); // Limpia el formulario visualmente
        setFormData({
          nombre: "",
          tipo: "peluche",
          precio: "",
          descripcion: "",
          stock: "",
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
        {/* Lado Izquierdo: Previsualización */}
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

        {/* Lado Derecho: Formulario */}
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
                Nombre del Peluche
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
                <option value="Peluche">🧸 Peluche</option>
                <option value="Bolso">👜 Bolso</option>
                <option value="Accesorio">🎀 Accesorio</option>
                <option value="Juguete">🎮 Juguete</option>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Inicial
                </label>
                <input
                  required
                  name="stock"
                  type="number"
                  onChange={handleChange}
                  className="w-full border-gray-200 border p-2.5 rounded-lg focus:ring-2 focus:ring-pink-300 outline-none"
                  placeholder="10"
                />
              </div>
            </div>

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
                required
                name="descripcion"
                rows="3"
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
