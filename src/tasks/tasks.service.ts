import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Task } from "../entity/tasks.entity";
import { Board } from "../entity/boards.entity";
import { User } from "../entity/users.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

interface ITask extends CreateTaskDto {
  id: string;
}

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private tasksRepository: Repository<Task>) {
  }

  async getAll(boardId: string): Promise<CreateTaskDto[]> {
    const tasks = await this.tasksRepository.find({ where: [{ board: boardId }], loadRelationIds: true });
    const mapped = tasks.map((task) => {
      return { ...task, userId: task.user && task.user.toString(), boardId: task.board && task.board.toString(), columnId: null };
    })
    return mapped;
  }

  async getById(id: string): Promise<CreateTaskDto> {
    const task = await Task.findOne(id, {
      loadRelationIds: true,
    });

    if (task) {
      return { ...task, userId: task.user && task.user.toString(), boardId: task.board && task.board.toString(), columnId: null };;
    } else {
      throw new HttpException(
        `Task with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async create(payload: CreateTaskDto): Promise<CreateTaskDto> {
    const {title, description, order, boardId, userId} = payload;

    const board = await Board.findOne(boardId);

    try {
      const task = await Task.create({
        title,
        description,
        order,
        ...userId && { user: await User.findOne(userId) },
        board,
      });

      await task.save();

      return {
        ...task,
        columnId: null,
        userId: userId && task.user.id,
        boardId: task.board && task.board.id,
      };
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
    const { title, description, order, boardId, userId } = payload;

    const board = await Board.findOne(boardId);

    await Task.update(id, {
      title,
      description,
      order,
      ...userId && { user: await User.findOne(userId) },
      board,
    });

    const task = await Task.findOne(id);

    if (task) return task;
    else throw new HttpException(`Task with id ${id} not found`, HttpStatus.BAD_REQUEST);
  }
}
