const express = require('express');
const router = express.Router();
const garmentController = require('../controller/garmentsController');
const upload = require('../config/multer');
const authenticate = require('../middlewares/auth')


router.get('/garments', garmentController.getAllGarments);
router.post('/garments', upload.single('garment_image'), garmentController.createGarment);
router.get('/garments/by-user', authenticate, garmentController.getUserGarments);
router.get('/garments/:id', authenticate, garmentController.getGarmentsById);
router.put('/garments/:id', upload.single('garment_image'), garmentController.updateGarment);
router.delete('/garments/:id', garmentController.deleteGarment);

module.exports = router;