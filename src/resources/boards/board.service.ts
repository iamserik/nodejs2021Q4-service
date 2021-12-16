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
 * Reply all board records.
 *
 * @param req - Fastify request
 * @param reply - Fastify response
 *
 * @return {void}
 */
export const getAll = async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
    getAllFromDb().then((data) => {
        reply.send(data);
    });
};

/**
 * Reply board by id.
 *
 * @param req - Fastify request. That contains id of board
 * @param reply - Fastify response.
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
 * Add and reply newly created board with status code 201.
 *
 * @param req - Fastify request. Contains board data.
 * @param reply - Fastify response.
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
 * Deletes board by id. Reply success message.
 *
 * @param req - Fastify request.
 * @param reply - Fastify response
 *
 * @return {void}
 * @throws Error - if not valid uuid
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
 * Update board by id. Reply updated board record.
 *
 * @param req - Fastify request.
 * @param reply - Fastify response
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
