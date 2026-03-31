const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateSignupBody = (req, res, next) => {
  const { fullName, email, password } = req.body || {};

  if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
    return res.status(400).json({ message: 'Full name must be at least 2 characters' });
  }

  if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
    return res.status(400).json({ message: 'Please provide a valid email address' });
  }

  if (!password || typeof password !== 'string' || password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long' });
  }

  next();
};

const validateSigninBody = (req, res, next) => {
  const { email, password } = req.body || {};

  if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
    return res.status(400).json({ message: 'Please provide a valid email address' });
  }

  if (!password || typeof password !== 'string') {
    return res.status(400).json({ message: 'Password is required' });
  }

  next();
};

module.exports = {
  validateSignupBody,
  validateSigninBody,
};
