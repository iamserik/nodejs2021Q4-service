import { boards } from '../../db/boards';
import { deleteBoardTasksFromDb } from '../tasks/task.memory.repository';
import { Board as IBoard } from '../../interfaces/Board';
import { Board } from '../../entity/Board';

/**
 * Return all boards from db.
 *
 * @return boards - array of boards
 */
export const getAllFromDb = async (): Promise<Array<Board>> => Board.find();

/**
 * Return board by id from db
 *
 * @param id - target board's uuid
 *
 * @return board - object.
 */
export const getSingleFromDb = async (id: string): Promise<Board> => {
    const board = await Board.findOne(id);

    if (board) return board;
    else throw new Error(`Board with id ${id} not found`);
};

/**
 * Create and return new board
 *
 * @param payload - board object without id
 *
 * @return board - newly created board record
 */
export const addBoardToDb = async (payload: IBoard): Promise<Board> => {
    const board = await Board.create(payload);
    await board.save();
    return board;
};

/**
 * Delete board by id from db
 *
 * @param id - target board's uuid
 *
 * @return {void}
 */
export const deleteBoardFormDb = async (id: string): Promise<void> => {
    const response = await Board.delete(id);
    if (!response.affected) {
        throw new Error(`Board with id ${id} not found`);
    }

    // FIXME check task deletes with board
    // deleteBoardTasksFromDb(id).then(() => {
    //     resolve();
    // });
};

/**
 * Update and return existing board from db
 *
 * @param id - target board's uuid
 * @param payload - board object data without id
 *
 * @return board - updated board record
 */
export const updateBoardFromDb = async (id: string, payload: IBoard): Promise<Board> => {
    await Board.update(id, payload);
    const board = await Board.findOne(id);
    if (board) return board;
    else throw new Error(`Board with id ${id} not found`);
};
