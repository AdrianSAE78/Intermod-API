const admin = require('../config/firebase');

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Obtener el token del encabezado Authorization
  console.log("Token recibido:", token); // Verifica si el token está siendo recibido

  if (!token) {
    return res.status(403).json({ error: "Acceso denegado" });
  }

  try {
    // Verifica el token con Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log("Token decodificado:", decodedToken);
    req.user = decodedToken; // El token decodificado contiene la información del usuario
    next(); // Continua con la ejecución de la siguiente función
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return res.status(401).json({ error: "Token inválido" });
  }
};

module.exports = authenticate;