import { z } from 'zod'

const medidaOptionSchema = z.object({
    medida: z.string().min(1, {message: 'La medida es requerida'}),
    precio: z.number().positive({message: 'El precio de la medida debe ser positivo'})
})

export const productSchema = z.object({
    nombre: z.string()
    .trim()
    .min(1, {message:'El nombre es requerido'})
    .max(100, {message:'El nombre no puede exceder 100 caracteres'})
    .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {message: "El nombre no puede contener números ni caracteres especiales"}),
    
    tipo: z.string()
    .min(1, {message:'El tipo es requerido'})
    .max(100, {message:'El tipo no puede exceder 100 caracteres'}),

    precio: z.number().positive({message: 'El precio debe ser un numero positivo o mayor a 0'}),

    descripcion: z.string().max(500, {message:'La descripcion no puede exceder 500 caracteres'}).default(''),

    disponible: z.boolean().default(true),

    medidas: z.array(medidaOptionSchema).default([]),

    image_url: z.string().url({ message: 'La imagen debe ser una URL válida' })
})

export type ProductInput = z.infer<typeof productSchema>

export interface Product extends ProductInput {
    id: number
    image: string
}

export function validateProduct(input: unknown){
    return productSchema.safeParse(input)
}

export function validatePartialProduct(input: unknown){
    return productSchema.partial().safeParse(input)
}
