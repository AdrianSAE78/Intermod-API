const express = require('express');
const router = express.Router();
const categoriesController = require('../controller/categoriesController');
const upload = require('../config/multer');


router.get('/categories', categoriesController.getAllCategories);
router.post('/categories', upload.single('categorie_picture'), categoriesController.createCategorie);
router.get('/categories/:id', categoriesController.getCategoriesById);
router.put('/categories/:id', upload.single('categorie_picture'),categoriesController.updateCategorie);
router.delete('/categories/:id', categoriesController.deleteCategorie);

module.exports = router;