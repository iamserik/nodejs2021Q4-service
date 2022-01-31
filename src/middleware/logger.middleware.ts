import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode } = response;

      const message = `${method} ${originalUrl} ${statusCode} - ${userAgent} ${ip}`

      if (statusCode >= 200 && statusCode < 400) {
        this.logger.log(message);
      } else if (statusCode >= 400 && statusCode < 500) {
        this.logger.warn(message);
      } else if (statusCode >= 500) {
        this.logger.error(message);
      }
    });

    next();
  }
}