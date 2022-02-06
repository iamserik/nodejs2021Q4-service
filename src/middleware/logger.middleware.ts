import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl, body, query } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode } = response;

      let message = `${method} ${originalUrl} ${statusCode} - ${userAgent} ${ip}`

      if (Object.keys(body).length) {
        const bodyString = this.parseObject(body);
        message += ` body: ${bodyString}`;
      }

      if (Object.keys(query).length) {
        const queryString = this.parseObject(query);
        message += ` params: ${queryString}`;
      }

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

  parseObject(obj) {
    let result = '{ '
    const keys = Object.keys(obj).filter((key) => key !== 'password');
    keys.forEach((key) => {
      result += `${key}:${obj[key]} `
    });
    result += '}';
    return result;
  }
}