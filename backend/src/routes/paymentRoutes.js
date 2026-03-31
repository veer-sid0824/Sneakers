const express = require('express');
const { checkout } = require('../controllers/paymentController');
const { validateCheckoutBody } = require('../middlewares/validatePayment');

const paymentRouter = express.Router();

paymentRouter.post('/checkout', validateCheckoutBody, checkout);

module.exports = paymentRouter;
