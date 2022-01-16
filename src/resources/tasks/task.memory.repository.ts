import { Task as ITask } from '../../interfaces/Task';
import { Task } from '../../entity/Task';
import { Board } from '../../entity/Board';
import { User } from '../../entity/User';

/**
 * Return specific board tasks from db
 *
 * @param boardId - the board id
 *
 * @return tasks - array of tasks filtered by boardId
 */
export const getAllFromDb = async (boardId: string): Promise<Array<Task>> => Task.find({ where: [{ board: boardId }]});

/**
 * Return task by id from db
 *
 * @param id - target task's uuid
 *
 * @return task - object
 */
export const getSingleFromDb = async (id: string): Promise<Task> => {
    const task = await Task.findOne(id);

    if (task) return task;
    else throw new Error(`Task with id ${id} not found`);
};

/**
 * Create and return new task
 *
 * @param payload - task object without id
 * @return task - newly created task record
 */
export const addTaskToDb = async (payload: ITask): Promise<Task> => {
    const {title, description, order, boardId, userId} = payload;

    const board = await Board.findOne(boardId || undefined);

    const user = await User.findOne(userId || undefined);

    try {
        const task = await Task.create({
            title,
            description,
            order,
            user,
            board,
        });

        await task.save();
        return task;
    } catch(err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
        throw new Error('Something went wrong');
    }
};

/**
 * Delete task by id from db
 *
 * @param id - target task's uuid
 *
 * @return {void}
 */
export const deleteTaskFormDb = async (id: string): Promise<void> => {
    const response = await Task.delete(id);
    if (!response.affected) {
        throw new Error(`Task with id ${id} not found`);
    }
};

/**
 * Update and return existing task from db
 *
 * @param id - target task's uuid
 * @param payload - task object data without id
 *
 * @return task - updated task record
 */
export const updateTaskFromDb = async (id: string, payload: ITask): Promise<Task> => {
    const { title, description, order, boardId, userId } = payload;

    const board = await Board.findOne(boardId || undefined);

    const user = await User.findOne(userId || undefined);

    await Task.update(id, {
        title,
        description,
        order,
        user,
        board,
    });

    const task = await Task.findOne(id);

    if (task) return task;
    else throw new Error(`Task with id ${id} not found`);
};
