import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { authenticateRequest } from './middleware/authMiddleware.js';

import { router as itemsRouter } from './routes/items.router.js';
import { router as authRouter } from './routes/auth.router.js';
import { router as transactionRouter } from './routes/transactions.router.js';
import { router as profileRouter } from './routes/profile.router.js';

const app = express();
const PORT = process.env.PORT;

dotenv.config();

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

// middleware
app.use(express.json());
app.use(cookieParser());
// update the origin to be a secure env var
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    exposedHeaders: ['set-cookie'], // Helps with debugging
  }),
);
app.use('/api', authenticateRequest);
app.use('/auth', authRouter);
app.use('/profile', profileRouter);
app.use('/api/item', itemsRouter);
app.use('/api/transactions', transactionRouter);

app.get('/', (req, res) => {
  res.status(200).send(`Hello there `);
});
