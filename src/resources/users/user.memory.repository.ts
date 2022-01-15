import { UserModel } from './user.model';
import { users } from '../../db/users';
import { User } from '../../interfaces/User';
import { User as UserTable } from '../../entity/User';

const { unsetUserTasksFromDb } = require('../tasks/task.memory.repository');

/**
 * Return all users from db
 *
 * @return users - array of users
 */
export const getAllFromDb = async (): Promise<Array<UserModel>> => new Promise((resolve) => {
    const usersArr = UserTable.find();
    resolve(usersArr);
});

/**
 * Return user by id from db
 *
 * @param id - target user's uuid
 *
 * @return user - object
 */
export const getSingleFromDb = async (id: string): Promise<UserModel> => new Promise((resolve, reject) => {
    const user = users.find((item) => item.id === id);

    if (user) resolve(user);
    else reject(new Error(`User with id ${id} not found`));
});

/**
 * Create and return new user
 *
 * @param  payload - user object without id.
 *
 * @return  user - newly created user record
 */
export const addUserToDb = async (payload: User): Promise<UserModel> => new Promise((resolve) => {
    const user = new UserModel(payload);
    users.push(user);
    resolve(user);
});

/**
 * Delete user by id from db
 *
 * @param id - target user's uuid
 *
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
 * Update and return existing user from db
 *
 * @param id - target user's uuid
 * @param payload - user object data without id
 *
 * @return user - updated user record
 */
export const updateUserFromDb = async (id: string, payload: User): Promise<UserModel> => {
    return new Promise((resolve, reject) => {
        const userIndex = users.findIndex((item) => item.id === id);

        if (userIndex !== -1) {
            const user = new UserModel({ ...payload, id });
            users.splice(userIndex, 1, user);
            resolve(user);
        } else {
            reject(new Error(`User with id ${id} not found`));
        }
    });
};
