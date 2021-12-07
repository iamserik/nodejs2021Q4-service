import { FastifyReply, FastifyRequest } from 'fastify';
import { validateId } from '../../common/utils';
import { Task } from '../../interfaces/Task';
import {
    getAllFromDb,
    getSingleFromDb,
    addTaskToDb,
    deleteTaskFormDb,
    updateTaskFromDb,
} from './task.memory.repository';

type RequestByBoardId = FastifyRequest<{
    Params: {
        boardId: string,
    },
}>;

type RequestByTaskId = FastifyRequest<{
    Params: {
        taskId: string,
    },
}>;

type RequestCreatTask = FastifyRequest<{
    Params: {
        boardId: string,
    },
    Body: Task,
}>;

type RequestUpdateTask = FastifyRequest<{
    Params: {
        taskId: string,
    },
    Body: Task,
}>;

export const getAll = async (req: RequestByBoardId, reply: FastifyReply) => {
    const { boardId } = req.params;
    validateId(boardId);

    getAllFromDb(boardId).then((data) => {
        reply.send(data);
    });
};

export const getSingle = async (req: RequestByTaskId, reply: FastifyReply) => {
    const { taskId } = req.params;
    validateId(taskId);

    getSingleFromDb(taskId).then((data) => {
        reply.send(data);
    }).catch((err) => {
        reply.code(404);
        reply.send({ message: err.message });
    });
};

export const addTask = async (req: RequestCreatTask, reply: FastifyReply) => {
    const { boardId } = req.params;
    addTaskToDb({ ...req.body, boardId }).then((data) => {
        reply.code(201);
        reply.send(data);
    });
};

export const deleteTask = async (req: RequestByTaskId, reply: FastifyReply) => {
    const { taskId } = req.params;
    validateId(taskId);

    deleteTaskFormDb(taskId).then(() => {
        reply.send({ message: 'Task deleted successfully' });
    }).catch((err) => {
        reply.code(404);
        reply.send({ message: err.message });
    });
};

export const updateTask = async (req: RequestUpdateTask, reply: FastifyReply) => {
    const { taskId } = req.params;
    validateId(taskId);

    updateTaskFromDb(taskId, req.body).then((data) => {
        reply.send(data);
    }).catch((err) => {
        reply.code(404);
        reply.send({ message: err.message });
    });
};
