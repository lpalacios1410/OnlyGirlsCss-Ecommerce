export function CartModal({ onClose, isOpen, product }) {
  return (
    <>
      {/* Overlay: Fondo oscuro que cierra el modal al hacer click */}
      <div
        className={`absolute bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Panel Lateral */}
      <div
        className={`absolute flex flex-col w-55 h-150 top-14 bg-gray-200 rounded-2xl z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "-translate-x-40 xl:translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-1 flex border-b">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>

        {/* Contenido de productos (con scroll) */}
        <div className="p-3 overflow-y-auto h-100">
          {product.length === 0 ? (
            <div className="flex flex-col items-center mt-20 text-gray-400">
              <p className="text-lg">El carrito está vacío</p>
            </div>
          ) : (
            product.map((product) => (
              <div
                key={product.id}
                className="flex gap-2 mb-5 items-center border-b pb-4"
              >
                <img
                  src={product.data.image}
                  alt={product.nombre}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-black text-base">
                    {product.nombre}
                  </h3>
                  <p className="text-primary font-bold">${product.precio}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer fijo al fondo del panel */}
        <div className="absolute bottom-0 w-full p-4 border-t bg-white">
          <div className="flex justify-between mb-2">
            <span className="text-black border-b">Total:</span>
            <span className="font-bold text-black/80 text-xl">
              ${product.reduce((acc, curr) => acc + curr.precio, 0)}
            </span>
          </div>
          <button className="w-full bg-primary/20 text-muted py-3 rounded-xl font-semibold hover:bg-primary/30 hover:text-primary  cursor-pointer">
            Finalizar Compra
          </button>
        </div>
      </div>
    </>
  );
}
