import { Link } from "./Link";

export function ProductCard({ product }) {
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

        {/* Hover Overlay with Actions */}
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
        <button
          className="absolute top-3 right-3 size-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-white text-muted cursor-pointer"
          aria-label="Agregar a favoritos"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
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
