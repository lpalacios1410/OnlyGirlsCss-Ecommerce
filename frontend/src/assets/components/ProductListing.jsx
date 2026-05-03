import { ProductCard } from "./ProductCard.jsx";
export function ProductListing({ products }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </section>
  );
}
