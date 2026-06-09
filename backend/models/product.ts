import { supabase } from '../config/supabaseClient.js';
import type { Product, ProductInput } from '../schemas/products.js';

interface MedidaOption {
    medida: string
    precio: number
}

function normalizeMedidas(medidas: unknown, basePrecio: number): MedidaOption[] {
    if (!Array.isArray(medidas)) return []
    return medidas.map((m: unknown) => {
        if (typeof m === 'string') return { medida: m, precio: basePrecio }
        return m as MedidaOption
    })
}

export class ProductModel {
    static async getAll({limit = 10, offset = 0, tipo, nombre}: {
        limit?: number;
        offset?: number;
        tipo?: string;
        nombre?: string;
    }): Promise<{ paginatedProducts: Product[]; total: number }> {
        const from = Number(offset);
        const to = from + Number(limit) - 1;

        let query = supabase
        .from('products')
        .select('*', { count: 'exact' });
        
        if (tipo) query = query.ilike('tipo', tipo);
        if (nombre) query = query.ilike('nombre', `%${nombre}%`);

        const { data, count, error } = await query
        .range(from, to)
        .order('id', { ascending: true });

        if (error) throw new Error(error.message);

        const paginatedProducts: Product[] = (data ?? []).map(p => ({
            id: p.id,
            nombre: p.nombre,
            tipo: p.tipo,
            precio: p.precio,
            descripcion: p.descripcion,
            disponible: p.disponible,
            medidas: normalizeMedidas(p.medidas, p.precio),
            image: p.image_url,
            image_url: p.image_url
        }));

    return { paginatedProducts, total: count ?? 0 };
  }

    static async getById(id: number): Promise<Product | null> {
        const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

        if (error) return null;
        return {
            ...data,
            medidas: normalizeMedidas(data.medidas, data.precio),
            image: data.image_url,
            image_url: data.image_url
        } as Product;
  }

   static async create(input: ProductInput): Promise<Product> {
        const { nombre, tipo, precio, descripcion, disponible, medidas, image_url } = input;
        const { data: record, error } = await supabase
            .from('products')
            .insert([{
                nombre,
                tipo,
                precio,
                descripcion,
                disponible: disponible ?? true,
                medidas: medidas ?? [],
                image_url,
            }])
            .select()
            .single();

        if (error) {
            console.error("Error al insertar:", error.message);
            throw new Error(error.message);
        }

        return {
            ...record,
            medidas: normalizeMedidas(record.medidas, record.precio),
            image: record.image_url,
            image_url: record.image_url
        } as Product;
}

    static async update({ id, ...fields }: { id: number } & Partial<ProductInput>): Promise<Product | null> {
        const updateData = { ...fields } as Record<string, unknown>;
        if (updateData.image) {
            updateData.image_url = updateData.image;
            delete updateData.image;
        }

        const { data, error } = await supabase
        .from('products')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

        if (error) return null;
        return {
            ...data,
            medidas: data.medidas ?? [],
            image: data.image_url,
            image_url: data.image_url
        } as Product;
  }

    static async delete(id: number): Promise<boolean> {
        const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

    return !error;
  }
}
