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
 * Reply all user records.
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
 * Reply user by id.
 *
 * @param req - Fastify request.
 * @param reply - Fastify response.
 *
 * @return {void}
 * @throws Error - if not valid uuid
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
 * Add and reply newly created user with status code 201.
 *
 * @param req - Fastify request.
 * @param reply - Fastify response.
 *
 * @return {void}
 */
export const addUser = async (req: UserRequest, reply: FastifyReply): Promise<void> => {
    addUserToDb(req.body).then((data) => {
        reply.code(201);
        reply.send(data);
    });
};

/**
 * Deletes user by id. Reply success message.
 *
 * @param req - Fastify request.
 * @param reply - Fastify response.
 *
 * @return {void}
 * @throws {Error} if not valid uuid
 */
export const deleteUser = async (req: RequestById, reply: FastifyReply): Promise<void> => {
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
 * Update user by id. Reply updated user record.
 *
 * @param req - Fastify request.
 * @param reply - Fastify response.
 *
 * @return {void}
 * @throws Error - if not valid uuid
 */
export const updateUser = async (req: UserRequestUpdate, reply: FastifyReply): Promise<void> => {
    const { id } = req.params;
    validateId(id);

    updateUserFromDb(id, req.body).then((data) => {
        reply.send(data);
    }).catch((err) => {
        reply.code(404);
        reply.send({ message: err.message });
    });
}
