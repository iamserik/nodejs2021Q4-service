const { validateId } = require('../../common/utils');

const {
    getAllFromDb,
    getSingleFromDb,
    addUserToDb,
    deleteUserFormDb,
    updateUserFromDb,
} = require('./user.memory.repository');

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
    }).catch((err) => {
        reply.code(404);
        reply.send({ message: err.message });
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
    }).catch((err) => {
        reply.code(404);
        reply.send({ message: err.message });
    });
};

const updateUser = async (req, reply) => {
    const { id } = req.params;
    validateId(id);

    updateUserFromDb(id, req.body).then((data) => {
        reply.send(data);
    }).catch((err) => {
        reply.code(404);
        reply.send({ message: err.message });
    });
}

module.exports = {
    getAll,
    getSingle,
    addUser,
    deleteUser,
    updateUser,
};
