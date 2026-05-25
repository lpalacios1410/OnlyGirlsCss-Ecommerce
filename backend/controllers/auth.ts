import type { Request, Response, NextFunction } from 'express';

export const checkAdminKey = (req: Request, res: Response, next: NextFunction): void => {
  const userKey = req.headers['x-admin-key'] as string | undefined;

  if (!userKey || userKey !== process.env.ADMIN_SECRET_KEY) {
    console.log("🚫 Intento de acceso no autorizado detectado");
    res.status(403).json({ 
      error: "Acceso denegado", 
      message: "No tienes la llave maestra de OnlyGirlsCcs" 
    });
    return;
  }

  console.log("✅ Llave correcta. Procediendo...");
  next();
};
