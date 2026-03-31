const bcrypt = require('bcryptjs');
const prisma = require('../config/prisma');
const { signToken } = require('../utils/jwt');
const { sanitizeUser } = require('../utils/sanitizeUser');

const signup = async (req, res, next) => {
  try {
    const fullName = req.body.fullName.trim();
    const email = req.body.email.toLowerCase().trim();
    const { password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'An account with this email already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        passwordHash,
      },
    });

    const token = signToken(user.id);

    return res.status(201).json({
      message: 'Signup successful',
      token,
      user: sanitizeUser(user),
    });
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const email = req.body.email.toLowerCase().trim();
    const { password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = signToken(user.id);

    return res.status(200).json({
      message: 'Signin successful',
      token,
      user: sanitizeUser(user),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  signin,
};
