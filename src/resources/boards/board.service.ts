import { FastifyReply, FastifyRequest } from 'fastify';
import { validateId } from '../../common/utils';
import { RequestById } from '../../interfaces/Common';
import { BoardRequest, BoardUpdateRequest } from '../../interfaces/Board';
import {
    getAllFromDb,
    getSingleFromDb,
    addBoardToDb,
    deleteBoardFormDb,
    updateBoardFromDb,
} from './board.memory.repository';

/**
 * All board records request handler
 *
 * @param {FastifyRequest} request
 * @param {FastifyReply} response
 *
 * @return {void}
 */
export const getAll = async (_: FastifyRequest, reply: FastifyReply): Promise<void> => {
    getAllFromDb().then((data) => {
        reply.send(data);
    });
};

/**
 * Single board request handler
 *
 * @param {RequestById} request
 * @param {FastifyReply} response
 *
 * @return {void}
 * @throws {Error} if not valid uuid
 */
export const getSingle = async (req: RequestById, reply: FastifyReply): Promise<void> => {
    const { id } = req.params;
    validateId(id);

    getSingleFromDb(id).then((data) => {
        reply.send(data);
    }).catch((err) => {
        reply.code(404);
        reply.send({ message: err.message });
    });
};

/**
 * Add board request handler
 *
 * @param {BoardRequest} request
 * @param {FastifyReply} response
 *
 * @return {void}
 */
export const addBoard = async (req: BoardRequest, reply: FastifyReply): Promise<void> => {
    addBoardToDb(req.body).then((data) => {
        reply.code(201);
        reply.send(data);
    });
};

/**
 * Delete board request handler
 *
 * @param {RequestById} request
 * @param {FastifyReply} response
 *
 * @return {void}
 * @throws {Error} if not valid uuid
 */
export const deleteBoard = async (req: RequestById, reply: FastifyReply): Promise<void> => {
    const { id } = req.params;
    validateId(id);

    deleteBoardFormDb(id).then(() => {
        reply.send({ message: 'Board deleted successfully' });
    }).catch((err) => {
        reply.code(404);
        reply.send({ message: err.message });
    });
};

/**
 * Update board request handler
 *
 * @param {BoardUpdateRequest} request
 * @param {FastifyReply} response
 *
 * @return {void}
 * @throws {Error} if not valid uuid
 */
export const updateBoard = async (req: BoardUpdateRequest, reply: FastifyReply): Promise<void> => {
    const { id } = req.params;
    validateId(id);

    updateBoardFromDb(id, req.body).then((data) => {
        reply.send(data);
    }).catch((err) => {
        reply.code(404);
        reply.send({ message: err.message });
    });
};
