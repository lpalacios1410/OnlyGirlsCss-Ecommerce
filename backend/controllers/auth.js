export const checkAdminKey = (req, res, next) => {
  const userKey = req.headers['x-admin-key']; // Buscamos la llave en los headers

  if (!userKey || userKey !== process.env.ADMIN_SECRET_KEY) {
    console.log("🚫 Intento de acceso no autorizado detectado");
    return res.status(403).json({ 
      error: "Acceso denegado", 
      message: "No tienes la llave maestra de OnlyGirlsCcs" 
    });
  }

  console.log("✅ Llave correcta. Procediendo...");
  next(); // Todo bien, pasamos al siguiente paso (el controlador)
};