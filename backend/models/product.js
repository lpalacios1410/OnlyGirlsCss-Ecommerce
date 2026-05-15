import { supabase } from '../config/supabaseClient.js';

export class ProductModel {
    static async getAll({limit = 10, offset = 0, tipo, nombre}) {
        const from = Number(offset);
        const to = from + Number(limit) - 1;

        let query = supabase
        .from('products')
        .select('*', { count: 'exact' });
        
        // Aplicamos filtros si existen
        if (tipo) query = query.ilike('tipo', tipo);
        if (nombre) query = query.ilike('nombre', `%${nombre}%`); // Búsqueda parcial e insensible a mayúsculas

        const { data, count, error } = await query
        .range(from, to)
        .order('id', { ascending: true });

        if (error) throw new Error(error.message);

        const paginatedProducts = data.map(p => ({
            id: p.id,
            nombre: p.nombre,
            tipo: p.tipo,
            precio: p.precio,
            descripcion: p.descripcion,
            disponible: p.disponible,
            medidas: p.medidas ?? [],
            image: p.image_url
        }));

    return { paginatedProducts, total: count };
  }

    static async getById(id) {
        const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

        if (error) return null;
        return {
            ...data,
            medidas: data.medidas ?? [],
            image: data.image_url
        };
  }

   static async create(input) {
        const { nombre, tipo, precio, descripcion, disponible, medidas, image_url } = input;
        const { data: record, error } = await supabase
            .from('products')
            .insert([
            {
                nombre,
                tipo,
                precio,
                descripcion,
                disponible: disponible ?? true,
                medidas: medidas ?? [],
                image_url,
            }
            ])
            .select()
            .single();

        if (error) {
            console.error("Error al insertar:", error.message);
            throw new Error(error.message);
        }

        return {
            ...record,
            medidas: record.medidas ?? [],
            image: record.image_url
        };
}

    static async update({ id, ...fields }) {
        const updateData = { ...fields };
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
            image: data.image_url
        };
  }

    static async delete(id) {
        const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

    return !error;
  }
}