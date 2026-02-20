import { Router } from 'express'
import { ProductController } from '../controllers/products.js';

export const productsRouter = Router();

// Paginated products with filtering
productsRouter.get("/", ProductController.getAll)
productsRouter.get("/:id", ProductController.getById)
productsRouter.post("/", ProductController.create)
productsRouter.put("/:id", ProductController.update)
productsRouter.delete("/:id", ProductController.delete )

// Root endpoint
// productsRouter.get("/", (req, res) => {
//   res.json("Welcome to the Products API");
// })