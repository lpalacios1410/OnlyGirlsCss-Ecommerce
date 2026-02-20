import { useState } from "react";
import { Header } from "../assets/components/Header.jsx";
import { FiltersProducts } from "../assets/components/FiltersProducts.jsx";
import { ProductListing } from "../assets/components/ProductListing.jsx";
import { Pagination } from "../assets/components/Pagination.jsx";
import { Footer } from "../assets/components/Footer.jsx";
import { SpinnerLoading } from "../assets/components/SpinnerLoading.jsx";

import { useFilters } from "../hooks/useFilters.jsx";

export function StoragePage() {
  const [selectedColor, setSelectedColor] = useState(null);

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

  const title = loading
    ? "Cargando..."
    : `Storage - Products ${total}, Page ${currentPage}`;

  return (
    <>
      <Header />
      <title>{title}</title>
      <main className="sm:px-30 px-12 xl:flex lg:items-center lg:gap-8 py-8 bg-gray-200 ">
        <FiltersProducts
          selectedColor={selectedColor}
          onColorChange={setSelectedColor}
          activeCategory={categorySelected}
          onCategoryChange={handleCategoryChange}
        />
        <div className="w-full">
          <div className="flex">
            <div className="flex flex-col gap-6 w-full">
              <p>
                Showing 1-{products.length} of {products.length} results
              </p>
              {loading ? (
                <SpinnerLoading />
              ) : (
                <ProductListing products={products} total={total} />
              )}
            </div>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
