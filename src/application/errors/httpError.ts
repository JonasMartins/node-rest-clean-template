import { HttpCodeMessage } from '@/application/utils/enums/enums';

export class HttpError extends Error {
  public readonly statusCode: number;
  public readonly code: HttpCodeMessage;

  constructor(message: string, statusCode: number, code: HttpCodeMessage) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.name = 'HttpError';
  }

  static unauthorized(message: string, code = HttpCodeMessage.UNAUTHORIZED): HttpError {
    return new HttpError(message, 401, code);
  }

  static badRequest(message: string, code = HttpCodeMessage.BAD_REQUEST): HttpError {
    return new HttpError(message, 400, code);
  }

  static notFound(message: string, code = HttpCodeMessage.NOT_FOUND): HttpError {
    return new HttpError(message, 404, code);
  }

  static internal(message: string, code = HttpCodeMessage.INTERNAL_ERROR): HttpError {
    return new HttpError(message, 500, code);
  }
}
