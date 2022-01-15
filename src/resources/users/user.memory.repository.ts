import { User as IUser } from '../../interfaces/User';
import { User } from '../../entity/User';

const { unsetUserTasksFromDb } = require('../tasks/task.memory.repository');

/**
 * Return all users from db
 *
 * @return users - array of users
 */
export const getAllFromDb = async (): Promise<Array<User>> => User.find();

/**
 * Return user by id from db
 *
 * @param id - target user's uuid
 *
 * @return user - object
 */
export const getSingleFromDb = async (id: string): Promise<User> => {
    const user = await User.findOne(id);
    if(user) return user;
    else throw new Error(`User with id ${id} not found`)
};

/**
 * Create and return new user
 *
 * @param  payload - user object without id.
 *
 * @return  user - newly created user record
 */
export const addUserToDb = async (payload: IUser): Promise<User | void> => {
    try {
        const user = await User.create(payload);
        await user.save();
        return user;
    } catch(err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
    }
};

/**
 * Delete user by id from db
 *
 * @param id - target user's uuid
 *
 * @return {void}
 */
export const deleteUserFormDb = async (id: string): Promise<void> => {
    const response = await User.delete(id);
    if (!response.affected) {
        throw new Error(`User with id ${id} not found`);
    }
    // FIXME check tasks deletes with user
    // else {
    //     await unsetUserTasksFromDb(id);
    // }
}

/**
 * Update and return existing user from db
 *
 * @param id - target user's uuid
 * @param payload - user object data without id
 *
 * @return user - updated user record
 */
export const updateUserFromDb = async (id: string, payload: IUser): Promise<User | void> => {
    await User.update(id, payload);
    const user = await User.findOne(id);
    if (user) return user;
    else throw new Error(`User with id ${id} not found`);
};
