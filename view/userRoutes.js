const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const upload = require('../config/multer');
const { verifyToken } = require('../middlewares/auth');

router.get('/users', userController.getAllUsers);
router.post('/users', upload.single('profile_picture'), userController.createUser);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;