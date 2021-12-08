import { FastifyReply, FastifyRequest } from 'fastify';
import { validateId } from '../../common/utils';
import { RequestById } from '../../interfaces/Common';
import { UserRequest, UserRequestUpdate } from '../../interfaces/User';
import {
    getAllFromDb,
    getSingleFromDb,
    addUserToDb,
    deleteUserFormDb,
    updateUserFromDb,
} from './user.memory.repository';

/**
 * All users records request handler
 *
 * @param {FastifyRequest} request
 * @param {FastifyReply} response
 *
 * @return {void}
 */
export const getAll = async (_: FastifyRequest, reply: FastifyReply) => {
    getAllFromDb().then((data) => {
        reply.send(data);
    });
};

/**
 * Single user request handler
 *
 * @param {RequestById} request
 * @param {FastifyReply} response
 *
 * @return {void}
 * @throws {Error} if not valid uuid
 */
export const getSingle = async (req: RequestById, reply: FastifyReply) => {
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
 * Add user request handler
 *
 * @param {UserRequest} request
 * @param {FastifyReply} response
 *
 * @return {void}
 */
export const addUser = async (req: UserRequest, reply: FastifyReply) => {
    addUserToDb(req.body).then((data) => {
        reply.code(201);
        reply.send(data);
    });
};

/**
 * Delete user request handler
 *
 * @param {RequestById} request
 * @param {FastifyReply} response
 *
 * @return {void}
 * @throws {Error} if not valid uuid
 */
export const deleteUser = async (req: RequestById, reply: FastifyReply) => {
    const { id } = req.params;
    validateId(id);

    deleteUserFormDb(id).then(() => {
        reply.send({ message: 'User deleted successfully' });
    }).catch((err) => {
        reply.code(404);
        reply.send({ message: err.message });
    });
};

/**
 * Update user request handler
 *
 * @param {UserRequestUpdate} request
 * @param {FastifyReply} response
 *
 * @return {void}
 * @throws {Error} if not valid uuid
 */
export const updateUser = async (req: UserRequestUpdate, reply: FastifyReply) => {
    const { id } = req.params;
    validateId(id);

    updateUserFromDb(id, req.body).then((data) => {
        reply.send(data);
    }).catch((err) => {
        reply.code(404);
        reply.send({ message: err.message });
    });
}
