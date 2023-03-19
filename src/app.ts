import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';
import router from './routes';
import { json, urlencoded } from 'body-parser';

export const app: Application = express();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors({ credentials: true }));

app.use('/', router);

app.use(errorHandler);

app.get('/', (req: Request, res: Response, __: NextFunction) => {
  console.log({ params: req.query, body: req.body });
  res.status(200).json({ message: 'Root e-commerce API' });
});
