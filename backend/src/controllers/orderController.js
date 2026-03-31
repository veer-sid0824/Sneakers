const { findOrderById } = require('../services/orderStore');

const getOrderById = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = findOrderById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.status(200).json({ order });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOrderById,
};
