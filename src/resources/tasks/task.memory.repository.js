const { tasks } = require('../../db');
const Task = require('./task.model');

const getAllFromDb = async (boardId) => new Promise((resolve) => {
    resolve(tasks.filter((task) => task.boardId === boardId));
});

const getSingleFromDb = async (id) => new Promise((resolve, reject) => {
    const task = tasks.find((item) => item.id === id);

    if (task) resolve(task);
    else reject(new Error(`Task with id ${id} not found`));
});

const addTaskToDb = async (payload) => new Promise((resolve) => {
    const task = new Task(payload);
    tasks.push(task);
    resolve(task);
});

const deleteTaskFormDb = async (id) => new Promise((resolve, reject) => {
    const taskIndex = tasks.findIndex((item) => item.id === id);

    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        resolve();
    } else {
        reject(new Error(`Task with id ${id} not found`));
    }
});

const deleteBoardTasksFromDb = async (boardId) => new Promise((resolve) => {
    const cleanedTasks = tasks.filter((task) => task.boardId !== boardId);
    tasks.splice(0, tasks.length, ...cleanedTasks);
    resolve();
});

const unsetUserTasksFromDb = async (userId) => new Promise((resolve) => {
    const mapped = tasks.map((task) => {
        if (task.userId === userId) return { ...task, userId: null };
        return task;
    });

    console.log('mapped', mapped);

    tasks.splice(0, tasks.length, ...mapped);
    resolve();
})

const updateTaskFromDb = async (id, payload) => new Promise((resolve, reject) => {
    const taskIndex = tasks.findIndex((item) => item.id === id);

    if (taskIndex !== -1) {
        const task = new Task({ ...payload, id });
        tasks.splice(taskIndex, 1, task);
        resolve(task);
    } else {
        reject(new Error(`Task with id ${id} not found`));
    }
});

module.exports = {
    getAllFromDb,
    getSingleFromDb,
    addTaskToDb,
    deleteTaskFormDb,
    updateTaskFromDb,
    deleteBoardTasksFromDb,
    unsetUserTasksFromDb,
};