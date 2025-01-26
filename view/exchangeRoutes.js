const express = require('express');
const router = express.Router();
const exchangeController = require('../controller/exchangeController');

router.get('/exchange/all', exchangeController.getAllExchanges);
router.get('/exchange/:id', exchangeController.getExchangesById);
router.get('/exchange/user/:id', exchangeController.getUserExchanges);
router.post('/exchange/create', exchangeController.createExchange);
router.put('/exchange/respond/:id', exchangeController.respondToExchange);
router.delete('/exchange/delete/:id', exchangeController.deleteExchange);

module.exports = router;