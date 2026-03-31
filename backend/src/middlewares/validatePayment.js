const validateCheckoutBody = (req, res, next) => {
  const { email, cardName, cardNumber, expiry, cvc, country, items, total } = req.body || {};

  if (!email || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ message: 'Enter a valid email' });
  }

  if (!cardName || typeof cardName !== 'string' || cardName.trim().length < 2) {
    return res.status(400).json({ message: 'Cardholder name is required' });
  }

  if (!cardNumber || typeof cardNumber !== 'string' || cardNumber.replace(/\s/g, '').length < 16) {
    return res.status(400).json({ message: 'Invalid card number' });
  }

  if (!expiry || typeof expiry !== 'string' || expiry.length < 7) {
    return res.status(400).json({ message: 'Invalid expiry' });
  }

  if (!cvc || typeof cvc !== 'string' || cvc.length < 3) {
    return res.status(400).json({ message: 'Invalid CVC' });
  }

  if (!country || typeof country !== 'string') {
    return res.status(400).json({ message: 'Country is required' });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Cart items are required' });
  }

  if (typeof total !== 'number' || total <= 0) {
    return res.status(400).json({ message: 'Invalid total amount' });
  }

  next();
};

module.exports = {
  validateCheckoutBody,
};
