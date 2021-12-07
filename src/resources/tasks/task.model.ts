import { v4 as uuidv4 } from 'uuid';
import { Task } from '../../interfaces/Task';

export class TaskModel implements Task{
    id: string | undefined;

    title: string;

    order: number;

    description: string;

    userId: string | null;

    boardId: string;

    columnId: string | null;

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

