import { FastifyReply } from 'fastify';
import { validateId } from '../../common/utils';
import {
    RequestByBoardId,
    RequestByTaskId,
    RequestCreatTask,
    RequestUpdateTask,
} from '../../interfaces/Task';

import {
    getAllFromDb,
    getSingleFromDb,
    addTaskToDb,
    deleteTaskFormDb,
    updateTaskFromDb,
} from './task.memory.repository';

/**
 * Reply all board tasks.
 *
 * @param req - Fastify request
 * @param reply - Fastify response
 *
 * @return {void}
 */
export const getAll = async (req: RequestByBoardId, reply: FastifyReply) => {
    const { boardId } = req.params;
    validateId(boardId);

    getAllFromDb(boardId).then((data) => {
        reply.send(data);
    });
};

/**
 * Reply task by id
 *
 * @param req - Fastify request
 * @param reply - Fastify response
 *
 * @return {void}
 * @throws {Error} if not valid uuid
 */
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

/**
 * Add and reply newly created task with status code 201
 *
 * @param req - Fastify request
 * @param reply - Fastify response
 *
 * @return {void}
 */
export const addTask = async (req: RequestCreatTask, reply: FastifyReply) => {
    const { boardId } = req.params;

    req.log.info({ body: req.body });
    addTaskToDb({ ...req.body, boardId }).then((data) => {
        reply.code(201);
        reply.send(data);
    });
};

/**
 * Deletes task by id. Reply success message
 *
 * @param req - Fastify request
 * @param reply - Fastify response
 *
 * @return {void}
 * @throws Error - if not valid uuid
 */
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

/**
 * Update task by id. Reply updated task record
 *
 * @param req - Fastify request
 * @param reply - Fastify response
 *
 * @return {void}
 * @throws Error - if not valid uuid
 */
export const updateTask = async (req: RequestUpdateTask, reply: FastifyReply) => {
    const { taskId } = req.params;
    validateId(taskId);

    req.log.info({ body: req.body });
    updateTaskFromDb(taskId, req.body).then((data) => {
        reply.send(data);
    }).catch((err) => {
        reply.code(404);
        reply.send({ message: err.message });
    });
};
