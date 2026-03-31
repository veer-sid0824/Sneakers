const jwt = require('jsonwebtoken');

const signToken = (userId) => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';

  if (!secret) {
    throw new Error('JWT_SECRET is not configured');
  }

  return jwt.sign({ sub: userId }, secret, { expiresIn });
};

module.exports = { signToken };
