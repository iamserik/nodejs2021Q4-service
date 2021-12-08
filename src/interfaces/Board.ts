import { FastifyRequest } from "fastify";

export interface Board {
    id: string | undefined;
    title: string;
    columns: Array<string>;
}

export type BoardRequest = FastifyRequest<{
    Body: Board,
}>;

export type BoardUpdateRequest = FastifyRequest<{
    Body: Board,
    Params: {
        id: string,
    }
}>;