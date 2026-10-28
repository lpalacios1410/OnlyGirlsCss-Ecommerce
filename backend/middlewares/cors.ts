import cors from 'cors';

const DEFAULT_ORIGINS = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:1234',
]

const FRONTEND_URL = process.env.FRONTEND_URL

export const corsMiddleware = () => {
  const acceptedOrigins = FRONTEND_URL
    ? [...DEFAULT_ORIGINS, FRONTEND_URL]
    : DEFAULT_ORIGINS

  return cors({
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      if (!origin) return callback(null, true);
      if (acceptedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  });
};
