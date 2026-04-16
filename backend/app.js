import express from 'express';
import { productsRouter } from './routes/products.js';
import { corsMiddleware } from './middlewares/cors.js';
import { DEFAULTS } from './config.js';

const PORT = process.env.PORT ?? DEFAULTS.PORT
const app = express();


app.use(corsMiddleware())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/products', productsRouter)

if (!process.env.NODE_ENV){
    app.listen(PORT, () =>{
        console.log(`Server is running on port http://localhost:${PORT}`);
    })
}

export default app;