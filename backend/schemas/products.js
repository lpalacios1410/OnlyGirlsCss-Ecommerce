import * as z from 'zod'
// {
//     "id": 1,
//     "nombre": "Oso de Felpa Miel",
//     "tipo": "peluche",
//     "precio": 24.99,
//     "descripcion": "Oso clásico extra suave con lazo decorativo.",
//     "data": {
//       "cantidadDisponible": 15,
//       "image": "https://images.unsplash.com/photo-1559440666-3744383f9817?w=500"
//     }
//   },
export const productSchema = z.object({
    nombre: z.string()
    .trim()
    .min(1, {message:'El nombre es requerido'})
    .max(100, {message:'El nombre no puede exceder 100 caracteres'})
    .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {message: "El nombre no puede contener números ni caracteres especiales"}),
    
    tipo: z.string()
    .min(1, {message:'El nombre es requerido'})
    .max(100, {message:'El nombre no puede exceder 100 caracteres'}),

    precio: z.number().positive({message: 'El precio debe ser un numero positivo o mayor a 0'}),

    descripcion: z.string()
    .min(1, {message:'El nombre es requerido'})
    .max(100, {message:'El nombre no puede exceder 100 caracteres'}),

    stock: z.number().int().nonnegative({ message: 'El stock debe ser un entero positivo' }),
    
    image_url: z.string().url({ message: 'La imagen debe ser una URL válida' })
})

export function validateProduct(input){
    return productSchema.safeParse(input)
}

export function validatePartialProduct(input){
    return productSchema.partial().safeParse(input)
}