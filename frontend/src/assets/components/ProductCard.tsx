import { useAuthStore } from "../../store/authStore";
import { AddShoppingCar } from "./AddShoppingCar";
import { FavoriteApplyButton } from "./FavoriteApplyButton";
import { Link } from "./Link";
import type { Product } from "../../types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { isLoggedIn } = useAuthStore();
  return (
    <article
      key={product.id}
      data-testid="product-card"
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border border-transparent hover:border-pinklight/50"
    >
      <div className="relative aspect-square overflow-hidden bg-soft-gray">
        <img
          alt={product.nombre ? `${product.nombre} - OnlyGirlsCcs` : "Producto OnlyGirlsCcs"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={product.image}
          loading="lazy"
        />

        {isLoggedIn ? (
          <div className="absolute inset-0 bg-dark/10 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3">
            <AddShoppingCar product={product} />
            <Link
              data-testid="viewButton"
              href={`/products/${product.id}`}
              className="px-6 py-2.5 bg-primary/90 text-white rounded-full font-semibold text-sm shadow-lg hover:bg-wine transition-all duration-200 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 delay-75"
              aria-label={`Ver detalles de ${product.nombre}`}
            >
              Ver Detalles
            </Link>
          </div>
        ) : (
          ""
        )}

        {isLoggedIn ? <FavoriteApplyButton product={product} /> : ""}
      </div>

      <div className="p-5 flex flex-col gap-2">
        <h4 className="font-bold text-dark text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">
          {product.nombre}
        </h4>

        {product.medidas?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {product.medidas.map((m: string) => (
              <span
                key={m}
                className="text-xs bg-pink-100 text-pink-800 px-2 py-0.5 rounded-full"
              >
                {m}
              </span>
            ))}
          </div>
        )}
        {product.descripcion && (
          <p className="text-muted text-sm mb-3 line-clamp-2">
            {product.descripcion}
          </p>
        )}
        <div className="flex items-center justify-between">
          <p className="text-xl font-black text-primary">${product.precio}</p>
          <span
            className={`text-xs px-2 py-1 rounded-full ${product.disponible ? "text-green-700 bg-green-100" : "text-red-600 bg-red-100"}`}
          >
            {product.disponible ? "Disponible" : "No disponible"}
          </span>
        </div>
      </div>
    </article>
  );
}
