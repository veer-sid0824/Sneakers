const { Prisma } = require('@prisma/client');

const notFound = (req, res, next) => {
  if (res.headersSent) {
    return next();
  }

  return res.status(404).json({ message: 'Route not found' });
};

const errorHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  console.error(error);

  if (
    error instanceof Prisma.PrismaClientInitializationError ||
    error?.name === 'PrismaClientInitializationError' ||
    String(error?.message || '').includes("Can't reach database server")
  ) {
    return res.status(503).json({
      message: 'Database connection failed. Please check PostgreSQL availability and DATABASE_URL.',
    });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
    return res.status(409).json({
      message: 'A record with this unique value already exists.',
    });
  }

  return res.status(500).json({ message: 'Internal server error' });
};

module.exports = {
  notFound,
  errorHandler,
};
