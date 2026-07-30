import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../shared/utils/app-error.utils';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Missing or malformed Authorization header'));
  }

  // Placeholder JWT verification logic
  next();
};
