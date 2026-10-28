import type { CartItem, Product } from "../types";
import { toMedidaOption } from "./medidas";

/**
 * Construye el ítem de carrito por defecto para acciones rápidas
 * ("agregar al carrito" desde la tarjeta). Si el producto tiene medidas,
 * se usa la primera (igual que el botón del overlay de escritorio).
 */
export function buildDefaultCartItem(
  product: Product,
): Omit<CartItem, "quantity"> {
  const medidas = product.medidas?.map(toMedidaOption) ?? [];
  const primeraMedida = medidas.length > 0 ? medidas[0] : null;

  return {
    key: primeraMedida
      ? `${product.id}-${primeraMedida.medida}`
      : `${product.id}`,
    productId: product.id,
    nombre: product.nombre,
    image: product.image,
    medida: primeraMedida,
    precio: primeraMedida ? primeraMedida.precio : product.precio,
  };
}
