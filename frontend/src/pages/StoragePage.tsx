import { useEffect } from "react";
import { FiltersProducts } from "../assets/components/FiltersProducts";
import { ProductListing } from "../assets/components/ProductListing";
import { Pagination } from "../assets/components/Pagination";
import { SpinnerLoading } from "../assets/components/SpinnerLoading";

import { useFilters } from "../hooks/useFilters";

export default function StoragePage() {
  const {
    currentPage,
    categorySelected,
    totalPages,
    handleCategoryChange,
    handlePageChange,
    loading,
    total,
    products,
  } = useFilters();

  useEffect(() => {
    document.title = loading
      ? "Cargando..."
      : `OnlyGirlsCcs - Tienda (Página ${currentPage})`;
  }, [loading, currentPage]);
  return (
    <main
      id="main-content"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:flex xl:items-start xl:gap-8 py-8 bg-soft-gray"
    >
      <FiltersProducts
        activeCategory={categorySelected}
        onCategoryChange={handleCategoryChange}
      />
      <div className="w-full">
        <div className="flex flex-col gap-6 w-full">
          <p className="text-dark font-medium">
            Mostrando {products.length} de {total} resultados
          </p>
          {loading ? (
            <SpinnerLoading />
          ) : (
            <ProductListing products={products} />
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  );
}
