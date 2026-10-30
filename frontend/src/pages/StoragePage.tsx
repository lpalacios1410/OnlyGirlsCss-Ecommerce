import { EmptyResults } from "../assets/components/EmptyResults";
import { FiltersProducts } from "../assets/components/FiltersProducts";
import { Pagination } from "../assets/components/Pagination";
import { ProductListing } from "../assets/components/ProductListing";
import { SearchInput } from "../assets/components/SearchInput";
import { SpinnerLoading } from "../assets/components/SpinnerLoading";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
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
    searchQuery,
    handleSearchChange,
    orden,
    handleOrdenChange,
    clearFilters,
  } = useFilters();

  useDocumentTitle(
    loading
      ? "Cargando..."
      : `OnlyGirlsCcs - Tienda (Página ${currentPage})`,
  );

  const hasActiveFilters =
    searchQuery || categorySelected !== "todos";

  return (
    <main
      id="main-content"
      className="px-4 sm:px-6 lg:px-8 xl:flex xl:items-start xl:gap-8 py-8 bg-soft-gray"
    >
      <FiltersProducts
        activeCategory={categorySelected}
        onCategoryChange={handleCategoryChange}
        orden={orden}
        onOrdenChange={handleOrdenChange}
      />
      <div className="w-full min-w-0">
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-dark font-medium">
              {loading ? "Buscando..." : `Mostrando ${products.length} de ${total} resultados`}
            </p>
            {hasActiveFilters && !loading && (
              <button
                onClick={clearFilters}
                className="text-sm text-primary hover:text-wine font-medium underline-offset-2 hover:underline self-start"
              >
                Limpiar filtros
              </button>
            )}
          </div>

          <SearchInput
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Busca peluches, bolsos y más..."
          />

          {loading ? (
            <SpinnerLoading />
          ) : products.length === 0 ? (
            <EmptyResults query={searchQuery} onClear={clearFilters} />
          ) : (
            <ProductListing products={products} />
          )}
        </div>

        {totalPages > 1 && !loading && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </main>
  );
}
