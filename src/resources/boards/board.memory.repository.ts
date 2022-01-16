import { Board as IBoard } from '../../interfaces/Board';
import { Board } from '../../entity/Board';

const columns = [
    { title: 'Backlog', order: 1 },
    { title: 'Sprint', order: 2 }
]

/**
 * Return all boards from db.
 *
 * @return boards - array of boards
 */
export const getAllFromDb = async (): Promise<Array<IBoard>> => {
    const boards = await Board.find();
    return boards.map((board) => ({ ...board, columns }));
};

/**
 * Return board by id from db
 *
 * @param id - target board's uuid
 *
 * @return board - object.
 */
export const getSingleFromDb = async (id: string): Promise<IBoard> => {
    const board = await Board.findOne(id);

    if (board) return { ...board, columns };
    else throw new Error(`Board with id ${id} not found`);
};

/**
 * Create and return new board
 *
 * @param payload - board object without id
 *
 * @return board - newly created board record
 */
export const addBoardToDb = async (payload: IBoard): Promise<IBoard> => {
    try {
        const board = await Board.create(payload);
        await board.save();
        return { ...board, columns };
    } catch(err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
        throw new Error('Something went wrong');
    }

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
};

/**
 * Update and return existing board from db
 *
 * @param id - target board's uuid
 * @param payload - board object data without id
 *
 * @return board - updated board record
 */
export const updateBoardFromDb = async (id: string, payload: IBoard): Promise<IBoard> => {
    await Board.update(id, { title: payload.title });
    const board = await Board.findOne(id);
    if (board) return { ...board, columns };
    else throw new Error(`Board with id ${id} not found`);
};
