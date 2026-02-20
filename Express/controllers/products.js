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
            return res.status(404).json({error: `Producto no encontrado!`})
        }
        return res.json({ message: `Producto encontrado exitosamente ${productGet}` })
    }

    static async create (req, res) {
        const { nombre, tipo, precio, descripcion } = req.body;
        
          if (!nombre || !tipo || !precio || !descripcion) {
            return res.status(400).json({ error: "Faltan campos requeridos" });
          }
        
          const newProduct = await ProductModel.create({nombre, tipo, precio, descripcion})
          
        
        
          return res.status(201).json({ message: "Producto creado exitosamente", product: newProduct })
        
    }

    static async update (req, res) {
        const { id } = req.params;
        const { nombre, tipo, precio, descripcion } = req.body;
 
       const updatedProduct = await ProductModel.update({id, nombre, tipo, precio, descripcion})
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