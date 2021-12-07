const { v4: uuidv4 } = require('uuid');
import { Board } from '../../interfaces/Board';

export class BoardModel implements Board {
    id: string;

    title: string;

    columns: Array<string>

    constructor(board: Board) {
        this.id = board.id ? board.id : uuidv4();
        this.title = board.title;
        this.columns = board.columns;
    }
}
