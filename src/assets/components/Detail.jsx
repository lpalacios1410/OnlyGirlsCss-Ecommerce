import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { SpinnerLoading } from "./SpinnerLoading";

export default function ProductDetail() {
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
    document.title = `${product ? product.nombre : "Producto"}`;
  });

  useEffect(() => {
    // if (!productId) return;

    // const controller = new AbortController();

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
      <>
        <h1>Error</h1>
        <p>{error || "Producto no encontrado"}</p>
        <button
          onClick={goBack}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Volver al inicio
        </button>
      </>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-primary rounded hover:bg-primary/80 transition"
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
              Products
            </button>
          </div>
        </header>
        <main>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="flex flex-col-reverse md:flex-row gap-4">
              <div className="flex-1">
                <img
                  alt="product"
                  className="w-full h-100 object-cover rounded-lg shadow-lg"
                  src={product.data.image}
                />
              </div>
            </div>
            <div className="flex flex-col items-center lg:items-start">
              <h2 className="text-4xl lg:text-5xl font-bold mt-2 mb-4 text-slate-900">
                {product.nombre}
              </h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                {product.descripcion}
              </p>
              <div className="mb-6">
                <p className="text-3xl font-bold  text-dark">
                  {product.precio}$
                </p>
              </div>
              <div className="mb-8">
                <label
                  className="block text-sm font-medium text-slate-700  mb-2"
                  htmlFor="color"
                >
                  Color
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    aria-label="Select color pink"
                    className="w-8 h-8 rounded-full bg-rose-300 border-2 border-primary ring-2 ring-offset-2 ring-primary ring-offset-background-light dark:ring-offset-background-dark"
                  ></button>
                  <button
                    aria-label="Select color blue"
                    className="w-8 h-8 rounded-full bg-sky-300 border-2 border-slate-300 "
                  ></button>
                  <button
                    aria-label="Select color yellow"
                    className="w-8 h-8 rounded-full bg-amber-300 border-2 border-slate-300 "
                  ></button>
                  <button
                    aria-label="Select color purple"
                    className="w-8 h-8 rounded-full bg-purple-300 border-2 border-slate-300 "
                  ></button>
                </div>
              </div>
              <div className="w-1/2 flex flex-col sm:flex-row gap-4">
                <button className="flex-1  text-white font-bold py-3 px-6 rounded shadow-lg bg-primary hover:bg-primary/90 transition-transform transform hover:scale-105 flex items-center justify-center gap-3">
                  <span className="material-icons"></span>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
