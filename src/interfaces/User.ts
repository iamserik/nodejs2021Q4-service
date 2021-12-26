import { FastifyRequest } from 'fastify';

export interface User {
    id: string | undefined;
    name: string;
    login: string;
    password: string;
}

export type UserRequest = FastifyRequest<{
    Body: User,
}>;

export type UserRequestUpdate = FastifyRequest<{
    Body: User,
    Params: {
        id: string,
    }
}>;
