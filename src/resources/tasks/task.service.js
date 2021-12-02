const { validateId } = require('../../common/utils');

const {
    getAllFromDb,
    getSingleFromDb,
    addTaskToDb,
    deleteTaskFormDb,
    updateTaskFromDb,
} = require('./task.memory.repository');

const getAll = async (req, reply) => {
    const { boardId } = req.params;
    validateId(boardId);

    getAllFromDb(boardId).then((data) => {
        reply.send(data);
    });
};

const getSingle = async (req, reply) => {
    const { taskId } = req.params;
    validateId(taskId);

    getSingleFromDb(taskId).then((data) => {
        reply.send(data);
    }).catch((err) => {
        reply.code(404);
        reply.send({ message: err.message });
    });
};

const addTask = async (req, reply) => {
    const { boardId } = req.params;
    addTaskToDb({ ...req.body, boardId }).then((data) => {
        reply.code(201);
        reply.send(data);
    });
};

const deleteTask = async (req, reply) => {
    const { taskId } = req.params;
    validateId(taskId);

    deleteTaskFormDb(taskId).then(() => {
        reply.send({ message: 'Task deleted successfully' });
    }).catch((err) => {
        reply.code(404);
        reply.send({ message: err.message });
    });
};

const updateTask = async (req, reply) => {
    const { taskId } = req.params;
    validateId(taskId);

    updateTaskFromDb(taskId, req.body).then((data) => {
        reply.send(data);
    }).catch((err) => {
        reply.code(404);
        reply.send({ message: err.message });
    });
}

module.exports = {
    getAll,
    getSingle,
    addTask,
    deleteTask,
    updateTask,
};
