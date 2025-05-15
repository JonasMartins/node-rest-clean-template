import { Response } from 'express';
import { HttpError } from '@/application/errors/httpError';

export abstract class BaseController {
  protected ok<T>(res: Response, dto?: T): Response {
    if (dto) {
      return res.status(200).json(dto);
    }
    return res.status(200).end();
  }

  protected created<T>(res: Response, dto?: T): Response {
    if (dto) {
      return res.status(201).json(dto);
    }
    return res.status(201).end();
  }

  protected badRequest<T>(res: Response, error: T): Response {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(400).end();
  }

  protected handleError(res: Response, error: unknown): Response {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({
        error: {
          message: error.message,
          code: error.code,
        },
      });
    }

    console.error('Unhandled error:', error);
    return res.status(500).json({
      error: {
        message: 'An unexpected error occurred',
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
}
