import { Router } from 'express'
import { ProductController } from '../controllers/products.js';
import { validateProduct } from '../schemas/products.js';
import { checkAdminKey } from '../controllers/auth.js';

export const productsRouter = Router();

function validateCreate(req, res, next) {
    const result = validateProduct(req.body);
    if(!result.success){
        return res.status(400).json({error: 'Invalid request', details: result.error.errors})
    }
    req.body = result.data
    return next()

}



// Paginated products with filtering
productsRouter.get("/", ProductController.getAll)
productsRouter.get("/:id", ProductController.getById)
productsRouter.post("/",validateCreate, checkAdminKey, ProductController.create)
productsRouter.put("/:id", ProductController.update)
productsRouter.delete("/:id", ProductController.delete )

// Root endpoint
// productsRouter.get("/", (req, res) => {
//   res.json("Welcome to the Products API");
// })