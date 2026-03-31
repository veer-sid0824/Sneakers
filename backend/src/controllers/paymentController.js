const { createOrder } = require('../services/orderStore');

const checkout = async (req, res, next) => {
  try {
    const { email, cardName, country, items, total } = req.body;

    const order = createOrder({
      total,
      items,
      customerInfo: {
        name: cardName,
        email,
        country,
      },
    });

    return res.status(201).json({
      message: 'Payment processed (demo)',
      order,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkout,
};
