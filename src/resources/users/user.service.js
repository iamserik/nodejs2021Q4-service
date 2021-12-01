const { validate: uuidValidate } = require('uuid');

const {
    getAllFromDb,
    getSingleFromDb,
    addUserToDb,
    deleteUserFormDb,
    updateUserFromDb,
} = require('./user.memory.repository');

const validateId = (id) => {
    const valid = uuidValidate(id);

    if (!valid) throw new Error('Not valid id');
};

const getAll = async (req, reply) => {
    getAllFromDb().then((data) => {
        reply.send(data);
    });
};

const getSingle = async (req, reply) => {
    const { id } = req.params;
    validateId(id);

    getSingleFromDb(id).then((data) => {
        reply.send(data);
    });
};

const addUser = async (req, reply) => {
    addUserToDb(req.body).then((data) => {
        reply.code(201);
        reply.send(data);
    });
};

const deleteUser = async (req, reply) => {
    const { id } = req.params;
    validateId(id);

    deleteUserFormDb(id).then(() => {
        reply.send({ message: 'User deleted successfully' });
    });
};

const updateUser = async (req, reply) => {
    const { id } = req.params;
    validateId(id);

    updateUserFromDb(id, req.body).then((data) => {
        reply.send(data);
    });
}

module.exports = {
    getAll,
    getSingle,
    addUser,
    deleteUser,
    updateUser,
};
