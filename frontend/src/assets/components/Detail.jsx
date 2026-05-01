import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { SpinnerLoading } from "./SpinnerLoading";
import { useAuthStore } from "../../store/authStore";
import { DetailFavoriteButton } from "./DetailFavoriteButton";

export default function ProductDetail() {
  const { isLoggedIn } = useAuthStore();

  const { productId } = useParams();
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/products");
    }
  };

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = product ? `${product.nombre} | OnlyGirlsCcs` : "Cargando producto...";
  }, [product]);

  useEffect(() => {
    fetch(`https://backendogc.vercel.app/products/${productId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener el producto");
        return res.json();
      })
      .then((json) => {
        setProduct(json.data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productId]);

  if (loading) return <SpinnerLoading />;

  if (error || !product) {
    return (
      <main id="main-content" className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-dark">Error</h1>
        <p className="text-muted">{error || "Producto no encontrado"}</p>
        <button
          onClick={goBack}
          className="bg-primary text-white px-6 py-2.5 rounded-full font-medium hover:bg-wine transition-colors"
        >
          Volver a la tienda
        </button>
      </main>
    );
  }

  return (
    <main id="main-content">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="flex items-center mb-12">
          <button
            type="button"
            onClick={goBack}
            className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 text-sm font-medium text-primary bg-pinklight/40 rounded-full hover:bg-pinklight/60 transition-colors"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L4.414 9H17a1 1 0 110 2H4.414l3.293 3.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Volver a productos
          </button>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="relative">
            <img
              alt={product.nombre}
              className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-xl"
              src={product.data.image}
              loading="lazy"
            />
            {isLoggedIn && <DetailFavoriteButton product={product} />}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-dark">
              {product.nombre}
            </h2>
            <p className="text-muted mb-6 leading-relaxed">
              {product.descripcion}
            </p>
            <p className="text-3xl font-black text-primary mb-8">
              ${product.precio}
            </p>
            <div className="mb-8">
              <label
                className="block text-sm font-medium text-dark mb-3"
                htmlFor="color"
              >
                Color disponible
              </label>
              <div className="flex items-center gap-3">
                {[
                  { label: "Rosa", class: "bg-primary" },
                  { label: "Celeste", class: "bg-skylight" },
                  { label: "Dorado", class: "bg-gold" },
                  { label: "Morado", class: "bg-pinklight border-2 border-primary" },
                ].map((color) => (
                  <button
                    key={color.label}
                    aria-label={`Seleccionar color ${color.label}`}
                    className={`w-8 h-8 rounded-full ${color.class} transition-transform hover:scale-110`}
                  />
                ))}
              </div>
            </div>
            <button
              disabled={!isLoggedIn}
              className="w-full text-white font-bold py-3.5 rounded-xl shadow-lg bg-primary hover:bg-wine transition-all disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500"
            >
              {isLoggedIn ? "Agregar al carrito" : "Inicia sesión para comprar"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
