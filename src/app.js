const fastify = require('fastify')({ logger: true, http2: false });

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

function main(port) {
  fastify.listen(port, (err) => {
    if (err) {
      fastify.log.error(err);
      process.exit(EXIT_CODE);
    }
  })
}

module.exports = { main };
