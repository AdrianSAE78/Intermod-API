const express = require('express');
const router = express.Router();
const scoreController = require('../controller/scoreController');

router.get('/scores', scoreController.getAllScores);
router.post('/scores', scoreController.createScore);
router.get('/scores/:id', scoreController.getScoresById);
router.put('/scores/:id', scoreController.updateScore);
router.delete('/scores/:id', scoreController.deleteScore);

module.exports = router;