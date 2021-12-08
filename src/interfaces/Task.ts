import {FastifyRequest} from "fastify";

export interface Task {
    id: string | undefined,
    title: string,
    order: number,
    description: string,
    userId: string | null,
    boardId: string,
    columnId: string | null,
}

export type RequestByBoardId = FastifyRequest<{
    Params: {
        boardId: string,
    },
}>;

export type RequestByTaskId = FastifyRequest<{
    Params: {
        taskId: string,
    },
}>;

export type RequestCreatTask = FastifyRequest<{
    Params: {
        boardId: string,
    },
    Body: Task,
}>;

export type RequestUpdateTask = FastifyRequest<{
    Params: {
        taskId: string,
    },
    Body: Task,
}>;