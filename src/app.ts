import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import httpStatus from 'http-status';
const app: Application = express();

// enable cors
app.use(cors());
app.use(cookieParser());

// parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// test route
app.use('/', (req: Request, res: Response) => {
  res.send('Personal Expense Tracker Backend is Running...');
});

// handle not found routes
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
