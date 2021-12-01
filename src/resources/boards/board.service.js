const { validateId } = require('../../common/utils');

const {
    getAllFromDb,
    getSingleFromDb,
    addBoardToDb,
    deleteBoardFormDb,
    updateBoardFromDb,
} = require('./board.memory.repository');

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

const addBoard = async (req, reply) => {
    addBoardToDb(req.body).then((data) => {
        reply.code(201);
        reply.send(data);
    });
};

const deleteBoard = async (req, reply) => {
    const { id } = req.params;
    validateId(id);

    deleteBoardFormDb(id).then(() => {
        reply.send({ message: 'Board deleted successfully' });
    }).catch((err) => {
        reply.code(404);
        reply.send({ message: err.message });
    });
};

const updateBoard = async (req, reply) => {
    const { id } = req.params;
    validateId(id);

    updateBoardFromDb(id, req.body).then((data) => {
        reply.send(data);
    }).catch((err) => {
        reply.code(404);
        reply.send({ message: err.message });
    });
}

module.exports = {
    getAll,
    getSingle,
    addBoard,
    deleteBoard,
    updateBoard,
};
