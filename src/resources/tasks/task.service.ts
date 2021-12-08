import { FastifyReply, FastifyRequest } from 'fastify';
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
 * All task records request handler
 *
 * @param {RequestByBoardId} request
 * @param {FastifyReply} response
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
 * Single task request handler
 *
 * @param {RequestByTaskId} request
 * @param {FastifyReply} response
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
 * Add task request handler
 *
 * @param {RequestCreatTask} request
 * @param {FastifyReply} response
 *
 * @return {void}
 */
export const addTask = async (req: RequestCreatTask, reply: FastifyReply) => {
    const { boardId } = req.params;
    addTaskToDb({ ...req.body, boardId }).then((data) => {
        reply.code(201);
        reply.send(data);
    });
};

/**
 * Delete task request handler
 *
 * @param {RequestByTaskId} request
 * @param {FastifyReply} response
 *
 * @return {void}
 * @throws {Error} if not valid uuid
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
 * Update task request handler
 *
 * @param {RequestUpdateTask} request
 * @param {FastifyReply} response
 *
 * @return {void}
 * @throws {Error} if not valid uuid
 */
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
