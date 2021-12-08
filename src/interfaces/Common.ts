import {FastifyRequest} from "fastify";

export type RequestById = FastifyRequest<{
    Params: {
        id: string,
    }
}>;