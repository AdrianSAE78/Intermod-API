const express = require('express');
const router = express.Router();
const exchangeController = require('../controller/exchangeController');
const authenticate = require('../middlewares/auth')

router.get('/exchange/all', exchangeController.getAllExchanges);
router.get('/exchange/upcoming', authenticate, exchangeController.getUpcomingExchanges);
router.get('/exchange/:id', exchangeController.getExchangesById);
router.get('/exchange/user/:id', authenticate, exchangeController.getUserExchanges);
router.post('/exchange/create', authenticate, exchangeController.createExchange);
router.put('/exchange/respond/:id', exchangeController.respondToExchange);
router.delete('/exchange/delete/:id', exchangeController.deleteExchange);

module.exports = router;