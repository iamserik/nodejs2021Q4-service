import { FastifyInstance, RouteOptions } from 'fastify';
import {
    getAll,
    getSingle,
    addBoard,
    deleteBoard,
    updateBoard,
} from './board.service';

const Column = {
    type: 'object',
    properties: {
        title: { type: 'string' },
        order: { type: 'number' },
    },
}

const Board = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        columns: { type: 'array' }
    },
};

const notFound = {
    type: 'object',
    properties: {
        message: { type: 'string' },
    },
};

const getAllBoardsOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: Board,
            },
        },
    },
    handler: getAll,
};

const getSingleBoardOpts = {
    schema: {
        response: {
            200: Board,
            404: notFound,
        },
    },
    handler: getSingle,
};

const postBoardOpts = {
    schema: {
        body: {
            required: ['title'],
            ...Board,
        },
        response: {
            201: Board,
        }
    },
    handler: addBoard,
};

const deleteBoardOpts = {
    schema: {
        response: {
            204: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                },
            },
            404: notFound,
        },
    },
    handler: deleteBoard,
};

const updateBoardOpts = {
    schema: {
        body: {
            required: ['title'],
            ...Board,
        },
        response: {
            200: Board,
            404: notFound,
        },
    },
    handler: updateBoard,
};

/**
 * Board route plugin
 *
 * @param fastify - Fastify instance
 * @param options - Router options
 * @param done - callback function
 *
 * @return {void}
 */
export default function boardsRoute(fastify: FastifyInstance, options: RouteOptions, done: () => void): void {
    fastify.get('/boards', getAllBoardsOpts);

    fastify.get('/boards/:id', getSingleBoardOpts);

    fastify.post('/boards', postBoardOpts);

    fastify.delete('/boards/:id', deleteBoardOpts);

    fastify.put('/boards/:id', updateBoardOpts);

    done();
}
