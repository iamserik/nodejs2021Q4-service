import { boards } from '../../db/boards';
import { deleteBoardTasksFromDb } from '../tasks/task.memory.repository';
import { BoardModel } from './board.model';
import { Board } from '../../interfaces/Board';

/**
 * Return all boards from db.
 *
 * @return boards - array of boards
 */
export const getAllFromDb = async (): Promise<Array<BoardModel>> => new Promise((resolve) => {
    resolve(boards);
});

/**
 * Return board by id from db
 *
 * @param id - target board's uuid
 *
 * @return board - object.
 */
export const getSingleFromDb = async (id: string): Promise<BoardModel> => new Promise((resolve, reject) => {
    const board = boards.find((item) => item.id === id);

    if (board) resolve(board);
    else reject(new Error(`Board with id ${id} not found`));
});

/**
 * Create and return new board
 *
 * @param payload - board object without id
 *
 * @return board - newly created board record
 */
export const addBoardToDb = async (payload: Board): Promise<BoardModel> => new Promise((resolve) => {
    const board = new BoardModel(payload);
    boards.push(board);
    resolve(board);
});

/**
 * Delete board by id from db
 *
 * @param id - target board's uuid
 *
 * @return {void}
 */
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

/**
 * Update and return existing board from db
 *
 * @param id - target board's uuid
 * @param payload - board object data without id
 *
 * @return board - updated board record
 */
export const updateBoardFromDb = async (id: string, payload: Board): Promise<BoardModel> => {
    return new Promise((resolve, reject) => {
        const boardIndex = boards.findIndex((item) => item.id === id);

        if (boardIndex !== -1) {
            const board = new BoardModel({...payload, id});
            boards.splice(boardIndex, 1, board);
            resolve(board);
        } else {
            reject(new Error(`Board with id ${id} not found`));
        }
    });
};
