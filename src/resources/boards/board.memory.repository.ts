import { boards } from '../../db/boards';
import { deleteBoardTasksFromDb } from '../tasks/task.memory.repository';
import { BoardModel } from './board.model';
import { Board } from '../../interfaces/Board';

export const getAllFromDb = async (): Promise<Array<BoardModel>> => new Promise((resolve) => {
    resolve(boards);
});

export const getSingleFromDb = async (id: string): Promise<BoardModel> => new Promise((resolve, reject) => {
    const board = boards.find((item) => item.id === id);

    if (board) resolve(board);
    else reject(new Error(`Board with id ${id} not found`));
});

export const addBoardToDb = async (payload: Board): Promise<BoardModel> => new Promise((resolve) => {
    const board = new BoardModel(payload);
    boards.push(board);
    resolve(board);
});

export const deleteBoardFormDb = async (id: string): Promise<void> => new Promise((resolve, reject) => {
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

export const updateBoardFromDb = async (id: string, payload: Board): Promise<BoardModel> => new Promise((resolve, reject) => {
    const boardIndex = boards.findIndex((item) => item.id === id);

    if (boardIndex !== -1) {
        const board = new BoardModel({ ...payload, id });
        boards.splice(boardIndex, 1, board);
        resolve(board);
    } else {
        reject(new Error(`Board with id ${id} not found`));
    }
});
