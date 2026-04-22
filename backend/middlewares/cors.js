import cors from 'cors';

const ACCEPTED_ORIGINS = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:1234',
    'https://onlygirlsccs-ecommerce-frontend.vercel.app'
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => {
  return cors({
    origin: (origin, callback) => {
      if (!origin || acceptedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'x-admin-key'],
    credentials: true
  });
};