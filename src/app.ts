import { createConnection } from 'typeorm';
import Fastify from 'fastify';
import jwt from "fastify-jwt";
import config from './common/config';
import { requestMiddleware } from './common/requestMiddleware';
import { logger } from './logger';
import { User } from './entity/User';
import { Board } from './entity/Board';
import { Task } from './entity/Task';


const fastify = Fastify({
  logger,
});

fastify.addHook("onRequest", requestMiddleware);

fastify.register(jwt, {
  secret: config.JWT_SECRET_KEY || 'awesome-secret-key',
});

fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: 'doc',
  swagger: {
    info: { title: 'fastify-api' },
  },
});

fastify.register(require('./resources/users/user.router'));
fastify.register(require('./resources/boards/board.router'));
fastify.register(require('./resources/tasks/task.router'));

/**
 * Starting server
 *
 * @param port - The server listening port
 * @return {void}
 */
export default async function main(port: string | number): Promise<void> {
  try {
    await createConnection({
      type: 'postgres',
      host: config.DB_HOST,
      username: config.DB_USERNAME,
      password: undefined,
      database: config.DB_DATABASE,
      entities: [User, Board, Task],
      synchronize: false,
      migrations: ['./migrations/*.ts'],
    });
    console.log('Connected to Postgres');
  }catch(err) {
    console.error('Unable connect to Postgres', err);
    throw new Error('Unable to connect to db');
  }

  fastify.listen(port, '0.0.0.0', (err: Error | null) => {
    if (err) {
      fastify.log.error(err);
      process.exit(config.EXIT_CODE);
    }
  });
}
