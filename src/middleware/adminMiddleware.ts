import { NextFunction, Request, Response } from 'express';
import { authMiddleware } from './authMiddleware';

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  authMiddleware(req, res, () => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    next();
  });
};
