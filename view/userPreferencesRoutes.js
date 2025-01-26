const express = require('express');
const router = express.Router();
const userPreferencesController = require('../controller/userPreferencesController');

router.get('/user-preferences', userPreferencesController.getAllUserPreferences);
router.post('/user-preferences', userPreferencesController.createUserPreference);
router.get('/user-preferences/:id', userPreferencesController.getUserPreferencessById);
router.put('/user-preferences/:id', userPreferencesController.updateUserPreference);
router.delete('/user-preferences/:id', userPreferencesController.deleteUserPreference);

module.exports = router;