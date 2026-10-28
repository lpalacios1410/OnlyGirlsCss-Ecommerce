import { createPortal } from "react-dom";
import { useShoppingStore } from "../../store/shoppingStore";

interface CartModalProps {
  onClose: () => void;
  isOpen: boolean;
}

export function CartModal({ onClose, isOpen }: CartModalProps) {
  const {
    shoppingCart,
    updateQuantity,
    removeFromCart,
    totalCart,
    countShoppingCart,
  } = useShoppingStore();

  const total = totalCart();
  const count = countShoppingCart();

  // Se renderiza en document.body con un portal: el header aplica backdrop-blur,
  // lo que crea un "containing block" para los descendentes position:fixed y
  // provocaba scroll horizontal con el panel fuera de pantalla (translate-x-full).
  return createPortal(
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`fixed flex flex-col w-80 sm:w-96 h-[calc(100vh-4rem)] top-14 right-0 bg-white rounded-l-2xl z-50 shadow-2xl transform transition-transform duration-300 ease-in-out overflow-hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
      >
        <div className="p-4 flex items-center justify-between border-b border-pinklight/30">
          <h2 className="font-bold text-dark text-lg">
            Tu carrito ({count})
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-pinklight/30 rounded-full text-muted hover:text-dark transition-colors"
            aria-label="Cerrar carrito"
          >
            <span className="text-2xl leading-none">&times;</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {shoppingCart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-12 mb-3 text-pinklight"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m13-9l2 9m-5-9V6a2 2 0 10-4 0v3"
                />
              </svg>
              <p className="text-lg font-medium">El carrito está vacío</p>
              <p className="text-sm">Agrega productos para comenzar</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {shoppingCart.map((item) => (
                <li
                  key={item.key}
                  className="flex gap-3 items-start border-b border-pinklight/20 pb-4 min-w-0"
                >
                  <img
                    src={item.image}
                    alt={item.nombre}
                    className="w-16 h-16 object-cover rounded-lg shrink-0 bg-soft-gray"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-dark text-sm truncate">
                      {item.nombre}
                    </h3>
                    {item.medida && (
                      <p className="text-xs text-muted">{item.medida.medida}</p>
                    )}
                    <p className="text-primary font-bold text-sm">
                      ${item.precio}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.key, item.quantity - 1)
                        }
                        className="size-7 flex items-center justify-center rounded-lg bg-soft-gray text-dark hover:bg-pinklight/40 transition-colors"
                        aria-label="Disminuir cantidad"
                      >
                        −
                      </button>
                      <span className="text-sm font-medium w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.key, item.quantity + 1)
                        }
                        className="size-7 flex items-center justify-center rounded-lg bg-soft-gray text-dark hover:bg-pinklight/40 transition-colors"
                        aria-label="Aumentar cantidad"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.key)}
                    className="text-muted hover:text-red-500 transition-colors"
                    aria-label={`Eliminar ${item.nombre} del carrito`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-pinklight/30 p-4 bg-white mt-auto">
          <div className="flex justify-between items-center mb-3">
            <span className="text-muted">Total:</span>
            <span className="font-bold text-dark text-xl">${total}</span>
          </div>
          <button
            disabled={shoppingCart.length === 0}
            className="w-full bg-primary/20 text-muted py-3 rounded-xl font-semibold hover:bg-primary/30 hover:text-primary cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Finalizar Compra
          </button>
          <p className="text-center text-xs text-muted mt-2">
            Próximamente: pago y envío
          </p>
        </div>
      </div>
    </>,
    document.body
  );
}
