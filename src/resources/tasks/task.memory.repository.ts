import { tasks } from '../../db/tasks';
import { TaskModel } from './task.model';
import { Task } from '../../interfaces/Task';

export const getAllFromDb = async (boardId: string): Promise<Array<TaskModel>> => new Promise((resolve) => {
    resolve(tasks.filter((task) => task.boardId === boardId));
});

export const getSingleFromDb = async (id: string): Promise<TaskModel> => new Promise((resolve, reject) => {
    const task = tasks.find((item) => item.id === id);

    if (task) resolve(task);
    else reject(new Error(`Task with id ${id} not found`));
});

export const addTaskToDb = async (payload: Task): Promise<TaskModel> => new Promise((resolve) => {
    const task = new TaskModel(payload);
    tasks.push(task);
    resolve(task);
});

export const deleteTaskFormDb = async (id: string): Promise<void> => new Promise((resolve, reject) => {
    const taskIndex = tasks.findIndex((item) => item.id === id);

    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        resolve();
    } else {
        reject(new Error(`Task with id ${id} not found`));
    }
});

export const deleteBoardTasksFromDb = async (boardId: string): Promise<void> => new Promise((resolve) => {
    const cleanedTasks = tasks.filter((task) => task.boardId !== boardId);
    tasks.splice(0, tasks.length, ...cleanedTasks);
    resolve();
});

export const unsetUserTasksFromDb = async (userId: string): Promise<void> => new Promise((resolve) => {
    const mapped = tasks.map((task) => {
        if (task.userId === userId) return { ...task, userId: null };
        return task;
    });

    tasks.splice(0, tasks.length, ...mapped);
    resolve();
})

export const updateTaskFromDb = async (id: string, payload: Task): Promise<TaskModel> => new Promise((resolve, reject) => {
    const taskIndex = tasks.findIndex((item) => item.id === id);

    if (taskIndex !== -1) {
        const task = new TaskModel({ ...payload, id });
        tasks.splice(taskIndex, 1, task);
        resolve(task);
    } else {
        reject(new Error(`Task with id ${id} not found`));
    }
});
