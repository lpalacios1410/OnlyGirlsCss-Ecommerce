import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { SpinnerLoading } from "./SpinnerLoading";
import { useAuthStore } from "../../store/authStore";
import { useShoppingStore } from "../../store/shoppingStore";
import { DetailFavoriteButton } from "./DetailFavoriteButton";
import type { Product, MedidaOption } from "../../types";

function toMedidaOption(m: string | MedidaOption): MedidaOption {
  return typeof m === "string" ? { medida: m, precio: 0 } : m;
}

export default function ProductDetail() {
  const { isLoggedIn } = useAuthStore();
  const { addToCart, inCart } = useShoppingStore();

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
  const [selectedMedida, setSelectedMedida] = useState<MedidaOption | null>(null);

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
        const medidas = (json.data.medidas ?? []).map(toMedidaOption);
        if (medidas.length > 0) {
          setSelectedMedida(medidas[0]);
        }
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
      <main className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
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

  const medidas = (product.medidas ?? []).map(toMedidaOption);

  const cartKey = selectedMedida
    ? `${product.id}-${selectedMedida.medida}`
    : `${product.id}`;

  const cartItem = {
    key: cartKey,
    productId: product.id,
    nombre: product.nombre,
    image: product.image,
    medida: selectedMedida,
    precio: selectedMedida ? selectedMedida.precio : product.precio,
  };

  const isInCart = inCart(cartItem);

  return (
    <main>
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
            <div className="mb-8">
              {selectedMedida ? (
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-black text-primary">
                    ${selectedMedida.precio}
                  </p>
                  <span className="text-sm text-muted">
                    {selectedMedida.medida}
                  </span>
                </div>
              ) : (
                <p className="text-3xl font-black text-primary">
                  ${product.precio}
                </p>
              )}
            </div>
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

            {medidas.length > 0 && (
              <div className="mb-8">
                <label className="block text-sm font-medium text-dark mb-3">
                  Medida disponible
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {medidas.map((m) => (
                    <button
                      key={m.medida}
                      onClick={() => setSelectedMedida(m)}
                      className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all cursor-pointer ${
                        selectedMedida?.medida === m.medida
                          ? "border-primary bg-pinklight/40 text-primary"
                          : "border-gray-200 bg-white text-dark hover:border-gray-300"
                      }`}
                    >
                      <span className="text-sm font-semibold">{m.medida}</span>
                      <span
                        className={`text-sm font-black mt-1 ${
                          selectedMedida?.medida === m.medida
                            ? "text-primary"
                            : "text-muted"
                        }`}
                      >
                        ${m.precio}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            <button
              disabled={!isLoggedIn || !product.disponible}
              onClick={() => addToCart(cartItem)}
              className={`w-full text-white font-bold py-3.5 rounded-xl shadow-lg transition-all disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500 ${
                isInCart
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-primary hover:bg-wine"
              }`}
            >
              {!product.disponible
                ? "Agotado"
                : isLoggedIn
                  ? isInCart
                    ? "En el carrito ✓"
                    : "Agregar al carrito"
                  : "Inicia sesión para comprar"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
