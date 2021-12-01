const {
    getAll,
    getSingle,
    addTask,
    deleteTask,
    updateTask,
} = require('./task.service');

const Task = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        order: { type: 'number'},
        description: { type: 'string' },
        userId: { type: 'string' },
        boardId: { type: 'string' },
        columnId: { type: 'string' },
    },
};

const notFound = {
    type: 'object',
    properties: {
        message: { type: 'string' },
    },
};

const getAllTasksOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: Task,
            },
        },
    },
    handler: getAll,
};

const getSingleTaskOpts = {
    schema: {
        response: {
            200: Task,
            404: notFound,
        },
    },
    handler: getSingle,
};

const postTaskOpts = {
    schema: {
        body: {
            required: ['title', 'order', 'description'],
            ...Task,
        },
        response: {
            201: Task,
        }
    },
    handler: addTask,
};

const deleteTaskOpts = {
    schema: {
        response: {
            204: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                },
            },
            404: notFound,
        },
    },
    handler: deleteTask,
};

const updateTaskOpts = {
    schema: {
        body: {
            required: ['title', 'order', 'description'],
            ...Task,
        },
        response: {
            200: Task,
            404: notFound,
        },
    },
    handler: updateTask,
};

function tasksRoute(fastify, options, done) {
    fastify.get('/boards/:boardId/tasks', getAllTasksOpts);

    fastify.get('/boards/:boardId/tasks/:taskId', getSingleTaskOpts);

    fastify.post('/boards/:boardId/tasks', postTaskOpts);

    fastify.delete('/boards/:boardId/tasks/:taskId', deleteTaskOpts);

    fastify.put('/boards/:boardId/tasks/:taskId', updateTaskOpts);

    done();
}

module.exports = tasksRoute;
