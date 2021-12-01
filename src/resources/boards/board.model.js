const { v4: uuidv4 } = require('uuid');

class Board {
    constructor({
        id = uuidv4(),
        title = 'ToDo',
        columns = [],
    } = {}) {
        this.id = id;
        this.title = title;
        this.columns = columns;
    }
}

module.exports = Board;
