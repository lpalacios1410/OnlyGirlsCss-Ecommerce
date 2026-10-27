import type { MedidaOption } from "../types";

export function toMedidaOption(m: string | MedidaOption): MedidaOption {
  return typeof m === "string" ? { medida: m, precio: 0 } : m;
}
