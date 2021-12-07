import { FastifyReply, FastifyRequest } from 'fastify';
import { validateId } from '../../common/utils';
import { User } from '../../interfaces/User';
import {
    getAllFromDb,
    getSingleFromDb,
    addUserToDb,
    deleteUserFormDb,
    updateUserFromDb,
} from './user.memory.repository';

type UserRequest = FastifyRequest<{
    Body: User,
}>;

type UserRequestById = FastifyRequest<{
    Params: {
        id: string,
    },
}>;

type UserRequestUpdate = FastifyRequest<{
    Body: User,
    Params: {
        id: string,
    }
}>

const getAll = async (_: FastifyRequest, reply: FastifyReply) => {
    getAllFromDb().then((data) => {
        reply.send(data);
    });
};

const getSingle = async (req: UserRequestById, reply: FastifyReply) => {
    const { id } = req.params;
    validateId(id);

    getSingleFromDb(id).then((data) => {
        reply.send(data);
    }).catch((err) => {
        reply.code(404);
        reply.send({ message: err.message });
    });
};

const addUser = async (req: UserRequest, reply: FastifyReply) => {
    addUserToDb(req.body).then((data) => {
        reply.code(201);
        reply.send(data);
    });
};

const deleteUser = async (req: UserRequestById, reply: FastifyReply) => {
    const { id } = req.params;
    validateId(id);

    deleteUserFormDb(id).then(() => {
        reply.send({ message: 'User deleted successfully' });
    }).catch((err) => {
        reply.code(404);
        reply.send({ message: err.message });
    });
};

const updateUser = async (req: UserRequestUpdate, reply: FastifyReply) => {
    const { id } = req.params;
    validateId(id);

    updateUserFromDb(id, req.body).then((data) => {
        reply.send(data);
    }).catch((err) => {
        reply.code(404);
        reply.send({ message: err.message });
    });
}

module.exports = {
    getAll,
    getSingle,
    addUser,
    deleteUser,
    updateUser,
};
