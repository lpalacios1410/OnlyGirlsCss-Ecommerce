export interface MedidaOption {
  medida: string
  precio: number
}

export interface Product {
  id: number
  nombre: string
  tipo: string
  precio: number
  descripcion?: string
  disponible: boolean
  medidas: MedidaOption[]
  image: string
}

export interface CartItem {
  key: string
  productId: number
  nombre: string
  image: string
  medida: MedidaOption | null
  precio: number
}

export interface NavItem {
  href: string
  label: string
}
