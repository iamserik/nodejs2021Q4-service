import { v4 as uuidv4 } from 'uuid';
import { Task } from '../../interfaces/Task';

/** @implements {Task} */
export class TaskModel implements Task{
    /** @type {string} */
    id: string;

    /** @type {string} */
    title: string;

    /** @type {number} */
    order: number;

    /** @type {string} */
    description: string;

    /** @type {string | null} */
    userId: string | null;

    /** @type {string} */
    boardId: string | null;

    /** @type {string | null} */
    columnId: string | null;

    /**
     * Task model class
     *
     * @param task - object
     */
    constructor(task: Task) {
        this.id = task.id ? task.id : uuidv4();
        this.title = task.title;
        this.order = task.order;
        this.description = task.description;
        this.userId = task.userId;
        this.boardId = task.boardId;
        this.columnId = task.columnId;
    }
}

