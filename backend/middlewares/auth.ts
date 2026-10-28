import type { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabaseClient.js';

// Correo con privilegios de administrador aunque no tenga el rol en metadata.
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL ?? 'luisarmando20092009@gmail.com').toLowerCase();

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; email?: string; app_metadata?: Record<string, unknown> };
    }
  }
}

export async function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : undefined;

  if (!token) {
    res.status(401).json({ error: 'Se requiere autenticación' });
    return;
  }

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    res.status(401).json({ error: 'Token inválido o expirado' });
    return;
  }

  const isAdminRole = data.user.app_metadata?.role === 'admin';
  const isAdminEmail = data.user.email?.toLowerCase() === ADMIN_EMAIL;

  if (!isAdminRole && !isAdminEmail) {
    res.status(403).json({ error: 'Acceso denegado: se requiere rol de administrador' });
    return;
  }

  req.user = data.user;
  next();
}
