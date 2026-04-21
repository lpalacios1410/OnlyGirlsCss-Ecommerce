import { DEFAULTS } from "../config.js"
import { ProductModel } from "../models/product.js";

export class ProductController{
    static async getAll (req, res){

    const { limit = DEFAULTS.LIMIT_PAGINATION, offset = DEFAULTS.LIMIT_OFFSET, tipo, nombre,  } = req.query

    const {paginatedProducts, total} = await ProductModel.getAll({limit, offset, tipo, nombre})
    const limitNumber = Number(limit)
    const offsetNumber = Number(offset)
    console.log({ limit, tipo, nombre })
    return res.json({data: paginatedProducts, total, limit:limitNumber, offset:offsetNumber})
    }

    static async getById (req, res) {
        const { id } = req.params;
        const productGet = await ProductModel.getById(id)
        
        if (!productGet) {
            return res.status(404).json({error: `Producto con id ${id} no encontrado!`})
        }
        return res.json({ message: `Producto encontrado exitosamente`,
            data: productGet })
    }

  static async create (req, res) {
        // 1. Extraemos los campos básicos y el objeto 'data'
        const { nombre, tipo, precio, descripcion, stock, image_url } = req.body;

        
        // 2. Validamos que existan los campos básicos Y el objeto data
        if (!nombre || !tipo || !precio || !descripcion || !stock || !image_url) {
            return res.status(400).json({ error: "Faltan campos requeridos, incluyendo el objeto data" });
        }
        
        try {
            // 3. Pasamos todo al modelo. 
            // El modelo es el que se encargará de mapear stock e image_url.
            const newProduct = await ProductModel.create(req.body);

            return res.status(201).json({ 
                message: "Producto creado exitosamente", 
                product: newProduct 
            });
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
}

    static async update (req, res) {
        const { id } = req.params;
        const { nombre, tipo, precio, descripcion, stock, image_url } = req.body;
 
       const updatedProduct = await ProductModel.update({id, nombre, tipo, precio, descripcion, stock, image_url})
       if (!updatedProduct) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }
        console.log(`Producto ${id} actualizado con éxito`)
        return res.json({ message: "Producto actualizado exitosamente", product: updatedProduct })
        
    }
    
    static async delete (req, res) {
        const { id } = req.params;
        const deletedProduct = await ProductModel.delete(id)
        if (!deletedProduct) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }

        
        return res.json({ message: `Producto eliminado exitosamente ${deletedProduct}` })

    }
}