const express = require('express');
const router = express.Router();
const categoriesController = require('../controller/categoriesController');

router.get('/categories', categoriesController.getAllCategories);
router.post('/categories', categoriesController.createCategorie);
router.get('/categories/:id', categoriesController.getCategoriesById);
router.put('/categories/:id', categoriesController.updateCategorie);
router.delete('/categories:id', categoriesController.deleteCategorie);

module.exports = router;