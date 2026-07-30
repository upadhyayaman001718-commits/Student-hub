import { Request, Response, NextFunction } from 'express';
import { AppError } from '../shared/utils/app-error.utils';
import { errorResponse } from '../shared/responses/api-response';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const errorCode = err instanceof AppError ? err.errorCode : 'INTERNAL_SERVER_ERROR';
  const message = err.message || 'Internal Server Error';
  const details = err instanceof AppError ? err.details : null;

  console.error(`[Error] ${req.method} ${req.url} - Status: ${statusCode} - ${message}`);

  errorResponse(res, message, statusCode, errorCode, details);
};
