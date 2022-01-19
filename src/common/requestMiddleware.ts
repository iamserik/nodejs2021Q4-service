import { FastifyRequest, FastifyReply } from 'fastify';

export async function requestMiddleware (request: FastifyRequest, reply: FastifyReply) {
    if (['/login', '/doc', '/'].includes(request.url)) return;

    try {
        await request.jwtVerify();
    } catch (err) {
        reply.code(401);
        reply.send(err);
    }
}
