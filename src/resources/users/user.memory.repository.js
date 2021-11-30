const { users } = require('../../db');
const User = require('./user.model');

const getAllFromDb = async () => new Promise((resolve) => {
    resolve(users);
});

const getSingleFromDb = async (id) => new Promise((resolve, reject) => {
    const user = users.find((item) => item.id === id);

    if (user) resolve(user);
    else reject(new Error(`User with id ${id} not found`));
});

const addUserToDb = async (payload) => new Promise((resolve) => {
    const user = new User(payload);
    users.push(user);
    resolve(user);
});

const deleteUserFormDb = async (id) => new Promise((resolve, reject) => {
    const userIndex = users.findIndex((item) => item.id === id);

    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        resolve();
    } else {
        reject(new Error(`User with id ${id} not found`));
    }
});

const updateUserFromDb = async (id, payload) => new Promise((resolve, reject) => {
    const userIndex = users.findIndex((item) => item.id === id);

    if (userIndex !== -1) {
        const user = new User({ ...payload, id });
        users.splice(userIndex, 1, user);
        resolve(user);
    } else {
        reject(new Error(`User with id ${id} not found`));
    }
})

module.exports = {
    getAllFromDb,
    getSingleFromDb,
    addUserToDb,
    deleteUserFormDb,
    updateUserFromDb,
};
