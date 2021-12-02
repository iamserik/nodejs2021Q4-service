const { boards } = require('../../db');
const { deleteBoardTasksFromDb } = require('../tasks/task.memory.repository');
const Board = require('./board.model');

const getAllFromDb = async () => new Promise((resolve) => {
    resolve(boards);
});

const getSingleFromDb = async (id) => new Promise((resolve, reject) => {
    const board = boards.find((item) => item.id === id);

    if (board) resolve(board);
    else reject(new Error(`Board with id ${id} not found`));
});

const addBoardToDb = async (payload) => new Promise((resolve) => {
    const board = new Board(payload);
    boards.push(board);
    resolve(board);
});

const deleteBoardFormDb = async (id) => new Promise((resolve, reject) => {
    const boardIndex = boards.findIndex((item) => item.id === id);

    if (boardIndex !== -1) {
        boards.splice(boardIndex, 1);
        deleteBoardTasksFromDb(id).then(() => {
            resolve();
        });
    } else {
        reject(new Error(`Board with id ${id} not found`));
    }
});

const updateBoardFromDb = async (id, payload) => new Promise((resolve, reject) => {
    const boardIndex = boards.findIndex((item) => item.id === id);

    if (boardIndex !== -1) {
        const board = new Board({ ...payload, id });
        boards.splice(boardIndex, 1, board);
        resolve(board);
    } else {
        reject(new Error(`Board with id ${id} not found`));
    }
});

module.exports = {
    getAllFromDb,
    getSingleFromDb,
    addBoardToDb,
    deleteBoardFormDb,
    updateBoardFromDb,
};
