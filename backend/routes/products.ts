import { Router, type Request, type Response, type NextFunction } from 'express'
import { ProductController } from '../controllers/products.js';
import { validateProduct, validatePartialProduct } from '../schemas/products.js';
import { requireAdmin } from '../middlewares/auth.js';

export const productsRouter = Router();

function validateCreate(req: Request, res: Response, next: NextFunction): void {
    const result = validateProduct(req.body);
    if(!result.success){
        res.status(400).json({error: 'Invalid request', details: result.error.issues})
        return;
    }
    req.body = result.data
    next()
}

function validateUpdate(req: Request, res: Response, next: NextFunction): void {
    const result = validatePartialProduct(req.body);
    if(!result.success){
        res.status(400).json({error: 'Invalid request', details: result.error.issues})
        return;
    }
    req.body = result.data
    next()
}

productsRouter.get("/", ProductController.getAll)
productsRouter.get("/:id", ProductController.getById)
productsRouter.post("/", requireAdmin, validateCreate, ProductController.create)
productsRouter.put("/:id", requireAdmin, validateUpdate, ProductController.update)
productsRouter.delete("/:id", requireAdmin, ProductController.delete)
