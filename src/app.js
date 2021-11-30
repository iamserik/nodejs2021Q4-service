const fastify = require('fastify')({ logger: true });

fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: 'doc',
  swagger: {
    info: { title: 'fastify-api' },
  },
});

fastify.register(require('./resources/users/user.router'));

const EXIT_CODE = 1;

function main(port) {
  fastify.listen(port, (err, address) => {
    if (err) {
      fastify.log.error(err);
      process.exit(EXIT_CODE);
    }
    fastify.log.info(`server listening on ${address}`)
  });
}

module.exports = { main };
