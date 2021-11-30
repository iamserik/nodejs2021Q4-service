const fastify = require('fastify')({ logger: true });
fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: 'doc',
  swagger: {
    info: { title: 'fastify-api' },
  },
});

const EXIT_CODE = 1;

async function main(port) {
  try {
    await fastify.listen(port);
  } catch(error) {
    fastify.log.error(error);
    process.exit(EXIT_CODE);
  }
}

module.exports = { main };
