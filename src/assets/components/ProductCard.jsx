import { Link } from "./Link";

export function ProductCard({ product }) {
  return (
    <>
      <div
        key={product.id}
        className="w-full bg-white rounded-lg overflow-hidden group shadow-md hover:shadow-xl transition-shadow"
      >
        <div className="relative">
          <img
            alt="product"
            className="w-full h-64 object-cover"
            src={product.data.image}
          />
          <div className="absolute inset-0 hover:hover:bg-black/20 transition-all duration-300 flex flex-col items-center justify-center gap-2">
            <button className="bg-primary/70 hover:bg-primary text-white px-6 py-2 rounded-full opacity-0 group-hover:opacity-100 duration-300 cursor-pointer">
              Add to Cart
            </button>
            <Link
              href={`/products/${product.id}`}
              className="bg-primary/70 hover:bg-primary text-white px-6 py-2 rounded-full opacity-0 group-hover:opacity-100 duration-300 cursor-pointer"
              arial-label={`View details of ${product.nombre}`}
            >
              View Details
            </Link>
          </div>
        </div>
        <div className="p-4">
          <h4 className="font-semibold text-lg">{product.nombre}</h4>
          <p className="text-primary text-lg font-bold mt-1">
            ${product.precio}
          </p>
        </div>
      </div>
    </>
  );
}
