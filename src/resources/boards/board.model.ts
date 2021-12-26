import { v4 as uuidv4 } from 'uuid';
import { Board } from '../../interfaces/Board';

/** @implements {Board} */
export class BoardModel implements Board {
    /** @type {string} */
    id: string;

    /** @type {string} */
    title: string;

    /** @type {string} */
    columns: Array<string>

    /**
     * Board model class
     *
     * @param board - object
     */
    constructor(board: Board) {
        this.id = board.id ? board.id : uuidv4();
        this.title = board.title;
        this.columns = board.columns;
    }
}
