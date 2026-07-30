import { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../shared/utils/app-error.utils';

export const notFoundMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  next(new NotFoundError(`Route ${req.originalUrl} not found`));
};
