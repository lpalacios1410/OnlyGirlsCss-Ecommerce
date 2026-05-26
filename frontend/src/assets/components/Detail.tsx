import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { SpinnerLoading } from "./SpinnerLoading";
import { useAuthStore } from "../../store/authStore";
import { DetailFavoriteButton } from "./DetailFavoriteButton";
import type { Product } from "../../types";

export default function ProductDetail() {
  const { isLoggedIn } = useAuthStore();

  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/products");
    }
  };

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = product
      ? `${product.nombre} | OnlyGirlsCcs`
      : "Cargando producto...";
  }, [product]);

  useEffect(() => {
    fetch(
      `https://onlygirlsccs-ecommerce-backend.vercel.app/products/${productId}`,
    )
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener el producto");
        return res.json() as Promise<{ data: Product }>;
      })
      .then((json) => {
        setProduct(json.data);
      })
      .catch((error: Error) => {
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
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": product.nombre,
          "image": product.image,
          "description": product.descripcion,
          "offers": {
            "@type": "Offer",
            "price": product.precio,
            "priceCurrency": "USD",
            "availability": product.disponible
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock"
          }
        })}
      </script>
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
          <div className="flex flex-col-reverse md:flex-row gap-4">
            <div className="flex-1 relative">
              <img
                alt="product"
                className="w-full h-100 object-cover rounded-lg shadow-lg"
                src={product.image}
              />
              {isLoggedIn ? <DetailFavoriteButton product={product} /> : ""}
            </div>
          </div>

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
            <div className="mb-6">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${product.disponible ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${product.disponible ? "bg-green-500" : "bg-red-500"}`}
                />
                {product.disponible ? "Disponible" : "No disponible"}
              </span>
            </div>

            {product.medidas?.length > 0 && (
              <div className="mb-8">
                <label
                  className="block text-sm font-medium text-dark mb-3"
                  htmlFor="medida-select"
                >
                  Medida disponible
                </label>
                <select
                  id="medida-select"
                  className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-primary outline-none bg-white"
                  aria-label="Seleccionar medida del producto"
                >
                  <option value="">Selecciona una medida</option>
                  {product.medidas.map((m: string) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <button
              disabled={!isLoggedIn || !product.disponible}
              className="w-full text-white font-bold py-3.5 rounded-xl shadow-lg bg-primary hover:bg-wine transition-all disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500"
            >
              {!product.disponible
                ? "Agotado"
                : isLoggedIn
                  ? "Agregar al carrito"
                  : "Inicia sesión para comprar"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
