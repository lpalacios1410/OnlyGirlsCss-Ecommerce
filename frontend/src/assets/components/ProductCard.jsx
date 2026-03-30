import { useAuthStore } from "../../store/authStore";
import { FavoriteApplyButton } from "./FavoriteApplyButton";
import { Link } from "./Link";

export function ProductCard({ product }) {
  const { isLoggedIn } = useAuthStore();
  return (
    <article
      key={product.id}
      data-testid="product-card"
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border border-transparent hover:border-pinklight/50"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-soft-gray">
        <img
          alt={product.nombre || "Producto"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={product.data?.image || product.image}
        />

        <div className="absolute inset-0 bg-dark/10 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3">
          <button className="px-6 py-2.5 bg-white text-primary rounded-full font-semibold text-sm shadow-lg hover:bg-primary hover:text-white transition-all duration-200 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 cursor-pointer active:scale-95">
            Agregar al Carrito
          </button>
          <Link
            data-testid="viewButton"
            href={`/products/${product.id}`}
            className="px-6 py-2.5 bg-primary/90 text-white rounded-full font-semibold text-sm shadow-lg hover:bg-wine transition-all duration-200 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 delay-75"
            aria-label={`Ver detalles de ${product.nombre}`}
          >
            Ver Detalles
          </Link>
        </div>

        {/* Wishlist Button */}
        {isLoggedIn ? <FavoriteApplyButton product={product} /> : ""}
      </div>

      {/* Product Info */}
      <div className="p-5">
        <h4 className="font-bold text-dark text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">
          {product.nombre}
        </h4>
        {product.descripcion && (
          <p className="text-muted text-sm mb-3 line-clamp-2">
            {product.descripcion}
          </p>
        )}
        <div className="flex items-center justify-between">
          <p className="text-xl font-black text-primary">${product.precio}</p>
          <span className="text-xs text-muted bg-soft-gray px-2 py-1 rounded-full">
            En stock
          </span>
        </div>
      </div>
    </article>
  );
}
