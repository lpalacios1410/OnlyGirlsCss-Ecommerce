import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSearchParams } from "react-router";
import { getProducts } from "../lib/api";
import type { Product } from "../types";

export const RESULT_PER_PAGE = 6;
export const VALID_TIPOS = ["todos", "peluche", "bolso", "juguete", "termo"] as const;
export type Category = (typeof VALID_TIPOS)[number];

export function useFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const categorySelected: Category = useMemo(() => {
    const tipo = searchParams.get("tipo") ?? "todos";
    return VALID_TIPOS.includes(tipo as Category) ? (tipo as Category) : "todos";
  }, [searchParams]);

  const searchQuery = useMemo(() => searchParams.get("q") ?? "", [searchParams]);

  const disponible = useMemo(() => {
    const value = searchParams.get("disponible");
    if (value === "true") return true;
    if (value === "false") return false;
    return undefined;
  }, [searchParams]);

  const orden = useMemo(() => {
    const value = searchParams.get("orden");
    if (value === "precio-asc" || value === "precio-desc") return value;
    return "nuevo";
  }, [searchParams]);

  const currentPage = useMemo(() => {
    const page = Number(searchParams.get("page"));
    return Number.isNaN(page) || page < 1 ? 1 : page;
  }, [searchParams]);

  useEffect(() => {
    async function fetchProducts() {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        setLoading(true);
        setError(null);

        const response = await getProducts(
          {
            limit: RESULT_PER_PAGE,
            offset: (currentPage - 1) * RESULT_PER_PAGE,
            ...(categorySelected !== "todos" && { tipo: categorySelected }),
            ...(searchQuery && { q: searchQuery }),
            ...(disponible !== undefined && { disponible }),
            orden,
          },
          controller.signal,
        );

        setProducts(response.data);
        setTotal(response.total);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError((err as Error).message);
          setProducts([]);
          setTotal(0);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();

    return () => {
      abortRef.current?.abort();
    };
  }, [categorySelected, currentPage, searchQuery, disponible, orden]);

  const updateParam = (
    key: string,
    value: string | null,
    resetPage = true,
  ) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value === null || value === "" || value === "todos") {
          next.delete(key);
        } else {
          next.set(key, value);
        }
        if (resetPage && key !== "page") {
          next.delete("page");
        }
        return next;
      },
      { replace: true },
    );
  };

  const handleCategoryChange = (category: Category) => {
    updateParam("tipo", category === "todos" ? null : category);
  };

  const handleSearchChange = (query: string) => {
    updateParam("q", query.trimStart());
  };

  const handleDisponibleChange = (value: boolean | undefined) => {
    updateParam("disponible", value === undefined ? null : String(value));
  };

  const handleOrdenChange = (value: string) => {
    updateParam("orden", value === "nuevo" ? null : value);
  };

  const handlePageChange = (page: number) => {
    updateParam("page", page <= 1 ? null : String(page), false);
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  const totalPages = Math.ceil(total / RESULT_PER_PAGE);

  return {
    products,
    total,
    loading,
    error,
    currentPage,
    totalPages,
    categorySelected,
    searchQuery,
    disponible,
    orden,
    handleCategoryChange,
    handleSearchChange,
    handleDisponibleChange,
    handleOrdenChange,
    handlePageChange,
    clearFilters,
  };
}
