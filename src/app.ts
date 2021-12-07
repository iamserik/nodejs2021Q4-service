import Fastify from "fastify";

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

const EXIT_CODE = 1;

export default function main(port: string | number): void {
  fastify.listen(port, (err: Error | null) => {
    if (err) {
      fastify.log.error(err);
      process.exit(EXIT_CODE);
    }
  })
}
