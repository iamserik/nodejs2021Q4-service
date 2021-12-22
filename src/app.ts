import Fastify from 'fastify';
import config from './common/config';
import path from 'path';

const today = new Date().toJSON().slice(0, 10).split('-').reverse().join('-');

const fastify = Fastify({
  logger: {
    // prettyPrint: true,
    file: path.join(__dirname, `./logs/log-${today}.log`),
    level: 'info',
    serializers: {
      res (reply) {
        return {
          statusCode: reply.statusCode,
        }
      },
      req (request) {
        return {
          method: request.method,
          url: request.url,
          parameters: request.params,
        }
      }
    }
  },
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
  fastify.listen(port, (err: Error | null) => {
    if (err) {
      fastify.log.error(err);
      process.exit(config.EXIT_CODE);
    }
  });
}
