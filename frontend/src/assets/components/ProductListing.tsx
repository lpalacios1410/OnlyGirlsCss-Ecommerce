import { ProductCard } from "./ProductCard";
import type { Product } from "../../types";

interface ProductListingProps {
  products: Product[];
}

export function ProductListing({ products }: ProductListingProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </section>
  );
}
