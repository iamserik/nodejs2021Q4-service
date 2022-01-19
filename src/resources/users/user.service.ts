import { FastifyReply, FastifyRequest } from 'fastify';
import { validateId } from '../../common/utils';
import { RequestById } from '../../interfaces/Common';
import { UserRequest, UserRequestUpdate, LoginRequest } from '../../interfaces/User';
import {
    loginDb,
    getAllFromDb,
    getSingleFromDb,
    addUserToDb,
    deleteUserFormDb,
    updateUserFromDb,
} from './user.memory.repository';

export const login = async (req: LoginRequest, reply: FastifyReply): Promise<void> => {
    const user = req.body;
    loginDb(user).then(async (data) => {
        const { login, id } = data;
        const token = await reply.jwtSign({ userId: id, login });
        reply.send({ token });
    }).catch((err) => {
        reply.code(404);
        reply.send({ message: err.message });
    })
}

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
    req.log.info({ body: req.body });
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

    req.log.info({ body: req.body });
    updateUserFromDb(id, req.body).then((data) => {
        reply.send(data);
    }).catch((err) => {
        reply.code(404);
        reply.send({ message: err.message });
    });
}
