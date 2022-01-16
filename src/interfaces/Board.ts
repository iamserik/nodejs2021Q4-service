import { FastifyRequest } from 'fastify';

type Column = {
    title: string;
    order: number;
}

export interface Board {
    id: string | undefined;
    title: string;
    columns: Array<Column> | null;
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