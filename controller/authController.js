const admin = require('../config/firebase');
const jwt = require('jsonwebtoken');
const tableRelations = require('../model/tableRelations');

const generateJWT = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, user_type: user.user_type },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

exports.googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;
    
    // Verificar token con Firebase
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email, picture } = decodedToken;

    // Buscar o crear usuario
    const [user, created] = await tableRelations.Users.findOrCreate({
      where: { firebase_uid: uid },
      defaults: {
        email,
        username: email.split('@')[0],
        profile_picture: picture,
        firebase_uid: uid,
        user_type: 'usuario'
      }
    });

    // Generar JWT propio
    const token = generateJWT(user);

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        profile_picture: user.profile_picture
      }
    });

  } catch (error) {
    console.error('Error en autenticación Google:', error);
    res.status(401).json({ 
      success: false,
      error: 'Autenticación fallida' 
    });
  }
};