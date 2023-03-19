import { NextFunction, Request, Response } from 'express';
import { authMiddleware } from './authMiddleware';

export const managerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Use the authMiddleware to extract the user payload from the JWT token
  authMiddleware(req, res, () => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Check if the user has the 'admin' role
    if (user.role === 'client') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    next();
  });
};
