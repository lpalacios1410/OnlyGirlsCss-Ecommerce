import type { Request, Response } from 'express';
import { DEFAULTS } from "../config.js";
import { ProductModel } from "../models/product.js";

export class ProductController{
    static async getAll (req: Request, res: Response): Promise<void>{

    const { limit = DEFAULTS.LIMIT_PAGINATION, offset = DEFAULTS.LIMIT_OFFSET, tipo, nombre } = req.query

    const {paginatedProducts, total} = await ProductModel.getAll({
        limit: Number(limit),
        offset: Number(offset),
        tipo: tipo as string | undefined,
        nombre: nombre as string | undefined,
    })
    const limitNumber = Number(limit)
    const offsetNumber = Number(offset)
    console.log({ limit, tipo, nombre })
    res.json({data: paginatedProducts, total, limit:limitNumber, offset:offsetNumber})
    }

    static async getById (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const productGet = await ProductModel.getById(Number(id))
        
        if (!productGet) {
            res.status(404).json({error: `Producto con id ${id} no encontrado!`})
            return;
        }
        res.json({ message: `Producto encontrado exitosamente`,
            data: productGet })
    }

  static async create (req: Request, res: Response): Promise<void> {
        const { nombre, tipo, precio, image_url } = req.body;

        if (!nombre || !tipo || !precio || !image_url) {
            res.status(400).json({ error: "Faltan campos requeridos: nombre, tipo, precio, image_url" });
            return;
        }
        
        try {
            const newProduct = await ProductModel.create(req.body);

            res.status(201).json({ 
                message: "Producto creado exitosamente", 
                product: newProduct 
            });
        } catch (e) {
            res.status(500).json({ error: (e as Error).message });
        }
}

    static async update (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { nombre, tipo, precio, descripcion, disponible, medidas, image_url } = req.body;
 
       const updatedProduct = await ProductModel.update({id: Number(id), nombre, tipo, precio, descripcion, disponible, medidas, image_url})
       if (!updatedProduct) {
        res.status(404).json({ message: "Producto no encontrado" });
        return;
    }
        console.log(`Producto ${id} actualizado con éxito`)
        res.json({ message: "Producto actualizado exitosamente", product: updatedProduct })
        
    }
    
    static async delete (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const deletedProduct = await ProductModel.delete(Number(id))
        if (!deletedProduct) {
        res.status(404).json({ message: "Producto no encontrado" });
        return;
    }

        res.json({ message: `Producto eliminado exitosamente ${deletedProduct}` })

    }
}
