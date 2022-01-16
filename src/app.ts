import Fastify from 'fastify';
import config from './common/config';
import { logger } from './logger';


const fastify = Fastify({
  logger,
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
export default function main(port: string | number): void {
  fastify.listen(port, '0.0.0.0', (err: Error | null) => {
    if (err) {
      fastify.log.error(err);
      process.exit(config.EXIT_CODE);
    }
  });
}
