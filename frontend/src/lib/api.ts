import type { Product } from "../types";

const API_BASE = import.meta.env.VITE_API_URL ?? "/api";

export interface ProductQuery {
  limit?: number;
  offset?: number;
  tipo?: string;
  q?: string;
  disponible?: boolean;
  orden?: "precio-asc" | "precio-desc" | "nuevo";
}

export interface ProductsResponse {
  data: Product[];
  total: number;
  limit: number;
  offset: number;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${path}`;
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    let message = `Error ${response.status}: ${response.statusText}`;
    try {
      const body = await response.json();
      if (body.error) message = body.error;
    } catch {
      // ignore
    }
    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export function getProducts(
  query: ProductQuery = {},
  signal?: AbortSignal,
): Promise<ProductsResponse> {
  const params = new URLSearchParams();

  if (query.limit !== undefined) params.set("limit", String(query.limit));
  if (query.offset !== undefined) params.set("offset", String(query.offset));
  if (query.tipo) params.set("tipo", query.tipo);
  if (query.q) params.set("q", query.q);
  if (query.disponible !== undefined)
    params.set("disponible", String(query.disponible));
  if (query.orden) params.set("orden", query.orden);

  const queryString = params.toString();
  return request<ProductsResponse>(
    `/products${queryString ? `?${queryString}` : ""}`,
    { signal },
  );
}

export function getProductById(id: string | number): Promise<{ data: Product }> {
  return request<{ data: Product }>(`/products/${id}`);
}
