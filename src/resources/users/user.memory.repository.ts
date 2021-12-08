import { UserModel } from "./user.model";
import { users } from "../../db/users";
import { User } from "../../interfaces/User";

const { unsetUserTasksFromDb } = require('../tasks/task.memory.repository');

/**
 * Retrieves all users from db
 *
 * @return {Array<UserModel>} array of users
 */
export const getAllFromDb = async (): Promise<Array<UserModel>> => new Promise((resolve) => {
    resolve(users);
});

/**
 * Retrieve user by id from db
 *
 * @param {string} id (uuid)
 * @return {UserModel} user
 */
export const getSingleFromDb = async (id: string): Promise<UserModel> => new Promise((resolve, reject) => {
    const user = users.find((item) => item.id === id);

    if (user) resolve(user);
    else reject(new Error(`User with id ${id} not found`));
});

/**
 * Create and return new user
 *
 * @param {User} payload user object
 * @return {UserModel} new user
 */
export const addUserToDb = async (payload: User): Promise<UserModel> => new Promise((resolve) => {
    const user = new UserModel(payload);
    users.push(user);
    resolve(user);
});

/**
 * Delete user by id from db
 *
 * @param {string} id (uuid)
 * @return {void}
 */
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

/**
 * Update existing user
 *
 * @param {string} id
 * @param {User} payload user object with new data
 * @return {UserModel} updated user
 */
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
