const express = require('express');
const router = express.Router();
const exchangeController = require('../controller/exchangeController');

router.get('/exchanges', exchangeController.getAllExchanges);
router.post('/exchanges', exchangeController.createExchange);
router.get('/exchanges/:id', exchangeController.getExchangesById);
router.put('/exchanges/:id', exchangeController.updateExchange);
router.delete('/exchanges:id', exchangeController.deleteExchange);

module.exports = router;