import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { type Express, type Request, type Response } from 'express';

export function createApp(): Express {
  const app = express();
  const clientOrigin = process.env.CLIENT_ORIGIN ?? 'http://localhost:3000';

  app.use(express.json());
  app.use(cookieParser());
  app.use(cors({ origin: clientOrigin, credentials: true }));

  app.get('/', (_request: Request, response: Response) => {
    response.status(200).json({ status: 'ok' });
  });

  app.use('/auth', (_request: Request, response: Response) => {
    response
      .status(501)
      .json({ error: 'Authentication routes are not configured yet' });
  });
  app.use('/api/item', (_request: Request, response: Response) => {
    response.status(501).json({ error: 'Item routes are not configured yet' });
  });
  app.use('/api/transactions', (_request: Request, response: Response) => {
    response
      .status(501)
      .json({ error: 'Transaction routes are not configured yet' });
  });

  return app;
}
