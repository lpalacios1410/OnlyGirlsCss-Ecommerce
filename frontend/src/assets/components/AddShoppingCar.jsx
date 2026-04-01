import { useShoppingStore } from "../../store/shoppingStore";

export function AddShoppingCar({ product }) {
  const { inCart, toggleCart } = useShoppingStore();

  return (
    <button
      className={`px-6 py-2.5 rounded-full font-semibold text-sm shadow-lg transition-all duration-200 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 cursor-pointer active:scale-95 flex items-center gap-2
        ${inCart(product) ? "bg-gray-300 text-black" : "bg-white text-primary hover:bg-primary hover:text-white"}
      `}
      aria-label={inCart(product) ? "Quitar del carrito" : "Agregar al carrito"}
      onClick={() => toggleCart(product)}
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
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m13-9l2 9m-5-9V6a2 2 0 10-4 0v3"
        />
      </svg>
      {inCart(product) ? "Quitar del Carrito" : "Agregar al Carrito"}
    </button>
  );
}
