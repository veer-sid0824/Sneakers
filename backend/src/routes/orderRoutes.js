const express = require('express');
const { getOrderById } = require('../controllers/orderController');

const orderRouter = express.Router();

orderRouter.get('/:orderId', getOrderById);

module.exports = orderRouter;
