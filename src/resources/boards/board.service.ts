import { FastifyReply, FastifyRequest } from 'fastify';
import { validateId } from '../../common/utils';
import { Board } from '../../interfaces/Board';
import {
    getAllFromDb,
    getSingleFromDb,
    addBoardToDb,
    deleteBoardFormDb,
    updateBoardFromDb,
} from './board.memory.repository';

type BoardRequest = FastifyRequest<{
    Body: Board,
}>;

type BoardRequestById = FastifyRequest<{
    Params: {
        id: string,
    }
}>;

type BoardRequestUpdate = FastifyRequest<{
    Body: Board,
    Params: {
        id: string,
    }
}>

export const getAll = async (_: FastifyRequest, reply: FastifyReply) => {
    getAllFromDb().then((data) => {
        reply.send(data);
    });
};

export const getSingle = async (req: BoardRequestById, reply: FastifyReply) => {
    const { id } = req.params;
    validateId(id);

    getSingleFromDb(id).then((data) => {
        reply.send(data);
    }).catch((err) => {
        reply.code(404);
        reply.send({ message: err.message });
    });
};

export const addBoard = async (req: BoardRequest, reply: FastifyReply) => {
    addBoardToDb(req.body).then((data) => {
        reply.code(201);
        reply.send(data);
    });
};

export const deleteBoard = async (req: BoardRequestById, reply: FastifyReply) => {
    const { id } = req.params;
    validateId(id);

    deleteBoardFormDb(id).then(() => {
        reply.send({ message: 'Board deleted successfully' });
    }).catch((err) => {
        reply.code(404);
        reply.send({ message: err.message });
    });
};

export const updateBoard = async (req: BoardRequestUpdate, reply: FastifyReply) => {
    const { id } = req.params;
    validateId(id);

    updateBoardFromDb(id, req.body).then((data) => {
        reply.send(data);
    }).catch((err) => {
        reply.code(404);
        reply.send({ message: err.message });
    });
};
