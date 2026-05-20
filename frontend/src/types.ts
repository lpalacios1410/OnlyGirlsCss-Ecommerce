export interface Product {
  id: number
  nombre: string
  tipo: string
  precio: number
  descripcion?: string
  disponible: boolean
  medidas: string[]
  image: string
}

export interface NavItem {
  href: string
  label: string
}
