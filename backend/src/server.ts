import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { corsOptions } from './configs/cors.config';
import { log } from './utils/logger-error.util';
import authRouter from './routers/auth.router';
import packagesRouter from './routers/packages.router';
import galleryRouter from './routers/gallery.router';
import reviewsRouter from './routers/reviews.router';
import financeRouter from './routers/finance.router';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/packages', packagesRouter);
app.use('/api/gallery', galleryRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/finance', financeRouter);

// Global error handler
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  const message = error?.expose ? error?.message : 'something went wrong';
  const statusCode = error?.expose ? error?.statusCode : 500;

  log.error(`${req.method} ${req.url} - ${message}`, {
    statusCode,
    name: error.name,
    stack: error.stack,
    body: req.body,
    params: req.params,
    query: req.query,
    headers: req.headers,
  });
  res.status(statusCode).json({
    success: false,
    message: error?.expose ? error?.message : 'something went wrong',
    data: {},
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    log.info(`Server is running on port ${PORT}`);
  });
}

export default app;
