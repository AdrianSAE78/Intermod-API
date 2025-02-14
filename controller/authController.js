const admin = require('../config/firebase');
const tableRelations = require('../model/tableRelations');

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

     // Verificar si el usuario tiene preferencias
     const userPreferences = await tableRelations.UserPreferences.findOne({
      where: { user_preferences: user.id }
    });

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        profile_picture: user.profile_picture
      },
      profileCompleted: !!userPreferences
    });

  } catch (error) {
    console.error('Error en autenticación Google:', error);
    res.status(401).json({ 
      success: false,
      error: 'Autenticación fallida' 
    });
  }
};