import { supabase } from '../config/supabaseClient.js';

export class ProductModel {
    static async getAll({limit = 10, offset = 0, tipo, nombre}) {
        const from = Number(offset);
        const to = from + Number(limit) - 1;

        let query = supabase
        .from('products')
        .select('*', { count: 'exact' });

        // Aplicamos filtros si existen
        if (tipo) query = query.eq('tipo', tipo);
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
            data: {
                cantidadDisponible: p.stock, // Transformamos columna a propiedad del JSON
                image: p.image_url
            }
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
        return data;
  }

   static async create(input) {
        // 1. Extraemos los datos del JSON que envías por Postman
        const { nombre, tipo, precio, descripcion, stock, image_url } = input;
        console.log("¿Qué hay en data.image?:", image_url);
        // 2. Insertamos en Supabase mapeando los nombres
        const { data: record, error } = await supabase
            .from('products')
            .insert([
            {
                nombre,
                tipo,
                precio,
                descripcion,
                stock, // <-- Mapeo: de 'cantidadDisponible' a 'stock'
                image_url,      // <-- Mapeo: de 'image' a 'image_url'
            }
            ])
            .select()
            .single();

        if (error) {
            console.error("Error al insertar:", error.message);
            throw new Error(error.message);
        }

        return record;
}

    static async update({ id, ...fields }) {
        const { data, error } = await supabase
        .from('products')
        .update(fields)
        .eq('id', id)
        .select()
        .single();

        if (error) return null;
    return data;
  }

    static async delete(id) {
        const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

    return !error;
  }
}