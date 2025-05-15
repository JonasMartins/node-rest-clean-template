import { Request, Response, NextFunction } from 'express';
import { HttpError } from '@/application/errors/httpError';

export class ErrorMiddleware {
  static handle(err: Error, _req: Request, res: Response, _next: NextFunction): void {
    if (err instanceof HttpError) {
      res.status(err.statusCode).json({
        error: {
          message: err.message,
          code: err.code,
        },
      });
      return;
    }

    console.error('Unhandled error:', err);
    res.status(500).json({
      error: {
        message: 'An unexpected error occurred',
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
}

export class NotFoundMiddleware {
  static handle(_req: Request, res: Response): void {
    res.status(404).json({
      error: {
        message: 'Resource not found',
        code: 'NOT_FOUND',
      },
    });
  }
}
