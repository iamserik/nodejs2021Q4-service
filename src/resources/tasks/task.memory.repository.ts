import { tasks } from '../../db/tasks';
import { TaskModel } from './task.model';
import { Task } from '../../interfaces/Task';

/**
 * Return specific board tasks from db
 *
 * @param boardId - the board id
 *
 * @return tasks - array of tasks filtered by boardId
 */
export const getAllFromDb = async (boardId: string): Promise<Array<TaskModel>> => new Promise((resolve) => {
    resolve(tasks.filter((task) => task.boardId === boardId));
});

/**
 * Return task by id from db
 *
 * @param id - target task's uuid
 *
 * @return task - object
 */
export const getSingleFromDb = async (id: string): Promise<TaskModel> => new Promise((resolve, reject) => {
    const task = tasks.find((item) => item.id === id);

    if (task) resolve(task);
    else reject(new Error(`Task with id ${id} not found`));
});

/**
 * Create and return new task
 *
 * @param payload - task object without id
 * @return task - newly created task record
 */
export const addTaskToDb = async (payload: Task): Promise<TaskModel> => new Promise((resolve) => {
    const task = new TaskModel(payload);
    tasks.push(task);
    resolve(task);
});

/**
 * Delete task by id from db
 *
 * @param id - target task's uuid
 *
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
 * Delete all tasks of deleted board from db
 *
 * @param boardId - board id which deleted
 *
 * @return {void}
 */
export const deleteBoardTasksFromDb = async (boardId: string): Promise<void> => new Promise((resolve) => {
    const cleanedTasks = tasks.filter((task) => task.boardId !== boardId);
    tasks.splice(0, tasks.length, ...cleanedTasks);
    resolve();
});

/**
 * Set all tasks user field to null. After user was deleted.
 *
 * @param userId - the user id
 *
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
 * Update and return existing task from db
 *
 * @param id - target task's uuid
 * @param payload - task object data without id
 *
 * @return task - updated task record
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
