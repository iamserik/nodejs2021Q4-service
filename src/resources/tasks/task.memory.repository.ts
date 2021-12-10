import { tasks } from '../../db/tasks';
import { TaskModel } from './task.model';
import { Task } from '../../interfaces/Task';

/**
 * Retrieves all tasks from db
 *
 * @return {Array<TaskModel>} array of tasks
 */
export const getAllFromDb = async (boardId: string): Promise<Array<TaskModel>> => new Promise((resolve) => {
    resolve(tasks.filter((task) => task.boardId === boardId));
});

/**
 * Retrieve task by id from db
 *
 * @param {string} id (uuid)
 * @return {TaskModel} task
 */
export const getSingleFromDb = async (id: string): Promise<TaskModel> => new Promise((resolve, reject) => {
    const task = tasks.find((item) => item.id === id);

    if (task) resolve(task);
    else reject(new Error(`Task with id ${id} not found`));
});

/**
 * Create and return new task
 *
 * @param {Task} payload task object
 * @return {TaskModel} new task
 */
export const addTaskToDb = async (payload: Task): Promise<TaskModel> => new Promise((resolve) => {
    const task = new TaskModel(payload);
    tasks.push(task);
    resolve(task);
});

/**
 * Delete task by id from db
 *
 * @param {string} id (uuid)
 * @return {void}
 */
export const deleteTaskFormDb = async (id: string): Promise<void> => new Promise((resolve, reject) => {
    const taskIndex = tasks.findIndex((item) => item.id === id);

    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        resolve();
    } else {
        reject(new Error(`Task with id ${id} not found`));
    }
});

/**
 * Delete all tasks by boardId from db
 *
 * @param {string} boardId (uuid)
 * @return {void}
 */
export const deleteBoardTasksFromDb = async (boardId: string): Promise<void> => new Promise((resolve) => {
    const cleanedTasks = tasks.filter((task) => task.boardId !== boardId);
    tasks.splice(0, tasks.length, ...cleanedTasks);
    resolve();
});

/**
 * Set users to null by userId
 *
 * @param {string} userId (uuid)
 * @return {void}
 */
export const unsetUserTasksFromDb = async (userId: string): Promise<void> => new Promise((resolve) => {
    const mapped = tasks.map((task) => {
        if (task.userId === userId) return { ...task, userId: null };
        return task;
    });

    tasks.splice(0, tasks.length, ...mapped);
    resolve();
});

/**
 * Update existing task
 *
 * @param {string} id
 * @param {Task} payload task object with new data
 * @return {TaskModel} updated task
 */
export const updateTaskFromDb = async (id: string, payload: Task): Promise<TaskModel> => {
    return new Promise((resolve, reject) => {
        const taskIndex = tasks.findIndex((item) => item.id === id);

        if (taskIndex !== -1) {
            const task = new TaskModel({...payload, id});
            tasks.splice(taskIndex, 1, task);
            resolve(task);
        } else {
            reject(new Error(`Task with id ${id} not found`));
        }
    });
};
