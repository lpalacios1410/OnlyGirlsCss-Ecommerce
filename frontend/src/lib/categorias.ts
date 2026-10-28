export interface CategoriaProducto {
  value: string;
  label: string;
  /** Si la categoría se vende por medidas (talla/peso) en lugar de precio único. */
  conMedidas: boolean;
  unidadMedida: "CM" | "ML";
}

/**
 * Categorías de la tienda y cómo se cotizan:
 * - Peluches: medidas en centímetros (CM).
 * - Termos: capacidades en mililitros (ML).
 * - Bolsos y juguetes: precio único.
 */
export const CATEGORIAS: CategoriaProducto[] = [
  { value: "Bolso", label: "👜 Bolso", conMedidas: false, unidadMedida: "CM" },
  { value: "Juguete", label: "🎮 Juguete", conMedidas: false, unidadMedida: "CM" },
  { value: "Peluche", label: "🧸 Peluche", conMedidas: true, unidadMedida: "CM" },
  { value: "Termo", label: "🎀 Termo", conMedidas: true, unidadMedida: "ML" },
];

export function getCategoria(tipo: string): CategoriaProducto | undefined {
  const normalizado = tipo.trim().toLowerCase();
  return CATEGORIAS.find((c) => c.value.toLowerCase() === normalizado);
}

export function tipoUsaMedidas(tipo: string): boolean {
  return getCategoria(tipo)?.conMedidas ?? false;
}

export function unidadMedida(tipo: string): "CM" | "ML" {
  return getCategoria(tipo)?.unidadMedida ?? "CM";
}
