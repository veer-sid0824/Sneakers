const sanitizeUser = (user) => ({
  id: user.id,
  fullName: user.fullName,
  email: user.email,
  createdAt: user.createdAt,
});

module.exports = { sanitizeUser };
