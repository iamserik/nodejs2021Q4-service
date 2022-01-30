import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { getRepository, Repository } from "typeorm";
import { Task } from "../entity/tasks.entity";
import { Board } from "../entity/boards.entity";
import { User } from "../entity/users.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { BoardColumn } from "../entity/columns.entity";

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private tasksRepository: Repository<Task>) {
  }

  async getAll(boardId: string): Promise<Task[]> {
    const tasks = await this.tasksRepository.find({ where: [{ board: boardId }], loadRelationIds: true });

    return tasks;
  }

  async getById(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne(id, {
      loadRelationIds: true,
    });

    if (task) {
      return task;
    } else {
      throw new HttpException(
        `Task with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async create(payload: CreateTaskDto): Promise<Task> {
    const {title, description, order, boardId, userId, columnId} = payload;

    const board = await getRepository(Board).findOne(boardId);

    if (!board) {
      throw new HttpException('Board does not exists', HttpStatus.BAD_REQUEST);
    }

    try {
      const task = await this.tasksRepository.create({
        title,
        description,
        order,
        ...userId && { user: await getRepository(User).findOne(userId) },
        board,
        ...columnId && { column: await getRepository(BoardColumn).findOne(columnId) },
      });

      await task.save();

      return await this.getById(task.id);
    } catch(err) {
      if (err instanceof Error) {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      }
    }
  }

  async delete(id: string): Promise<void> {
    const response = await this.tasksRepository.delete(id);
    if (!response.affected) {
      throw new HttpException(`Task with id ${id} not found`, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, payload: UpdateTaskDto): Promise<Task> {
    const { title, description, order, boardId, userId, columnId } = payload;

    const board = await getRepository(Board).findOne(boardId);

    const task = await Task.update(id, {
      title,
      description,
      order,
      ...userId && { user: await getRepository(User).findOne(userId) },
      board,
      ...columnId && { column: await getRepository(BoardColumn).findOne(columnId) }
    });

    if (task) return await this.getById(id);
    else throw new HttpException(`Task with id ${id} not found`, HttpStatus.BAD_REQUEST);
  }
}
