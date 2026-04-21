import express from 'express';
import { DEFAULTS } from './config.js';
import cors from 'cors';

const PORT = process.env.PORT ?? DEFAULTS.PORT
const app = express();

const ACCEPTED_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:1234',
]

app.use(
  cors({
    origin: (origin, callback) => {
      if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        return callback(null, true);
      } 
      callback(new Error('Not allowed by CORS'));
    }
  }))
  app.use(express.json())


app.listen(PORT, () =>{
    console.log(`Server is running on port http://localhost:${PORT}`);
})