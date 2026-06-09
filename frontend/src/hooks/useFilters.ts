import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import type { Product } from "../types";

export function useFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [categorySelected, setCategorySelected] = useState<string>(() => {
    return searchParams.get("tipo") || "todos";
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const page = Number(params.get("page"));
    return Number.isNaN(page) || page < 1 ? 1 : page;
  });

  const RESULT_PER_PAGE = 6;

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);

        const params = new URLSearchParams();

        if (categorySelected !== "todos") {
          params.append("tipo", categorySelected);
        }
        const offset = (currentPage - 1) * RESULT_PER_PAGE;
        params.append("limit", String(RESULT_PER_PAGE));
        params.append("offset", String(offset));

        const queryParams = params.toString();

        const response = await fetch(
          // `https://backendogc.vercel.app/products?${queryParams}`,
          // `http://localhost:1234/products?${queryParams}`,
          `https://onlygirlsccs-ecommerce-backend.vercel.app/products?${queryParams}`,
        );
        const json: { data: Product[]; total: number } = await response.json();

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

  useEffect(() => {
    setSearchParams((params) => {
      if (categorySelected !== "todos") {
        params.set("tipo", categorySelected);
      } else {
        params.delete("tipo");
      }

      if (currentPage > 1) {
        params.set("page", String(currentPage));
      } else {
        params.delete("page");
      }

      return params;
    });
  }, [currentPage, categorySelected, setSearchParams]);

  const totalPages = Math.ceil(total / RESULT_PER_PAGE);

  const handleCategoryChange = (newCat: string) => {
    setCategorySelected(newCat);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
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
