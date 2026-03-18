import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";

export function useFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [categorySelected, setCategorySelected] = useState(() => {
    return searchParams.get("tipo") || "todos";
  });
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const page = Number(params.get("page"));
    return Number.isNaN(page) || page < 1 ? 1 : page;
  });

  // Persist filters + pagination through URL query params

  const RESULT_PER_PAGE = 6;

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        // Simulate a delay for loading state
        // await new Promise((resolve) => setTimeout(resolve, 2000));

        const params = new URLSearchParams();

        if (categorySelected !== "todos") {
          params.append("tipo", categorySelected);
        }
        const offset = (currentPage - 1) * RESULT_PER_PAGE;
        params.append("limit", RESULT_PER_PAGE);
        params.append("offset", offset);

        const queryParams = params.toString();

        const response = await fetch(
          `https://backendogc.vercel.app/products?${queryParams}`,
        );
        const json = await response.json();

        setProducts(json.data);
        setTotal(json.total);
      } catch (e) {
        console.error("error fetching products", e);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [categorySelected, currentPage]);

  //
  useEffect(() => {
    setSearchParams((params) => {
      if (categorySelected !== "todos") {
        params.set("tipo", categorySelected);
      } else {
        params.delete("tipo");
      }

      if (currentPage > 1) {
        params.set("page", currentPage);
      } else {
        params.delete("page");
      }

      return params;
    });
  }, [currentPage, categorySelected, setSearchParams]);

  const totalPages = Math.ceil(total / RESULT_PER_PAGE);

  const handleCategoryChange = (newCat) => {
    setCategorySelected(newCat);
    setCurrentPage(1);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return {
    total,
    loading,
    products,
    currentPage,
    totalPages,
    categorySelected,
    handleCategoryChange,
    handlePageChange,
  };
}
