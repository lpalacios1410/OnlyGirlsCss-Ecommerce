import { buildDefaultCartItem } from "../../lib/cart";
import { useShoppingStore } from "../../store/shoppingStore";
import type { Product } from "../../types";

interface QuickAddToCartButtonProps {
  product: Product;
}

/**
 * Botón compacto y siempre visible para agregar al carrito desde la tarjeta.
 * En móvil no existe `hover`, así que el botón del overlay de escritorio
 * nunca aparece; este botón resuelve ese caso (y mejora la accesibilidad
 * por teclado en cualquier tamaño de pantalla).
 */
export function QuickAddToCartButton({ product }: QuickAddToCartButtonProps) {
  const { addToCart, removeFromCart, inCart } = useShoppingStore();

  const cartItem = buildDefaultCartItem(product);
  const isInCart = inCart(cartItem.key);
  const noDisponible = !product.disponible;

  const label = noDisponible
    ? `${product.nombre} no está disponible`
    : isInCart
      ? `Quitar ${product.nombre} del carrito`
      : `Agregar ${product.nombre} al carrito`;

  return (
    <button
      type="button"
      onClick={() =>
        isInCart ? removeFromCart(cartItem.key) : addToCart(cartItem)
      }
      disabled={noDisponible}
      aria-label={label}
      aria-pressed={isInCart}
      title={label}
      className={`absolute bottom-3 right-3 z-10 size-10 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md transition-all duration-300 cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-white/80 disabled:text-muted ${
        isInCart
          ? "bg-primary text-white"
          : "bg-white/85 text-primary hover:bg-primary hover:text-white"
      }`}
    >
      {isInCart ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m13-9l2 9m-5-9V6a2 2 0 10-4 0v3"
          />
        </svg>
      )}
    </button>
  );
}
