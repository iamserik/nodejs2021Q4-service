import Fastify from "fastify";
import config from './common/config';

const fastify = Fastify({ logger: true });

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
 * Main function which start server
 *
 * @param port number
 * @return void
 */
export default function main(port: string | number): void {
  fastify.listen(port, (err: Error | null) => {
    if (err) {
      fastify.log.error(err);
      process.exit(config.EXIT_CODE);
    }
  })
}
