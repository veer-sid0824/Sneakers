require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/authRoutes');
const paymentRouter = require('./routes/paymentRoutes');
const orderRouter = require('./routes/orderRoutes');
const { notFound, errorHandler } = require('./middlewares/errorHandlers');

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173,http://localhost:5174')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
  })
);
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend is running',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/auth', authRouter);
app.use('/api/payments', paymentRouter);
app.use('/api/orders', orderRouter);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
