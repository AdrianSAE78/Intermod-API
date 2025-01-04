const express = require('express');
const router = express.Router();
const garmentController = require('../controller/garmentsController');

router.get('/garments', garmentController.getAllGarments);
router.post('/garments', garmentController.createGarment);
router.get('/garments/:id', garmentController.getGarmentsById);
router.put('/garments/:id', garmentController.updateGarment);
router.delete('/garments:id', garmentController.deleteGarment);

module.exports = router;