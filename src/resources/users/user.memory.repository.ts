import { UserModel } from "./user.model";
import { users } from "../../db/users";
import { User } from "../../interfaces/User";

const { unsetUserTasksFromDb } = require('../tasks/task.memory.repository');

export const getAllFromDb = async (): Promise<Array<UserModel>> => new Promise((resolve) => {
    resolve(users);
});

export const getSingleFromDb = async (id: string): Promise<UserModel> => new Promise((resolve, reject) => {
    const user = users.find((item) => item.id === id);

    if (user) resolve(user);
    else reject(new Error(`User with id ${id} not found`));
});

export const addUserToDb = async (payload: User): Promise<UserModel> => new Promise((resolve) => {
    const user = new UserModel(payload);
    users.push(user);
    resolve(user);
});

export const deleteUserFormDb = async (id: string): Promise<void> => new Promise((resolve, reject) => {
    const userPosition = users.findIndex((item) => item.id === id);

    if (userPosition !== -1) {
        users.splice(userPosition, 1);
        unsetUserTasksFromDb(id).then(() => {
            resolve();
        });
    } else {
        reject(new Error(`User with id ${id} not found`));
    }
});

export const updateUserFromDb = async (id: string, payload: User): Promise<UserModel> => new Promise((resolve, reject) => {
    const userIndex = users.findIndex((item) => item.id === id);

    if (userIndex !== -1) {
        const user = new UserModel({ ...payload, id });
        users.splice(userIndex, 1, user);
        resolve(user);
    } else {
        reject(new Error(`User with id ${id} not found`));
    }
});
